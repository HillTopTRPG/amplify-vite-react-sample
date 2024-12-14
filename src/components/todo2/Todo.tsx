import { FileTextOutlined } from '@ant-design/icons'
import { List, Space } from 'antd'
import type { Schema } from '../../../amplify/data/resource'

export default function Todo({
  todo,
  onClick,
}: {
  todo: Schema['Todo2']['type']
  onClick: (id: string) => void
}) {
  return (
    <List.Item onClick={() => onClick(todo.id)}>
      <Space>
        <FileTextOutlined />
        <span>{todo.content}</span>
        <span>{todo.type}</span>
        <span>{JSON.stringify(todo.nextTodo)}</span>
      </Space>
    </List.Item>
  )
}
