import { type RouteObject } from 'react-router-dom'
import Page from './Page.tsx'
import screens from './screens'
import service from './index'
import { getKeys } from '@/utils/types.ts'

const getScreens = (authorize: boolean) => {
  const filtered = getKeys(screens).filter(
    (screen) => screens[screen].authorize === authorize,
  )
  const getPath = (screen: keyof typeof screens, hasUserName: boolean) => {
    const authorizeBlock = authorize ? 'private' : 'public'
    const userNameBlock = hasUserName ? '/:userName' : ''
    const screenBlock = `/${screen.replace('ForGuest', '')}`.replace(
      '/index',
      '',
    )
    const paramBlock = screens[screen].param
      ? `s/:${screens[screen].param}`
      : ''
    const path = `/${authorizeBlock}${userNameBlock}/${service.service}${screenBlock}${paramBlock}`
    // console.log(path)
    return path
  }
  return filtered
    .map((screen) => ({
      path: getPath(screen, false),
      element: Page(screen, authorize ? 'private' : 'public'),
    }))
    .concat(
      filtered.map((screen) => ({
        path: getPath(screen, true),
        element: Page(screen, authorize ? 'private' : 'public'),
      })),
    )
}

const routes: {
  public: NonNullable<RouteObject['children']>
  private: NonNullable<RouteObject['children']>
} = {
  public: getScreens(false),
  private: getScreens(true),
}

export default routes
