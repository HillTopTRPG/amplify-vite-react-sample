import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import AddCharacterInput from '@higanbina/components/CharacterTypeScreen/AddCharacterInput.tsx'
import CharacterSmallCards from '@higanbina/components/CharacterTypeScreen/CharacterSmallCards.tsx'
import CharacterDetailSider from '@higanbina/components/DetailSider/CharacterDetailSider'
import SponsorShip from '@higanbina/components/SponsorShip.tsx'
import { useSearchCharacter } from '@higanbina/hooks/useSearchCharacter.ts'
import { screens } from '@higanbina/screens'
import {
  type NechronicaCharacter,
  type NechronicaType,
} from '@higanbina/ts/NechronicaDataHelper.ts'
import { Flex, FloatButton, type InputRef, Spin } from 'antd'
import DollFilterCollapse from './filter/DollFilterCollapse.tsx'
import MenuImageIcon from '@/components/MenuImageIcon.tsx'
import ScreenContainer from '@/components/ScreenContainer.tsx'
import { scrollContainerContext } from '@/context/scrollContainer.ts'
import useKeyBind from '@/hooks/useKeyBind.ts'
import useScreenNavigateInService from '@/hooks/useScreenNavigateInService.ts'
import useScreenSize from '@/hooks/useScreenSize.ts'
import { getCharacterTypeSrc } from '@/service/higanbina'
import {
  currentUserSelector,
  drawerStatusSelector,
  nechronicaCharactersSelector,
  nechronicaLoadingSelector,
  useSelector,
} from '@/store'

interface Props {
  characterType: NechronicaType
  label: string
}
export default function CharacterTypeScreen({ characterType, label }: Props) {
  const loading = useSelector(nechronicaLoadingSelector)
  const characters = useSelector(nechronicaCharactersSelector)
  const currentUser = useSelector(currentUserSelector)
  const { scope } = useScreenNavigateInService(screens)
  const drawerStatus = useSelector(drawerStatusSelector)
  const screenSize = useScreenSize(drawerStatus)
  const sheetIdInputRef = useRef<InputRef>(null)
  const searchInputRef = useRef<InputRef>(null)
  const scrollContainerRef = useContext(scrollContainerContext)

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
      <ScreenContainer
        label={label}
        icon={MenuImageIcon(getCharacterTypeSrc(characterType, 1))}
        screens={screens}
      >
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
    [characterType, label],
  )

  const mainContents = useMemo(
    () => (
      <ScreenContainer
        label={label}
        icon={MenuImageIcon(getCharacterTypeSrc(characterType, 1))}
        screens={screens}
      >
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
        <CharacterDetailSider characters={detailList} />
        {scrollContainerRef?.current ? (
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
