import { Flex, Spin, theme, Typography } from 'antd'
import CharacterCard from '@/service/Nechronica/components/CharacterCard'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'
import { type NechronicaCharacter } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

interface Props {
  characters: NechronicaCharacter[]
}
export default function SelectedCharacterElm({ characters }: Props) {
  const { loading } = useNechronicaContext()
  const { token } = theme.useToken()

  if (loading) return <Spin size="large" />

  if (characters.length === 0) {
    return (
      <Flex vertical style={{ padding: '0 10px' }}>
        <Typography.Title
          level={4}
          style={{ color: token.colorTextDescription }}
        >
          キャラクタープレビュー
        </Typography.Title>
        <Typography.Text style={{ color: token.colorTextDescription }}>
          選択したキャラクターの詳細を表示します。
        </Typography.Text>
      </Flex>
    )
  }

  return characters.map((c) => <CharacterCard key={c.id} character={c} />)
}
