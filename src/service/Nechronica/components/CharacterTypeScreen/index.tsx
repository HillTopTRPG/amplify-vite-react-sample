import { useCallback, useEffect, useRef, useState } from 'react'
import { RadarChartOutlined } from '@ant-design/icons'
import {
  Button,
  Collapse,
  type CollapseProps,
  Flex,
  Input,
  type InputRef,
  Spin,
  theme,
  Typography,
} from 'antd'
import styles from './index.module.css'
import ScreenContainer from '@/components/layout/ScreenContainer.tsx'
import { useScreenContext } from '@/context/screenContext.ts'
import { useUserAttributes } from '@/context/userAttributesContext.ts'
import useKeyBind from '@/hooks/useKeyBind.ts'
import { getCharacterTypeSrc, getClassSrc } from '@/service/Nechronica'
import AddCharacterInput from '@/service/Nechronica/components/CharacterTypeScreen/AddCharacterInput.tsx'
import CharacterFilterCheck from '@/service/Nechronica/components/CharacterTypeScreen/CharacterFilterCheck.tsx'
import CharacterSmallCards from '@/service/Nechronica/components/CharacterTypeScreen/CharacterSmallCards.tsx'
import DetailSider from '@/service/Nechronica/components/CharacterTypeScreen/DetailSider.tsx'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'
import { useSearchCharacter } from '@/service/Nechronica/hooks/useSearchCharacter.ts'
import {
  type NechronicaCharacter,
  type NechronicaType,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import mapping from '@/service/Nechronica/ts/mapping.json'

const SEARCH_INPUT_WIDTH = 370

type CharacterTypeScreenProps = { characterType: NechronicaType; label: string }
export default function CharacterTypeScreen({
  characterType,
  label,
}: CharacterTypeScreenProps) {
  const { loading, characters } = useNechronicaContext()
  const { currentUser } = useUserAttributes()
  const { token } = theme.useToken()

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

  const { screenSize } = useScreenContext()
  const {
    filter,
    setFilter,
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

  const items: CollapseProps['items'] = [
    {
      key: '1',
      headerClass: styles.collapseHeader,
      extra: (
        <Button
          type="text"
          size="small"
          onClick={() => {
            setFilter(() => ({ text: '', position: [], class: [] }))
          }}
          disabled={
            filter.text === '' && filter.position.length === 0
              ? filter.class.length === 0
              : false
          }
          style={{
            pointerEvents:
              filter.text === '' &&
              filter.position.length === 0 &&
              filter.class.length === 0
                ? 'none'
                : undefined,
          }}
        >
          All Clear
        </Button>
      ),
      label: (
        <Flex style={{ width: '100%' }} align="baseline">
          <Typography.Text style={{ whiteSpace: 'nowrap' }}>
            フィルター
          </Typography.Text>
          <Typography.Text
            ellipsis
            style={{ marginLeft: 10, fontSize: 12, color: token.colorPrimary }}
          >
            {[
              filter.text,
              ...filter.position.map((p) => mapping.CHARACTER_POSITION[p].text),
              ...filter.class.map((c) => mapping.CHARACTER_CLASS[c].text),
            ]
              .filter(Boolean)
              .join(',')}
          </Typography.Text>
        </Flex>
      ),
      children: (
        <Flex vertical gap={10}>
          <Input.Search
            addonBefore="テキスト検索"
            placeholder="テキスト検索"
            style={{ maxWidth: SEARCH_INPUT_WIDTH }}
            defaultValue={filter.text}
            onSearch={(v) => setFilter((filter) => ({ ...filter, text: v }))}
          />
          <Flex wrap gap={10}>
            <CharacterFilterCheck
              label="ポジション"
              values={filter.position ?? []}
              options={mapping.CHARACTER_POSITION.filter((_, idx) => idx).map(
                (p, idx) => ({
                  label: p.text,
                  value: idx + 1,
                  src: getCharacterTypeSrc('doll', idx + 1),
                }),
              )}
              getCount={(v) =>
                useCharacters.filter((c) => c.sheetData.basic.position === v)
                  .length
              }
              onChange={(v) =>
                setFilter((filter) => ({ ...filter, position: v }))
              }
            />
            <CharacterFilterCheck
              label="クラス"
              values={filter.class ?? []}
              options={mapping.CHARACTER_CLASS.filter((_, idx) => idx).map(
                (p, idx) => ({
                  label: p.text,
                  value: idx + 1,
                  src: getClassSrc(idx + 1),
                }),
              )}
              getCount={(v) =>
                useCharacters.filter((c) =>
                  [
                    c.sheetData.basic.mainClass,
                    c.sheetData.basic.subClass,
                  ].includes(v),
                ).length
              }
              onChange={(v) => setFilter((filter) => ({ ...filter, class: v }))}
            />
          </Flex>
        </Flex>
      ),
    },
  ]

  return (
    <ScreenContainer label={label} icon={RadarChartOutlined}>
      <AddCharacterInput
        label={label}
        characterType={characterType}
        sheetIdInputRef={searchInputRef}
      />
      <Collapse
        items={items}
        defaultActiveKey={
          filter.text || filter.position.length || filter.class.length
            ? ['1']
            : []
        }
        size="small"
        style={{ marginTop: 10 }}
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
