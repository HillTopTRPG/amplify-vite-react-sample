import { type RefObject, useEffect, useState } from 'react'
import { RadarChartOutlined } from '@ant-design/icons'
import { Divider, Flex, type InputRef, Spin } from 'antd'
import ScreenContainer from '@/components/layout/ScreenContainer.tsx'
import { useScreenContext } from '@/context/screenContext.ts'
import AffixCard from '@/service/Nechronica/components/CharacterTypeScreen/AffixCard.tsx'
import AffixContents from '@/service/Nechronica/components/CharacterTypeScreen/AffixContents.tsx'
import CharacterIdInput from '@/service/Nechronica/components/CharacterTypeScreen/CharacterIdInput.tsx'
import CharacterSmallCards from '@/service/Nechronica/components/CharacterTypeScreen/CharacterSmallCards.tsx'
import DetailSider from '@/service/Nechronica/components/CharacterTypeScreen/DetailSider.tsx'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'
import { useSearchCharacter } from '@/service/Nechronica/hooks/useSearchCharacter.ts'
import {
  type NechronicaCharacter,
  type NechronicaType,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

const SEARCH_INPUT_WIDTH = 370

type CharacterTypeScreenContainerProps = {
  label: string
  characterType: NechronicaType
  searchInputRef: RefObject<InputRef>
  affixContainerRef: RefObject<HTMLDivElement>
  useCharacters: NechronicaCharacter[]
}
export default function CharacterTypeScreenContainer({
  label,
  characterType,
  searchInputRef,
  affixContainerRef,
  useCharacters,
}: CharacterTypeScreenContainerProps) {
  const { loading } = useNechronicaContext()
  const { screenSize } = useScreenContext()
  const [isAffixed, setIsAffixed] = useState(false)
  const {
    search,
    setSearch,
    searchedCharacters,
    selectedCharacters,
    hoverCharacter,
    setSelectedCharacters,
    setHoverCharacter,
  } = useSearchCharacter(useCharacters)

  const [detailList, setDetailList] = useState<string[]>([])

  useEffect(() => {
    const list = [...selectedCharacters]
    if (hoverCharacter) {
      const index = list.indexOf(hoverCharacter)
      if (index !== -1) list.splice(index, 1)
      list.unshift(hoverCharacter)
    }
    setDetailList(list)
  }, [hoverCharacter, selectedCharacters, setDetailList])

  if (loading)
    return (
      <ScreenContainer label={label} icon={RadarChartOutlined}>
        <Spin size="large" />
        <div
          style={{
            position: 'fixed',
            right: 0,
            top: 48,
            bottom: 0,
            width: 420,
          }}
        >
          <Spin size="large" />
        </div>
      </ScreenContainer>
    )

  return (
    <ScreenContainer label={label} icon={RadarChartOutlined}>
      <CharacterIdInput
        label={label}
        characterType={characterType}
        sheetIdInputRef={searchInputRef}
      />
      <AffixCard
        affixContainerRef={affixContainerRef}
        onChangeAffix={setIsAffixed}
      >
        <AffixContents
          search={search}
          isAffixed={isAffixed}
          onSearch={setSearch}
          searchInputRef={searchInputRef}
          selectedCharacters={selectedCharacters}
          useCharacters={useCharacters}
          setSelectedCharacters={setSelectedCharacters}
        />
      </AffixCard>

      <Divider
        style={{
          marginLeft: 11,
          marginRight: 11,
          width: SEARCH_INPUT_WIDTH - 11 * 2,
          minWidth: 'auto',
        }}
      />

      <Flex
        align="flex-start"
        justify={screenSize.isMobile ? 'space-evenly' : 'flex-start'}
        style={{ marginTop: 10, height: 'calc(100vh - 122px)' }}
        wrap
        gap={9}
      >
        <CharacterSmallCards
          searchedCharacters={searchedCharacters}
          useCharacters={useCharacters}
          selectedCharacters={selectedCharacters}
          setSelectedCharacters={setSelectedCharacters}
          setHoverCharacter={setHoverCharacter}
        />
      </Flex>
      <DetailSider detailList={detailList} />
    </ScreenContainer>
  )
}
