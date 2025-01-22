import { useCallback, useMemo } from 'react'
import CharacterSmallCardBackImg from '@Nechronica/components/CharacterTypeScreen/CharacterSmallCardBackImg.tsx'
import {
  type CharacterGroupRelation,
  type NechronicaCharacter,
} from '@Nechronica/ts/NechronicaDataHelper.ts'
import mapping from '@Nechronica/ts/mapping.json'
import { Checkbox, Flex, List, Switch, theme, Typography } from 'antd'
import { cloneDeep } from 'lodash-es'
import UnGroupConfirmButton from './UnGroupConfirmButton.tsx'
import DataSmallCard from '@/components/DataSmallCard'
import DeleteConfirmButton from '@/components/DeleteConfirmButton.tsx'
import StyledRadar, { makeChartData } from '@/components/StyledRadar.tsx'
import {
  currentUserSelector,
  nechronicaCharacterGroupRelationsSelector,
  useSelector,
} from '@/store'
import { updateCharacterGroup } from '@/store/commonSlice.ts'
import {
  deleteNechronicaCharacter,
  updateNechronicaCharacter,
} from '@/store/nechronicaSlice.ts'
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
  const characterGroupRelations = useSelector(
    nechronicaCharacterGroupRelationsSelector,
  )
  const currentUser = useSelector(currentUserSelector)

  const useCharacterGroupRelations = useMemo(
    () =>
      characterGroupRelations.filter(
        (cgr) => cgr.owner === currentUser?.userName,
      ),
    [characterGroupRelations, currentUser?.userName],
  )

  const toggleStared = useMemo(
    () => () => {
      const newData = cloneDeep(character)
      newData.additionalData.stared = !newData.additionalData.stared
      updateNechronicaCharacter(newData)
    },
    [character],
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

  const sameClass = mainClass === subClass

  const constBlocks = useMemo(
    () => (
      <>
        <Flex align="center" gap={5}>
          <Typography.Text style={{ fontSize: 11, lineHeight: '18px' }}>
            {mapping.CHARACTER_POSITION[position].text}
          </Typography.Text>
        </Flex>
        <Flex align="center" gap={5}>
          <Typography.Text
            ellipsis
            style={{ fontSize: 10, lineHeight: '18px' }}
          >
            {mapping.CHARACTER_CLASS[mainClass].text}
            {sameClass ? ' × 2' : ''}
          </Typography.Text>
          {!sameClass ? (
            <>
              <Typography.Text style={{ fontSize: 10, lineHeight: '18px' }}>
                /
              </Typography.Text>
              <Typography.Text
                ellipsis
                style={{ fontSize: 10, lineHeight: '18px' }}
              >
                {mapping.CHARACTER_CLASS[subClass].text}
              </Typography.Text>
            </>
          ) : null}
        </Flex>
      </>
    ),
    [mainClass, position, sameClass, subClass],
  )

  const radarData = useMemo(() => makeChartData(character), [character])

  const onChangeCharacterPublic = useCallback(
    (nextPublic: boolean) => {
      const newValue = cloneDeep(character)
      newValue.public = nextPublic
      updateNechronicaCharacter(newValue)
    },
    [character],
  )

  const onChangeGroup = useCallback(
    (cgr: CharacterGroupRelation, checked: boolean) => {
      const newValue = cloneDeep(cgr)
      newValue.characterIds = checked
        ? [...newValue.characterIds, character.id]
        : newValue.characterIds.filter((id) => id !== character.id)
      updateCharacterGroup(typedOmit(newValue, 'characters'))
    },
    [character.id],
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
              <Flex align="center" gap={6}>
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
                onConfirm={() => deleteNechronicaCharacter(character.id)}
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
            margin: '-10px -14px -20px -14px',
            pointerEvents: 'none',
          }}
        >
          <StyledRadar data={radarData} type="small" size={170} />
        </div>
      </DataSmallCard>
    ),
    [
      actions,
      character,
      characterName,
      constBlocks,
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
