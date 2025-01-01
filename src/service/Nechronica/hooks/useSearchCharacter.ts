import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useScreenContext } from '@/context/screenContext.ts'
import { useSelectIds } from '@/hooks/useSelectIds.ts'
import { type NechronicaCharacter } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import mapping from '@/service/Nechronica/ts/mapping.json'
import { parseIntOrNull } from '@/service/common/PrimaryDataUtility.ts'

export type Filter = {
  text: string
  position: number[]
  class: number[]
}

export function useSearchCharacter(characters: NechronicaCharacter[]) {
  const [searchParams] = useSearchParams()

  const filter = useMemo(
    () => ({
      text: decodeURIComponent(searchParams.get('text') ?? ''),
      position: searchParams
        .getAll('position')
        .map(parseIntOrNull)
        .filter((p): p is number => p !== null),
      class: searchParams
        .getAll('class')
        .map(parseIntOrNull)
        .filter((c): c is number => c !== null),
    }),
    [searchParams],
  )

  const { setScreen } = useScreenContext()
  const [selectedCharacters, setSelectedCharacters] = useSelectIds()
  const [hoverCharacter, setHoverCharacter] = useState<string | null>(null)

  const searchedCharacters = useMemo(
    () =>
      characters.filter((character) => {
        if (!filter.text && !filter.position.length && !filter.class.length)
          return true

        const { position, mainClass, subClass } = character.sheetData.basic
        if (filter.position.length && filter.position.includes(position))
          return true
        if (filter.class.length && filter.class.includes(mainClass)) return true
        if (filter.class.length && filter.class.includes(subClass)) return true

        const filterText = filter.text
        if (filterText) {
          // キャラクター名
          if (character.sheetData.basic.characterName.includes(filterText))
            return true

          // ポジション
          if (mapping.CHARACTER_POSITION[position].text.includes(filterText))
            return true

          // メインクラス
          if (mapping.CHARACTER_CLASS[mainClass].text.includes(filterText))
            return true

          // サブクラス
          if (mapping.CHARACTER_CLASS[subClass].text.includes(filterText))
            return true

          // マニューバー情報
          if (
            character.sheetData.maneuverList.some((m) => {
              if (m.name.includes(filterText)) return true
              if (m.memo.includes(filterText)) return true
              if (m.shozoku.includes(filterText)) return true
              // comment
              return false
            })
          )
            return true

          // 未練
          return character.sheetData.roiceList.some((r) =>
            r.name.includes(filterText),
          )
        }
      }),
    [characters, filter],
  )

  return {
    filter,
    setFilter: useCallback(
      (fc: (filter: Filter) => Filter) => {
        const newFilter = fc(filter)
        const queryParam: string[][] = []
        if (newFilter.text) {
          queryParam.push(['text', encodeURIComponent(newFilter.text)])
        }
        if (newFilter.position.length) {
          queryParam.push(
            ...newFilter.position.map((p) => ['position', p.toString()]),
          )
        }
        if (newFilter.class.length) {
          queryParam.push(
            ...newFilter.class.map((p) => ['class', p.toString()]),
          )
        }
        setScreen({ queryParam }, { replace: true })
        setSelectedCharacters([])
      },
      [filter, setScreen, setSelectedCharacters],
    ),
    searchedCharacters,
    selectedCharacters,
    setSelectedCharacters,
    hoverCharacter,
    setHoverCharacter,
  }
}
