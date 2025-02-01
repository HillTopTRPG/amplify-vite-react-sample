import { useMemo } from 'react'
import { SelectOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Button, Flex, Popover, QRCode, Typography } from 'antd'
import useScreenNavigateInService from '@/hooks/useScreenNavigateInService.ts'
import type { Screen } from '@/service'
import { useAppSelector } from '@/store'
import { selectCurrentUser, selectMe } from '@/store/userAttributesSlice.ts'

interface Props {
  screens: Record<string, Screen>
}
export default function SharePageButton({ screens }: Props) {
  const { scope, getScreenUrl } = useScreenNavigateInService(screens)
  const me = useAppSelector(selectMe)
  const currentUser = useAppSelector(selectCurrentUser)
  const shareUrl = useMemo(
    () =>
      getScreenUrl((v) => ({
        ...v,
        scope: 'public',
        queryParam: [
          ['userName', currentUser?.userName ?? me?.userName ?? ''],
          ...v.queryParam.filter(([p]) => p !== 'userName'),
        ],
      })),
    [currentUser?.userName, getScreenUrl, me?.userName],
  )

  if (scope === 'public') return null

  return (
    <Popover
      title="共有"
      trigger="click"
      content={
        <Flex vertical align="flex-start" gap={6}>
          <Flex align="center" gap={6}>
            <Typography.Text style={{ color: 'inherit' }}>
              <Typography.Link href={shareUrl} target="_blank">
                共有ページのリンク
                <SelectOutlined />
              </Typography.Link>
            </Typography.Text>
            <Typography.Text
              copyable={{ format: 'text/plain', text: shareUrl }}
            />
          </Flex>
          <QRCode value={shareUrl} size={100} />
        </Flex>
      }
    >
      <Button type="text" icon={<ShareAltOutlined />} />
    </Popover>
  )
}
