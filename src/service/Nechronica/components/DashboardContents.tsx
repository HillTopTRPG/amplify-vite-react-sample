import React, { type ReactNode, useState } from 'react'
import {
  DeleteOutlined,
  PlusOutlined,
  SelectOutlined,
  ShareAltOutlined,
} from '@ant-design/icons'
import {
  Badge,
  Button,
  Card,
  Empty,
  Flex,
  type FlexProps,
  type GetProps,
  Input,
  Popconfirm,
  Popover,
  QRCode,
  Space,
  Switch,
  Tabs,
  theme,
  Typography,
} from 'antd'
import classNames from 'classnames'
import { clone, omit, sum } from 'lodash-es'
import styles from './Hoverable.module.css'
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
  const {
    characters,
    characterGroupRelations,
    createCharacterGroup,
    updateCharacterGroup,
    deleteCharacterGroup,
  } = useNechronicaContext()
  const { scope, setScreen, getScreenUrl, screenSize } = useScreenContext()
  const { currentUser } = useUserAttributes()
  const { token } = theme.useToken()

  const useFilter = ({ owner }: { owner: string }) => {
    if (scope === 'private') return owner === currentUser?.userName
    return !currentUser || owner === currentUser.userName
  }

  const useCharacters = characters.filter(useFilter)

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

  const makeTitleElm = (label: string, total: string, onClick?: () => void) => {
    return (
      <Typography.Link
        style={{ cursor: onClick ? 'pointer' : 'default' }}
        onClick={onClick}
        className={classNames(onClick && styles.hoverable)}
      >
        <Flex gap={10} align="baseline">
          <Typography.Title level={3} style={{ margin: 0 }}>
            {label}
          </Typography.Title>
          <Typography.Title
            level={3}
            style={{
              margin: 0,
              color: onClick ? 'inherit' : token.colorLink,
              userSelect: 'none',
            }}
          >
            {total}
          </Typography.Title>
          {onClick ? <SelectOutlined style={{ fontSize: '14px' }} /> : null}
        </Flex>
      </Typography.Link>
    )
  }

  const makeDollProps = (
    p: 'position' | 'class',
    iconValue: number,
    num: number,
  ): GetProps<typeof CharacterTypeIcon> => ({
    type: 'doll',
    [p]: iconValue,
    num,
    onClick: () => setScreen('dolls', { queryParam: { [p]: num.toString() } }),
  })

  const makeEnemiesProps = (
    type: Exclude<NechronicaType, 'doll'>,
    num: number,
    idx: number,
  ): GetProps<typeof CharacterTypeIcon> => ({
    type,
    num,
    onClick: () => setScreen(`${enemies[idx]}s`),
  })

  const makeStyle1 = (
    label: string,
    height: number,
    contents: ReactNode,
    idx?: number,
  ) => (
    <div
      style={{ ...visualizedDollContainerStyle, marginBottom: height - 380 }}
      key={idx}
    >
      <AbsoluteCenterText text={label} />
      {contents}
    </div>
  )

  const makeStyle2 = (
    label: string,
    columns: number,
    contents: ReactNode,
    idx?: number,
  ) => {
    const useColumns =
      screenSize.viewPortWidth < 612 ? Math.min(2, columns) : columns
    return (
      <Flex vertical gap={6} key={idx}>
        <Typography.Title level={5} style={{ margin: 0 }}>
          {label}
        </Typography.Title>
        <Flex
          wrap
          style={{ width: useColumns * 200 + (useColumns - 1) * 6 }}
          gap={6}
        >
          {contents}
        </Flex>
      </Flex>
    )
  }

  const dollsElm1 = dollConst.map(({ property, label }, idx) =>
    makeStyle1(
      label,
      property === 'position' ? 370 : 355,
      summaryData.doll[property].map((num, index) => (
        <CharacterTypeIcon
          key={index}
          {...makeDollProps(property, index + 1, num)}
        />
      )),
      idx,
    ),
  )

  const dollsElm2 = dollConst.map(({ property, label }, idx) =>
    makeStyle2(
      label,
      property === 'position' ? 2 : 3,
      summaryData.doll[property].map((num, index) => (
        <CharacterTypeItemSet
          key={index}
          {...makeDollProps(property, index + 1, num)}
        />
      )),
      idx,
    ),
  )

  const enemiesElm1 = makeStyle1(
    '手駒',
    300,
    summaryData.enemies.map((num, idx) => (
      <CharacterTypeIcon
        key={idx}
        {...makeEnemiesProps(enemies[idx], num, idx)}
      />
    )),
  )
  const enemiesElm2 = makeStyle2(
    '手駒',
    1,
    summaryData.enemies.map((num, idx) => (
      <CharacterTypeItemSet
        key={idx}
        {...makeEnemiesProps(enemies[idx], num, idx)}
      />
    )),
  )

  const makeCharacterTabContents = (
    dollsElm: ReactNode,
    enemiesElm: ReactNode,
  ) => {
    const containerProps: Omit<FlexProps, 'children'> = {
      gap: 4,
      vertical: true,
      align: 'flex-start',
      style: { overflow: 'hidden' },
    }
    return (
      <Flex gap={16} wrap align="stretch" justify="stretch">
        <Flex {...containerProps}>
          {makeTitleElm('ドール', `${sum(summaryData.doll.position)}体`, () =>
            setScreen('dolls'),
          )}
          <Flex gap={16} wrap>
            {dollsElm}
          </Flex>
        </Flex>
        <Flex {...containerProps}>
          {makeTitleElm('手駒', `${sum(summaryData.enemies)}種類`)}
          <Flex gap={16} wrap>
            {enemiesElm}
          </Flex>
        </Flex>
      </Flex>
    )
  }

  const onDeleteGroup = (id: string) => {
    deleteCharacterGroup(id)
  }

  const onChangeGroupPublic = (groupId: string, nextPublic: boolean) => {
    const oldGroup = characterGroupRelations.find((g) => g.id === groupId)
    if (!oldGroup) return
    const newValue = omit(clone(oldGroup), 'characters')
    newValue.public = nextPublic
    updateCharacterGroup(newValue)
  }

  const groupsElm = characterGroupRelations.filter(useFilter).map((g) => {
    const shareUrl = getScreenUrl('groups', { scope: 'public', urlParam: g.id })
    const actions =
      scope === 'private'
        ? [
            <Popconfirm
              title={`${g.name}を削除します。`}
              description="この操作は元に戻せません。"
              onConfirm={() => onDeleteGroup(g.id)}
              trigger="click"
            >
              <Button key={0} type="text" danger icon={<DeleteOutlined />} />
            </Popconfirm>,

            <Popover
              title="シェア"
              trigger="click"
              content={
                <Flex vertical align="flex-start" gap={6}>
                  <Switch
                    checkedChildren="有効"
                    unCheckedChildren="無効"
                    onChange={(v) => onChangeGroupPublic(g.id, v)}
                    defaultValue={g.public}
                  />
                  <Flex align="center" gap={6}>
                    <Typography.Text style={{ color: 'inherit' }}>
                      <Typography.Link href={shareUrl} target="_blank">
                        シェアページのリンク
                        <SelectOutlined />
                      </Typography.Link>
                    </Typography.Text>
                    <Typography.Text
                      copyable={{ format: 'text/plain', text: shareUrl }}
                    />
                  </Flex>
                  <QRCode value={shareUrl} size={100} />
                </Flex>
              }
            >
              <Button key={1} type="text" icon={<ShareAltOutlined />} />
            </Popover>,
          ]
        : undefined
    return (
      <Badge.Ribbon
        key={g.id}
        placement="start"
        text={g.public ? '公開' : '非公開'}
        color={g.public ? 'blue' : 'orange'}
        style={{ display: 'flex' }}
      >
        <Card
          styles={{
            body: {
              padding: '5px 0 0 0',
              flexGrow: 1,
            },
          }}
          bordered={false}
          style={{
            width: 180,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow:
              'rgba(127, 127, 127, 0.16) 0px 6px 16px 0px, rgba(127, 127, 127, 0.24) 0px 3px 6px -4px, rgba(127, 127, 127, 0.1) 0px 9px 28px 8px',
          }}
          actions={actions}
        >
          <Typography.Link
            ellipsis
            className={styles.hoverable}
            style={{
              display: 'block',
              padding: '30px 16px 16px 16px',
              width: '100%',
              height: '100%',
            }}
            onClick={() => setScreen('groups', { urlParam: g.id })}
          >
            <Flex vertical>
              <Flex gap={6} align="baseline" style={{ marginBottom: 6 }}>
                <Typography.Text
                  ellipsis
                  style={{ fontSize: 20, color: 'inherit' }}
                >
                  {g.name}あああああああああああああ
                </Typography.Text>
                <SelectOutlined />
              </Flex>
              {g.characters
                .filter((_, idx) => idx < 6)
                .map((c) => (
                  <Typography.Text
                    key={c.id}
                    ellipsis
                    style={{ color: token.colorTextDescription }}
                  >
                    {c.name}
                  </Typography.Text>
                ))}
              {g.characters.length > 6 ? (
                <Typography.Text
                  style={{ color: token.colorTextDescription }}
                >{`+${g.characters.length - 6}人`}</Typography.Text>
              ) : null}
              {g.characters.length === 0 ? (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  style={{ margin: 0 }}
                  description="Empty"
                />
              ) : null}
            </Flex>
          </Typography.Link>
        </Card>
      </Badge.Ribbon>
    )
  })

  const [newGroupName, setNewGroupName] = useState('')
  const onCreateCharacterGroup = () => {
    if (composition) return
    if (!newGroupName.trim()) return
    createCharacterGroup({
      name: newGroupName,
      characterIds: [],
    })
    setNewGroupName('')
  }

  // 入力の変換モードの管理
  const [composition, setComposition] = useState(false)

  return (
    <Flex vertical align="flex-start" gap={16}>
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
        style={{ marginBottom: 12 }}
      />
      {makeTitleElm('キャラクターグループ', `${groupsElm.length}個`)}
      {scope === 'private' ? (
        <Space.Compact size="large">
          <Input
            prefix={<PlusOutlined />}
            value={newGroupName}
            placeholder="追加するグループの名前"
            onPressEnter={onCreateCharacterGroup}
            onCompositionStart={() => setComposition(true)}
            onCompositionEnd={() => setComposition(false)}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
          <Button type="default" onClick={onCreateCharacterGroup}>
            追加
          </Button>
        </Space.Compact>
      ) : null}
      <Flex gap={18} align="stretch" wrap>
        {groupsElm}
      </Flex>
    </Flex>
  )
}
