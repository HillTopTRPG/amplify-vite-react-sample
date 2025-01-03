import { useMemo } from 'react'
import { ClearOutlined } from '@ant-design/icons'
import { Button, Flex, List, Typography } from 'antd'
import { CharacterFilterItem } from '@/service/Nechronica/components/CharacterTypeScreen/CharacterFilterItem.tsx'

interface Props {
  getCount: (value: number) => number
  label: string
  values: number[]
  options: { label: string; value: number; src: string }[]
  onChange: (values: number[]) => void
}
export default function CharacterFilterCheck({
  getCount,
  label,
  values,
  options,
  onChange,
}: Props) {
  return useMemo(
    () => (
      <Flex vertical>
        <Flex align="center" gap={6}>
          <Typography.Text style={{ fontSize: 14 }}>{label}</Typography.Text>
          <Button
            size="small"
            icon={<ClearOutlined />}
            type="text"
            disabled={values.length === 0}
            onClick={() => onChange([])}
          >
            clear
          </Button>
        </Flex>
        <List
          grid={{ gutter: [10, 10], column: 2 }}
          dataSource={options}
          style={{ width: 338 }}
          renderItem={(d) => (
            <CharacterFilterItem
              key={d.value}
              getCount={getCount}
              values={values}
              d={d}
              onChange={onChange}
            />
          )}
        />
      </Flex>
    ),
    [getCount, label, onChange, options, values],
  )
}
