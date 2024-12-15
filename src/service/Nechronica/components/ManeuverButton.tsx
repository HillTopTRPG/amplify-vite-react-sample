import { Flex, Typography } from 'antd'
import { getPositionClassName } from '@/service/Nechronica'
import AvatarNoBorder from '@/service/Nechronica/components/AvatarNoBorder.tsx'
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
import aliceImg from '@/service/Nechronica/images/position/alice.png'
import automatonImg from '@/service/Nechronica/images/position/automaton.png'
import courtImg from '@/service/Nechronica/images/position/court.png'
import holicImg from '@/service/Nechronica/images/position/holic.png'
import junkImg from '@/service/Nechronica/images/position/junk.png'
import sororityImg from '@/service/Nechronica/images/position/sorority.png'
import {
  type NechronicaBasic,
  type NechronicaManeuver,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import mapping from '@/service/Nechronica/ts/mapping.json'

type ManeuverButtonProps = {
  maneuver: NechronicaManeuver
  basic: NechronicaBasic
}
export default function ManeuverButton({
  maneuver,
  basic,
}: ManeuverButtonProps) {
  const getBackImg = () => {
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
  const getFrontType = () => {
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
        ...getPositionClassName(basic),
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
  return (
    <Flex vertical>
      <Typography.Text
        ellipsis
        style={{
          fontSize: 11,
          lineHeight: '11px',
          whiteSpace: 'nowrap',
          width: 47,
        }}
      >
        {maneuver.name}
      </Typography.Text>
      {/* stacked avatar */}
      <div style={{ position: 'relative', width: 53, height: 53 }}>
        <AvatarNoBorder
          src={getBackImg()}
          size={53}
          style={{ position: 'absolute' }}
        />
        <AvatarNoBorder
          src={getFrontType()}
          size={53}
          style={{ position: 'absolute' }}
        />
      </div>
    </Flex>
  )
}
