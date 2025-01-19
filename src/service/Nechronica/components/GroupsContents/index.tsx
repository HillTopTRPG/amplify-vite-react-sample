import AddGroupInput from '@Nechronica/components/DashboardContents/AddGroupInput.tsx'
import GroupSmallCard from '@Nechronica/components/DashboardContents/GroupSmallCard.tsx'
import { useNechronicaContext } from '@Nechronica/context.ts'
import { Flex, Spin } from 'antd'
import { useScreenContext } from '@/context/screenContext.ts'
import { useUserAttributes } from '@/context/userAttributesContext.ts'

export default function GroupsContents() {
  const { loading, characterGroupRelations } = useNechronicaContext()

  const { currentUser } = useUserAttributes()
  const { scope } = useScreenContext()

  const dataFilterFc = ({ owner }: { owner: string }): boolean => {
    if (scope === 'public' && !currentUser) return true
    return owner === currentUser?.userName
  }

  if (loading) return <Spin size="large" />
  return (
    <Flex vertical gap={8}>
      <AddGroupInput />
      <Flex gap={8} wrap>
        {characterGroupRelations
          .filter((cgr) => dataFilterFc(cgr))
          .map((g) => {
            return <GroupSmallCard key={g.id} group={g} />
          })}
      </Flex>
    </Flex>
  )
}
