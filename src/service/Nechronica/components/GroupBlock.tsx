import { Affix, Button, Card, Flex, theme, Typography } from 'antd'
import CharacterSmallCard from '@/service/Nechronica/components/CharacterSmallCard.tsx'
import { type CharacterGroupRelation } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

export default function GroupBlock({
  group,
  onAddCharacter,
  onGroupDelete,
  onChangeGroupName,
  affixContainer,
}: {
  group: CharacterGroupRelation
  onAddCharacter: (group: CharacterGroupRelation) => void
  onGroupDelete: (group: CharacterGroupRelation) => void
  onChangeGroupName: (group: CharacterGroupRelation, name: string) => void
  affixContainer: HTMLElement
}) {
  const { token } = theme.useToken()
  return (
    <Card bordered={false} styles={{ body: { padding: 0 } }}>
      <Affix target={() => affixContainer}>
        <Flex
          align="center"
          style={{ padding: 5, backgroundColor: token.colorBgContainer }}
          gap={15}
        >
          <Typography.Title
            level={4}
            style={{ margin: '0 0 5px 0' }}
            editable={{
              onChange: (name) => {
                onChangeGroupName(group, name)
              },
            }}
          >
            {group.name}
          </Typography.Title>
          <Button
            type="dashed"
            shape="round"
            onClick={() => onAddCharacter(group)}
          >
            キャラ追加
          </Button>
          <Button
            type="dashed"
            shape="round"
            onClick={() => onGroupDelete(group)}
          >
            グループ削除
          </Button>
        </Flex>
      </Affix>
      <Flex gap={6} align="flex-start" wrap>
        {group.characters.map((c) => (
          <CharacterSmallCard
            key={c.id}
            viewType="simple"
            selected={false}
            character={c}
            onSelect={() => {}}
            onHover={() => {}}
          />
        ))}
      </Flex>
    </Card>
  )
}
