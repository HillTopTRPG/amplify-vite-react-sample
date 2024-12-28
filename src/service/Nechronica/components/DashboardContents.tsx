import React, { type ReactNode } from 'react'
import { Flex, type GetProps, Tabs, Typography } from 'antd'
import { sum } from 'lodash-es'
import { useScreenContext } from '@/context/screen.ts'
import { useUserAttributes } from '@/context/userAttributes.ts'
import AbsoluteCenterText from '@/service/Nechronica/components/AbsoluteCenterText.tsx'
import CharacterTypeIcon from '@/service/Nechronica/components/CharacterTypeIcon.tsx'
import CharacterTypeItemSet from '@/service/Nechronica/components/CharacterTypeItemSet.tsx'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'
import { type NechronicaType } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

const enemies = ['savant', 'horror', 'legion'] as const

const dollConst = [
  { property: 'position', label: 'ポジション' },
  { property: 'class', label: 'クラス' },
] as const

const visualizedDollContainerStyle: React.CSSProperties = {
  position: 'relative',
  marginLeft: -10,
  width: 380,
  height: 380,
} as const

export default function DashboardContents() {
  const { scope, setScreen } = useScreenContext()
  const { characters } = useNechronicaContext()
  const { currentUser } = useUserAttributes()

  const useCharacters = characters.filter((c) => {
    if (scope === 'private') return c.owner === currentUser?.userName
    return !currentUser || c.owner === currentUser.userName
  })

  const summaryData = {
    doll: {
      position: [1, 2, 3, 4, 5, 6].map(
        (positionNum) =>
          useCharacters.filter(
            (c) =>
              c.additionalData.type === 'doll' &&
              c.sheetData.basic.position === positionNum,
          ).length,
      ),
      class: [1, 2, 3, 4, 5, 6, 7].map(
        (cls) =>
          useCharacters.flatMap((c) => {
            if (c.additionalData.type !== 'doll') return []
            const { mainClass, subClass } = c.sheetData.basic
            return [mainClass === cls, subClass === cls].filter(Boolean)
          }).length,
      ),
    },
    enemies: enemies.map(
      (type) =>
        useCharacters.filter((c) => c.additionalData.type === type).length,
    ),
  }

  const makeTitleElm = (label: string, total: string, onClick: () => void) => {
    return (
      <Typography.Title level={3} style={{ margin: 0 }}>
        <Typography.Link style={{ fontSize: 'inherit' }} onClick={onClick}>
          <Flex gap={16} align="center">
            <Typography.Text style={{ fontSize: 'inherit' }}>
              {label}
            </Typography.Text>
            <span style={{ userSelect: 'none' }}>{total}</span>
          </Flex>
        </Typography.Link>
      </Typography.Title>
    )
  }

  const makeDollProps = (
    p: 'position' | 'class',
    iconValue: number,
    num: number,
  ): GetProps<typeof CharacterTypeIcon> & { key: number } => ({
    key: iconValue,
    type: 'doll',
    [p]: iconValue,
    num,
    onClick: () => setScreen('dolls', { [p]: num.toString() }),
  })

  const makeEnemiesProps = (
    type: Exclude<NechronicaType, 'doll'>,
    num: number,
    idx: number,
  ): GetProps<typeof CharacterTypeIcon> & { key: number } => ({
    key: idx,
    type,
    num,
    onClick: () => setScreen(`${enemies[idx]}s`),
  })

  const makeStyle1 = (label: string, contents: ReactNode, idx?: number) => (
    <div style={visualizedDollContainerStyle} key={idx}>
      <AbsoluteCenterText text={label} />
      {contents}
    </div>
  )

  const makeStyle2 = (label: string, contents: ReactNode, idx?: number) => (
    <Flex vertical gap={6} key={idx}>
      <Typography.Title level={5} style={{ margin: 0 }}>
        {label}
      </Typography.Title>
      <Flex wrap style={{ width: 406 }} gap={6}>
        {contents}
      </Flex>
    </Flex>
  )

  const dollsElm1 = dollConst.map(({ property, label }, idx) =>
    makeStyle1(
      label,
      summaryData.doll[property].map((num, index) => (
        <CharacterTypeIcon {...makeDollProps(property, index + 1, num)} />
      )),
      idx,
    ),
  )

  const dollsElm2 = dollConst.map(({ property, label }, idx) =>
    makeStyle2(
      label,
      summaryData.doll[property].map((num, index) => (
        <CharacterTypeItemSet {...makeDollProps(property, index + 1, num)} />
      )),
      idx,
    ),
  )

  const enemiesElm1 = makeStyle1(
    '手駒',
    summaryData.enemies.map((num, idx) => (
      <CharacterTypeIcon {...makeEnemiesProps(enemies[idx], num, idx)} />
    )),
  )
  const enemiesElm2 = makeStyle2(
    '手駒',
    summaryData.enemies.map((num, idx) => (
      <CharacterTypeItemSet {...makeEnemiesProps(enemies[idx], num, idx)} />
    )),
  )

  const makeCharacterTabContents = (
    dollsElm: ReactNode,
    enemiesElm: ReactNode,
  ) => {
    return (
      <Flex gap={16} wrap align="stretch" justify="stretch">
        <Flex gap={16} vertical align="flex-start">
          {makeTitleElm('ドール', `${sum(summaryData.doll.position)}体`, () =>
            setScreen('dolls'),
          )}
          <Flex gap={16} wrap>
            {dollsElm}
          </Flex>
        </Flex>
        <Flex gap={16} vertical align="flex-start">
          {makeTitleElm('手駒', `${sum(summaryData.enemies)}種類`, () => {})}
          <Flex gap={16} wrap>
            {enemiesElm}
          </Flex>
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex vertical>
      <Tabs
        size="small"
        items={[
          {
            label: '見え方1',
            key: '1',
            children: makeCharacterTabContents(dollsElm1, enemiesElm1),
          },
          {
            label: '見え方2',
            key: '2',
            children: makeCharacterTabContents(dollsElm2, enemiesElm2),
          },
        ]}
        tabBarStyle={{ paddingLeft: 10 }}
      />
    </Flex>
  )
}
