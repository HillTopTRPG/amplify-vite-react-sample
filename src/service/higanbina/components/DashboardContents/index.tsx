import {
  type ReactElement,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import CharacterTabContents from '@higanbina/components/DashboardContents/CharacterTabContents.tsx'
import GroupSmallCard from '@higanbina/components/DashboardContents/GroupSmallCard.tsx'
import SectionTitle from '@higanbina/components/DashboardContents/SectionTitle.tsx'
import Style1 from '@higanbina/components/DashboardContents/Style1.tsx'
import Style2 from '@higanbina/components/DashboardContents/Style2.tsx'
import { screens } from '@higanbina/screens'
import { type NechronicaType } from '@higanbina/ts/NechronicaDataHelper.ts'
import { Flex, type GetProps, Tabs } from 'antd'
import { sum } from 'lodash-es'
import CharacterTypeIcon from './CharacterTypeIcon.tsx'
import CharacterTypeItemSet from './CharacterTypeItemSet.tsx'
import useNechronicaGroupRelations from '@/hooks/gameData/useNechronicaGroupRelations.ts'
import useNechronicaLoading from '@/hooks/gameData/useNechronicaLoading.ts'
import useScreenNavigateInService from '@/hooks/useScreenNavigateInService.ts'
import useScreenSize from '@/hooks/useScreenSize.ts'
import { useAppSelector } from '@/store'
import { selectDrawerStatus } from '@/store/drawerStatusSlice.ts'
import { selectNechronicaCharacters } from '@/store/nechronicaSlice.ts'
import { selectCurrentUser } from '@/store/userAttributesSlice.ts'

const enemies = ['savant', 'horror', 'legion'] as const

const dollConst = [
  { property: 'position', label: 'ポジション' },
  { property: 'class', label: 'クラス' },
] as const

export default function DashboardContents() {
  const loading = useNechronicaLoading()
  const characters = useAppSelector(selectNechronicaCharacters)
  const characterGroupRelations = useNechronicaGroupRelations()
  const { scope, setScreen } = useScreenNavigateInService(screens)
  const drawerStatus = useAppSelector(selectDrawerStatus)
  const screenSize = useScreenSize(drawerStatus)
  const currentUser = useAppSelector(selectCurrentUser)

  const [summaryData, setSummaryData] = useState<{
    doll: {
      position: number[]
      class: number[]
    }
    enemies: number[]
  }>({
    doll: {
      position: [1, 2, 3, 4, 5, 6].map(() => 0),
      class: [1, 2, 3, 4, 5, 6, 7].map(() => 0),
    },
    enemies: enemies.map(() => 0),
  })
  const [groupsElm, setGroupsElm] = useState<ReactElement[]>([])

  useLayoutEffect(() => {
    if (loading) return

    const dataFilterFc = ({ owner }: { owner: string }): boolean => {
      if (scope === 'public' && !currentUser) return true
      return owner === currentUser?.userName
    }

    const useCharacters = characters.filter((c) => dataFilterFc(c))
    // eslint-disable-next-line no-console
    console.log('re-make summaryData.', characters.length)
    setSummaryData({
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
            useCharacters.filter((c) => {
              if (c.additionalData.type !== 'doll') return false
              const { mainClass, subClass } = c.sheetData.basic
              return [mainClass, subClass].includes(cls)
            }).length,
        ),
      },
      enemies: enemies.map(
        (type) =>
          useCharacters.filter((c) => c.additionalData.type === type).length,
      ),
    })

    setGroupsElm(
      characterGroupRelations
        .filter((cgr) => dataFilterFc(cgr))
        .map((g) => {
          return <GroupSmallCard key={g.id} group={g} />
        }),
    )
  }, [loading, currentUser, scope, characters, characterGroupRelations])

  const toGroups = useCallback(
    () => setScreen((v) => ({ ...v, screen: 'groups' })),
    [setScreen],
  )

  return useMemo(() => {
    // eslint-disable-next-line no-console
    console.log('re-rendering dashboard(memo).')

    const makeDollProps = (
      p: 'position' | 'class',
      iconValue: number,
      num: number,
    ): GetProps<typeof CharacterTypeIcon> => ({
      type: 'doll',
      [p]: iconValue,
      num,
      onClick: () =>
        setScreen((v) => ({
          ...v,
          screen: 'dolls',
          queryParam: [...v.queryParam, [p, iconValue.toString()]],
        })),
    })

    const makeEnemiesProps = (
      type: Exclude<NechronicaType, 'doll'>,
      num: number,
      idx: number,
    ): GetProps<typeof CharacterTypeIcon> => ({
      type,
      num,
      onClick: () => setScreen((v) => ({ ...v, screen: `${enemies[idx]}s` })),
    })

    const dollStyle2Cols = (property: 'position' | 'class') => {
      if (screenSize.viewPortWidth < 612) return 2
      if (screenSize.viewPortWidth < 828) return 3
      if (property === 'position') return 2
      if (screenSize.viewPortWidth < 1034) return 2
      return 3
    }

    const enemiesStyle2Cols = () => {
      if (screenSize.viewPortWidth < 612) return 2
      if (screenSize.viewPortWidth < 1250) return 3
      return 1
    }

    return (
      <Flex vertical align="flex-start" gap={16}>
        <Tabs
          size="small"
          tabBarStyle={{ paddingLeft: 10 }}
          style={{ marginBottom: 12 }}
          items={[
            {
              label: '見え方1',
              key: '1',
              children: (
                <CharacterTabContents
                  dollsElm={dollConst.map(({ property, label }, idx) => (
                    <Style1
                      key={idx}
                      label={label}
                      height={property === 'position' ? 370 : 355}
                    >
                      {summaryData.doll[property].map((num, index) => (
                        <CharacterTypeIcon
                          key={index}
                          {...makeDollProps(property, index + 1, num)}
                        />
                      ))}
                    </Style1>
                  ))}
                  enemiesElm={
                    <Style1 label="手駒" height={300}>
                      {summaryData.enemies.map((num, idx) => (
                        <CharacterTypeIcon
                          key={idx}
                          {...makeEnemiesProps(enemies[idx], num, idx)}
                        />
                      ))}
                    </Style1>
                  }
                  dollsTotal={`${sum(summaryData.doll.position)}体`}
                  enemiesTotal={`${sum(summaryData.enemies)}種類`}
                />
              ),
            },
            {
              label: '見え方2',
              key: '2',
              children: (
                <CharacterTabContents
                  dollsElm={dollConst.map(({ property, label }, idx) => (
                    <Style2
                      key={idx}
                      label={label}
                      columns={dollStyle2Cols(property)}
                    >
                      {summaryData.doll[property].map((num, index) => (
                        <CharacterTypeItemSet
                          key={index}
                          {...makeDollProps(property, index + 1, num)}
                        />
                      ))}
                    </Style2>
                  ))}
                  enemiesElm={
                    <Style2 label="手駒" columns={enemiesStyle2Cols()}>
                      {summaryData.enemies.map((num, idx) => (
                        <CharacterTypeItemSet
                          key={idx}
                          {...makeEnemiesProps(enemies[idx], num, idx)}
                        />
                      ))}
                    </Style2>
                  }
                  dollsTotal={`${sum(summaryData.doll.position)}体`}
                  enemiesTotal={`${sum(summaryData.enemies)}種類`}
                />
              ),
            },
          ]}
        />
        <SectionTitle
          label="キャラマイリスト"
          total={`${groupsElm.length}個`}
          onClick={toGroups}
        />
      </Flex>
    )
  }, [
    summaryData.enemies,
    summaryData.doll,
    groupsElm,
    toGroups,
    setScreen,
    screenSize.viewPortWidth,
  ])
}
