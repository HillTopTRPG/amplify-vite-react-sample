import { createContext } from 'react'
import { type SmallCardData } from '@/components/DataSmallCard/index.tsx'

interface ShareOpenContext {
  shareOpen: boolean
  toggleShareOpen: () => void
  close: () => void
}
export const shareOpenContext = createContext<ShareOpenContext>({
  shareOpen: false,
  toggleShareOpen: () => {},
  close: () => {},
})

interface OperationOpenContext {
  operationOpen: string
  toggleOperationOpen: (operateType: string) => void
  close: () => void
}
export const operationOpenContext = createContext<OperationOpenContext>({
  operationOpen: '',
  toggleOperationOpen: () => {},
  close: () => {},
})

export const smallCardDataContext = createContext<SmallCardData>({
  public: false,
  owner: '',
  name: '',
  additionalData: {
    stared: false,
  },
})
