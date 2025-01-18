import { type CSSProperties } from 'react'
import { Space, theme, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { posSelections } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

interface Props {
  roiceId: number
}
export default function RoiceInsaneView({ roiceId }: Props) {
  const { token } = theme.useToken()
  const { t: i18nT } = useTranslation()
  const pos = posSelections.find((s) => s.value === roiceId)

  const baseStyle: CSSProperties = {
    whiteSpace: 'nowrap',
    borderStyle: 'solid',
    paddingLeft: 11,
    paddingRight: 11,
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
    borderColor: token.colorBorderBg,
  } as const

  return (
    <Space.Compact direction="vertical">
      <Space.Compact style={{ alignItems: 'stretch', justifyItems: 'center' }}>
        <Typography.Text
          strong
          style={{
            ...baseStyle,
            height: token.controlHeight,
            borderWidth: '1px 0 0 1px',
            borderRadius: `${token.borderRadius}px 0 0 0`,
            fontSize: 'inherit',
          }}
        >
          発狂
        </Typography.Text>
        <Typography.Text
          style={{
            flexGrow: 1,
            ...baseStyle,
            height: token.controlHeight,
            borderWidth: '1px 1px 0 1px',
            borderRadius: `0 ${token.borderRadius}px 0 0`,
          }}
        >
          {i18nT(pos?.neg ?? '')}
        </Typography.Text>
      </Space.Compact>
      <Space.Compact
        style={{
          alignItems: 'stretch',
          justifyItems: 'center',
          overflow: 'hidden',
          maxHeight: 'auto',
        }}
      >
        <Typography.Text
          strong
          style={{
            ...baseStyle,
            minHeight: token.controlHeight,
            borderWidth: '1px 0 1px 1px',
            borderRadius: `0 0 0 ${token.borderRadius}px`,
            fontSize: 'inherit',
          }}
        >
          効果
        </Typography.Text>
        <Typography.Text
          style={{
            flexGrow: 1,
            ...baseStyle,
            alignItems: 'flex-start',
            fontSize: 11,
            minHeight: 85,
            whiteSpace: 'normal',
            borderWidth: 1,
            borderRadius: `0 0 ${token.borderRadius}px 0`,
            paddingTop: 6,
            paddingBottom: 6,
          }}
        >
          {i18nT(pos?.breakEffect ?? '')}
        </Typography.Text>
      </Space.Compact>
    </Space.Compact>
  )
}
