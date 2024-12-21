import { Button, Flex, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import {
  type NechronicaRoice,
  posSelections,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

const FONT_SIZE = 12

export default function RoiceButton({ roice }: { roice: NechronicaRoice }) {
  const { t: i18nT } = useTranslation()

  return (
    <Button
      size="large"
      onClick={(e) => e.stopPropagation()}
      type="default"
      style={{
        borderRadius: '1rem',
        lineHeight: '1em',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(1px)',
      }}
    >
      <Flex vertical align="flex-start" gap={3}>
        <Typography.Text
          style={{ fontSize: FONT_SIZE, lineHeight: `${FONT_SIZE}px` }}
        >
          {roice.name}
        </Typography.Text>
        <Typography.Text
          style={{ fontSize: FONT_SIZE, lineHeight: `${FONT_SIZE}px` }}
        >
          {i18nT(posSelections.at(roice.id)?.text ?? '')}
        </Typography.Text>
      </Flex>
    </Button>
  )
}
