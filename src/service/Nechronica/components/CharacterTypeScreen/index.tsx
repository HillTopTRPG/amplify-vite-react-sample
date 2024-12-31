import { useCallback, useEffect, useRef, useState } from 'react'
import { RadarChartOutlined } from '@ant-design/icons'
import { Divider, Flex, type InputRef, Spin } from 'antd'
import ScreenContainer from '@/components/layout/ScreenContainer.tsx'
import { useScreenContext } from '@/context/screenContext.ts'
import { useUserAttributes } from '@/context/userAttributesContext.ts'
import useKeyBind from '@/hooks/useKeyBind.ts'
import AddCharacterInput from '@/service/Nechronica/components/CharacterTypeScreen/AddCharacterInput.tsx'
import AffixCard from '@/service/Nechronica/components/CharacterTypeScreen/AffixCard.tsx'
import AffixContents from '@/service/Nechronica/components/CharacterTypeScreen/AffixContents.tsx'
import CharacterSmallCards from '@/service/Nechronica/components/CharacterTypeScreen/CharacterSmallCards.tsx'
import DetailSider from '@/service/Nechronica/components/CharacterTypeScreen/DetailSider.tsx'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'
import { useSearchCharacter } from '@/service/Nechronica/hooks/useSearchCharacter.ts'
import {
  type NechronicaCharacter,
  type NechronicaType,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

const SEARCH_INPUT_WIDTH = 370

type CharacterTypeScreenProps = { characterType: NechronicaType; label: string }
export default function CharacterTypeScreen({
  characterType,
  label,
}: CharacterTypeScreenProps) {
  const { loading, characters } = useNechronicaContext()
  const { currentUser } = useUserAttributes()

  const makeUseCharacters = useCallback(
    () =>
      characters.filter((c) => {
        if (c.additionalData.type !== characterType) return false
        if (!currentUser) return true
        return c.owner === currentUser.userName
      }),
    [characterType, characters, currentUser],
  )

  const [useCharacters, setUseCharacters] =
    useState<NechronicaCharacter[]>(makeUseCharacters)

  useEffect(() => {
    if (loading) return
    setUseCharacters(makeUseCharacters())
  }, [loading, makeUseCharacters])

  const sheetIdInputRef = useRef<InputRef>(null)
  const searchInputRef = useRef<InputRef>(null)

  const affixContainerRef = useRef<HTMLDivElement>(null)

  useKeyBind({
    key: 'k',
    metaKey: true,
    onKeyDown: () => {
      searchInputRef.current?.focus()
    },
  })

  useKeyBind({
    key: 'a',
    metaKey: true,
    onKeyDown: () => {
      sheetIdInputRef.current?.focus()
    },
  })

  // const [searchParams] = useSearchParams()
  //
  // const outputParams = () => {
  //   const filterPosition = searchParams.get('position')
  //   const filterClass = searchParams.get('class')
  //   console.log(
  //     JSON.stringify(
  //       {
  //         filterPosition,
  //         filterClass,
  //       },
  //       null,
  //       2,
  //     ),
  //   )
  // }
  // outputParams()

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
      <AddCharacterInput
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
        style={{
          marginTop: 10,
          height: 'calc(100vh - 122px)',
          alignContent: 'flex-start',
        }}
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
