import { type CSSProperties, useId } from 'react'
import type { Filter } from '@Nechronica/hooks/useSearchCharacter.ts'
import { Input, Space, Typography } from 'antd'

const CONTAINER_STYLE: CSSProperties = {
  alignItems: 'stretch',
  justifyItems: 'center',
  width: '100%',
}

const LABEL_STYLE: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyItems: 'center',
}

const SEARCH_INPUT_WIDTH = 370

interface Props {
  filter: Filter
  setFilter: (fc: (filter: Filter) => Filter) => void
}

export default function TextFilter({ filter, setFilter }: Props) {
  const id = useId()
  return (
    <Space.Compact direction="vertical" style={CONTAINER_STYLE}>
      <label htmlFor={id} style={LABEL_STYLE}>
        <Typography.Text strong style={{ fontSize: 'inherit' }}>
          テキスト検索
        </Typography.Text>
      </label>
      <Input.Search
        id={id}
        placeholder="テキスト検索"
        style={{ maxWidth: SEARCH_INPUT_WIDTH }}
        defaultValue={filter.text}
        onSearch={(v) => setFilter((filter) => ({ ...filter, text: v }))}
      />
    </Space.Compact>
  )
}
