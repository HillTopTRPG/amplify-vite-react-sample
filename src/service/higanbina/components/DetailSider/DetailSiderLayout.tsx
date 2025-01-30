import { type ReactNode, useMemo } from 'react'
import { Flex, type FlexProps, theme } from 'antd'
import useScreenSize from '@/hooks/useScreenSize.ts'
import { useAppDispatch, useAppSelector } from '@/store'
import { selectDrawerStatus } from '@/store/drawerStatusSlice.ts'
import {
  setClickManeuverId,
  setHoverManeuverId,
} from '@/store/nechronicaSlice.ts'

const containerProps = (minHeight?: string): Omit<FlexProps, 'children'> => ({
  vertical: true,
  align: 'stretch',
  gap: 8,
  style: { minHeight },
})

interface Props {
  actions?: ReactNode
  children: ReactNode
  width: number
  vertical?: boolean
  minMainContentsWidth: number
}
export default function DetailSiderLayout({
  actions,
  children,
  width,
  vertical,
  minMainContentsWidth,
}: Props) {
  const dispatch = useAppDispatch()
  const drawerStatus = useAppSelector(selectDrawerStatus)
  const screenSize = useScreenSize(drawerStatus)
  const { token } = theme.useToken()

  const thinWidthContents = useMemo(
    () => (
      <Flex {...containerProps('100vh')}>
        {actions}
        {vertical ? (
          children
        ) : (
          <Flex
            wrap
            align="stretch"
            justify="space-evenly"
            gap={8}
            style={{ alignContent: 'flex-start' }}
          >
            {children}
          </Flex>
        )}
      </Flex>
    ),
    [actions, children, vertical],
  )

  const fullWidthContents = useMemo(
    () => (
      <div
        style={{
          position: 'fixed',
          top: 48,
          bottom: 0,
          right: 0,
          width,
          overflow: 'auto',
          backgroundColor: token.colorBgContainer,
        }}
        onScrollCapture={(e) => {
          e.stopPropagation()
          dispatch(setHoverManeuverId(''))
          dispatch(setClickManeuverId(''))
        }}
      >
        <Flex {...containerProps()}>
          {actions}
          {children}
        </Flex>
      </div>
    ),
    [actions, children, dispatch, token.colorBgContainer, width],
  )

  return screenSize.viewPortWidth < minMainContentsWidth
    ? thinWidthContents
    : fullWidthContents
}
