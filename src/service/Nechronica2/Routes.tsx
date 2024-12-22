import { Route } from 'react-router-dom'
import Page from './Page.tsx'
import screens from './screens'
import service from './index'
import PrivateLayout from '@/components/PrivateLayout.tsx'
import PublicLayout from '@/components/PublicLayout.tsx'
import { getKeys } from '@/utils/types.ts'

export default function Routes() {
  const getScreens = (
    filter: (screen: (typeof screens)[keyof typeof screens]) => boolean,
  ) => {
    const filtered = getKeys(screens).filter((screen) =>
      filter(screens[screen]),
    )
    return filtered
      .map((screen) => ({
        path: `/${service.service}${screen === 'index' ? '' : `/${screen.toString()}`}`,
        element: Page(screen),
      }))
      .concat(
        filtered.map((screen) => ({
          path: `/:userName/${service.service}${screen === 'index' ? '' : `/${screen.toString()}`}`,
          element: Page(screen),
        })),
      )
  }

  return (
    <>
      <Route element={<PublicLayout />}>
        {getScreens((screen) => !screen.authorize).map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
      <Route element={<PrivateLayout />}>
        {getScreens((screen) => screen.authorize).map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
    </>
  )
}
