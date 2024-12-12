import { Col, Typography, Row } from 'antd'
import { type Schema } from '../../../amplify/data/resource.ts'
import TodoContainer from '@/components/todo/TodoContainer.tsx'

type TodosProp = {
  todos: Schema['Todo']['type'][]
  createTodo: (data: Schema['Todo']['createType']) => void
  deleteTodo: (id: string) => void
  loading: boolean
}
export default function Todos({
  todos,
  createTodo,
  deleteTodo,
  loading,
}: TodosProp) {
  const addTodo = () => {
    const content = window.prompt('todo content.') || '-'
    const todo: Schema['Todo']['createType'] = {
      content,
    }
    createTodo(todo)
  }
  return (
    <>
      <Typography.Title level={5}>TODO</Typography.Title>
      <Row gutter={4}>
        <Col span={8}>
          <TodoContainer
            todos={todos}
            createTodo={addTodo}
            deleteTodo={deleteTodo}
            loading={loading}
          />
        </Col>
        <Col span={8}>
          <TodoContainer
            todos={todos}
            createTodo={addTodo}
            deleteTodo={deleteTodo}
            loading={loading}
          />
        </Col>
        <Col span={8}>
          <TodoContainer
            todos={todos}
            createTodo={addTodo}
            deleteTodo={deleteTodo}
            loading={loading}
          />
        </Col>
      </Row>
      <Typography.Title level={5}>TODO</Typography.Title>
      <Row gutter={4}>
        <Col span={8}>
          <TodoContainer
            todos={todos}
            createTodo={addTodo}
            deleteTodo={deleteTodo}
            loading={loading}
          />
        </Col>
        <Col span={8}>
          <TodoContainer
            todos={todos}
            createTodo={addTodo}
            deleteTodo={deleteTodo}
            loading={loading}
          />
        </Col>
        <Col span={8}>
          <TodoContainer
            todos={todos}
            createTodo={addTodo}
            deleteTodo={deleteTodo}
            loading={loading}
          />
        </Col>
      </Row>
    </>
  )
}
