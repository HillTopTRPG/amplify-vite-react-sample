import { type RefObject } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Flex, type InputRef, Spin } from 'antd'
import BorderlessInput from './BorderlessInput.tsx'
import AffixContentsOperation from '@/service/Nechronica/components/CharacterTypeScreen/AffixContentsOperation.tsx'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'
import { type NechronicaCharacter } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

const SEARCH_INPUT_WIDTH = 370

type AffixContentsProps = {
  search: string
  isAffixed: boolean
  onSearch: (search: string) => void
  searchInputRef: RefObject<InputRef>
  selectedCharacters: string[]
  useCharacters: NechronicaCharacter[]
  setSelectedCharacters: (ids: string[]) => void
}
export default function AffixContents({
  search,
  isAffixed,
  onSearch,
  searchInputRef,
  selectedCharacters,
  useCharacters,
  setSelectedCharacters,
}: AffixContentsProps) {
  const { loading } = useNechronicaContext()
  if (loading) return <Spin size="large" />

  return (
    <Flex align="center" gap={10}>
      <BorderlessInput
        value={search}
        isAffixed={isAffixed}
        width={SEARCH_INPUT_WIDTH}
        icon={<SearchOutlined />}
        placeholder="キャラクターを検索"
        shortcutKey="k"
        onChange={onSearch}
        inputRef={searchInputRef}
      />
      <AffixContentsOperation
        selectedCharacters={selectedCharacters}
        useCharacters={useCharacters}
        setSelectedCharacters={setSelectedCharacters}
      />
    </Flex>
  )
}
