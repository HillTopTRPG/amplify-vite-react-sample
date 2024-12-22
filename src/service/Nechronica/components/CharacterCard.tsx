import { useMemo } from 'react'
import { Flex, List, Typography, Image } from 'antd'
import style from './CharacterCard.module.css'
import StyledRadar, { makeChartData } from '@/components/StyledRadar.tsx'
import { getPositionSrc, PARTS_TUPLE } from '@/service/Nechronica'
import CharacterAvatar from '@/service/Nechronica/components/CharacterAvatar.tsx'
import ClassAvatar from '@/service/Nechronica/components/ClassAvatar.tsx'
import PartsListItem from '@/service/Nechronica/components/PartsListItem.tsx'
import RoiceButton from '@/service/Nechronica/components/RoiceButton.tsx'
import { type NechronicaCharacter } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

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
  character: NechronicaCharacter
}
export default function CharacterCard({ character }: CharacterCardProps) {
  const basic = character.sheetData.basic

  const constBlocks = useMemo(() => {
    return (
      <Flex vertical align="flex-start" style={{ flexGrow: 1 }} gap={5}>
        <Typography.Text strong ellipsis style={{ padding: '0 4px' }}>
          {basic.characterName}
        </Typography.Text>
        <Flex align="flex-start" style={{ padding: '0 4px' }} gap={5}>
          <CharacterAvatar
            type={character.additionalData.type}
            position={basic.position}
          />
          <ClassAvatar value={basic.mainClass} />
          <ClassAvatar value={basic.subClass} />
        </Flex>
      </Flex>
    )
  }, [
    basic.characterName,
    basic.mainClass,
    basic.position,
    basic.subClass,
    character.additionalData.type,
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

  const roiceButtons = useMemo(() => {
    return character.sheetData.roiceList.map((roice, index) => (
      <RoiceButton key={index} roice={roice} />
    ))
  }, [character.sheetData.roiceList])

  const partsLineItems = useMemo(() => {
    return PARTS_TUPLE.map(([src, parts], index) => (
      <PartsListItem
        key={index}
        maneuverList={character.sheetData.maneuverList}
        src={src}
        parts={parts}
        basic={character.sheetData.basic}
      />
    ))
  }, [character.sheetData.basic, character.sheetData.maneuverList])

  const radarData = makeChartData(character)

  return (
    <Flex
      vertical
      gap={3}
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: 50, left: 0, right: 0 }}>
        <div className={style.sunrays}>
          <div className={style.light}></div>
          <div className={style.light}></div>
          <div className={style.light}></div>
          <div className={style.light}></div>
          <div className={style.light}></div>
          <div className={style.light}></div>
        </div>
        <Image
          src={getPositionSrc(basic.position)}
          preview={false}
          style={{
            opacity: 0.1,
            width: '100%',
            height: '100%',
          }}
        />
      </div>
      <Flex align="flex-end">
        {constBlocks}
        <div
          style={{
            width: 180,
            height: 160,
            marginTop: -10,
          }}
        >
          <StyledRadar data={radarData} type="small" size={180} />
        </div>
      </Flex>
      <Flex gap={3} wrap>
        {roiceButtons}
      </Flex>
      <List>{partsLineItems}</List>
    </Flex>
  )
}
