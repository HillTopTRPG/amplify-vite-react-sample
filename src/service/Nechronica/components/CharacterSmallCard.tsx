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
  theme,
  Typography,
} from 'antd'
import { clone } from 'lodash-es'
import StyledRadar, { makeChartData } from '@/components/StyledRadar.tsx'
import { useUserAttributes } from '@/context/userAttributes.ts'
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
}
export default function CharacterSmallCard({
  selected,
  character,
  onSelect,
}: CharacterCardProps) {
  const { token } = theme.useToken()
  const { updateCharacter } = useNechronicaContext()
  const { currentIsMe } = useUserAttributes()

  const onClickContainer = useMemo(
    () => () => {
      const after = !selected
      onSelect(character.id, after)
    },
    [character.id, onSelect, selected],
  )

  const cardProps: CardProps = useMemo(
    () => ({
      onClick: onClickContainer,
      hoverable: true,
      styles: {
        body: {
          padding: '8px 0',
          width: 180,
        },
      },
      style: {
        cursor: 'pointer',
        backgroundColor: selected
          ? token.colorPrimaryBg
          : token.colorBgElevated,
      },
    }),
    [onClickContainer, selected, token.colorBgElevated, token.colorPrimaryBg],
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
  }, [character.additionalData.stared, toggleStared])

  const operationBlock = useMemo(
    () => (
      <Flex align="center" style={{ padding: '0 4px' }} gap={5}>
        <Checkbox checked={selected} style={{ alignSelf: 'center' }} />

        {currentIsMe ? ownerOperations : null}
      </Flex>
    ),
    [currentIsMe, ownerOperations, selected],
  )

  const constBlocks = useMemo(() => {
    return (
      <Flex
        vertical
        align="flex-start"
        style={{ flexGrow: 1, padding: '0 3px' }}
      >
        {operationBlock}
        <Typography.Text strong ellipsis style={{ padding: '0 4px' }}>
          {basic.characterName}
        </Typography.Text>
        <Flex align="center" style={{ padding: '0 4px' }} gap={5}>
          <Typography.Text style={{ fontSize: 11 }}>
            {mapping.CHARACTER_POSITION[basic.position].text}
          </Typography.Text>
        </Flex>
        <Flex align="center" style={{ padding: '0 4px' }} gap={5}>
          <Typography.Text style={{ fontSize: 11 }}>
            {mapping.CHARACTER_CLASS[basic.mainClass].text}
          </Typography.Text>
          <Typography.Text style={{ fontSize: 11 }}>/</Typography.Text>
          <Typography.Text style={{ fontSize: 11 }}>
            {mapping.CHARACTER_CLASS[basic.subClass].text}
          </Typography.Text>
        </Flex>
      </Flex>
    )
  }, [
    basic.characterName,
    basic.mainClass,
    basic.position,
    basic.subClass,
    operationBlock,
  ])

  // const onChangeBasePosition = useMemo(
  //   () => (newValue: number) => {
  //     const newData = clone(character)
  //     newData.sheetData.basic.basePosition = newValue
  //     updateCharacter(newData.id, newData.type, newData.sheetData)
  //   },
  //   [character, updateCharacter],
  // )

  // const isSameClass = basic.mainClass === basic.subClass
  //
  // const basicPositionSelect = useMemo(
  //   () => (
  //     <Flex justify="center" align="center" style={{ flexGrow: 1 }}>
  //       <Flex vertical>
  //         <Typography.Text
  //           strong
  //           style={{ fontSize: 10 }}
  //           onClick={(e) => e.stopPropagation()}
  //         >
  //           初期配置
  //         </Typography.Text>
  //         <Select
  //           value={basic.basePosition}
  //           onChange={onChangeBasePosition}
  //           onClick={(e) => e.stopPropagation()}
  //           options={mapping.CHARACTER_LOCATION.map((l) => ({
  //             value: l['init-pos-value'],
  //             label: i18nT(l.text) || '-',
  //           }))}
  //           style={{ minWidth: 70 }}
  //         />
  //       </Flex>
  //     </Flex>
  //   ),
  //   [basic.basePosition, i18nT, onChangeBasePosition],
  // )

  // const roiceButtons = useMemo(() => {
  //   return character.sheetData.roiceList.map((roice, index) => (
  //     <RoiceButton key={index} roice={roice} />
  //   ))
  // }, [character.sheetData.roiceList])
  //
  // const partsLineItems = useMemo(() => {
  //   return PARTS_TUPLE.map(([src, parts], index) => (
  //     <PartsListItem
  //       key={index}
  //       maneuverList={character.sheetData.maneuverList}
  //       src={src}
  //       parts={parts}
  //       basic={character.sheetData.basic}
  //     />
  //   ))
  // }, [character.sheetData.basic, character.sheetData.maneuverList])

  const radarData = makeChartData(character)

  return (
    <Card {...cardProps}>
      <Flex vertical gap={3}>
        {constBlocks}
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
