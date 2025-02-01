import { type ReactElement, useCallback, useEffect, useMemo } from 'react'
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
import { Collapse, type CollapseProps, Flex, Spin } from 'antd'
import { cloneDeep } from 'lodash-es'
import ManeuverDetailSider from '../DetailSider/ManeuverDetailSider'
import useNechronicaFilteredCharacters from '@/hooks/gameData/useNechronicaFilteredCharacters.tsx'
import useScreenNavigateInService from '@/hooks/useScreenNavigateInService.ts'
import { useAppDispatch, useAppSelector } from '@/store'
import { type ManeuverInfo } from '@/store/nechronicaSlice.ts'
import { setSelectedManeuverInfos } from '@/store/nechronicaSlice.ts'
import { selectSelectedManeuverInfos } from '@/store/nechronicaSlice.ts'
import { selectCurrentUser } from '@/store/userAttributesSlice.ts'

export default function ManeuverContents() {
  const dispatch = useAppDispatch()
  const selectedManeuverInfos = useAppSelector(selectSelectedManeuverInfos)
  const currentUser = useAppSelector(selectCurrentUser)
  const { scope } = useScreenNavigateInService(screens)

  const [loading, useCharacters] = useNechronicaFilteredCharacters()

  const getSourceManeuver = useCallback(
    (info: ManeuverInfo) => {
      return useCharacters.find((c) => c.id === info.character.id)?.sheetData
        .maneuverList[info.maneuverIndex]
    },
    [useCharacters],
  )

  useEffect(() => {
    if (loading) return
    if (
      JSON.stringify(selectedManeuverInfos.map((info) => info.maneuver)) ===
      JSON.stringify(selectedManeuverInfos.map(getSourceManeuver))
    ) {
      return
    }
    dispatch(
      setSelectedManeuverInfos(
        selectedManeuverInfos.map((info) => {
          const character = useCharacters.find(
            (c) => c.id === info.character.id,
          )
          const newInfo = cloneDeep(info)
          if (!character) return newInfo
          newInfo.maneuver =
            character.sheetData.maneuverList[info.maneuverIndex]
          return newInfo
        }),
      ),
    )
  }, [
    useCharacters,
    selectedManeuverInfos,
    getSourceManeuver,
    dispatch,
    loading,
  ])

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
        .sort((a, b) => a.maneuver.name.localeCompare(b.maneuver.name)),
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
      AllManeuvers({ loading, maneuvers, getCountDetail }),
      PositionSkillManeuvers({ maneuvers, getCountDetail }),
      ClassSkillManeuvers({ maneuvers, getCountDetail }),
      ModificationManeuvers({ maneuvers, getCountDetail }),
      MutationManeuvers({ maneuvers, getCountDetail }),
      ArmedManeuvers({ maneuvers, getCountDetail }),
      TreasureManeuvers({ maneuvers, getCountDetail }),
      BasicManeuvers({ maneuvers, getCountDetail }),
      OtherManeuvers({ maneuvers, getCountDetail }),
    ],
    [getCountDetail, loading, maneuvers],
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
    [items],
  )

  if (loading) return <Spin size="large" />
  return contents
}
