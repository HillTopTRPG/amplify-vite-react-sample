import { useMemo, useState } from 'react'
import {
  Button,
  Collapse,
  type CollapseProps,
  Flex,
  Input,
  theme,
  Typography,
} from 'antd'
import { getCharacterTypeSrc, getClassSrc } from '@/service/Nechronica'
import CharacterFilterCheck from '@/service/Nechronica/components/CharacterTypeScreen/CharacterFilterCheck.tsx'
import styles from '@/service/Nechronica/components/CharacterTypeScreen/index.module.css'
import { type Filter } from '@/service/Nechronica/hooks/useSearchCharacter.ts'
import {
  type NechronicaCharacter,
  type NechronicaType,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import mapping from '@/service/Nechronica/ts/mapping.json'

const SEARCH_INPUT_WIDTH = 370

export default function DollFilterCollapse({
  filter,
  characterType,
  setFilter,
  useCharacters,
}: {
  filter: Filter
  characterType: NechronicaType
  setFilter: (fc: (filter: Filter) => Filter) => void
  useCharacters: NechronicaCharacter[]
}) {
  const { token } = theme.useToken()

  const isEmptyFilter =
    filter.text === '' &&
    filter.position.length === 0 &&
    filter.class.length === 0

  const [collapseValue, setCollapseValue] = useState<string[]>(
    isEmptyFilter ? [] : ['1'],
  )

  const elm = useMemo(() => {
    const items: CollapseProps['items'] = [
      {
        key: '1',
        headerClass: styles.collapseHeader,
        extra: (
          <Button
            type="text"
            size="small"
            onClick={(e) => {
              setFilter(() => ({ text: '', position: [], class: [] }))
              setCollapseValue([])
              e.stopPropagation()
            }}
            disabled={isEmptyFilter}
            style={{ pointerEvents: isEmptyFilter ? 'none' : undefined }}
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
              style={{
                marginLeft: 10,
                fontSize: 12,
                color: token.colorPrimary,
              }}
            >
              {[
                filter.text,
                ...filter.position.map(
                  (p) => mapping.CHARACTER_POSITION[p].text,
                ),
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
                options={mapping.CHARACTER_POSITION.map((p, idx) => ({
                  label: p.text,
                  value: idx,
                  src: getCharacterTypeSrc('doll', idx),
                })).filter((_, idx) => idx)}
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
                options={mapping.CHARACTER_CLASS.map((p, idx) => ({
                  label: p.text,
                  value: idx,
                  src: getClassSrc(idx),
                })).filter((_, idx) => idx)}
                getCount={(v) =>
                  useCharacters.filter((c) =>
                    [
                      c.sheetData.basic.mainClass,
                      c.sheetData.basic.subClass,
                    ].includes(v),
                  ).length
                }
                onChange={(v) =>
                  setFilter((filter) => ({ ...filter, class: v }))
                }
              />
            </Flex>
          </Flex>
        ),
      },
    ]
    return (
      <Collapse
        items={items}
        activeKey={collapseValue}
        onChange={setCollapseValue}
        size="small"
        style={{ marginTop: 10 }}
      />
    )
  }, [
    collapseValue,
    isEmptyFilter,
    filter.class,
    filter.position,
    filter.text,
    setFilter,
    token.colorPrimary,
    useCharacters,
  ])

  return characterType === 'doll' ? elm : null
}
