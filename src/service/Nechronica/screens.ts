import build from './screens/build.tsx'
import dolls from './screens/dolls.tsx'
import group from './screens/group.tsx'
import horrors from './screens/horrors.tsx'
import index from './screens/index.tsx'
import legions from './screens/legions.tsx'
import maneuvers from './screens/maneuvers.tsx'
import savants from './screens/savants.tsx'
import { type Screen } from '@/service'

export const screens: Record<string, Screen> = {
  index,
  dolls,
  savants,
  horrors,
  legions,
  group,
  maneuvers,
  build,
}
