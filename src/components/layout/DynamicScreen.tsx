import React from 'react'
import { useScreenContext } from '@/context/screen.ts'

export default function DynamicScreen() {
  const { screenContents } = useScreenContext()
  return React.createElement(screenContents)
}
