import React from 'react'
import {
  Row,
  Col,
  Typography,
  Statistic,
  Card,
  type GetProps,
  theme,
} from 'antd'

export default function StatisticCardLayout({
  title,
  data,
  children,
}: {
  title: string
  data: GetProps<typeof Statistic>[]
  children?: React.JSX.Element | React.JSX.Element[]
}) {
  const { token } = theme.useToken()
  return (
    <>
      <Typography.Title level={5}>{title}</Typography.Title>
      <Row gutter={[16, 16]}>
        {data.map((data, i) => (
          <Col span={12} lg={6} key={i}>
            <Card
              bordered={false}
              style={{ backgroundColor: token.colorBgElevated }}
            >
              <Statistic {...data} />
            </Card>
          </Col>
        ))}
        {children}
      </Row>
    </>
  )
}
