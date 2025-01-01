import React, { forwardRef, type ReactNode, type Ref, useMemo } from 'react'
import { SelectOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Button, Flex, Popover, QRCode, Space, theme, Typography } from 'antd'
import { useMediaQuery } from 'react-responsive'
import { MEDIA_QUERY } from '@/const/style.ts'
import { useScreenContext } from '@/context/screenContext.ts'
import { useUserAttributes } from '@/context/userAttributesContext.ts'

type ComponentProps = {
  label: string
  icon: React.FC
  children?: ReactNode
}
/* eslint-disable react-hooks/rules-of-hooks */
function component(
  { label, icon, children }: ComponentProps,
  ref: Ref<HTMLDivElement>,
) {
  const isMobile = useMediaQuery(MEDIA_QUERY.MOBILE)
  const { token } = theme.useToken()
  const { scope, getScreenUrl } = useScreenContext()
  const { me, currentUser } = useUserAttributes()
  const shareUrl = getScreenUrl((v) => ({
    ...v,
    scope: 'public',
    queryParam: [
      ['userName', currentUser?.userName ?? me?.userName ?? ''],
      ...v.queryParam.filter(([p]) => p !== 'userName'),
    ],
  }))

  return useMemo(
    () => (
      <Flex
        vertical
        className="screen-container"
        style={{
          padding: '24px 16px',
          boxSizing: 'border-box',
          backgroundColor: token.colorBgContainer,
          minHeight: '100vh',
        }}
        ref={ref}
      >
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
}
/* eslint-enable react-hooks/rules-of-hooks */
const ScreenContainer = forwardRef<HTMLDivElement, ComponentProps>(component)
export default ScreenContainer
