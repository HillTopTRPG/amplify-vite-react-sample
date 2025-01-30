import { useMemo } from 'react'
import backImg from '@/assets/main-back.png'
import { useAppSelector } from '@/store'
import { selectTheme } from '@/store/themeSlice.ts'

interface Props {
  status: number
}
export default function HomeBackImage({ status }: Props) {
  const theme = useAppSelector(selectTheme)
  return useMemo(() => {
    const scale = [1, 1.25, 1.5][status]
    return (
      <div
        style={{
          position: 'fixed',
          top: 64,
          left: 0,
          width: '100vw',
          height: 'calc(100vh - 64px)',
          backgroundImage: `url(${backImg})`,
          backgroundSize: 'auto 100%',
          backgroundPositionX: 'center',
          transform: `scale(${scale})`,
          transition: 'transform 800ms ease-in-out',
          transformOrigin: 'top center',
          filter: theme === 'dark' ? 'grayscale(0.7)' : undefined,
        }}
      ></div>
    )
  }, [status, theme])
}
