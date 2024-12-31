import { useMemo } from 'react'
import { SelectOutlined, StarFilled, StarOutlined } from '@ant-design/icons'
import { Button, Empty, Flex, theme, Typography } from 'antd'
import { clone, omit } from 'lodash-es'
import styles from '../Hoverable.module.css'
import DeleteConfirmButton from '@/components/DeleteConfirmButton.tsx'
import PublicCard from '@/components/PublicCard.tsx'
import { useScreenContext } from '@/context/screenContext.ts'
import GroupShareButton from '@/service/Nechronica/components/DashboardContents/GroupShareButton.tsx'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'
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
    () =>
      scope === 'private'
        ? [
            <DeleteConfirmButton
              key={0}
              name={group.name}
              onConfirm={() => deleteCharacterGroup(group.id)}
            />,
            <Button
              key={1}
              type="text"
              onClick={toggleStared}
              icon={
                group.additionalData.stared ? <StarFilled /> : <StarOutlined />
              }
            />,
            <GroupShareButton key={2} group={group} />,
          ]
        : undefined,
    [deleteCharacterGroup, group, scope, toggleStared],
  )

  return (
    <PublicCard data={group} cardProps={{ actions }}>
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
    </PublicCard>
  )
}
