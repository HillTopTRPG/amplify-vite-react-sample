import screens from './screens'
import baroqueImg from '@/service/Nechronica/images/class/baroque.png'
import gothicImg from '@/service/Nechronica/images/class/gothic.png'
import psychedelicImg from '@/service/Nechronica/images/class/psychedelic.png'
import requiemImg from '@/service/Nechronica/images/class/requiem.png'
import romanesqueImg from '@/service/Nechronica/images/class/romanesque.png'
import stacyImg from '@/service/Nechronica/images/class/stacy.png'
import thanatosImg from '@/service/Nechronica/images/class/thanatos.png'
import armImg from '@/service/Nechronica/images/maneuver/arm.png'
import armedImg from '@/service/Nechronica/images/maneuver/armed.png'
import bodyImg from '@/service/Nechronica/images/maneuver/body.png'
import headImg from '@/service/Nechronica/images/maneuver/head.png'
import legImg from '@/service/Nechronica/images/maneuver/leg.png'
import modificationImg from '@/service/Nechronica/images/maneuver/modification.png'
import mutationImg from '@/service/Nechronica/images/maneuver/mutation.png'
import skillImg from '@/service/Nechronica/images/maneuver/skill.png'
import treasureImg from '@/service/Nechronica/images/maneuver/treasure.png'
import maneuverBack0Img from '@/service/Nechronica/images/maneuver-back/0.png'
import maneuverBack1Img from '@/service/Nechronica/images/maneuver-back/1.png'
import maneuverBack2Img from '@/service/Nechronica/images/maneuver-back/2.png'
import maneuverBack3Img from '@/service/Nechronica/images/maneuver-back/3.png'
import maneuverBack4Img from '@/service/Nechronica/images/maneuver-back/4.png'
import maneuverBack5Img from '@/service/Nechronica/images/maneuver-back/5.png'
import maneuverBack6Img from '@/service/Nechronica/images/maneuver-back/6.png'
import maneuverBack7Img from '@/service/Nechronica/images/maneuver-back/7.png'
import baseArmImg from '@/service/Nechronica/images/maneuver-base/arm.png'
import baseBoneImg from '@/service/Nechronica/images/maneuver-base/bone.png'
import baseBrainImg from '@/service/Nechronica/images/maneuver-base/brain.png'
import baseEyeImg from '@/service/Nechronica/images/maneuver-base/eye.png'
import baseFistImg from '@/service/Nechronica/images/maneuver-base/fist.png'
import baseJawImg from '@/service/Nechronica/images/maneuver-base/jaw.png'
import baseLegImg from '@/service/Nechronica/images/maneuver-base/leg.png'
import baseShoulderImg from '@/service/Nechronica/images/maneuver-base/shoulder.png'
import baseSpineImg from '@/service/Nechronica/images/maneuver-base/spine.png'
import baseVisceraImg from '@/service/Nechronica/images/maneuver-base/viscera.png'
import partsArmImg from '@/service/Nechronica/images/parts/arm.png'
import partsBodyImg from '@/service/Nechronica/images/parts/body.png'
import partsHeadImg from '@/service/Nechronica/images/parts/head.png'
import partsLegImg from '@/service/Nechronica/images/parts/leg.png'
import partsSkillImg from '@/service/Nechronica/images/parts/skill.png'
import aliceImg from '@/service/Nechronica/images/position/alice.png'
import automatonImg from '@/service/Nechronica/images/position/automaton.png'
import courtImg from '@/service/Nechronica/images/position/court.png'
import holicImg from '@/service/Nechronica/images/position/holic.png'
import junkImg from '@/service/Nechronica/images/position/junk.png'
import sororityImg from '@/service/Nechronica/images/position/sorority.png'
import horrorImg from '@/service/Nechronica/images/type/horror.png'
import legionImg from '@/service/Nechronica/images/type/legion.png'
import savantImg from '@/service/Nechronica/images/type/savant.png'
import unknownImg from '@/service/Nechronica/images/unknown.png'
import {
  type NechronicaManeuver,
  type NechronicaType,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import mapping from '@/service/Nechronica/ts/mapping.json'

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

export const getManeuverSrc = (
  maneuver: NechronicaManeuver,
  position: number,
  mainClass: number,
  subClass: number,
) => {
  const iconClass =
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
    default:
  }
  return skillImg
}

export const getBackImg = (maneuverType: number) => {
  if (maneuverType === 0) return maneuverBack0Img
  if (maneuverType === 1) return maneuverBack1Img
  if (maneuverType === 2) return maneuverBack2Img
  if (maneuverType === 3) return maneuverBack3Img
  if (maneuverType === 4) return maneuverBack4Img
  if (maneuverType === 5) return maneuverBack5Img
  if (maneuverType === 6) return maneuverBack6Img
  if (maneuverType === 7) return maneuverBack7Img
  return ''
}

const service = {
  service: 'nechronica',
  serviceName: 'ネクロニカ',
  screens,
} as const

export default service
