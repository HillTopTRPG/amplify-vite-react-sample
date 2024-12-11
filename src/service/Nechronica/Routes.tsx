import { Route } from 'react-router-dom'
import Page from './Page.tsx'
import screens from './screens'
import service from './index'
import PrivateLayout from '@/components/PrivateLayout.tsx'
import PublicLayout from '@/components/PublicLayout.tsx'
import { getKeys } from '@/utils/types.ts'

export default function Routes() {
  const getScreens = (filter: (authorize: boolean) => boolean) => {
    return getKeys(screens)
      .filter((screen) => filter(screens[screen].authorize))
      .map((screen) => {
        const pathSuffix = screen === 'index' ? '' : `/${screen.toString()}`
        return {
          path: `/${service.service}${pathSuffix}`,
          element: Page(screen),
        }
      })
  }

  return (
    <>
      <Route element={<PublicLayout />}>
        {getScreens((authorize) => !authorize).map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
      <Route element={<PrivateLayout />}>
        {getScreens((authorize) => authorize).map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
    </>
  )
}
