import { useEffect, useMemo, useState } from 'react'
import {
  Button,
  Collapse,
  type CollapseProps,
  Flex,
  type FlexProps,
  Input,
  Spin,
} from 'antd'
import BasicDesign from './BasicDesign'
import CharacterTypeRadioGroup from './CharacterTypeRadioGroup.tsx'
import PersonalDataDesign from './PersonalDataDesign'
import { useCharacterMakeContext } from './context.ts'
import ManeuverDesign from '@/service/Nechronica/components/BuildContents/ManeuverDesign'
import RoiceDesign from '@/service/Nechronica/components/BuildContents/RoiceDesign'
import CharacterDetailSider from '@/service/Nechronica/components/DetailSider/CharacterDetailSider'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'

const maneuverContainerProps: Omit<FlexProps, 'children'> = {
  align: 'flex-start',
  justify: 'flex-start',
  style: {
    alignContent: 'flex-start',
  },
  wrap: true,
  gap: 8,
} as const

const dollOnlyCollapseKeys = ['basic', 'roice']

export default function BuildContents() {
  const { loading } = useNechronicaContext()
  const {
    makingNechronicaCharacter,
    characterType,
    memo,
    setMemo,
    addRoice,
    setManeuvers,
    addManeuver,
  } = useCharacterMakeContext()

  const [collapseKeys, setCollapseKeys] = useState<string[]>([])

  useEffect(() => {
    if (
      characterType !== 'doll' &&
      collapseKeys.filter((key) => dollOnlyCollapseKeys.includes(key)).length
    ) {
      setCollapseKeys((collapseKeys) =>
        collapseKeys.filter((key) => !dollOnlyCollapseKeys.includes(key)),
      )
    }
  }, [characterType, collapseKeys])

  const items: CollapseProps['items'] = useMemo(
    () => [
      {
        key: 'basic',
        label: '基本設計',
        children: (
          <Flex {...maneuverContainerProps}>
            <BasicDesign />
          </Flex>
        ),
        collapsible: characterType === 'doll' ? undefined : 'disabled',
      },
      {
        key: 'maneuver',
        label: 'マニューバ',
        children: (
          <Flex {...maneuverContainerProps}>
            <ManeuverDesign />
          </Flex>
        ),
        extra: (
          <>
            <Button
              type="text"
              size="small"
              onClick={(e) => {
                addManeuver()
                e.stopPropagation()
              }}
            >
              新規追加
            </Button>
            <Button
              type="text"
              size="small"
              onClick={(e) => {
                setManeuvers([])
                e.stopPropagation()
              }}
            >
              All clear
            </Button>
          </>
        ),
      },
      {
        key: 'roice',
        label: '未練',
        children: (
          <Flex {...maneuverContainerProps}>
            <RoiceDesign />
          </Flex>
        ),
        collapsible: characterType === 'doll' ? undefined : 'disabled',
        extra:
          characterType === 'doll' ? (
            <Button
              type="text"
              size="small"
              onClick={(e) => {
                addRoice()
                e.stopPropagation()
              }}
            >
              新規追加
            </Button>
          ) : undefined,
      },
      {
        key: 'personalData',
        label: 'パーソナルデータ',
        children: (
          <Flex {...maneuverContainerProps}>
            <PersonalDataDesign />
          </Flex>
        ),
      },
      {
        key: 'memo',
        label: 'メモ',
        children: (
          <Flex {...maneuverContainerProps}>
            <Input.TextArea
              placeholder="改行可能"
              autoSize={{ minRows: 3 }}
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </Flex>
        ),
      },
    ],
    [addManeuver, addRoice, characterType, memo, setManeuvers, setMemo],
  )

  const contents = useMemo(
    () => (
      <>
        <Flex
          align="flex-start"
          justify="flex-start"
          style={{
            margin: '10px 0',
            alignContent: 'flex-start',
          }}
          wrap
          gap={11}
        >
          <CharacterTypeRadioGroup />
          <Collapse
            items={items}
            size="small"
            activeKey={collapseKeys}
            destroyInactivePanel={true}
            onChange={setCollapseKeys}
            style={{ width: '100%' }}
          />
        </Flex>
        <CharacterDetailSider characters={[makingNechronicaCharacter]} />
      </>
    ),
    [collapseKeys, items, makingNechronicaCharacter],
  )

  if (loading) return <Spin size="large" />
  return contents
}
