import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { RadarChartOutlined } from '@ant-design/icons'
import { Flex, FloatButton, type InputRef, Spin } from 'antd'
import DollFilterCollapse from './filter/DollFilterCollapse.tsx'
import ScreenContainer from '@/components/ScreenContainer.tsx'
import { useScreenContext } from '@/context/screenContext.ts'
import { useScrollContainerContext } from '@/context/scrollContainer.ts'
import { useUserAttributes } from '@/context/userAttributesContext.ts'
import useKeyBind from '@/hooks/useKeyBind.ts'
import AddCharacterInput from '@/service/Nechronica/components/CharacterTypeScreen/AddCharacterInput.tsx'
import CharacterSmallCards from '@/service/Nechronica/components/CharacterTypeScreen/CharacterSmallCards.tsx'
import CharacterDetailSider from '@/service/Nechronica/components/DetailSider/CharacterDetailSider'
import SponsorShip from '@/service/Nechronica/components/SponsorShip.tsx'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'
import { useSearchCharacter } from '@/service/Nechronica/hooks/useSearchCharacter.ts'
import {
  type NechronicaCharacter,
  type NechronicaType,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

interface Props {
  characterType: NechronicaType
  label: string
}
export default function CharacterTypeScreen({ characterType, label }: Props) {
  const { loading, characters } = useNechronicaContext()
  const { currentUser } = useUserAttributes()
  const { scope, screenSize } = useScreenContext()
  const sheetIdInputRef = useRef<InputRef>(null)
  const searchInputRef = useRef<InputRef>(null)
  const { scrollContainerRef } = useScrollContainerContext()

  const makeUseCharacters = useCallback(
    () =>
      characters.filter((c) => {
        if (c.additionalData.type !== characterType) return false
        if (scope === 'public' && !currentUser) return true
        return c.owner === currentUser?.userName
      }),
    [characterType, characters, currentUser, scope],
  )

  const [useCharacters, setUseCharacters] =
    useState<NechronicaCharacter[]>(makeUseCharacters)

  useEffect(() => {
    if (loading) return
    setUseCharacters(makeUseCharacters())
  }, [loading, makeUseCharacters])

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

  const {
    filter,
    setFilter,
    searchedCharacters,
    selectedCharacters,
    setSelectedCharacters,
    setHoverCharacter,
    detailList,
  } = useSearchCharacter(useCharacters)

  const loadingElm = useMemo(
    () => (
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
    ),
    [label],
  )

  const mainContents = useMemo(
    () => (
      <ScreenContainer label={label} icon={RadarChartOutlined}>
        <AddCharacterInput
          label={label}
          characterType={characterType}
          sheetIdInputRef={searchInputRef}
        />

        <DollFilterCollapse
          filter={filter}
          setFilter={setFilter}
          characterType={characterType}
          useCharacters={useCharacters}
        />

        <Flex
          align="flex-start"
          justify={screenSize.isMobile ? 'space-evenly' : 'flex-start'}
          style={{
            margin: '10px 0',
            alignContent: 'flex-start',
          }}
          wrap
          gap={11}
        >
          <CharacterSmallCards
            viewType="normal"
            searchedCharacters={searchedCharacters}
            useCharacters={useCharacters}
            selectedCharacters={selectedCharacters}
            setSelectedCharacters={setSelectedCharacters}
            setHoverCharacter={setHoverCharacter}
          />
        </Flex>
        <CharacterDetailSider detailList={detailList} />
        {scrollContainerRef.current ? (
          <FloatButton.BackTop
            duration={100}
            target={() => scrollContainerRef.current!}
            visibilityHeight={400}
            style={{
              position: 'sticky',
              alignSelf: 'flex-end',
              border: '3px solid orange',
            }}
          />
        ) : null}
        <SponsorShip />
      </ScreenContainer>
    ),
    [
      characterType,
      detailList,
      filter,
      label,
      screenSize.isMobile,
      scrollContainerRef,
      searchedCharacters,
      selectedCharacters,
      setFilter,
      setHoverCharacter,
      setSelectedCharacters,
      useCharacters,
    ],
  )

  return loading ? loadingElm : mainContents
}
