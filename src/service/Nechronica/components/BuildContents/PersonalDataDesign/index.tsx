import { type Dispatch, type SetStateAction } from 'react'
import { useCharacterMakeContext } from '@Nechronica/components/BuildContents/context.ts'
import { Row } from 'antd'
import SelectBasePositionItemSet from './SelectBasePositionItemSet.tsx'
import TextItemSet from './TextItemSet.tsx'
import useScreenSize from '@/hooks/useScreenSize.ts'
import { drawerStatusSelector, useSelector } from '@/store'

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
      Dispatch<SetStateAction<string>>,
      'required',
    ]
  | ['text', 'big' | 'small', string, string, Dispatch<SetStateAction<string>>]
  | ['basePosition', 'big' | 'small']

export default function PersonalDataDesign() {
  const drawerStatus = useSelector(drawerStatusSelector)
  const screenSize = useScreenSize(drawerStatus)
  const {
    characterType,
    characterNameSet,
    tagSet,
    shuzokuSet,
    ageSet,
    heightSet,
    weightSet,
    carmaSet,
    hairColorSet,
    eyeColorSet,
    skinColorSet,
  } = useCharacterMakeContext()

  const isWide = screenSize.viewPortWidth > 452
  const containerWidth = isWide ? 500 : 360
  const smallItemIndex = isWide ? 1 : 0

  const itemSets: ItemSet[] = [
    ['text', 'big', ...characterNameSet],
    ['text', 'big', ...tagSet],
    ...(characterType === 'doll'
      ? ([
          ['text', 'small', ...shuzokuSet],
          ['text', 'small', ...ageSet],
          ['basePosition', 'small'],
          ['text', 'small', ...heightSet],
          ['text', 'small', ...weightSet],
          ['text', 'small', ...carmaSet],
          ['text', 'small', ...hairColorSet],
          ['text', 'small', ...eyeColorSet],
          ['text', 'small', ...skinColorSet],
        ] as ItemSet[])
      : []),
  ]

  return (
    <Row
      style={{ width: `${containerWidth}px`, fontSize: 12 }}
      gutter={gridGutter}
    >
      {itemSets.map(([type, size, label, value, onChange, required], idx) => {
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
            onChange={onChange!}
            {...baseProps}
          />
        )
      })}
    </Row>
  )
}
