import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { screens } from '@higanbina/screens'
import { type NechronicaCharacter } from '@higanbina/ts/NechronicaDataHelper.ts'
import mapping from '@higanbina/ts/mapping.json'
import { thru } from 'lodash-es'
import useNechronicaLoading from '@/hooks/gameData/useNechronicaLoading.ts'
import useScreenNavigateInService from '@/hooks/useScreenNavigateInService.ts'
import { useSelectIds } from '@/hooks/useSelectIds.ts'
import { parseIntOrNull } from '@/service/common/PrimaryDataUtility.ts'

export type Filter = {
  text: string
  position: number[]
  class: number[]
}

export default function useNechronicaSearchCharacter(
  characters: NechronicaCharacter[],
) {
  const loading = useNechronicaLoading()
  const [searchParams] = useSearchParams()
  const { setScreen } = useScreenNavigateInService(screens)
  const [selectedCharacters, setSelectedCharacters] = useSelectIds()
  const [hoverCharacter, setHoverCharacter] = useState<string | null>(null)
  const [detailList, setDetailList] = useState<NechronicaCharacter[]>([])

  const filter = useMemo(() => {
    const getNumberArrayValue = (param: string) =>
      searchParams
        .getAll(param)
        .map(parseIntOrNull)
        .filter((v): v is number => v !== null)
    return {
      text: decodeURIComponent(searchParams.get('text') ?? ''),
      position: getNumberArrayValue('position'),
      class: getNumberArrayValue('class'),
    }
  }, [searchParams])

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
          // オーナー名
          if (character.owner.includes(filterText)) return true

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

  useEffect(() => {
    if (loading) return
    const list = [...selectedCharacters]
    if (hoverCharacter) {
      const index = list.indexOf(hoverCharacter)
      if (index !== -1) list.splice(index, 1)
      list.unshift(hoverCharacter)
    }
    setDetailList(
      list.flatMap((id) =>
        thru(
          characters.find((c) => c.id === id),
          (v) => (v ? [v] : []),
        ),
      ),
    )
  }, [characters, hoverCharacter, loading, selectedCharacters])

  return {
    filter,
    searchedCharacters,
    selectedCharacters,
    setSelectedCharacters,
    setHoverCharacter,
    detailList,
    setFilter: useCallback(
      (fc: (filter: Filter) => Filter) => {
        const newFilter = fc(filter)
        const queryParam: [string, string][] = []
        if (newFilter.text) {
          queryParam.push(['text', encodeURIComponent(newFilter.text)])
        }
        if (newFilter.position.length) {
          queryParam.push(
            ...newFilter.position.map(
              (p) => ['position', p.toString()] as [string, string],
            ),
          )
        }
        if (newFilter.class.length) {
          queryParam.push(
            ...newFilter.class.map(
              (p) => ['class', p.toString()] as [string, string],
            ),
          )
        }
        setScreen((v) => ({ ...v, queryParam }), { replace: true })
        setSelectedCharacters([])
      },
      [filter, setScreen, setSelectedCharacters],
    ),
  }
}
