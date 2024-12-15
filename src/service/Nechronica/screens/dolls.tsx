import React, { useRef } from 'react'
import { DashboardOutlined } from '@ant-design/icons'
import { Divider, Flex, Input, type InputRef } from 'antd'
import type { OTPRef } from 'antd/es/input/OTP'
import { useNechronicaContext } from '../context'
import ScreenContainer from '@/components/layout/ScreenContainer.tsx'
import useKeyBind from '@/hooks/useKeyBind.ts'
import AffixCard from '@/service/Nechronica/components/AffixCard.tsx'
import CategorizedCharacterChartCol from '@/service/Nechronica/components/CategorizedCharacterChartCol.tsx'
import CharacterCard from '@/service/Nechronica/components/CharacterCard.tsx'
import InputSheetId from '@/service/Nechronica/components/InputSheetId.tsx'
import ScreenSubTitle from '@/service/Nechronica/components/ScreenSubTitle.tsx'
import { useSearchCharacter } from '@/service/Nechronica/hooks/useSearchCharacter.ts'

const label = 'ドール'
const authorize = true
const icon = DashboardOutlined
/* eslint-disable react-hooks/rules-of-hooks */
function contents() {
  const { dolls, createDoll } = useNechronicaContext()

  const sheetIdInputRef = useRef<OTPRef>(null)
  const searchInputRef = useRef<InputRef>(null)
  const { setSearch, searchedCharacters } = useSearchCharacter(dolls)

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

  return (
    <ScreenContainer title={label} icon={icon} ref={affixContainer}>
      <ScreenSubTitle title="概要" />
      <CategorizedCharacterChartCol characters={dolls} />
      <Divider />
      <Flex vertical style={{ marginBottom: 10 }}>
        <ScreenSubTitle title={`${label}追加`} memo="Ctrl + a or ⌘ + a" />
        <InputSheetId onFetchData={createDoll} inputRef={sheetIdInputRef} />
      </Flex>
      <AffixCard affixContainer={affixContainer}>
        <Flex vertical style={{ width: 213 }}>
          <ScreenSubTitle title="名前検索" memo="Ctrl + k or ⌘ + k" />
          <Input.Search onSearch={setSearch} ref={searchInputRef} />
        </Flex>
      </AffixCard>
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
