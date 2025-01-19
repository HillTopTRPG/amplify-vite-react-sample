import baroqueImg from '@Nechronica/images/class/baroque.png'
import gothicImg from '@Nechronica/images/class/gothic.png'
import psychedelicImg from '@Nechronica/images/class/psychedelic.png'
import requiemImg from '@Nechronica/images/class/requiem.png'
import romanesqueImg from '@Nechronica/images/class/romanesque.png'
import stacyImg from '@Nechronica/images/class/stacy.png'
import thanatosImg from '@Nechronica/images/class/thanatos.png'
import armImg from '@Nechronica/images/maneuver/arm.png'
import armedImg from '@Nechronica/images/maneuver/armed.png'
import bodyImg from '@Nechronica/images/maneuver/body.png'
import headImg from '@Nechronica/images/maneuver/head.png'
import legImg from '@Nechronica/images/maneuver/leg.png'
import modificationImg from '@Nechronica/images/maneuver/modification.png'
import mutationImg from '@Nechronica/images/maneuver/mutation.png'
import skillImg from '@Nechronica/images/maneuver/skill.png'
import treasureImg from '@Nechronica/images/maneuver/treasure.png'
import maneuverBack0Img from '@Nechronica/images/maneuver-back/0.png'
import maneuverBack1Img from '@Nechronica/images/maneuver-back/1.png'
import maneuverBack2Img from '@Nechronica/images/maneuver-back/2.png'
import maneuverBack3Img from '@Nechronica/images/maneuver-back/3.png'
import maneuverBack4Img from '@Nechronica/images/maneuver-back/4.png'
import maneuverBack5Img from '@Nechronica/images/maneuver-back/5.png'
import maneuverBack6Img from '@Nechronica/images/maneuver-back/6.png'
import maneuverBack7Img from '@Nechronica/images/maneuver-back/7.png'
import baseArmImg from '@Nechronica/images/maneuver-base/arm.png'
import baseBoneImg from '@Nechronica/images/maneuver-base/bone.png'
import baseBrainImg from '@Nechronica/images/maneuver-base/brain.png'
import baseEyeImg from '@Nechronica/images/maneuver-base/eye.png'
import baseFistImg from '@Nechronica/images/maneuver-base/fist.png'
import baseJawImg from '@Nechronica/images/maneuver-base/jaw.png'
import baseLegImg from '@Nechronica/images/maneuver-base/leg.png'
import baseShoulderImg from '@Nechronica/images/maneuver-base/shoulder.png'
import baseSpineImg from '@Nechronica/images/maneuver-base/spine.png'
import baseVisceraImg from '@Nechronica/images/maneuver-base/viscera.png'
import partsArmImg from '@Nechronica/images/parts/arm.png'
import partsBodyImg from '@Nechronica/images/parts/body.png'
import partsHeadImg from '@Nechronica/images/parts/head.png'
import partsLegImg from '@Nechronica/images/parts/leg.png'
import partsSkillImg from '@Nechronica/images/parts/skill.png'
import aliceImg from '@Nechronica/images/position/alice.png'
import automatonImg from '@Nechronica/images/position/automaton.png'
import courtImg from '@Nechronica/images/position/court.png'
import holicImg from '@Nechronica/images/position/holic.png'
import junkImg from '@Nechronica/images/position/junk.png'
import sororityImg from '@Nechronica/images/position/sorority.png'
import horrorImg from '@Nechronica/images/type/horror.png'
import legionImg from '@Nechronica/images/type/legion.png'
import savantImg from '@Nechronica/images/type/savant.png'
import unknownImg from '@Nechronica/images/unknown.png'
import {
  type NechronicaManeuver,
  type NechronicaType,
} from '@Nechronica/ts/NechronicaDataHelper.ts'
import mapping from '@Nechronica/ts/mapping.json'
import { screens } from './screens'
import { type Service } from '@/service'

export const nechronicaTypes: NechronicaType[] = [
  'doll',
  'savant',
  'horror',
  'legion',
]

export const PARTS_TUPLE: [string, number[]][] = [
  [partsSkillImg, [0, 1, 2, 3]],
  [partsHeadImg, [4]],
  [partsArmImg, [5]],
  [partsBodyImg, [6]],
  [partsLegImg, [7]],
] as const

export const getPositionClassName = (
  position: number,
  mainClass: number,
  subClass: number,
) => {
  return [
    mapping.CHARACTER_POSITION[position].val,
    mapping.CHARACTER_CLASS[mainClass].val,
    mapping.CHARACTER_CLASS[subClass].val,
  ]
}

export const getCharacterTypeSrc = (type: NechronicaType, position: number) => {
  if (type === 'savant') return savantImg
  if (type === 'horror') return horrorImg
  if (type === 'legion') return legionImg
  if (position === 1) return aliceImg
  if (position === 2) return holicImg
  if (position === 3) return automatonImg
  if (position === 4) return junkImg
  if (position === 5) return courtImg
  if (position === 6) return sororityImg
  return unknownImg
}

export const getClassSrc = (value: number) => {
  if (value === 1) return stacyImg
  if (value === 2) return thanatosImg
  if (value === 3) return gothicImg
  if (value === 4) return requiemImg
  if (value === 5) return baroqueImg
  if (value === 6) return romanesqueImg
  if (value === 7) return psychedelicImg
  return unknownImg
}

export function getIconClass(
  maneuver: NechronicaManeuver,
  position: number,
  mainClass: number,
  subClass: number,
) {
  if (maneuver.isUnknown) return 'unknown'
  return (
    mapping.BASIC_PARTS_ICON_CLASS_MAP.find(({ name }) => {
      return name === maneuver.name
    })?.class ??
    mapping.BASIC_PARTS_ICON_CLASS_MAP.find(({ shozoku }) => {
      return maneuver.shozoku.includes(shozoku)
    })?.class ??
    mapping.ICON_CLASS_MAP.find(({ text }) => {
      return maneuver.shozoku.includes(text)
    })?.class ??
    [
      '',
      ...getPositionClassName(position, mainClass, subClass),
      'parts-head',
      'parts-arm',
      'parts-body',
      'parts-leg',
    ].at(maneuver.parts) ??
    ''
  )
}

export function getManeuverSrc(
  maneuver: NechronicaManeuver,
  position: number,
  mainClass: number,
  subClass: number,
) {
  const iconClass = getIconClass(maneuver, position, mainClass, subClass)
  switch (iconClass) {
    case 'maneuver-treasure':
      return treasureImg
    case 'class-romanesque':
      return romanesqueImg
    case 'class-baroque':
      return baroqueImg
    case 'class-requiem':
      return requiemImg
    case 'class-gothic':
      return gothicImg
    case 'class-thanatos':
      return thanatosImg
    case 'class-stacy':
      return stacyImg
    case 'class-psychedelic':
      return psychedelicImg
    case 'position-sorority':
      return sororityImg
    case 'position-court':
      return courtImg
    case 'position-junk':
      return junkImg
    case 'position-automaton':
      return automatonImg
    case 'position-holic':
      return holicImg
    case 'position-alice':
      return aliceImg
    case 'maneuver-modification':
      return modificationImg
    case 'maneuver-mutation':
      return mutationImg
    case 'maneuver-armed':
      return armedImg
    case 'basic-brain':
      return baseBrainImg
    case 'basic-eye':
      return baseEyeImg
    case 'basic-fist':
      return baseFistImg
    case 'basic-jaw':
      return baseJawImg
    case 'basic-leg':
      return baseLegImg
    case 'basic-shoulder':
      return baseShoulderImg
    case 'basic-spine':
      return baseSpineImg
    case 'basic-viscera':
      return baseVisceraImg
    case 'basic-bone':
      return baseBoneImg
    case 'basic-arm':
      return baseArmImg
    case 'parts-head':
      return headImg
    case 'parts-arm':
      return armImg
    case 'parts-body':
      return bodyImg
    case 'parts-leg':
      return legImg
    case 'unknown':
      return unknownImg
    default:
  }
  return skillImg
}

export const getBackImg = (maneuver: NechronicaManeuver) => {
  if (maneuver.isUnknown) return maneuverBack0Img
  if (maneuver.type === 0) return maneuverBack0Img
  if (maneuver.type === 1) return maneuverBack1Img
  if (maneuver.type === 2) return maneuverBack2Img
  if (maneuver.type === 3) return maneuverBack3Img
  if (maneuver.type === 4) return maneuverBack4Img
  if (maneuver.type === 5) return maneuverBack5Img
  if (maneuver.type === 6) return maneuverBack6Img
  if (maneuver.type === 7) return maneuverBack7Img
  return ''
}

export const service: Service = {
  service: 'nechronica',
  serviceName: 'ネクロニカ',
  screens,
}
