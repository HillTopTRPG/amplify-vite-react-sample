import { useMemo, useState } from 'react'
import { FilterOutlined } from '@ant-design/icons'
import TextFilter from '@higanbina/components/CharacterTypeScreen/filter/TextFilter.tsx'
import { type Filter } from '@higanbina/hooks/useSearchCharacter.ts'
import { getCharacterTypeSrc, getClassSrc } from '@higanbina/index.ts'
import {
  type NechronicaCharacter,
  type NechronicaType,
} from '@higanbina/ts/NechronicaDataHelper.ts'
import mapping from '@higanbina/ts/mapping.json'
import {
  Button,
  Collapse,
  type CollapseProps,
  Flex,
  theme,
  Typography,
} from 'antd'
import CharacterFilterCheck from './CharacterFilterCheck.tsx'
import styles from './DollFilterCollapse.module.css'

interface Props {
  filter: Filter
  characterType: NechronicaType
  setFilter: (fc: (filter: Filter) => Filter) => void
  useCharacters: NechronicaCharacter[]
}
export default function DollFilterCollapse({
  filter,
  characterType,
  setFilter,
  useCharacters,
}: Props) {
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
          <Flex style={{ width: '100%' }} align="baseline" gap={10}>
            <Typography.Text style={{ whiteSpace: 'nowrap' }}>
              <FilterOutlined style={{ marginRight: 4 }} />
              フィルター
            </Typography.Text>
            <Typography.Text
              ellipsis
              style={{
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
            <TextFilter filter={filter} setFilter={setFilter} />
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
    isEmptyFilter,
    token.colorPrimary,
    filter,
    setFilter,
    collapseValue,
    useCharacters,
  ])

  return characterType === 'doll' ? elm : null
}
