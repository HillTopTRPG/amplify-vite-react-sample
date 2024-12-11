import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Flex, List } from 'antd'
import type { Schema } from '../../../amplify/data/resource'
import Todo from '@/components/todo/Todo.tsx'

type TodoContainerProps = {
  todos: Array<Schema['Todo']['type']>
  createTodo: () => void
  deleteTodo: (id: string) => void
}
export default function TodoContainer({
  todos,
  createTodo,
  deleteTodo,
}: TodoContainerProps) {
  return (
    <Card
      title={
        <Flex align="stretch" justify="space-between">
          <span>TODO</span>
          <Button
            type="text"
            icon={<PlusOutlined />}
            onClick={createTodo}
          ></Button>
        </Flex>
      }
    >
      <List
        dataSource={todos}
        split={false}
        renderItem={(todo) => <Todo todo={todo} onClick={deleteTodo} />}
      />
    </Card>
  )
}
