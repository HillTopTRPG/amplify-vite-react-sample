import { type CSSProperties, useState } from 'react'
import EditableRoicePopoverContent from '@higanbina/components/BuildContents/RoiceDesign/EditableRoicePopoverContent.tsx'
import {
  type NechronicaRoice,
  posSelections,
} from '@higanbina/ts/NechronicaDataHelper.ts'
import { Flex, List, Popover, theme, Typography } from 'antd'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import styles from '../../Hoverable.module.css'

const containerStyle: CSSProperties = {
  width: 160,
  height: 85,
  borderStyle: 'solid',
  borderWidth: 1,
  borderRadius: 8,
  alignItems: 'stretch',
  justifyContent: 'stretch',
  color: 'inherit',
  cursor: 'pointer',
  margin: 0,
}

const typographyStyle = (fontSize?: number) => ({
  whiteSpace: 'nowrap',
  fontSize,
  color: 'inherit',
})

interface Props {
  roice: NechronicaRoice
  index: number
}
export default function EditableRoice({ roice, index }: Props) {
  const { t: i18nT } = useTranslation()
  const { token } = theme.useToken()
  const pos = posSelections.find((s) => s.value === roice.id)
  const [open, setOpen] = useState(false)
  return (
    <Popover
      content={
        <EditableRoicePopoverContent
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
        }}
      >
        <Flex
          vertical
          className={classNames(styles.hoverable, open && styles.active)}
          style={{ padding: 8, height: '100%' }}
        >
          <Flex align="baseline" style={{ color: token.colorLink }}>
            <Typography.Text ellipsis style={typographyStyle()}>
              {roice.name}
            </Typography.Text>
            <Typography.Text style={typographyStyle(12)}>への</Typography.Text>
            <Typography.Text style={typographyStyle()}>
              {i18nT(pos?.text ?? '')}
            </Typography.Text>
          </Flex>
          <Flex vertical style={{ color: token.colorTextDescription }}>
            <Flex align="baseline">
              <Typography.Text style={typographyStyle(12)}>
                発狂:
              </Typography.Text>
              <Typography.Text style={typographyStyle(12)}>
                {i18nT(pos?.neg ?? '')}
              </Typography.Text>
            </Flex>
            <Typography.Text ellipsis style={typographyStyle(12)}>
              {roice.memo}
            </Typography.Text>
          </Flex>
        </Flex>
      </List.Item>
    </Popover>
  )
}
