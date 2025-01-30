import {
  type ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import AllManeuvers from '@higanbina/components/ManeuverContents/AllManeuvers.tsx'
import ArmedManeuvers from '@higanbina/components/ManeuverContents/ArmedManeuvers.tsx'
import BasicManeuvers from '@higanbina/components/ManeuverContents/BasicManeuvers.tsx'
import ClassSkillManeuvers from '@higanbina/components/ManeuverContents/ClassSkillManeuvers.tsx'
import ModificationManeuvers from '@higanbina/components/ManeuverContents/ModificationManeuvers.tsx'
import MutationManeuvers from '@higanbina/components/ManeuverContents/MutationManeuvers.tsx'
import OtherManeuvers from '@higanbina/components/ManeuverContents/OtherManeuvers.tsx'
import PositionSkillManeuvers from '@higanbina/components/ManeuverContents/PositionSkillManeuvers.tsx'
import TreasureManeuvers from '@higanbina/components/ManeuverContents/TreasureManeuvers.tsx'
import { getIconClass } from '@higanbina/index.ts'
import { screens } from '@higanbina/screens'
import { Collapse, type CollapseProps, Flex, Radio, Spin } from 'antd'
import { type CheckboxGroupProps } from 'antd/es/checkbox/Group'
import { cloneDeep } from 'lodash-es'
import ManeuverDetailSider from '../DetailSider/ManeuverDetailSider'
import useScreenNavigateInService from '@/hooks/useScreenNavigateInService.ts'
import { useAppDispatch, useAppSelector } from '@/store'
import { type ManeuverInfo } from '@/store/nechronicaSlice.ts'
import { setSelectedManeuverInfos } from '@/store/nechronicaSlice.ts'
import {
  selectNechronicaCharacters,
  selectNechronicaLoading,
  selectSelectedManeuverInfos,
} from '@/store/nechronicaSlice.ts'
import { selectCurrentUser } from '@/store/userAttributesSlice.ts'

const options: CheckboxGroupProps['options'] = [
  {
    label: '自分のもの',
    value: 'own',
    style: { whiteSpace: 'nowrap' },
  },
  { label: 'サーバー内', value: 'server', style: { whiteSpace: 'nowrap' } },
] as const

export default function ManeuverContents() {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectNechronicaLoading)
  const characters = useAppSelector(selectNechronicaCharacters)
  const selectedManeuverInfos = useAppSelector(selectSelectedManeuverInfos)
  const currentUser = useAppSelector(selectCurrentUser)
  const { scope } = useScreenNavigateInService(screens)
  const [target, setTarget] = useState<'own' | 'server'>('own')

  const useCharacters = useMemo(
    () =>
      characters.filter((c) => {
        if (scope === 'public' && !currentUser) return true
        if (target === 'server') return true
        return c.owner === currentUser?.userName
      }),
    [characters, currentUser, scope, target],
  )

  const getSourceManeuver = useCallback(
    (info: ManeuverInfo) => {
      return characters.find((c) => c.id === info.character.id)?.sheetData
        .maneuverList[info.maneuverIndex]
    },
    [characters],
  )

  useEffect(() => {
    if (
      JSON.stringify(selectedManeuverInfos.map((info) => info.maneuver)) ===
      JSON.stringify(selectedManeuverInfos.map(getSourceManeuver))
    ) {
      return
    }
    dispatch(
      setSelectedManeuverInfos(
        selectedManeuverInfos.map((info) => {
          const character = characters.find((c) => c.id === info.character.id)
          const newInfo = cloneDeep(info)
          if (!character) return newInfo
          newInfo.maneuver =
            character.sheetData.maneuverList[info.maneuverIndex]
          return newInfo
        }),
      ),
    )
  }, [characters, selectedManeuverInfos, getSourceManeuver, dispatch])

  const maneuvers: ManeuverInfo[] = useMemo(
    () =>
      useCharacters
        .flatMap((character) => {
          const { position, mainClass, subClass } = character.sheetData.basic
          return character.sheetData.maneuverList.map(
            (maneuver, index): ManeuverInfo => ({
              maneuver,
              maneuverIndex: index,
              character,
              iconClass: getIconClass(maneuver, position, mainClass, subClass),
            }),
          )
        })
        .filter((data) => {
          return !(
            data.maneuver.isUnknown &&
            (scope === 'public' ||
              data.character.owner !== currentUser?.userName)
          )
        })
        .sort((a, b) => {
          const aName = a.maneuver.name
          const bName = b.maneuver.name
          if (aName < bName) return -1
          if (aName > bName) return 1
          return 0
        }),
    [currentUser?.userName, scope, useCharacters],
  )

  const getCountDetail = useCallback(
    (elms: ReactElement[]) =>
      elms.filter((elm) =>
        selectedManeuverInfos.some(
          (m) => `${m.character.id}-${m.maneuverIndex}` === elm.key,
        ),
      ).length,
    [selectedManeuverInfos],
  )

  const items: CollapseProps['items'] = useMemo(
    () => [
      AllManeuvers({ maneuvers, getCountDetail }),
      PositionSkillManeuvers({ maneuvers, getCountDetail }),
      ClassSkillManeuvers({ maneuvers, getCountDetail }),
      ModificationManeuvers({ maneuvers, getCountDetail }),
      MutationManeuvers({ maneuvers, getCountDetail }),
      ArmedManeuvers({ maneuvers, getCountDetail }),
      TreasureManeuvers({ maneuvers, getCountDetail }),
      BasicManeuvers({ maneuvers, getCountDetail }),
      OtherManeuvers({ maneuvers, getCountDetail }),
    ],
    [maneuvers, getCountDetail],
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
          <Radio.Group
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            options={options}
            defaultValue="own"
            optionType="button"
            buttonStyle="solid"
          />
          <Collapse
            items={items}
            size="small"
            defaultActiveKey={['all']}
            style={{ width: '100%' }}
          />
        </Flex>
        <ManeuverDetailSider />
      </>
    ),
    [items, target],
  )

  if (loading) return <Spin size="large" />
  return contents
}
