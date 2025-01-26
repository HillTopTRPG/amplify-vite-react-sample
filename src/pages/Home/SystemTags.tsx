import { useMemo } from 'react'
import { Flex, Tag } from 'antd'
import { themeSelector, useSelector } from '@/store'

interface Props {
  tags: string[]
  color: string
}
export default function SystemTags({ tags, color }: Props) {
  const theme = useSelector(themeSelector)
  return useMemo(() => {
    const backgroundColor =
      theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'
    return (
      <Flex wrap gap="4px 8px" align="baseline" justify="flex-start">
        {tags.map((tag, index) => (
          <Tag key={index} color={color} style={{ margin: 0, backgroundColor }}>
            {tag}
          </Tag>
        ))}
      </Flex>
    )
  }, [color, tags, theme])
}
