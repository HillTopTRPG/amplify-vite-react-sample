import React, { forwardRef, type ReactNode, type Ref, useMemo } from 'react'
import { SelectOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Button, Flex, Popover, QRCode, Space, theme, Typography } from 'antd'
import { Helmet } from 'react-helmet-async'
import { useMediaQuery } from 'react-responsive'
import { MEDIA_QUERY } from '@/const/style.ts'
import useScreenNavigateInService from '@/hooks/useScreenNavigateInService.ts'
import { type Screen } from '@/service'
import { currentUserSelector, meSelector, useSelector } from '@/store'

interface Props {
  label: string
  icon: React.FC
  screens: Record<string, Screen>
  children?: ReactNode
}
const ScreenContainer = forwardRef<HTMLElement, Props>(function Component(
  { label, icon, screens, children }: Props,
  ref: Ref<HTMLElement>,
) {
  const isMobile = useMediaQuery(MEDIA_QUERY.MOBILE)
  const { token } = theme.useToken()
  const { scope, getScreenUrl } = useScreenNavigateInService(screens)
  const me = useSelector(meSelector)
  const currentUser = useSelector(currentUserSelector)
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

  return useMemo(
    () => (
      <Flex
        vertical
        className="screen-container"
        style={{
          padding: '24px 12px',
          boxSizing: 'border-box',
          backgroundColor: token.colorBgContainer,
          minHeight: '100vh',
          position: 'relative',
        }}
        ref={ref}
      >
        <Helmet>
          <title>{label}</title>
        </Helmet>
        <Typography.Title level={3} style={{ marginTop: -12 }}>
          <Space>
            {isMobile ? React.createElement(icon) : null}
            {label}
            {scope === 'public' ? null : (
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
            )}
          </Space>
        </Typography.Title>
        {children}
      </Flex>
    ),
    [
      children,
      icon,
      isMobile,
      label,
      ref,
      scope,
      shareUrl,
      token.colorBgContainer,
    ],
  )
})

export default ScreenContainer
