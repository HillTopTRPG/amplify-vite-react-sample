import { type NechronicaBasic } from '@higanbina/ts/NechronicaDataHelper.ts'
import { Row } from 'antd'
import SelectBasePositionItemSet from './SelectBasePositionItemSet.tsx'
import TextItemSet from './TextItemSet.tsx'
import useScreenSize from '@/hooks/useScreenSize.ts'
import {
  drawerStatusSelector,
  makingNechronicaCharacterTypeSelector,
  useSelector,
} from '@/store'
import { type OnlyTypeKey } from '@/utils/types.ts'

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
      OnlyTypeKey<NechronicaBasic, string>,
      'required',
    ]
  | ['text', 'big' | 'small', string, OnlyTypeKey<NechronicaBasic, string>]
  | ['basePosition', 'big' | 'small']

export default function PersonalDataDesign() {
  const drawerStatus = useSelector(drawerStatusSelector)
  const screenSize = useScreenSize(drawerStatus)
  const characterType = useSelector(makingNechronicaCharacterTypeSelector)

  const isWide = screenSize.viewPortWidth > 452
  const containerWidth = isWide ? 500 : 360
  const smallItemIndex = isWide ? 1 : 0

  const itemSets: ItemSet[] = [
    ['text', 'big', 'キャラクター名', 'characterName', 'required'],
    ...(characterType === 'doll'
      ? ([
          ['text', 'small', '種族', 'shuzoku'],
          ['text', 'small', '享年', 'age'],
          ['basePosition', 'small'],
          ['text', 'small', '身長', 'height'],
          ['text', 'small', '体重', 'weight'],
          ['text', 'small', '暗示', 'carma'],
          ['text', 'small', '髪の色', 'hairColor'],
          ['text', 'small', '瞳の色', 'eyeColor'],
          ['text', 'small', '肌の色', 'skinColor'],
        ] as ItemSet[])
      : []),
  ]

  return (
    <Row
      style={{ width: `${containerWidth}px`, fontSize: 12 }}
      gutter={gridGutter}
    >
      {itemSets.map(([type, size, label, property, required], idx) => {
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
            property={property!}
            {...baseProps}
          />
        )
      })}
    </Row>
  )
}
