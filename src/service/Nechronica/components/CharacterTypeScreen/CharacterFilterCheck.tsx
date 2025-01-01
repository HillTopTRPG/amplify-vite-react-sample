import { ClearOutlined } from '@ant-design/icons'
import { Avatar, Button, Checkbox, Flex, List, theme, Typography } from 'antd'
import classNames from 'classnames'
import styles from './CharacterFilterCheck.module.css'

export default function CharacterFilterCheck({
  getCount,
  label,
  values,
  options,
  onChange,
}: {
  getCount: (value: number) => number
  label: string
  values: number[]
  options: { label: string; value: number; src: string }[]
  onChange: (values: number[]) => void
}) {
  const { token } = theme.useToken()
  return (
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
        )}
      />
    </Flex>
  )
}
