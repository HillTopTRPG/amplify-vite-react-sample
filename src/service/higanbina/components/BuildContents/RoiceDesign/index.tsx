import { Empty, List } from 'antd'
import EditableRoice from './EditableRoice.tsx'
import { useAppSelector } from '@/store'
import { selectMakingCharacterRoiceList } from '@/store/nechronicaSlice.ts'

export default function RoiceDesign() {
  const roiceList = useAppSelector(selectMakingCharacterRoiceList)

  return (
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
  )
}
