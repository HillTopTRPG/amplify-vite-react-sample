import { useMemo } from 'react'
import styles from '@Nechronica/components/Hoverable.module.css'
import { SelectOutlined } from '@ant-design/icons'
import { Flex, theme, Typography } from 'antd'
import classNames from 'classnames'

interface Props {
  label: string
  total: string
  onClick?: () => void
}
export default function SectionTitle({ label, total, onClick }: Props) {
  const { token } = theme.useToken()

  return useMemo(
    () => (
      <Typography.Link
        style={{ cursor: onClick ? 'pointer' : 'default' }}
        onClick={onClick}
        className={classNames(onClick && styles.hoverable)}
      >
        <Flex gap={10} align="baseline">
          <Typography.Title level={3} style={{ margin: 0 }}>
            {label}
          </Typography.Title>
          <Typography.Title
            level={3}
            style={{
              margin: 0,
              color: onClick ? 'inherit' : token.colorLink,
              userSelect: 'none',
            }}
          >
            {total}
          </Typography.Title>
          {onClick ? <SelectOutlined style={{ fontSize: '14px' }} /> : null}
        </Flex>
      </Typography.Link>
    ),
    [label, onClick, token.colorLink, total],
  )
}
