import { Col, Typography, Row } from 'antd'
import { type Schema } from '../../../amplify/data/resource.ts'
import TodoContainer from '@/components/todo2/TodoContainer.tsx'

type TodosProp = {
  todo2s: Schema['Todo2']['type'][]
  createTodo2: (data: Schema['Todo2']['createType']) => void
  deleteTodo2: (id: string) => void
  loading: boolean
}
export default function Todos({
  todo2s,
  createTodo2,
  deleteTodo2,
  loading,
}: TodosProp) {
  const addTodo = () => {
    const content = window.prompt('todo content.') || '-'
    const todo: Schema['Todo2']['createType'] = {
      content,
      type: 'system',
      next: JSON.stringify({ content }),
    }
    createTodo2(todo)
  }
  return (
    <>
      <Typography.Title level={5}>TODO</Typography.Title>
      <Row gutter={4}>
        <Col span={8}>
          <TodoContainer
            todos={todo2s}
            createTodo={addTodo}
            deleteTodo={deleteTodo2}
            loading={loading}
          />
        </Col>
        <Col span={8}>
          <TodoContainer
            todos={todo2s}
            createTodo={addTodo}
            deleteTodo={deleteTodo2}
            loading={loading}
          />
        </Col>
        <Col span={8}>
          <TodoContainer
            todos={todo2s}
            createTodo={addTodo}
            deleteTodo={deleteTodo2}
            loading={loading}
          />
        </Col>
      </Row>
    </>
  )
}
