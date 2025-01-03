import { type RefObject } from 'react'
import constate from 'constate'

export const [ScrollContainerProvider, useScrollContainerContext] = constate(
  ({ scrollContainerRef }: { scrollContainerRef: RefObject<HTMLElement> }) => {
    return {
      scrollContainerRef,
    }
  },
)
