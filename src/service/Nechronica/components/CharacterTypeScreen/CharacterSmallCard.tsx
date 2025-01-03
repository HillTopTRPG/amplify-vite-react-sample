import { useCallback, useMemo } from 'react'
import { Checkbox, Flex, List, Switch, theme, Typography } from 'antd'
import { clone } from 'lodash-es'
import DataSmallCard from '@/components/DataSmallCard'
import DeleteConfirmButton from '@/components/DeleteConfirmButton.tsx'
import StyledRadar, { makeChartData } from '@/components/StyledRadar.tsx'
import { useUserAttributes } from '@/context/userAttributesContext.ts'
import CharacterSmallCardBackImg from '@/service/Nechronica/components/CharacterTypeScreen/CharacterSmallCardBackImg.tsx'
import UnGroupConfirmButton from '@/service/Nechronica/components/GroupContents/UnGroupConfirmButton.tsx'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'
import {
  type CharacterGroupRelation,
  type NechronicaCharacter,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import mapping from '@/service/Nechronica/ts/mapping.json'
import { typedOmit } from '@/utils/types.ts'

interface Props {
  selected: boolean
  character: NechronicaCharacter
  onSelect: (id: string, isSelect: boolean) => void
  onHover?: (id: string, isEnter: boolean) => void
  viewType?: 'normal' | 'group' | 'simple'
  onUnGroup?: () => void
}
export default function CharacterSmallCard({
  viewType = 'normal',
  selected,
  character,
  onSelect,
  onHover,
  onUnGroup,
}: Props) {
  const { token } = theme.useToken()
  const {
    updateCharacter,
    deleteCharacter,
    characterGroupRelations,
    updateCharacterGroup,
  } = useNechronicaContext()
  const { currentUser } = useUserAttributes()

  const useCharacterGroupRelations = useMemo(
    () =>
      characterGroupRelations.filter(
        (cgr) => cgr.owner === currentUser?.userName,
      ),
    [characterGroupRelations, currentUser?.userName],
  )

  const toggleStared = useMemo(
    () => () => {
      const newData = clone(character)
      newData.additionalData.stared = !newData.additionalData.stared
      updateCharacter(newData)
    },
    [character, updateCharacter],
  )

  const actions = useMemo(() => {
    if (viewType === 'simple') return []
    return [
      viewType === 'normal' ? (
        [
          <DataSmallCard.FavoriteButton toggle={toggleStared} />,
          // <DataSmallCard.ShareButton />,
        ]
      ) : (
        <UnGroupConfirmButton name={character.name} onConfirm={onUnGroup} />
      ),
      <DataSmallCard.OperateButton operateType={viewType} />,
    ].flat()
  }, [character.name, onUnGroup, toggleStared, viewType])

  const { characterName, position, mainClass, subClass } =
    character.sheetData.basic

  const constBlocks = useMemo(
    () => (
      <>
        <Flex align="center" gap={5}>
          <Typography.Text style={{ fontSize: 11, lineHeight: '18px' }}>
            {mapping.CHARACTER_POSITION[position].text}
          </Typography.Text>
        </Flex>
        <Flex align="center" gap={5}>
          <Typography.Text style={{ fontSize: 11, lineHeight: '18px' }}>
            {mapping.CHARACTER_CLASS[mainClass].text}
          </Typography.Text>
          <Typography.Text style={{ fontSize: 11, lineHeight: '18px' }}>
            /
          </Typography.Text>
          <Typography.Text style={{ fontSize: 11, lineHeight: '18px' }}>
            {mapping.CHARACTER_CLASS[subClass].text}
          </Typography.Text>
        </Flex>
      </>
    ),
    [position, mainClass, subClass],
  )

  const radarData = useMemo(() => makeChartData(character), [character])

  const onChangeCharacterPublic = useCallback(
    (nextPublic: boolean) => {
      const newValue = clone(character)
      newValue.public = nextPublic
      updateCharacter(newValue)
    },
    [character, updateCharacter],
  )

  const onChangeGroup = useCallback(
    (cgr: CharacterGroupRelation, checked: boolean) => {
      const newValue = clone(cgr)
      newValue.characterIds = checked
        ? [...newValue.characterIds, character.id]
        : newValue.characterIds.filter((id) => id !== character.id)
      updateCharacterGroup(typedOmit(newValue, 'characters'))
    },
    [character.id, updateCharacterGroup],
  )

  return useMemo(
    () => (
      <DataSmallCard
        data={character}
        cardProps={{ actions }}
        selected={selected}
        contentsContainerProps={{
          onClick: () => onSelect(character.id, !selected),
          onMouseOverCapture: onHover
            ? () => onHover(character.id, true)
            : undefined,
          onMouseOutCapture: onHover
            ? () => onHover(character.id, false)
            : undefined,
        }}
        backgroundElm={<CharacterSmallCardBackImg character={character} />}
        shareDrawerContents={<></>}
        operationDrawerContents={(operateOpen) =>
          operateOpen === 'normal' ? (
            <Flex
              vertical
              gap={6}
              style={{ overflow: 'hidden', height: '100%' }}
            >
              <Flex align="center">
                <Typography.Text style={{ fontSize: 12 }}>公開</Typography.Text>
                <Switch
                  checkedChildren="有効"
                  unCheckedChildren="無効"
                  onChange={(v) => onChangeCharacterPublic(v)}
                  defaultValue={character.public}
                />
              </Flex>
              <Flex vertical style={{ flexGrow: 1, overflow: 'hidden' }}>
                <Typography.Text style={{ fontSize: 12 }}>
                  所属グループ
                </Typography.Text>
                <div
                  style={{
                    overflow: 'scroll',
                    flexGrow: 1,
                    borderStyle: 'dashed',
                    borderWidth: 1,
                    borderColor: token.colorBorderSecondary,
                  }}
                  onScrollCapture={(e) => e.stopPropagation()}
                >
                  <List
                    dataSource={useCharacterGroupRelations}
                    renderItem={(cgr) => (
                      <List.Item style={{ padding: 0 }}>
                        <Checkbox
                          checked={cgr.characterIds.includes(character.id)}
                          style={{
                            width: '100%',
                            padding: 5,
                            overflow: 'hidden',
                          }}
                          onChange={(e) => onChangeGroup(cgr, e.target.checked)}
                        >
                          <Typography.Text ellipsis style={{ padding: 0 }}>
                            {cgr.name}
                          </Typography.Text>
                        </Checkbox>
                      </List.Item>
                    )}
                  />
                </div>
              </Flex>
              <DeleteConfirmButton
                name={character.name}
                onConfirm={() => deleteCharacter(character.id)}
                style={{
                  alignSelf: 'flex-start',
                }}
              />
            </Flex>
          ) : null
        }
      >
        <Typography.Text type="secondary" style={{ fontSize: 11 }}>
          # {character.additionalData.sheetId}
        </Typography.Text>
        <Typography.Text strong ellipsis>
          {characterName}
        </Typography.Text>
        {character.additionalData.type === 'doll' ? constBlocks : null}
        <div
          style={{
            height: 170,
            margin: '-10px -14px -14px -14px',
            pointerEvents: 'none',
          }}
        >
          <StyledRadar data={radarData} type="small" size={180} />
        </div>
      </DataSmallCard>
    ),
    [
      actions,
      character,
      characterName,
      constBlocks,
      deleteCharacter,
      onChangeCharacterPublic,
      onChangeGroup,
      onHover,
      onSelect,
      radarData,
      selected,
      token.colorBorderSecondary,
      useCharacterGroupRelations,
    ],
  )
}
