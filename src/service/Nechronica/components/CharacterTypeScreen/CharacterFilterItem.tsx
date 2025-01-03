import { useMemo } from 'react'
import { Avatar, Checkbox, List, theme, Typography } from 'antd'
import classNames from 'classnames'
import styles from '@/service/Nechronica/components/CharacterTypeScreen/CharacterFilterCheck.module.css'

interface Props {
  getCount: (value: number) => number
  values: number[]
  d: { label: string; value: number; src: string }
  onChange: (values: number[]) => void
}
export function CharacterFilterItem({ d, values, onChange, getCount }: Props) {
  const { token } = theme.useToken()

  return useMemo(
    () => (
      <List.Item
        key={d.value}
        className={classNames(
          styles.item,
          values.includes(d.value) && styles.active,
        )}
        onClick={() => {
          if (values.includes(d.value)) {
            onChange(values.filter((v) => v !== d.value))
          } else {
            onChange([...values, d.value])
          }
        }}
        style={{
          outlineColor: token.colorBorder,
          backgroundColor: token.colorBgElevated,
        }}
      >
        <Checkbox
          checked={values.includes(d.value)}
          style={{ pointerEvents: 'none' }}
        />
        <Avatar src={d.src} size={40} style={{ margin: '0 5px' }} />
        <Typography.Text
          style={{
            fontSize: 10,
            whiteSpace: 'nowrap',
            color: 'inherit',
            flexGrow: 1,
          }}
        >
          {d.label}
        </Typography.Text>
        <Typography.Text
          style={{
            fontSize: 12,
            whiteSpace: 'nowrap',
            color: 'inherit',
            marginRight: 5,
          }}
        >
          {getCount(d.value)}
        </Typography.Text>
      </List.Item>
    ),
    [
      d.label,
      d.src,
      d.value,
      getCount,
      onChange,
      token.colorBgElevated,
      token.colorBorder,
      values,
    ],
  )
}
