import { type CSSProperties, useMemo } from 'react'
import { Flex, type GetProps, Typography } from 'antd'
import { useAppSelector } from '@/store'
import { selectTheme } from '@/store/themeSlice.ts'

const TITLE_PROPS: GetProps<typeof Typography.Title> = {
  level: 2,
  style: { paddingLeft: 24, marginBottom: 0 },
}

interface Props {
  title?: string
  texts: string[]
  style?: CSSProperties
}
export default function HomeTextBlock({ title, texts, style }: Props) {
  const theme = useAppSelector(selectTheme)

  return useMemo(() => {
    const rgb = theme === 'dark' ? 0 : 255
    const TEXT_STYLE: CSSProperties = {
      whiteSpace: 'pre-wrap',
      padding: '8px 16px 8px 16px',
      margin: '0px 24px 24px 24px',
      backgroundColor: `rgba(${rgb}, ${rgb}, ${rgb}, ${title ? 0.8 : 0.94})`,
      borderRadius: 16,
      lineHeight: 2,
    }

    return (
      <Flex
        vertical
        style={{
          backgroundColor: title
            ? `rgba(${rgb}, ${rgb}, ${rgb}, 0.8)`
            : undefined,
          borderRadius: 24,
          maxWidth: 800,
          marginBottom: title ? 24 : undefined,
          ...style,
        }}
      >
        {title ? (
          <Typography.Title {...TITLE_PROPS}>{title}</Typography.Title>
        ) : null}
        {texts.map((text, textIndex) => {
          const info: (string | string[])[] = []
          text.split('\n').forEach((line) => {
            if (line.startsWith('- ')) {
              let lastItem = info.length ? info[info.length - 1] : null
              if (!Array.isArray(lastItem)) {
                lastItem = []
                info.push(lastItem)
              }
              lastItem.push(line.replace('- ', ''))
            } else {
              info.push(line)
            }
          })
          return (
            <Flex key={textIndex} vertical style={TEXT_STYLE}>
              {info.map((item, infoIndex) => {
                if (typeof item === 'string') {
                  return <span key={`${textIndex}-${infoIndex}`}>{item}</span>
                }
                return (
                  <ul key={`${textIndex}-${infoIndex}`} style={{ margin: 0 }}>
                    {item.map((t, liIndex) => (
                      <li key={liIndex}>{t}</li>
                    ))}
                  </ul>
                )
              })}
            </Flex>
          )
        })}
      </Flex>
    )
  }, [style, texts, theme, title])
}
