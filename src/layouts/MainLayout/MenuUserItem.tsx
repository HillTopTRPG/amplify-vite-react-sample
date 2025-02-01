import { Flex, Typography } from 'antd'
import Avatar from 'boring-avatars'
import { useAppSelector } from '@/store'
import { selectMe } from '@/store/userAttributesSlice.ts'

export default function MenuUserItem() {
  const me = useAppSelector(selectMe)
  if (!me) return
  console.log(JSON.stringify(me.setting.avatarProps, null, 2))
  return (
    <Flex
      gap={10}
      align="center"
      justify="flex-start"
      style={{ overflow: 'hidden', minHeight: 48 }}
    >
      <Avatar
        {...me.setting.avatarProps}
        size={16}
        style={{ minWidth: 16, margin: '0 16px' }}
      />
      <Typography.Text style={{ whiteSpace: 'nowrap' }}>
        {me.userName}
      </Typography.Text>
    </Flex>
  )
}
