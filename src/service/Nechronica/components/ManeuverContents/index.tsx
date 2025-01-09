import { type ReactElement, useCallback, useMemo, useState } from 'react'
import {
  Collapse,
  type CollapseProps,
  Empty,
  Flex,
  type FlexProps,
  Radio,
  Spin,
} from 'antd'
import { type CheckboxGroupProps } from 'antd/es/checkbox/Group'
import { v7 as uuidv7 } from 'uuid'
import { useScreenContext } from '@/context/screenContext.ts'
import { useUserAttributes } from '@/context/userAttributesContext.ts'
import { getIconClass } from '@/service/Nechronica'
import DetailSider from '@/service/Nechronica/components/ManeuverContents/DetailSider.tsx'
import ListManeuverButton from '@/service/Nechronica/components/ManeuverContents/ListManeuverButton.tsx'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'
import {
  type NechronicaCharacter,
  type NechronicaManeuver,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import mapping from '@/service/Nechronica/ts/mapping.json'

const options: CheckboxGroupProps['options'] = [
  {
    label: '自分のもの',
    value: 'own',
    style: { whiteSpace: 'nowrap' },
  },
  { label: 'サーバー内', value: 'server', style: { whiteSpace: 'nowrap' } },
] as const

const maneuverContainerProps: Omit<FlexProps, 'children'> = {
  align: 'flex-start',
  justify: 'flex-start',
  style: {
    margin: '10px 0',
    alignContent: 'flex-start',
  },
  wrap: true,
  gap: 11,
} as const

export type ManeuverInfo = {
  tempId: string
  maneuver: NechronicaManeuver
  character: NechronicaCharacter
  iconClass: string
}

const getPosition = (info: ManeuverInfo) => {
  const { position, mainClass, subClass } = info.character.sheetData.basic
  const iconClass = getIconClass(info.maneuver, position, mainClass, subClass)
  return mapping.CHARACTER_POSITION.findIndex((p) => p.val === iconClass)
}

const getClass = (info: ManeuverInfo) => {
  const { position, mainClass, subClass } = info.character.sheetData.basic
  const iconClass = getIconClass(info.maneuver, position, mainClass, subClass)
  return mapping.CHARACTER_CLASS.findIndex((p) => p.val === iconClass)
}

export default function ManeuverContents() {
  const { loading, characters } = useNechronicaContext()
  const { currentUser } = useUserAttributes()
  const { scope } = useScreenContext()
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

  const [detailList, setDetailList] = useState<ManeuverInfo[]>([])

  const onClickManeuver = useCallback(
    (info: ManeuverInfo) => {
      if (detailList.find((d) => d.tempId === info.tempId)) {
        setDetailList((prev) => prev.filter((d) => d.tempId !== info.tempId))
      } else {
        setDetailList((prev) => [info, ...prev])
      }
    },
    [detailList],
  )

  const maneuvers: ManeuverInfo[] = useMemo(
    () =>
      useCharacters
        .flatMap((character) => {
          const { position, mainClass, subClass } = character.sheetData.basic
          return character.sheetData.maneuverList.map((maneuver) => ({
            tempId: uuidv7(),
            maneuver,
            character,
            iconClass: getIconClass(maneuver, position, mainClass, subClass),
          }))
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

  const makeManeuverButtonProps = useCallback(
    (info: ManeuverInfo) => ({
      maneuver: info.maneuver,
      character: info.character,
      selected: detailList.some((d) => d.tempId === info.tempId),
      onClick: () => onClickManeuver(info),
    }),
    [detailList, onClickManeuver],
  )

  const allManeuvers = useMemo(
    () =>
      maneuvers.map((m) => (
        <ListManeuverButton key={m.tempId} {...makeManeuverButtonProps(m)} />
      )),
    [makeManeuverButtonProps, maneuvers],
  )

  const positionManeuvers = useMemo(
    () =>
      maneuvers
        .filter((m) => m.iconClass.startsWith('position-'))
        .sort((a, b) => getPosition(a) - getPosition(b))
        .map((m) => (
          <ListManeuverButton key={m.tempId} {...makeManeuverButtonProps(m)} />
        )),
    [makeManeuverButtonProps, maneuvers],
  )

  const classManeuvers = useMemo(
    () =>
      maneuvers
        .filter((m) => m.iconClass.startsWith('class-'))
        .sort((a, b) => getClass(a) - getClass(b))
        .map((m) => (
          <ListManeuverButton key={m.tempId} {...makeManeuverButtonProps(m)} />
        )),
    [makeManeuverButtonProps, maneuvers],
  )

  const modificationManeuvers = useMemo(
    () =>
      maneuvers
        .filter((m) => m.iconClass === 'maneuver-modification')
        .map((m) => (
          <ListManeuverButton key={m.tempId} {...makeManeuverButtonProps(m)} />
        )),
    [makeManeuverButtonProps, maneuvers],
  )

  const mutationManeuvers = useMemo(
    () =>
      maneuvers
        .filter((m) => m.iconClass === 'maneuver-mutation')
        .map((m) => (
          <ListManeuverButton key={m.tempId} {...makeManeuverButtonProps(m)} />
        )),
    [makeManeuverButtonProps, maneuvers],
  )

  const armedManeuvers = useMemo(
    () =>
      maneuvers
        .filter((m) => m.iconClass === 'maneuver-armed')
        .map((m) => (
          <ListManeuverButton key={m.tempId} {...makeManeuverButtonProps(m)} />
        )),
    [makeManeuverButtonProps, maneuvers],
  )

  const treasureManeuvers = useMemo(
    () =>
      maneuvers
        .filter((m) => m.iconClass === 'maneuver-treasure')
        .map((m) => (
          <ListManeuverButton key={m.tempId} {...makeManeuverButtonProps(m)} />
        )),
    [makeManeuverButtonProps, maneuvers],
  )

  const basicManeuvers = useMemo(
    () =>
      maneuvers
        .filter((m) => m.iconClass.startsWith('basic-'))
        .map((m) => (
          <ListManeuverButton key={m.tempId} {...makeManeuverButtonProps(m)} />
        )),
    [makeManeuverButtonProps, maneuvers],
  )

  const otherManeuvers = useMemo(
    () =>
      maneuvers
        .filter(
          (m) =>
            m.iconClass.startsWith('parts-') ||
            ['', 'unknown'].includes(m.iconClass),
        )
        .map((m) => (
          <ListManeuverButton key={m.tempId} {...makeManeuverButtonProps(m)} />
        )),
    [makeManeuverButtonProps, maneuvers],
  )

  const getCountDetail = useCallback(
    (elms: ReactElement[]) =>
      elms.filter((elm) => detailList.some((d) => d.tempId === elm.key)).length,
    [detailList],
  )

  const items: CollapseProps['items'] = useMemo(
    () => [
      {
        key: 'all',
        label: `全てのマニューバ(${getCountDetail(allManeuvers)}/${allManeuvers.length})`,
        children: (
          <Flex {...maneuverContainerProps}>
            {allManeuvers.length ? (
              allManeuvers
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                style={{ margin: 0, alignSelf: 'center' }}
                description="Empty"
              />
            )}
          </Flex>
        ),
      },
      {
        key: 'positionSkill',
        label: `ポジションスキル(${getCountDetail(positionManeuvers)}/${positionManeuvers.length})`,
        children: <Flex {...maneuverContainerProps}>{positionManeuvers}</Flex>,
        collapsible: positionManeuvers.length ? undefined : 'disabled',
      },
      {
        key: 'classSkill',
        label: `クラススキル(${getCountDetail(classManeuvers)}/${classManeuvers.length})`,
        children: <Flex {...maneuverContainerProps}>{classManeuvers}</Flex>,
        collapsible: classManeuvers.length ? undefined : 'disabled',
      },
      {
        key: 'modification',
        label: `改造(${getCountDetail(modificationManeuvers)}/${modificationManeuvers.length})`,
        children: (
          <Flex {...maneuverContainerProps}>{modificationManeuvers}</Flex>
        ),
        collapsible: modificationManeuvers.length ? undefined : 'disabled',
      },
      {
        key: 'mutation',
        label: `変異(${getCountDetail(mutationManeuvers)}/${mutationManeuvers.length})`,
        children: <Flex {...maneuverContainerProps}>{mutationManeuvers}</Flex>,
        collapsible: mutationManeuvers.length ? undefined : 'disabled',
      },
      {
        key: 'armed',
        label: `武装(${getCountDetail(armedManeuvers)}/${armedManeuvers.length})`,
        children: <Flex {...maneuverContainerProps}>{armedManeuvers}</Flex>,
        collapsible: armedManeuvers.length ? undefined : 'disabled',
      },
      {
        key: 'treasure',
        label: `たからもの(${getCountDetail(treasureManeuvers)}/${treasureManeuvers.length})`,
        children: <Flex {...maneuverContainerProps}>{treasureManeuvers}</Flex>,
        collapsible: treasureManeuvers.length ? undefined : 'disabled',
      },
      {
        key: 'basic',
        label: `基本パーツ(${getCountDetail(basicManeuvers)}/${basicManeuvers.length})`,
        children: <Flex {...maneuverContainerProps}>{basicManeuvers}</Flex>,
        collapsible: basicManeuvers.length ? undefined : 'disabled',
      },
      {
        key: 'other',
        label: `その他(${getCountDetail(otherManeuvers)}/${otherManeuvers.length})`,
        children: <Flex {...maneuverContainerProps}>{otherManeuvers}</Flex>,
        collapsible: otherManeuvers.length ? undefined : 'disabled',
      },
    ],
    [
      allManeuvers,
      armedManeuvers,
      basicManeuvers,
      classManeuvers,
      getCountDetail,
      modificationManeuvers,
      mutationManeuvers,
      otherManeuvers,
      positionManeuvers,
      treasureManeuvers,
    ],
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
            defaultActiveKey={['all']}
            style={{ width: '100%' }}
          />
        </Flex>
        <DetailSider detailList={detailList} />
      </>
    ),
    [detailList, items, target],
  )

  if (loading) return <Spin size="large" />
  return contents
}
