import React from 'react'
import { Col, Typography } from 'antd'

const colStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  whiteSpace: 'nowrap',
  height: 40,
}

interface Props {
  item: string
  value: string
}
export default function ColSetTCR({ item, value }: Props) {
  return (
    <>
      <Col span={2} style={{ ...colStyle, backgroundColor: '#bdbdbd' }}>
        <Typography.Text
          strong
          style={{
            color: 'white',
            textShadow:
              '1px 1px 0 black,-1px -1px 0 black,-1px 1px 0 black,1px -1px 0 black,0px 1px 0 black,-1px 0 black,-1px 0 0 black,1px 0 0 black',
          }}
        >
          {item}
        </Typography.Text>
      </Col>
      <Col span={6} style={colStyle}>
        <Typography.Text>{value}</Typography.Text>
      </Col>
    </>
  )
}
