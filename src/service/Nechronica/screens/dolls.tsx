import React, { useMemo, useReducer, useRef, useState } from 'react'
import {
  DashboardOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import {
  Button,
  Collapse,
  Dropdown,
  Flex,
  Input,
  type InputRef,
  type MenuProps,
  Switch,
  Typography,
} from 'antd'
import type { OTPRef } from 'antd/es/input/OTP'
import { useNechronicaContext } from '../context'
import ScreenContainer from '@/components/layout/ScreenContainer.tsx'
import { useScreenContext } from '@/context/screen.ts'
import useKeyBind from '@/hooks/useKeyBind.ts'
import AffixCard from '@/service/Nechronica/components/AffixCard.tsx'
import CategorizedCharacterChartCol from '@/service/Nechronica/components/CategorizedCharacterChartCol.tsx'
import CharacterCard from '@/service/Nechronica/components/CharacterCard.tsx'
import InputSheetId from '@/service/Nechronica/components/InputSheetId.tsx'
import ScreenSubTitle from '@/service/Nechronica/components/ScreenSubTitle.tsx'
import { useSearchCharacter } from '@/service/Nechronica/hooks/useSearchCharacter.ts'
import { NechronicaDataHelper } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import { sequentialPromiseReduce } from '@/utils/process.ts'

const label = 'ドール'
const authorize = true
const icon = DashboardOutlined
/* eslint-disable react-hooks/rules-of-hooks */
function contents() {
  const { dolls, createDoll, updateCharacter, deleteCharacter } =
    useNechronicaContext()
  const { screenSize } = useScreenContext()

  const sheetIdInputRef = useRef<OTPRef>(null)
  const searchInputRef = useRef<InputRef>(null)
  const { setSearch, searchedCharacters } = useSearchCharacter(dolls)
  const [detailView, toggleDetailView] = useReducer((v) => !v, true)

  const affixContainer = React.useRef<HTMLDivElement>(null)

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

  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([])

  const characterCards = useMemo(() => {
    const onSelectCharacter = (id: string, isSelect: boolean) => {
      if (isSelect) {
        setSelectedCharacters([...selectedCharacters, id])
      } else {
        setSelectedCharacters(selectedCharacters.filter((c) => c !== id))
      }
    }
    return searchedCharacters.map((character) => (
      <CharacterCard
        key={character.id}
        character={character}
        detailView={detailView}
        selected={selectedCharacters.includes(character.id)}
        onSelect={onSelectCharacter}
      />
    ))
  }, [detailView, searchedCharacters, selectedCharacters])

  const items: MenuProps['items'] = useMemo(() => {
    const onReloadSelectedCharacter = async () => {
      await sequentialPromiseReduce(selectedCharacters, async (id) => {
        const character = dolls.find((d) => d.id === id)
        if (!character) return
        const fetchData = await NechronicaDataHelper.fetch(character.sheetId)
        if (!fetchData) return
        updateCharacter(id, 'doll', fetchData)
      })
      setSelectedCharacters([])
    }

    const onDeleteSelectedCharacter = () => {
      selectedCharacters.map((id) => {
        const character = dolls.find((d) => d.id === id)
        if (!character) return
        deleteCharacter(id)
      })
      setSelectedCharacters([])
    }

    const itemInfo = [
      ['キャラクター保管所から再読み込み', onReloadSelectedCharacter],
      ['キャラクター削除', onDeleteSelectedCharacter],
    ] as const
    return itemInfo.map(([label, onClick], index) => ({
      key: index.toString(),
      label: <span onClick={onClick}>{label}</span>,
    }))
  }, [deleteCharacter, dolls, selectedCharacters, updateCharacter])

  const selectedCharacterNum = selectedCharacters.length

  const affixContents = useMemo(() => {
    return (
      <Flex align="flex-end" gap={10}>
        <Flex vertical style={{ width: 213 }}>
          <ScreenSubTitle title="名前検索" memo="Ctrl + k or ⌘ + k" />
          <Input.Search onSearch={setSearch} allowClear ref={searchInputRef} />
        </Flex>
        <Flex vertical align="flex-start" gap={3}>
          <Flex>
            <label style={{ cursor: 'pointer' }}>
              <Typography.Text style={{ marginRight: 2 }}>
                詳細:
              </Typography.Text>
              <Switch
                checked={detailView}
                checkedChildren={<EyeOutlined />}
                unCheckedChildren={<EyeInvisibleOutlined />}
                onChange={toggleDetailView}
              />
            </label>
          </Flex>
          <Dropdown
            menu={{ items }}
            placement="bottomLeft"
            forceRender
            disabled={selectedCharacterNum === 0}
          >
            <Button disabled={selectedCharacterNum === 0}>
              アクション{selectedCharacterNum}
            </Button>
          </Dropdown>
        </Flex>
      </Flex>
    )
  }, [detailView, items, selectedCharacterNum, setSearch, toggleDetailView])

  return (
    <ScreenContainer title={label} icon={icon} ref={affixContainer}>
      <Collapse
        defaultActiveKey={['1']}
        items={[
          {
            key: '1',
            label: '概要',
            children: <CategorizedCharacterChartCol characters={dolls} />,
          },
        ]}
      />
      <Flex
        vertical
        align="flex-start"
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <ScreenSubTitle title={`${label}追加`} memo="Ctrl + a or ⌘ + a" />
        <InputSheetId onFetchData={createDoll} inputRef={sheetIdInputRef} />
      </Flex>
      <AffixCard affixContainer={affixContainer}>{affixContents}</AffixCard>
      <Flex
        align="flex-start"
        justify={screenSize.isMobile ? 'space-evenly' : 'flex-start'}
        wrap
        gap={6}
      >
        {characterCards}
      </Flex>
    </ScreenContainer>
  )
}
/* eslint-enable react-hooks/rules-of-hooks */

const packed = {
  label,
  authorize,
  icon,
  contents,
}

export default packed
