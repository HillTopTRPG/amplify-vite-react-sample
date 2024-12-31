import { useMemo } from 'react'
import { SelectOutlined } from '@ant-design/icons'
import { Badge, Card, Empty, Flex, theme, Typography } from 'antd'
import styles from '../Hoverable.module.css'
import { useScreenContext } from '@/context/screenContext.ts'
import DeleteGroupButton from '@/service/Nechronica/components/DashboardContents/DeleteGroupButton.tsx'
import GroupShareButton from '@/service/Nechronica/components/DashboardContents/GroupShareButton.tsx'
import { type CharacterGroupRelation } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

export default function GroupSmallCard({
  group,
  scope,
}: {
  group: CharacterGroupRelation
  scope: string
}) {
  const { token } = theme.useToken()
  const { setScreen } = useScreenContext()

  const actions = useMemo(
    () =>
      scope === 'private'
        ? [
            <DeleteGroupButton key={0} group={group} />,
            <GroupShareButton key={1} group={group} />,
          ]
        : undefined,
    [group, scope],
  )

  return (
    <Badge.Ribbon
      placement="start"
      text={group.public ? '公開' : '非公開'}
      color={group.public ? 'blue' : 'orange'}
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
          onClick={() => setScreen({ screen: 'groups', urlParam: group.id })}
        >
          <Flex vertical>
            <Flex gap={6} align="baseline" style={{ marginBottom: 6 }}>
              <Typography.Text
                ellipsis
                style={{ fontSize: 20, color: 'inherit' }}
              >
                {group.name}
              </Typography.Text>
              <SelectOutlined />
            </Flex>
            {group.characters
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
            {group.characters.length > 6 ? (
              <Typography.Text
                style={{ color: token.colorTextDescription }}
              >{`+${group.characters.length - 6}人`}</Typography.Text>
            ) : null}
            {group.characters.length === 0 ? (
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
}
