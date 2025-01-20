import { useCallback, useMemo } from 'react'
import { useNechronicaContext } from '@Nechronica/context.ts'
import { screens } from '@Nechronica/screens'
import { type CharacterGroupRelation } from '@Nechronica/ts/NechronicaDataHelper.ts'
import { SelectOutlined } from '@ant-design/icons'
import { Empty, Flex, QRCode, Switch, theme, Typography } from 'antd'
import { clone, omit } from 'lodash-es'
import DataSmallCard from '@/components/DataSmallCard'
import DeleteConfirmButton from '@/components/DeleteConfirmButton.tsx'
import useScreenNavigateInService from '@/hooks/useScreenNavigateInService.ts'

interface Props {
  group: CharacterGroupRelation
}
export default function GroupSmallCard({ group }: Props) {
  const { token } = theme.useToken()
  const { setScreen, getScreenUrl } = useScreenNavigateInService(screens)
  const { updateCharacterGroup, deleteCharacterGroup } = useNechronicaContext()

  const toggleStared = useMemo(
    () => () => {
      const newData = clone(group)
      newData.additionalData.stared = !newData.additionalData.stared
      updateCharacterGroup(omit(newData, 'characters'))
    },
    [group, updateCharacterGroup],
  )

  const actions = useMemo(
    () => [
      <DataSmallCard.FavoriteButton toggle={toggleStared} />,
      <DataSmallCard.ShareButton />,
      <DataSmallCard.OperateButton operateType="normal" />,
    ],
    [toggleStared],
  )

  const shareUrl = useMemo(
    () =>
      getScreenUrl((v) => ({
        ...v,
        scope: 'public',
        screen: 'group',
        urlParam: group.id,
      })),
    [getScreenUrl, group.id],
  )

  const onChangeGroupPublic = useCallback(
    (nextPublic: boolean) => {
      const newValue = omit(clone(group), 'characters')
      newValue.public = nextPublic
      updateCharacterGroup(newValue)
    },
    [group, updateCharacterGroup],
  )

  return (
    <DataSmallCard
      data={group}
      cardProps={{ actions, style: { minHeight: 240 } }}
      contentsContainerProps={{
        onClick: () =>
          setScreen((v) => ({ ...v, screen: 'group', urlParam: group.id })),
      }}
      shareDrawerContents={
        <>
          <Flex align="center" gap={6}>
            <Typography.Text style={{ color: 'inherit' }}>
              <Typography.Link href={shareUrl} target="_blank">
                共有ページ
                <SelectOutlined />
              </Typography.Link>
            </Typography.Text>
            <Typography.Text
              copyable={{ format: 'text/plain', text: shareUrl }}
            />
          </Flex>
          <QRCode value={shareUrl} size={100} />
        </>
      }
      operationDrawerContents={() => (
        <Flex
          vertical
          gap={6}
          align="flex-start"
          justify="space-between"
          style={{ height: '100%' }}
        >
          <Flex align="center" gap={6}>
            <Typography.Text style={{ fontSize: 12 }}>公開</Typography.Text>
            <Switch
              checkedChildren="有効"
              unCheckedChildren="無効"
              onChange={(v) => onChangeGroupPublic(v)}
              defaultValue={group.public}
            />
          </Flex>
          <DeleteConfirmButton
            name={group.name}
            onConfirm={() => deleteCharacterGroup(group.id)}
            style={{ alignSelf: 'flex-start' }}
          />
        </Flex>
      )}
    >
      <Flex gap={6} align="baseline" style={{ marginBottom: 6, width: '100%' }}>
        <Typography.Text ellipsis style={{ fontSize: 16, color: 'inherit' }}>
          {group.name}
        </Typography.Text>
        <SelectOutlined />
      </Flex>
      {group.characters
        .filter((_, idx) => idx < 6)
        .map((c) => (
          <Typography.Text
            key={c.id}
            type="secondary"
            ellipsis
            style={{ fontSize: 12 }}
          >
            {c.name}
          </Typography.Text>
        ))}
      {group.characters.length > 6 ? (
        <Typography.Text
          style={{ color: token.colorTextDescription }}
        >{`+${group.characters.length - 6}人`}</Typography.Text>
      ) : null}
      {group.characters.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ margin: 0, alignSelf: 'center' }}
          description="Empty"
        />
      ) : null}
    </DataSmallCard>
  )
}
