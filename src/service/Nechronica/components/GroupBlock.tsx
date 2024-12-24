import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Affix, Button, Card, Flex, QRCode, theme, Typography } from 'antd'
import { useSelectIds } from '@/hooks/useSelectIds.ts'
import CharacterSmallCard from '@/service/Nechronica/components/CharacterSmallCard.tsx'
import { type CharacterGroupRelation } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

export default function GroupBlock({
  group,
  onAddCharacter,
  onGroupDelete,
  onChangeGroupName,
  onDeleteCharacter,
  affixContainer,
}: {
  group: CharacterGroupRelation
  onAddCharacter: () => void
  onGroupDelete: () => void
  onChangeGroupName: (name: string) => void
  onDeleteCharacter: (ids: string[]) => void
  affixContainer: HTMLElement
}) {
  const { token } = theme.useToken()

  const [selectIds, setSelectIds, onSelectCharacter] = useSelectIds()

  const onChangeGroupNameWrap = (name: string) => onChangeGroupName(name)

  const onDeleteCharacterWrap = () => {
    onDeleteCharacter(selectIds)
    setSelectIds([])
  }

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
              onChange: onChangeGroupNameWrap,
            }}
          >
            {group.name}
          </Typography.Title>
        </Flex>
      </Affix>
      <Flex gap={9} align="flex-start" wrap>
        <Flex
          vertical
          align="flex-start"
          style={{ width: 180, textAlign: 'left' }}
          gap={5}
        >
          <Typography.Text style={{ fontSize: 11, lineHeight: '18px' }}>
            キャラクター
          </Typography.Text>
          <Flex gap={5}>
            <Button
              icon={<PlusOutlined />}
              onClick={onAddCharacter}
              shape="round"
            >
              追加
            </Button>
            <Button
              icon={<MinusOutlined />}
              onClick={onDeleteCharacterWrap}
              shape="round"
              disabled={!selectIds.length}
            >
              除外
            </Button>
          </Flex>
          <Typography.Text
            style={{ fontSize: 11, lineHeight: '18px', marginTop: 5 }}
          >
            グループ
          </Typography.Text>
          <Button
            icon={<DeleteOutlined />}
            onClick={onGroupDelete}
            shape="round"
            color="danger"
            variant="filled"
          >
            削除
          </Button>
          <QRCode size={80} value={'https://www.google.com/'} />
        </Flex>
        {group.characters.map((c) => (
          <CharacterSmallCard
            key={c.id}
            viewType="simple"
            character={c}
            selected={selectIds.includes(c.id)}
            onSelect={onSelectCharacter}
            onHover={() => {}}
          />
        ))}
      </Flex>
    </Card>
  )
}
