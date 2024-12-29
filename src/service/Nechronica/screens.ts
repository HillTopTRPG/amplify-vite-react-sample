import dolls from './screens/dolls.tsx'
import group from './screens/group.tsx'
import horrors from './screens/horrors.tsx'
import index from './screens/index.tsx'
import legions from './screens/legions.tsx'
import savants from './screens/savants.tsx'
import { type Screen } from '@/service'
import { getKeys } from '@/utils/types.ts'

const omitScreens: Record<string, Omit<Screen, 'authorize'>> = {
  index,
  dolls,
  savants,
  horrors,
  legions,
  group,
}

const makeScreens = (suffix: string, authorize: boolean) =>
  getKeys(omitScreens).reduce<Record<string, Screen>>((acc, key) => {
    acc[`${key}${suffix}`] = { ...omitScreens[key], authorize }
    return acc
  }, {})

const screens: Record<string, Screen> = {
  ...makeScreens('', true),
  ...makeScreens('ForGuest', false),
} as const

export default screens
