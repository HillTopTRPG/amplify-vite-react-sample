import { Button, Flex, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import {
  type NechronicaRoice,
  posSelections,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

export default function RoiceButton({ roice }: { roice: NechronicaRoice }) {
  const { t: i18nT } = useTranslation()

  return (
    <Button
      onClick={(e) => e.stopPropagation()}
      type="default"
      style={{ height: '3rem', borderRadius: '1rem' }}
    >
      <Flex vertical align="flex-start">
        <Typography.Text>{roice.name}</Typography.Text>
        <Typography.Text>
          {i18nT(posSelections.at(roice.id)?.text ?? '')}
        </Typography.Text>
      </Flex>
    </Button>
  )
}
