import { useState } from 'react'
import { type NechronicaCharacter } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import mapping from '@/service/Nechronica/ts/mapping.json'

export function useSearchCharacter(characters: NechronicaCharacter[]) {
  const [search, setSearch] = useState('')
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([])
  const [hoverCharacter, setHoverCharacter] = useState<string | null>(null)

  const searchedCharacters = characters.filter((character) => {
    if (character.sheetData.basic.characterName.includes(search)) return true
    const { position, mainClass, subClass } = character.sheetData.basic
    if (mapping.CHARACTER_POSITION[position].text.includes(search)) return true
    if (mapping.CHARACTER_CLASS[mainClass].text.includes(search)) return true
    if (mapping.CHARACTER_CLASS[subClass].text.includes(search)) return true
    if (
      character.sheetData.maneuverList.some((m) => {
        if (m.name.includes(search)) return true
        if (m.memo.includes(search)) return true
        if (m.shozoku.includes(search)) return true
        // comment
        return false
      })
    )
      return true
    if (character.sheetData.roiceList.some((r) => r.name.includes(search)))
      return true
    // comment
    return false
  })

  return {
    search,
    searchedCharacters,
    setSearch: (search: string) => {
      setSearch(search)
      setSelectedCharacters([])
    },
    selectedCharacters,
    setSelectedCharacters,
    hoverCharacter,
    setHoverCharacter,
  }
}
