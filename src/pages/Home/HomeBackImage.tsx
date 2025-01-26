import { useMemo } from 'react'
import backImg from '@/assets/main-back.png'
import useScreenSize from '@/hooks/useScreenSize.ts'
import { themeSelector, useSelector } from '@/store'

interface Props {
  zoomUpBack: number
}
export default function HomeBackImage({ zoomUpBack }: Props) {
  const { isMobile } = useScreenSize(false)
  const theme = useSelector(themeSelector)
  return useMemo(() => {
    const transform =
      zoomUpBack === 1
        ? 'scale(1.5)'
        : zoomUpBack === 2
          ? 'scale(2) translate(20px, -30px)'
          : undefined
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${backImg})`,
          backgroundSize: isMobile ? 'cover' : 'contain',
          backgroundPositionX: 'center',
          transform,
          transition: 'transform 600ms ease-in-out',
          transformOrigin: 'top center',
          filter: theme === 'dark' ? 'grayscale(0.7)' : undefined,
        }}
      ></div>
    )
  }, [isMobile, theme, zoomUpBack])
}
