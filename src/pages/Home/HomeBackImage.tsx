import { useMemo } from 'react'
import backImg from '@/assets/main-back.png'
import { themeSelector, useSelector } from '@/store'

interface Props {
  status: number
  lastStatus: number
}
export default function HomeBackImage({ status, lastStatus }: Props) {
  const theme = useSelector(themeSelector)
  return useMemo(() => {
    const transform =
      status === 1 ? 'scale(1.5)' : status === 2 ? 'scale(2)' : undefined
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${backImg})`,
          backgroundSize: 'auto 100%',
          backgroundPositionX: 'center',
          transform,
          transition: [lastStatus, status].includes(2)
            ? undefined
            : 'transform 800ms ease-in-out',
          transformOrigin: 'top center',
          filter: theme === 'dark' ? 'grayscale(0.7)' : undefined,
        }}
      ></div>
    )
  }, [status, lastStatus, theme])
}
