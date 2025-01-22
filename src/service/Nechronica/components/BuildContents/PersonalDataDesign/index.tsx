import { type ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { Row } from 'antd'
import SelectBasePositionItemSet from './SelectBasePositionItemSet.tsx'
import TextItemSet from './TextItemSet.tsx'
import useScreenSize from '@/hooks/useScreenSize.ts'
import {
  drawerStatusSelector,
  makingNechronicaCharacterBaseSelector,
  makingNechronicaCharacterTypeSelector,
  useSelector,
} from '@/store'
import {
  setMakingNechronicaAge,
  setMakingNechronicaCarma,
  setMakingNechronicaCharacterName,
  setMakingNechronicaEyeColor,
  setMakingNechronicaHairColor,
  setMakingNechronicaHeight,
  setMakingNechronicaShuzoku,
  setMakingNechronicaSkinColor,
  setMakingNechronicaWeight,
} from '@/store/nechronicaCharacterMakeSlice.ts'

const gridGutter: [number, number] = [5, 5] as const

const SMALL_TH = [4, 3]
const SMALL_VALUE = [8, 5]
const BIG_TH = 8
const BIG_VALUE = 16

type ItemSet =
  | [
      'text',
      'big' | 'small',
      string,
      string,
      ActionCreatorWithPayload<string, string>,
      'required',
    ]
  | [
      'text',
      'big' | 'small',
      string,
      string,
      ActionCreatorWithPayload<string, string>,
    ]
  | ['basePosition', 'big' | 'small']

export default function PersonalDataDesign() {
  const drawerStatus = useSelector(drawerStatusSelector)
  const screenSize = useScreenSize(drawerStatus)
  const characterType = useSelector(makingNechronicaCharacterTypeSelector)
  const basic = useSelector(makingNechronicaCharacterBaseSelector)

  const isWide = screenSize.viewPortWidth > 452
  const containerWidth = isWide ? 500 : 360
  const smallItemIndex = isWide ? 1 : 0

  const itemSets: ItemSet[] = [
    [
      'text',
      'big',
      'キャラクター名',
      basic.characterName,
      setMakingNechronicaCharacterName,
    ],
    ...(characterType === 'doll'
      ? ([
          ['text', 'small', '種族', basic.shuzoku, setMakingNechronicaShuzoku],
          ['text', 'small', '享年', basic.age, setMakingNechronicaAge],
          ['basePosition', 'small'],
          ['text', 'small', '身長', basic.height, setMakingNechronicaHeight],
          ['text', 'small', '体重', basic.weight, setMakingNechronicaWeight],
          ['text', 'small', '暗示', basic.carma, setMakingNechronicaCarma],
          [
            'text',
            'small',
            '髪の色',
            basic.hairColor,
            setMakingNechronicaHairColor,
          ],
          [
            'text',
            'small',
            '瞳の色',
            basic.eyeColor,
            setMakingNechronicaEyeColor,
          ],
          [
            'text',
            'small',
            '肌の色',
            basic.skinColor,
            setMakingNechronicaSkinColor,
          ],
        ] as ItemSet[])
      : []),
  ]

  return (
    <Row
      style={{ width: `${containerWidth}px`, fontSize: 12 }}
      gutter={gridGutter}
    >
      {itemSets.map(
        (
          [type, size, label, value, actionCreatorWithPayload, required],
          idx,
        ) => {
          const baseProps = {
            thSpan: size === 'big' ? BIG_TH : SMALL_TH[smallItemIndex],
            tdSpan: size === 'big' ? BIG_VALUE : SMALL_VALUE[smallItemIndex],
            required,
          }
          if (type === 'basePosition') {
            return <SelectBasePositionItemSet key={idx} {...baseProps} />
          }
          return (
            <TextItemSet
              key={idx}
              label={label!}
              value={value!}
              actionCreatorWithPayload={actionCreatorWithPayload!}
              {...baseProps}
            />
          )
        },
      )}
    </Row>
  )
}
