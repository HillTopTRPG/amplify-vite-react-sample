import screens from './screens'
import baroqueImg from '@/service/Nechronica/images/class/baroque.png'
import gothicImg from '@/service/Nechronica/images/class/gothic.png'
import psychedelicImg from '@/service/Nechronica/images/class/psychedelic.png'
import requiemImg from '@/service/Nechronica/images/class/requiem.png'
import romanesqueImg from '@/service/Nechronica/images/class/romanesque.png'
import stacyImg from '@/service/Nechronica/images/class/stacy.png'
import thanatosImg from '@/service/Nechronica/images/class/thanatos.png'
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
import unknownImg from '@/service/Nechronica/images/unknown.png'
import {
  type Nechronica,
  type NechronicaBasic,
  type NechronicaType,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import mapping from '@/service/Nechronica/ts/mapping.json'

export type NechronicaCharacter = {
  id: string
  type: NechronicaType
  sheetId: string
  data: Nechronica
}

export const PARTS_TUPLE: [string, number[]][] = [
  [partsSkillImg, [0, 1, 2, 3]],
  [partsHeadImg, [4]],
  [partsArmImg, [5]],
  [partsBodyImg, [6]],
  [partsLegImg, [7]],
] as const

export const getPositionClassName = (basic: NechronicaBasic) => {
  return [
    mapping.CHARACTER_POSITION[basic.position].val,
    mapping.CHARACTER_CLASS[basic.mainClass].val,
    mapping.CHARACTER_CLASS[basic.subClass].val,
  ]
}

export const getPositionSrc = (value: number) => {
  if (value === 1) return aliceImg
  if (value === 2) return holicImg
  if (value === 3) return automatonImg
  if (value === 4) return junkImg
  if (value === 5) return courtImg
  if (value === 6) return sororityImg
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

const service = {
  service: 'nechronica',
  serviceName: 'ネクロニカ',
  screens,
} as const

export default service
