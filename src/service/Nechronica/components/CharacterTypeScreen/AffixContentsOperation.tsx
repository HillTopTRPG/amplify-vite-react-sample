import { DeleteOutlined, ReloadOutlined } from '@ant-design/icons'
import { Button, Flex, Popover, Spin, theme, Typography } from 'antd'
import { useUserAttributes } from '@/context/userAttributesContext.ts'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'
import {
  type NechronicaCharacter,
  NechronicaDataHelper,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import { sequentialPromiseReduce } from '@/utils/process.ts'
import { typedPick } from '@/utils/types.ts'

type AffixContentsOperationProps = {
  selectedCharacters: string[]
  useCharacters: NechronicaCharacter[]
  setSelectedCharacters: (ids: string[]) => void
}
export default function AffixContentsOperation({
  selectedCharacters,
  useCharacters,
  setSelectedCharacters,
}: AffixContentsOperationProps) {
  const { loading, updateCharacter, deleteCharacter } = useNechronicaContext()
  const { currentIsMe } = useUserAttributes()

  if (!currentIsMe) return
  if (loading) return <Spin size="large" />

  const { token } = theme.useToken()

  const onReloadSelectedCharacter = async () => {
    await sequentialPromiseReduce(selectedCharacters, async (id) => {
      const character = useCharacters.find((d) => d.id === id)
      if (!character) return
      const fetchData = await NechronicaDataHelper.fetch(
        character.additionalData,
      )
      if (!fetchData) return
      updateCharacter({
        ...character,
        ...typedPick(fetchData, 'name', 'sheetData'),
      })
    })
    setSelectedCharacters([])
  }

  const onDeleteSelectedCharacter = () => {
    selectedCharacters.map((id) => {
      const character = useCharacters.find((d) => d.id === id)
      if (!character) return
      deleteCharacter(id)
    })
    setSelectedCharacters([])
  }

  return (
    <Flex vertical style={{ backgroundColor: 'transparent' }}>
      <Typography.Text
        style={{ color: token.colorTextPlaceholder, fontSize: 10 }}
      >
        まとめて操作
      </Typography.Text>
      <Flex gap={8} style={{ pointerEvents: 'all' }}>
        <Popover content="選択キャラクターをキャラクター保管所からリロード">
          <Button
            icon={<ReloadOutlined />}
            type="primary"
            shape="circle"
            onClick={onReloadSelectedCharacter}
          />
        </Popover>
        <Popover content="選択キャラクターを削除">
          <Button
            icon={<DeleteOutlined />}
            type="primary"
            shape="circle"
            danger
            onClick={onDeleteSelectedCharacter}
          />
        </Popover>
      </Flex>
    </Flex>
  )
}
