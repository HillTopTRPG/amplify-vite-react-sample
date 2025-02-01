import AddGroupInput from '@higanbina/components/DashboardContents/AddGroupInput.tsx'
import GroupSmallCard from '@higanbina/components/DashboardContents/GroupSmallCard.tsx'
import { screens } from '@higanbina/screens'
import { Flex, Spin } from 'antd'
import useNechronicaGroupRelations from '@/hooks/gameData/useNechronicaGroupRelations.ts'
import useNechronicaLoading from '@/hooks/gameData/useNechronicaLoading.ts'
import useScreenNavigateInService from '@/hooks/useScreenNavigateInService.ts'
import { useAppSelector } from '@/store'
import { selectCurrentUser } from '@/store/userAttributesSlice.ts'

export default function GroupsContents() {
  const loading = useNechronicaLoading()
  const characterGroupRelations = useNechronicaGroupRelations()

  const currentUser = useAppSelector(selectCurrentUser)
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
