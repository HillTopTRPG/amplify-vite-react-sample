import { useCallback, useMemo } from 'react'
import { Flex, Switch, Typography } from 'antd'
import { clone } from 'lodash-es'
import DataSmallCard from '@/components/DataSmallCard.tsx'
import DeleteConfirmButton from '@/components/DeleteConfirmButton.tsx'
import StyledRadar, { makeChartData } from '@/components/StyledRadar.tsx'
import CharacterSmallCardBackImg from '@/service/Nechronica/components/CharacterTypeScreen/CharacterSmallCardBackImg.tsx'
import UnGroupConfirmButton from '@/service/Nechronica/components/GroupContents/UnGroupConfirmButton.tsx'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'
import { type NechronicaCharacter } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import mapping from '@/service/Nechronica/ts/mapping.json'

type CharacterCardProps = {
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
}: CharacterCardProps) {
  const { updateCharacter, deleteCharacter } = useNechronicaContext()

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
          <DataSmallCard.ShareButton />,
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
      // TODO operateドロワーを閉じたい
    },
    [character, updateCharacter],
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
            <Flex vertical>
              <Flex>
                <Typography.Text>公開設定</Typography.Text>
                <Switch
                  checkedChildren="有効"
                  unCheckedChildren="無効"
                  onChange={(v) => onChangeCharacterPublic(v)}
                  defaultValue={character.public}
                />
              </Flex>
              <DeleteConfirmButton
                name={character.name}
                onConfirm={() => deleteCharacter(character.id)}
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
      onHover,
      onSelect,
      radarData,
      selected,
    ],
  )
}
