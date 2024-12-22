import { useMemo } from 'react'
import { Flex, List, Typography, Image } from 'antd'
import style from './CharacterCard.module.css'
import StyledRadar, { makeChartData } from '@/components/StyledRadar.tsx'
import { getCharacterTypeSrc, PARTS_TUPLE } from '@/service/Nechronica'
import CharacterAvatar from '@/service/Nechronica/components/CharacterAvatar.tsx'
import ClassAvatar from '@/service/Nechronica/components/ClassAvatar.tsx'
import ManeuverButton from '@/service/Nechronica/components/ManeuverButton.tsx'
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
  const characterType = character.additionalData.type

  const constBlocks = useMemo(() => {
    return (
      <Flex align="flex-start" style={{ padding: '0 4px' }} gap={5}>
        <CharacterAvatar type={characterType} position={basic.position} />
        <ClassAvatar value={basic.mainClass} />
        <ClassAvatar value={basic.subClass} />
      </Flex>
    )
  }, [basic.mainClass, basic.position, basic.subClass, characterType])

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
    return (
      <Flex gap={3} wrap>
        {character.sheetData.roiceList.map((roice, index) => (
          <RoiceButton key={index} roice={roice} />
        ))}
      </Flex>
    )
  }, [character.sheetData.roiceList])

  const partsLineItems = useMemo(() => {
    return (
      <List>
        {PARTS_TUPLE.map(([src, parts], index) => (
          <PartsListItem
            key={index}
            maneuverList={character.sheetData.maneuverList}
            src={src}
            parts={parts}
            basic={character.sheetData.basic}
            isSavantSkill={characterType === 'savant' ? index === 0 : false}
          />
        ))}
      </List>
    )
  }, [
    characterType,
    character.sheetData.basic,
    character.sheetData.maneuverList,
  ])

  const maneuverButtons = useMemo(
    () => (
      <Flex wrap style={{ padding: '0 8px' }} gap={4}>
        {character.sheetData.maneuverList.map((maneuver, index) => (
          <ManeuverButton
            key={index}
            maneuver={maneuver}
            position={basic.position}
            mainClass={basic.mainClass}
            subClass={basic.subClass}
          />
        ))}
      </Flex>
    ),
    [
      character.sheetData.maneuverList,
      basic.position,
      basic.mainClass,
      basic.subClass,
    ],
  )

  const radarData = makeChartData(character)

  const isDoll = characterType === 'doll'
  const isDollSavant = ['doll', 'savant'].includes(characterType)
  const backImageSize = isDollSavant ? '100%' : '60%'

  return (
    <Flex vertical gap={3} style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: isDoll ? 50 : 0,
          left: isDollSavant ? 0 : '15%',
          right: 0,
        }}
      >
        {isDoll ? (
          <div className={style.sunrays}>
            <div className={style.light}></div>
            <div className={style.light}></div>
            <div className={style.light}></div>
            <div className={style.light}></div>
            <div className={style.light}></div>
            <div className={style.light}></div>
          </div>
        ) : null}
        <Image
          src={getCharacterTypeSrc(characterType, basic.position)}
          preview={false}
          style={{ opacity: 0.1, width: backImageSize, height: backImageSize }}
        />
      </div>
      <Flex align="flex-end">
        <Flex vertical align="flex-start" style={{ flexGrow: 1 }} gap={5}>
          <Typography.Text strong ellipsis style={{ padding: '0 4px' }}>
            {basic.characterName}
          </Typography.Text>
          {isDoll ? constBlocks : null}
        </Flex>
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
      {isDoll ? roiceButtons : null}
      {isDollSavant ? partsLineItems : maneuverButtons}
    </Flex>
  )
}
