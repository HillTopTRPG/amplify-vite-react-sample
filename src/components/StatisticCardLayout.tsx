import React from 'react'
import { Row, Col, Typography, Statistic, Card, type GetProps } from 'antd'

export default function StatisticCardLayout({
  title,
  data,
  children,
}: {
  title: string
  data: GetProps<typeof Statistic>[]
  children?: React.JSX.Element | React.JSX.Element[]
}) {
  return (
    <>
      <Typography.Title level={5}>{title}</Typography.Title>
      <Row gutter={[16, 16]}>
        {data.map((data, i) => (
          <Col span={12} lg={6} key={i}>
            <Card bordered={false}>
              <Statistic {...data} />
            </Card>
          </Col>
        ))}
        {children}
      </Row>
    </>
  )
}
