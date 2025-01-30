import { useMemo } from 'react'
import ManeuverButton from '@higanbina/components/CharacterCard/maneuver/ManeuverButton.tsx'
import ManeuverPopoverContents from '@higanbina/components/CharacterCard/maneuver/ManeuverPopoverContents'
import { getCharacterTypeSrc, PARTS_TUPLE } from '@higanbina/index.ts'
import { type NechronicaCharacter } from '@higanbina/ts/NechronicaDataHelper.ts'
import { Flex, List, Typography, Image } from 'antd'
import { cloneDeep } from 'lodash-es'
import CharacterAvatar from './CharacterAvatar.tsx'
import ClassAvatar from './ClassAvatar.tsx'
import PartsListItem from './PartsListItem.tsx'
import RoiceButton from './RoiceButton.tsx'
import styles from './index.module.css'
import StyledRadar, { makeChartData } from '@/components/StyledRadar.tsx'
import { updateNechronicaCharacter } from '@/store/nechronicaSlice.ts'

interface Props {
  character: NechronicaCharacter
}
export default function CharacterCard({ character }: Props) {
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
            hoverContent={(maneuver) => (
              <ManeuverPopoverContents type="hover" maneuver={maneuver} />
            )}
            clickContent={(maneuver, index) => (
              <ManeuverPopoverContents
                type="click"
                maneuver={maneuver}
                updateManeuver={(makeManeuver) => {
                  const newCharacter = cloneDeep(character)
                  newCharacter.sheetData.maneuverList[index] =
                    makeManeuver(maneuver)
                  updateNechronicaCharacter(newCharacter)
                }}
              />
            )}
            src={src}
            parts={parts}
            basic={character.sheetData.basic}
            isSavantSkill={characterType === 'savant' ? index === 0 : false}
          />
        ))}
      </List>
    )
  }, [character, characterType])

  const maneuverButtons = useMemo(
    () => (
      <Flex wrap style={{ padding: '0 8px' }} gap={4}>
        {character.sheetData.maneuverList.map((maneuver, index) => (
          <ManeuverButton
            key={index}
            maneuver={maneuver}
            hoverContent={
              <ManeuverPopoverContents type="hover" maneuver={maneuver} />
            }
            clickContent={
              <ManeuverPopoverContents
                type="click"
                maneuver={maneuver}
                updateManeuver={(makeManeuver) => {
                  const newCharacter = cloneDeep(character)
                  newCharacter.sheetData.maneuverList[index] =
                    makeManeuver(maneuver)
                  updateNechronicaCharacter(newCharacter)
                }}
              />
            }
            position={basic.position}
            mainClass={basic.mainClass}
            subClass={basic.subClass}
          />
        ))}
      </Flex>
    ),
    [character, basic.position, basic.mainClass, basic.subClass],
  )

  const radarData = useMemo(() => makeChartData(character), [character])

  const isDoll = useMemo(() => characterType === 'doll', [characterType])
  const isDollSavant = useMemo(
    () => ['doll', 'savant'].includes(characterType),
    [characterType],
  )
  const backImageSize = useMemo(
    () => (isDollSavant ? '100%' : '60%'),
    [isDollSavant],
  )

  return useMemo(() => {
    return (
      <Flex
        vertical
        gap={3}
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <div
          style={{
            position: 'absolute',
            top: isDoll ? 50 : 0,
            left: isDollSavant ? 0 : '15%',
            right: 0,
          }}
        >
          {isDoll ? (
            <div className={styles.sunrays}>
              <div className={styles.light}></div>
              <div className={styles.light}></div>
              <div className={styles.light}></div>
              <div className={styles.light}></div>
              <div className={styles.light}></div>
              <div className={styles.light}></div>
            </div>
          ) : null}
          <Image
            src={getCharacterTypeSrc(characterType, basic.position)}
            preview={false}
            width={backImageSize}
            height={backImageSize}
            style={{ opacity: 0.1, filter: 'blur(1px)' }}
          />
        </div>
        <Flex align={isDollSavant ? 'flex-end' : 'flex-start'}>
          <Flex vertical align="flex-start" style={{ flexGrow: 1 }} gap={5}>
            <Typography.Text strong ellipsis style={{ padding: '0 4px' }}>
              {basic.characterName}
            </Typography.Text>
            {isDoll ? constBlocks : null}
            {isDollSavant ? null : maneuverButtons}
          </Flex>
          <div
            style={{
              height: 160,
              marginTop: -10,
              pointerEvents: 'none',
            }}
          >
            <StyledRadar data={radarData} type="small" size={170} />
          </div>
        </Flex>
        {isDoll ? roiceButtons : null}
        {isDollSavant ? partsLineItems : null}
      </Flex>
    )
  }, [
    backImageSize,
    basic.characterName,
    basic.position,
    characterType,
    constBlocks,
    isDoll,
    isDollSavant,
    maneuverButtons,
    partsLineItems,
    radarData,
    roiceButtons,
  ])
}
