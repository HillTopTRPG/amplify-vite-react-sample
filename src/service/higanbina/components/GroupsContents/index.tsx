import AddGroupInput from '@higanbina/components/DashboardContents/AddGroupInput.tsx'
import GroupSmallCard from '@higanbina/components/DashboardContents/GroupSmallCard.tsx'
import { screens } from '@higanbina/screens'
import { Flex, Spin } from 'antd'
import useScreenNavigateInService from '@/hooks/useScreenNavigateInService.ts'
import { useAppSelector } from '@/store'
import {
  selectCharacterGroupRelations,
  selectNechronicaLoading,
} from '@/store/nechronicaSlice.ts'
import { selectCurrentUser } from '@/store/userAttributesSlice.ts'

export default function GroupsContents() {
  const loading = useAppSelector(selectNechronicaLoading)
  const characterGroupRelations = useAppSelector(selectCharacterGroupRelations)

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
