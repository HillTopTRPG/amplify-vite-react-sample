import React from 'react'
import { useScreenContext } from '@/context/screenContext.ts'

export default function DynamicScreen() {
  const { screenContents } = useScreenContext()
  return React.createElement(screenContents)
}
