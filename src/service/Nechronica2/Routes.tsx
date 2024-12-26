import { Route } from 'react-router-dom'
import Page from './Page.tsx'
import screens from './screens'
import service from './index'
import PrivateLayout from '@/components/PrivateLayout.tsx'
import PublicLayout from '@/components/PublicLayout.tsx'
import { getKeys } from '@/utils/types.ts'

export default function Routes() {
  const getScreens = (authorize: boolean) => {
    const filtered = getKeys(screens).filter(
      (screen) => screens[screen].authorize === authorize,
    )
    const getPath = (screen: string, hasUserName: boolean) => {
      const authorizeBlock = authorize ? 'private' : 'public'
      const userNameBlock = hasUserName ? '/:userName' : ''
      const screenBlock = `/${screen.replace('ForGuest', '')}`.replace(
        '/index',
        '',
      )
      const path = `/${authorizeBlock}${userNameBlock}/${service.service}${screenBlock}`
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

  return (
    <>
      <Route element={<PublicLayout />}>
        {getScreens(false).map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
      <Route element={<PrivateLayout />}>
        {getScreens(true).map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
    </>
  )
}
