import { type CSSProperties, type ReactNode, useMemo } from 'react'
import { Avatar, Badge, Card, Flex, Typography, theme as AntTheme } from 'antd'
import SinceItem from './SinceItem.tsx'
import SystemTags from './SystemTags.tsx'
import VersionItem from './VersionItem.tsx'
import { themeSelector, useSelector } from '@/store'

interface Props {
  name: string
  kana: string
  since: string
  version: string
  iconImg: string
  system: string
  features: string[]
  description: string
  badge: string
  actions?: ReactNode[]
}
export default function SystemCard({
  name,
  kana,
  since,
  version,
  iconImg,
  system,
  features,
  description,
  badge,
  actions,
}: Props) {
  const theme = useSelector(themeSelector)
  const { token } = AntTheme.useToken()

  const cardElm = useMemo(() => {
    const rgb = theme === 'dark' ? 0 : 255
    const descriptionContainerStyle: CSSProperties = {
      backgroundColor: `rgba(${rgb}, ${rgb}, ${rgb}, 0.4)`,
      borderRadius: 8,
      padding: 8,
      zIndex: 2,
    }
    const descriptionStyle: CSSProperties = {
      flexGrow: 1,
      color: token.colorTextDescription,
      fontSize: 12,
    }

    return (
      <Card
        onScrollCapture={(e) => {
          e.preventDefault()
        }}
        styles={{
          body: {
            padding: 12,
            position: 'relative',
            overflow: 'hidden',
          },
        }}
        style={{ borderColor: 'green', minWidth: 330, pointerEvents: 'auto' }}
        actions={actions}
      >
        <Avatar
          src={iconImg}
          size={200}
          style={{
            position: 'absolute',
            bottom: -35,
            right: -30,
            border: '1px solid gray',
            zIndex: 0,
            opacity: 0.6,
            backgroundColor: 'white',
            transform: 'rotateY(30deg) rotateX(-30deg) rotateZ(20deg)',
            perspective: '1000px',
          }}
        />
        <Flex vertical gap={4} align="flex-start" style={{ zIndex: 2 }}>
          <Flex
            align="center"
            gap={8}
            style={{ marginRight: 60, alignSelf: 'stretch' }}
          >
            <Typography.Title level={4} style={{ margin: 0, flexGrow: 1 }}>
              <ruby>
                {name}
                <rp>(</rp>
                <rt>{kana}</rt>
                <rp>)</rp>
              </ruby>
            </Typography.Title>
            <Flex vertical>
              <SinceItem since={since} />
              <VersionItem version={version} />
            </Flex>
          </Flex>
          <Flex vertical gap={8} align="flex-start">
            <SystemTags tags={[system]} color="cyan" />
            <SystemTags tags={features} color="green" />
            <Flex vertical align="flex-start" style={descriptionContainerStyle}>
              {description.split('\n').map((d, idx) => (
                <Typography.Text key={idx} style={descriptionStyle}>
                  {d}
                </Typography.Text>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Card>
    )
  }, [
    actions,
    description,
    features,
    iconImg,
    since,
    system,
    theme,
    token.colorTextDescription,
    name,
    kana,
    version,
  ])

  if (!badge) return cardElm
  return (
    <Badge.Ribbon text={badge} color="green">
      {cardElm}
    </Badge.Ribbon>
  )
}
