import { type CSSProperties, useState } from 'react'
import { Flex, List, Popover, theme, Typography } from 'antd'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import styles from '../../Hoverable.module.css'
import RoiceEditPopoverContent from '@/service/Nechronica/components/BuildContents/RoiceDesign/RoiceEditPopoverContent.tsx'
import {
  type NechronicaRoice,
  posSelections,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

const containerStyle: CSSProperties = {
  width: 160,
  height: 85,
  borderStyle: 'solid',
  borderWidth: 1,
  borderRadius: 8,
  alignItems: 'stretch',
  justifyContent: 'stretch',
  color: 'inherit',
  margin: 0,
}

interface Props {
  roice: NechronicaRoice
  index: number
}
export default function RoiceEdit({ roice, index }: Props) {
  const { t: i18nT } = useTranslation()
  const { token } = theme.useToken()
  const pos = posSelections.find((s) => s.value === roice.id)
  const title = (
    <Flex align="baseline" style={{ color: token.colorLink }}>
      <Typography.Text ellipsis style={{ color: 'inherit' }}>
        {roice.name}
      </Typography.Text>
      <Typography.Text
        style={{ whiteSpace: 'nowrap', fontSize: 12, color: 'inherit' }}
      >
        への
      </Typography.Text>
      <Typography.Text style={{ whiteSpace: 'nowrap', color: 'inherit' }}>
        {i18nT(pos?.text ?? '')}
      </Typography.Text>
    </Flex>
  )
  const description = (
    <Flex vertical style={{ color: token.colorTextDescription }}>
      <Flex align="baseline">
        <Typography.Text
          style={{ whiteSpace: 'nowrap', fontSize: 12, color: 'inherit' }}
        >
          発狂:
        </Typography.Text>
        <Typography.Text style={{ fontSize: 12, color: 'inherit' }}>
          {i18nT(pos?.neg ?? '')}
        </Typography.Text>
      </Flex>
      <Typography.Text ellipsis style={{ fontSize: 12, color: 'inherit' }}>
        {roice.memo}
      </Typography.Text>
    </Flex>
  )
  const [open, setOpen] = useState(false)
  return (
    <Popover
      content={
        <RoiceEditPopoverContent
          roice={roice}
          index={index}
          onDelete={() => setOpen(false)}
        />
      }
      color={token.colorBgSpotlight}
      open={open}
      onOpenChange={(v) => setOpen(v)}
      trigger={['click']}
    >
      <List.Item
        style={{
          ...containerStyle,
          backgroundColor: token.colorBgElevated,
          borderColor: token.colorBorder,
          cursor: 'pointer',
        }}
      >
        <Flex
          vertical
          className={classNames(styles.hoverable, open && styles.active)}
          style={{ padding: 8, height: '100%' }}
        >
          {title}
          {description}
        </Flex>
      </List.Item>
    </Popover>
  )
}
