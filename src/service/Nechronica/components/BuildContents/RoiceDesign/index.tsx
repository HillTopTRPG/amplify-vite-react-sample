import { Empty, Flex, List } from 'antd'
import EditableRoice from './EditableRoice.tsx'
import { useCharacterMakeContext } from '@/service/Nechronica/components/BuildContents/context.ts'

export default function RoiceDesign() {
  const { roiceList } = useCharacterMakeContext()

  return (
    <Flex wrap gap={8} style={{ margin: 0, width: '100%' }}>
      <List
        grid={{ gutter: [8, 8] }}
        style={{ margin: 0, width: '100%' }}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              style={{ margin: 0, alignSelf: 'center', width: '100%' }}
              description="Empty"
            />
          ),
        }}
        dataSource={roiceList}
        renderItem={(roice, idx) => {
          return <EditableRoice key={idx} roice={roice} index={idx} />
        }}
      />
    </Flex>
  )
}
