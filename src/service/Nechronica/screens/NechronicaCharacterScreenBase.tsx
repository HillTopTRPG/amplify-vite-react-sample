import React, { useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  DeleteOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import {
  Button,
  Divider,
  Flex,
  type InputRef,
  Layout,
  Popover,
  Skeleton,
  theme,
  Typography,
} from 'antd'
import ScreenContainer from '@/components/layout/ScreenContainer.tsx'
import { useScreenContext } from '@/context/screen.ts'
import { useUserAttributes } from '@/context/userAttributes.ts'
import useKeyBind from '@/hooks/useKeyBind.ts'
import AffixCard from '@/service/Nechronica/components/AffixCard.tsx'
import BorderlessInput from '@/service/Nechronica/components/BorderlessInput.tsx'
import CharacterCard from '@/service/Nechronica/components/CharacterCard.tsx'
import CharacterSmallCard from '@/service/Nechronica/components/CharacterSmallCard.tsx'
import ScreenSubTitle from '@/service/Nechronica/components/ScreenSubTitle.tsx'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'
import { useSearchCharacter } from '@/service/Nechronica/hooks/useSearchCharacter.ts'
import {
  NechronicaDataHelper,
  type NechronicaType,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import { sequentialPromiseReduce } from '@/utils/process.ts'
import { typedPick } from '@/utils/types.ts'

const SEARCH_INPUT_WIDTH = 370

export default function NechronicaCharacterScreenBase({
  characterType,
  label,
  icon,
}: {
  characterType: NechronicaType
  label: string
  icon: React.FC
}) {
  const { characters, createCharacter, updateCharacter, deleteCharacter } =
    useNechronicaContext()

  const [searchParams] = useSearchParams()
  const filterPosition = searchParams.get('position')
  const filterClass = searchParams.get('class')
  console.log(
    JSON.stringify(
      {
        filterPosition,
        filterClass,
      },
      null,
      2,
    ),
  )

  const { screenSize } = useScreenContext()
  const { token } = theme.useToken()
  const { currentUser, me, currentIsMe } = useUserAttributes()

  const useCharacters = characters.filter((c) => {
    if (c.additionalData.type !== characterType) return false
    if (!currentUser) return true
    return c.owner === currentUser.userName
  })

  const sheetIdInputRef = useRef<InputRef>(null)
  const searchInputRef = useRef<InputRef>(null)
  const {
    search,
    setSearch,
    searchedCharacters,
    selectedCharacters,
    setSelectedCharacters,
    hoverCharacter,
    setHoverCharacter,
  } = useSearchCharacter(useCharacters)

  const [sheetId, setSheetId] = useState('')
  const onCreateCharacter = async (sheetId: string) => {
    setSheetId(sheetId)
    if (!currentIsMe || !me) return
    const sheetData = await NechronicaDataHelper.fetch({
      type: characterType,
      sheetId,
    })
    if (!sheetData) return

    setSheetId('')
    sheetIdInputRef?.current?.blur()
    sheetIdInputRef?.current?.focus()
    createCharacter(sheetData)
  }

  const affixContainerRef = React.useRef<HTMLDivElement>(null)

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

  const searchDivider = useMemo(
    () => (
      <Divider
        style={{
          marginLeft: 11,
          marginRight: 11,
          width: SEARCH_INPUT_WIDTH - 11 * 2,
          minWidth: 'auto',
        }}
      />
    ),
    [],
  )

  const characterCards = useMemo(() => {
    const onSelectCharacter = (id: string, isSelect: boolean) => {
      if (isSelect) {
        setSelectedCharacters([id, ...selectedCharacters])
      } else {
        setSelectedCharacters(selectedCharacters.filter((c) => c !== id))
      }
    }
    const onHoverCharacter = (id: string, isEnter: boolean) => {
      setHoverCharacter(isEnter ? id : null)
    }

    const resultList = searchedCharacters.map((character) => (
      <CharacterSmallCard
        key={character.id}
        character={character}
        selected={selectedCharacters.includes(character.id)}
        onSelect={onSelectCharacter}
        onHover={onHoverCharacter}
      />
    ))
    return resultList.length ? (
      resultList
    ) : (
      <Flex vertical align="center" style={{ width: SEARCH_INPUT_WIDTH }}>
        <Typography.Text
          style={{
            marginTop: 5,
            marginBottom: 15,
            color: token.colorTextDescription,
          }}
        >
          {useCharacters.length && !searchedCharacters.length
            ? 'Not Found'
            : 'キャラクターがまだ登録されていません'}
        </Typography.Text>
        {searchDivider}
      </Flex>
    )
  }, [
    searchedCharacters,
    token.colorTextDescription,
    useCharacters.length,
    searchDivider,
    setSelectedCharacters,
    selectedCharacters,
    setHoverCharacter,
  ])

  const onReloadSelectedCharacter = useMemo(
    () => async () => {
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
    },
    [useCharacters, selectedCharacters, setSelectedCharacters, updateCharacter],
  )

  const onDeleteSelectedCharacter = useMemo(
    () => () => {
      selectedCharacters.map((id) => {
        const character = useCharacters.find((d) => d.id === id)
        if (!character) return
        deleteCharacter(id)
      })
      setSelectedCharacters([])
    },
    [deleteCharacter, useCharacters, selectedCharacters, setSelectedCharacters],
  )

  const [isAffixed, setIsAffixed] = useState(false)

  const affixContents = useMemo(() => {
    return (
      <Flex align="center" gap={10}>
        <BorderlessInput
          value={search}
          isAffixed={isAffixed}
          width={SEARCH_INPUT_WIDTH}
          icon={<SearchOutlined />}
          placeholder="キャラクターを検索"
          shortcutKey="k"
          onChange={setSearch}
          inputRef={searchInputRef}
        />
        {currentIsMe ? (
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
        ) : null}
      </Flex>
    )
  }, [
    currentIsMe,
    isAffixed,
    onDeleteSelectedCharacter,
    onReloadSelectedCharacter,
    search,
    setSearch,
    token.colorTextPlaceholder,
  ])

  const selectedCharacterElms = useMemo(() => {
    const targetList = [...selectedCharacters]
    if (hoverCharacter) {
      const index = targetList.indexOf(hoverCharacter)
      if (index !== -1) targetList.splice(index, 1)
      targetList.unshift(hoverCharacter)
    }
    if (!targetList.length)
      return (
        <Flex vertical style={{ padding: '0 10px' }}>
          <Skeleton title paragraph={{ rows: 0 }} />
          <Skeleton.Image />
          <Skeleton round />
        </Flex>
      )
    return targetList.map((targetId) => {
      const character = useCharacters.find(({ id }) => id === targetId)
      if (!character) return null
      return <CharacterCard key={character.id} character={character} />
    })
  }, [selectedCharacters, hoverCharacter, useCharacters])

  const detailSider = useMemo(
    () => (
      <Layout.Sider
        breakpoint="md"
        reverseArrow
        width={420}
        style={{
          backgroundColor: token.colorBgElevated,
          overflow: 'hidden scroll',
          position: 'relative',
        }}
      >
        <Flex vertical align="stretch" gap={8}>
          {selectedCharacterElms}
        </Flex>
      </Layout.Sider>
    ),
    [selectedCharacterElms, token.colorBgElevated],
  )

  return (
    <Layout style={{ backgroundColor: 'transparent', height: '100%' }}>
      <Layout>
        <Layout.Content
          ref={affixContainerRef}
          style={{
            overflow: 'hidden scroll',
            position: 'relative',
          }}
        >
          <ScreenContainer title={label} icon={icon}>
            {currentIsMe ? (
              <Flex
                vertical
                align="flex-start"
                style={{ marginTop: 10, gap: 10 }}
              >
                <ScreenSubTitle title={`${label}登録`} />
                <BorderlessInput
                  value={sheetId}
                  isAffixed={false}
                  width={SEARCH_INPUT_WIDTH}
                  icon={<SearchOutlined />}
                  placeholder="キャラクター保管所のキャラクターのIDを入力"
                  onChange={onCreateCharacter}
                  inputRef={sheetIdInputRef}
                />
                {searchDivider}
              </Flex>
            ) : null}
            <AffixCard
              affixContainerRef={affixContainerRef}
              onChangeAffix={setIsAffixed}
            >
              {affixContents}
            </AffixCard>
            {searchDivider}
            <Flex
              align="flex-start"
              style={{ marginTop: 10, height: 'calc(100vh - 122px)' }}
            >
              <Flex
                align="flex-start"
                justify={screenSize.isMobile ? 'space-evenly' : 'flex-start'}
                wrap
                gap={9}
              >
                {characterCards}
              </Flex>
            </Flex>
          </ScreenContainer>
        </Layout.Content>
      </Layout>
      {screenSize.isMobile ? null : detailSider}
    </Layout>
  )
}
