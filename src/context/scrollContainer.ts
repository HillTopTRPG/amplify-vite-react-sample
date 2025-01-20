import { createContext, type RefObject } from 'react'

export const scrollContainerContext =
  createContext<RefObject<HTMLElement> | null>(null)
