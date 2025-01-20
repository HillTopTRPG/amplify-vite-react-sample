import { type ReactNode, useContext } from 'react'
import CardDrawer from '@/components/DataSmallCard/CardDrawer.tsx'
import { shareOpenContext } from '@/components/DataSmallCard/context.ts'

interface Props {
  shareDrawerContents: ReactNode
}
export default function ShareCardDrawer({ shareDrawerContents }: Props) {
  const { shareOpen, close } = useContext(shareOpenContext)
  return (
    <CardDrawer open={shareOpen} onClose={close}>
      {shareDrawerContents}
    </CardDrawer>
  )
}
