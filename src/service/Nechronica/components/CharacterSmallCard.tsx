import { useMemo } from 'react'
import {
  ShareAltOutlined,
  StarFilled,
  StarOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  type CardProps,
  Checkbox,
  Flex,
  Image,
  theme,
  Typography,
} from 'antd'
import { clone } from 'lodash-es'
import StyledRadar, { makeChartData } from '@/components/StyledRadar.tsx'
import { useUserAttributes } from '@/context/userAttributes.ts'
import { getCharacterTypeSrc } from '@/service/Nechronica'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'
import { type NechronicaCharacter } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import mapping from '@/service/Nechronica/ts/mapping.json'

// const MANEUVER_LINE_RANGE = [3, 8] as const
//
// function getManeuverLineNum(maneuvers: NechronicaManeuver[]) {
//   const lineManeuverMax = PARTS_TUPLE.map(
//     (tuple) => maneuvers.filter((m) => tuple[1].includes(m.parts)).length,
//   ).reduce((prev, curr) => (prev > curr ? prev : curr))
//   return lineManeuverMax < MANEUVER_LINE_RANGE[0]
//     ? MANEUVER_LINE_RANGE[0]
//     : lineManeuverMax > MANEUVER_LINE_RANGE[1]
//       ? MANEUVER_LINE_RANGE[1]
//       : lineManeuverMax
// }

type CharacterCardProps = {
  selected: boolean
  character: NechronicaCharacter
  onSelect: (id: string, isSelect: boolean) => void
  onHover: (id: string, isEnter: boolean) => void
  viewType?: 'normal' | 'simple'
}
export default function CharacterSmallCard({
  selected,
  character,
  onSelect,
  onHover,
  viewType = 'normal',
}: CharacterCardProps) {
  const { token } = theme.useToken()
  const { updateCharacter } = useNechronicaContext()
  const { currentIsMe } = useUserAttributes()

  const cardProps: CardProps = useMemo(
    () => ({
      onClick: () => onSelect(character.id, !selected),
      onMouseEnter: () => onHover(character.id, true),
      onMouseLeave: () => onHover(character.id, false),
      hoverable: true,
      styles: {
        body: {
          padding: '8px 0',
          width: 180,
          position: 'relative',
          overflow: 'hidden',
        },
      },
      style: {
        cursor: 'pointer',
        backgroundColor: selected
          ? token.colorPrimaryBg
          : token.colorBgElevated,
      },
    }),
    [
      character.id,
      onSelect,
      onHover,
      selected,
      token.colorBgElevated,
      token.colorPrimaryBg,
    ],
  )

  const toggleStared = useMemo(
    () => () => {
      const newData = clone(character)
      newData.additionalData.stared = !newData.additionalData.stared
      updateCharacter(newData)
    },
    [character, updateCharacter],
  )

  const togglePublic = useMemo(
    () => () => {
      const newData = clone(character)
      newData.public = !newData.public
      updateCharacter(newData)
    },
    [character, updateCharacter],
  )

  const basic = character.sheetData.basic

  const ownerOperations = useMemo(() => {
    return (
      <>
        <Button
          size="small"
          type="text"
          shape="circle"
          icon={
            character.additionalData.stared ? <StarFilled /> : <StarOutlined />
          }
          onClick={(e) => {
            toggleStared()
            e.stopPropagation()
          }}
        />
        <Button
          size="small"
          type="text"
          shape="circle"
          icon={character.public ? <ShareAltOutlined /> : <UserOutlined />}
          onClick={(e) => {
            togglePublic()
            e.stopPropagation()
          }}
        />
      </>
    )
  }, [
    character.additionalData.stared,
    character.public,
    togglePublic,
    toggleStared,
  ])

  const operationBlock = useMemo(
    () => (
      <Flex align="center" style={{ padding: '0 4px' }} gap={5}>
        <Checkbox checked={selected} style={{ alignSelf: 'center' }} />

        {currentIsMe && viewType === 'normal' ? ownerOperations : null}
      </Flex>
    ),
    [currentIsMe, ownerOperations, selected, viewType],
  )

  const constBlocks = useMemo(
    () => (
      <>
        <Flex align="center" style={{ padding: '0 4px' }} gap={5}>
          <Typography.Text style={{ fontSize: 11, lineHeight: '18px' }}>
            {mapping.CHARACTER_POSITION[basic.position].text}
          </Typography.Text>
        </Flex>
        <Flex align="center" style={{ padding: '0 4px' }} gap={5}>
          <Typography.Text style={{ fontSize: 11, lineHeight: '18px' }}>
            {mapping.CHARACTER_CLASS[basic.mainClass].text}
          </Typography.Text>
          <Typography.Text style={{ fontSize: 11, lineHeight: '18px' }}>
            /
          </Typography.Text>
          <Typography.Text style={{ fontSize: 11, lineHeight: '18px' }}>
            {mapping.CHARACTER_CLASS[basic.subClass].text}
          </Typography.Text>
        </Flex>
      </>
    ),
    [basic.mainClass, basic.position, basic.subClass],
  )

  const radarData = makeChartData(character)

  return (
    <Card {...cardProps}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '-20%',
          right: 0,
          bottom: 0,
          overflow: 'hidden',
        }}
      >
        <Image
          src={getCharacterTypeSrc(
            character.additionalData.type,
            basic.position,
          )}
          preview={false}
          style={{
            opacity: 0.1,
            width: '140%',
            height: '140%',
            filter: 'blur(2px)',
          }}
        />
      </div>
      <Flex vertical gap={3}>
        <Flex
          vertical
          align="flex-start"
          style={{ flexGrow: 1, padding: '0 3px' }}
        >
          {operationBlock}
          <Typography.Text strong ellipsis style={{ padding: '0 4px' }}>
            {basic.characterName}
          </Typography.Text>
          {character.additionalData.type === 'doll' ? constBlocks : null}
        </Flex>
        <div
          style={{
            width: 180,
            height: 160,
            marginTop: -10,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          <StyledRadar data={radarData} type="small" size={180} />
        </div>
      </Flex>
    </Card>
  )
}
