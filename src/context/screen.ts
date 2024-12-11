import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import constate from 'constate'
import { type Screens } from '@/layouts/MainContentsLauout.tsx'

const useScreen = ({
  service,
  screens,
  screen,
}: {
  service: string
  screens: Screens
  screen: keyof Screens
}) => {
  const navigate = useNavigate()
  const [open, setOpenStatus] = useState(false)
  const screenIcon = screens[screen].icon
  const screenLabel = screens[screen].label
  const screenContents = screens[screen].contents
  const toggleOpenStatus = () => setOpenStatus((v) => !v)

  const setScreen = (screen: keyof Screens) => {
    const suffix = screen === 'index' ? '' : `/${screen}`
    navigate(`/${service}${suffix}`)
  }

  return {
    screens,
    screen,
    setScreen,
    screenIcon,
    screenLabel,
    screenContents,
    open,
    setOpenStatus,
    toggleOpenStatus,
  }
}

export const [ScreenProvider, useScreenContext] = constate(useScreen)
