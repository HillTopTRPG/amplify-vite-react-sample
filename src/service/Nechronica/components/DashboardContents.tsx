import React from 'react'
import { Flex, Tabs, Typography } from 'antd'
import { sum } from 'lodash-es'
import { useScreenContext } from '@/context/screen.ts'
import AbsoluteCenterText from '@/service/Nechronica/components/AbsoluteCenterText.tsx'
import CharacterTypeIcon from '@/service/Nechronica/components/CharacterTypeIcon.tsx'
import CharacterTypeItemSet from '@/service/Nechronica/components/CharacterTypeItemSet.tsx'

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
  const { setScreen } = useScreenContext()
  const summaryData = {
    doll: {
      total: 4,
      position: [1, 2, 0, 1, 2, 0],
      class: [10, 21, 0, 1, 2, 0, 0],
    },
    enemies: [1, 0, 11],
  }

  const dollTitle = (
    <Typography.Title level={3} style={{ margin: 0 }}>
      <Typography.Link
        style={{ fontSize: 'inherit' }}
        onClick={() => setScreen('dolls')}
      >
        <Flex gap={16} align="center">
          <Typography.Text style={{ fontSize: 'inherit' }}>
            ドール
          </Typography.Text>
          <span style={{ userSelect: 'none' }}>
            {sum(summaryData.doll.position)}体
          </span>
        </Flex>
      </Typography.Link>
    </Typography.Title>
  )
  const enemiesTitle = (
    <Typography.Title level={3} style={{ margin: 0 }}>
      <Typography.Link style={{ fontSize: 'inherit' }}>
        <Flex gap={16} align="center">
          <Typography.Text style={{ fontSize: 'inherit' }}>
            手駒
          </Typography.Text>
          <span style={{ userSelect: 'none' }}>
            {sum(summaryData.enemies)}種類
          </span>
        </Flex>
      </Typography.Link>
    </Typography.Title>
  )

  const normalDollElm = dollConst.map(({ property, label }, idx) => (
    <Flex vertical gap={6} key={idx}>
      <Typography.Title level={5} style={{ margin: 0 }}>
        {label}
      </Typography.Title>
      <Flex wrap style={{ width: 406 }} gap={6}>
        {summaryData.doll[property].map((num, index) => (
          <CharacterTypeItemSet
            type="doll"
            {...{ [property]: index + 1 }}
            num={num}
            key={index}
            onClick={() =>
              setScreen('dolls', { [property]: (index + 1).toString() })
            }
          />
        ))}
      </Flex>
    </Flex>
  ))
  const visualizedDollElm = dollConst.map(({ property, label }, idx) => (
    <div style={visualizedDollContainerStyle} key={idx}>
      <AbsoluteCenterText text={label} />
      {summaryData.doll[property].map((num, index) => (
        <CharacterTypeIcon
          type="doll"
          {...{ [property]: index + 1 }}
          num={num}
          key={index}
          onClick={() =>
            setScreen('dolls', { [property]: (index + 1).toString() })
          }
        />
      ))}
    </div>
  ))

  const normalEnemiesElm = (
    <Flex vertical gap={6}>
      <Typography.Title level={5} style={{ margin: 0 }}>
        手駒
      </Typography.Title>
      <Flex>
        <Flex vertical gap={6}>
          {summaryData.enemies.map((num, idx) => (
            <CharacterTypeItemSet
              type={enemies[idx]}
              num={num}
              key={idx}
              onClick={() => setScreen(`${enemies[idx]}s`)}
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
  const visualizedEnemiesElm = (
    <div style={visualizedDollContainerStyle}>
      <AbsoluteCenterText text="手駒" />
      {summaryData.enemies.map((num, idx) => (
        <CharacterTypeIcon
          type={enemies[idx]}
          num={num}
          key={idx}
          onClick={() => setScreen(`${enemies[idx]}s`)}
        />
      ))}
    </div>
  )

  return (
    <Flex vertical>
      <Tabs
        size="small"
        items={[
          {
            label: '見え方1',
            key: '1',
            children: (
              <Flex gap={16} wrap align="stretch" justify="stretch">
                <Flex gap={16} vertical align="flex-start">
                  {dollTitle}
                  <Flex gap={16} wrap>
                    {visualizedDollElm}
                  </Flex>
                </Flex>
                <Flex gap={16} vertical align="flex-start">
                  {enemiesTitle}
                  <Flex gap={16} wrap>
                    {visualizedEnemiesElm}
                  </Flex>
                </Flex>
              </Flex>
            ),
          },
          {
            label: '見え方2',
            key: '2',
            children: (
              <Flex gap={16} wrap>
                <Flex gap={16} vertical align="flex-start">
                  {dollTitle}
                  <Flex gap={16} wrap>
                    {normalDollElm}
                  </Flex>
                </Flex>
                <Flex gap={16} vertical align="flex-start">
                  {enemiesTitle}
                  <Flex gap={16} wrap>
                    {normalEnemiesElm}
                  </Flex>
                </Flex>
              </Flex>
            ),
          },
        ]}
        tabBarStyle={{ paddingLeft: 10 }}
      />
    </Flex>
  )
}
