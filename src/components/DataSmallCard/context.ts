import { type Dispatch, type SetStateAction, useCallback } from 'react'
import constate from 'constate'
import { type SmallCardData } from '@/components/DataSmallCard/index.tsx'

export const [SmallCardDataProvider, useSmallCardDataContext] = constate(
  ({
    data,
    shareOpen,
    setShareOpen,
    operateOpen,
    setOperateOpen,
  }: {
    data: SmallCardData
    shareOpen: boolean
    setShareOpen: Dispatch<SetStateAction<boolean>>
    operateOpen: string
    setOperateOpen: Dispatch<SetStateAction<string>>
  }) => {
    const toggleShare = useCallback(() => {
      setShareOpen((v) => !v)
      setOperateOpen('')
    }, [setOperateOpen, setShareOpen])
    const toggleOperate = useCallback(
      (operateType: string) => {
        setOperateOpen((v) => (v ? '' : operateType))
        setShareOpen(false)
      },
      [setOperateOpen, setShareOpen],
    )
    return {
      data,
      shareOpen,
      toggleShare,
      operateOpen,
      toggleOperate,
    }
  },
)
