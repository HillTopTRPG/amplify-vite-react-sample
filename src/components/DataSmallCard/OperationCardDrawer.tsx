import { type ReactNode, useContext } from 'react'
import CardDrawer from './CardDrawer.tsx'
import { operationOpenContext } from '@/components/DataSmallCard/context.ts'

interface Props {
  operationDrawerContents: (operateType: string) => ReactNode
}
export default function OperationCardDrawer({
  operationDrawerContents,
}: Props) {
  const { operationOpen, close } = useContext(operationOpenContext)
  return (
    <CardDrawer open={operationOpen} onClose={close}>
      {operationDrawerContents(operationOpen)}
    </CardDrawer>
  )
}
