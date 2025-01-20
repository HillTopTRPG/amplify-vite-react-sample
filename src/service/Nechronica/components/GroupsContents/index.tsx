import AddGroupInput from '@Nechronica/components/DashboardContents/AddGroupInput.tsx'
import GroupSmallCard from '@Nechronica/components/DashboardContents/GroupSmallCard.tsx'
import { useNechronicaContext } from '@Nechronica/context.ts'
import { screens } from '@Nechronica/screens'
import { Flex, Spin } from 'antd'
import { useUserAttributes } from '@/context/userAttributesContext.ts'
import useScreenNavigateInService from '@/hooks/useScreenNavigateInService.ts'

export default function GroupsContents() {
  const { loading, characterGroupRelations } = useNechronicaContext()

  const { currentUser } = useUserAttributes()
  const { scope } = useScreenNavigateInService(screens)

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
