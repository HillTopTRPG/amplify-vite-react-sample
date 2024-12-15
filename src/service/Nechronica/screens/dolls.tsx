import React, { useRef, useState } from 'react'
import { DashboardOutlined } from '@ant-design/icons'
import {
  Affix,
  Card,
  Divider,
  Flex,
  Input,
  type InputRef,
  theme,
  Typography,
} from 'antd'
import type { OTPRef } from 'antd/es/input/OTP'
import { useNechronicaContext } from '../context'
import ScreenContainer from '@/components/layout/ScreenContainer.tsx'
import useKeyBind from '@/hooks/useKeyBind.ts'
import CategorizedCharacterChartCol from '@/service/Nechronica/components/CategorizedCharacterChartCol.tsx'
import CharacterCard from '@/service/Nechronica/components/CharacterCard.tsx'
import InputSheetId from '@/service/Nechronica/components/InputSheetId.tsx'
import mapping from '@/service/Nechronica/ts/mapping.json'

const label = 'ドール'
const authorize = true
const icon = DashboardOutlined
/* eslint-disable react-hooks/rules-of-hooks */
function contents() {
  const { dolls, createCharacter } = useNechronicaContext()
  const { token } = theme.useToken()

  const sheetIdInputRef = useRef<OTPRef>(null)
  const searchInputRef = useRef<InputRef>(null)
  const [search, setSearch] = useState('')

  const container = React.useRef<HTMLDivElement>(null)

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

  const searchedCharacters = dolls.filter((character) => {
    if (character.data.basic.characterName.includes(search)) return true
    const { position, mainClass, subClass } = character.data.basic
    if (mapping.CHARACTER_POSITION[position].text.includes(search)) return true
    if (mapping.CHARACTER_CLASS[mainClass].text.includes(search)) return true
    if (mapping.CHARACTER_CLASS[subClass].text.includes(search)) return true
    if (
      character.data.maneuverList.some((m) => {
        if (m.name.includes(search)) return true
        if (m.memo.includes(search)) return true
        if (m.shozoku.includes(search)) return true
        // comment
        return false
      })
    )
      return true
    if (character.data.roiceList.some((r) => r.name.includes(search)))
      return true
    // comment
    return false
  })

  return (
    <ScreenContainer title={label} icon={icon} ref={container}>
      <Typography.Title level={5}>概要</Typography.Title>
      <CategorizedCharacterChartCol characters={dolls} />
      <Divider />
      <Flex vertical style={{ marginBottom: 10 }}>
        <Typography.Title level={5} style={{ marginTop: 0 }}>
          {label}追加 (Ctrl + a or ⌘ + a)
        </Typography.Title>
        <InputSheetId
          onFetchData={createCharacter.bind(null, 'doll')}
          inputRef={sheetIdInputRef}
        />
      </Flex>
      <Affix target={() => container.current}>
        <Card
          type="inner"
          bordered={false}
          styles={{ body: { padding: '5px 0 25px 0' } }}
          style={{
            fontSize: 14,
            borderRadius: 0,
            backgroundColor: 'transparent',
            backgroundImage: `linear-gradient(180deg, ${token.colorBgContainer} calc(100% - 20px), transparent)`,
            boxShadow: 'none',
            marginTop: -1,
          }}
        >
          <Flex gap={10} wrap>
            <Flex vertical>
              <Typography.Title level={5} style={{ marginTop: 0 }}>
                名前検索 (Ctrl + k or ⌘ + k)
              </Typography.Title>
              <Input.Search onSearch={setSearch} ref={searchInputRef} />
            </Flex>
          </Flex>
        </Card>
      </Affix>
      <Flex align="flex-start" justify="start" wrap gap={6}>
        {searchedCharacters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
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
