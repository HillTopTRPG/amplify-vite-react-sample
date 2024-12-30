import { Flex, Skeleton, Spin } from 'antd'
import CharacterCard from '@/service/Nechronica/components/CharacterCard'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'
import { type NechronicaCharacter } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

export default function SelectedCharacterElm({
  detailList,
}: {
  detailList: string[]
}) {
  const { loading, characters } = useNechronicaContext()
  if (loading) return <Spin size="large" />
  if (detailList.length === 0)
    return (
      <Flex vertical style={{ padding: '0 10px' }}>
        <Skeleton title paragraph={{ rows: 0 }} />
        <Skeleton.Image />
        <Skeleton round />
      </Flex>
    )
  return detailList
    .map((d) => characters.find((c) => c.id === d))
    .filter((c): c is NechronicaCharacter => Boolean(c))
    .map((c) => {
      return <CharacterCard key={c.id} character={c} />
    })
}
