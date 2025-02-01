import build from './screens/build.tsx'
import dolls from './screens/dolls.tsx'
import group from './screens/group.tsx'
import groups from './screens/groups.tsx'
import horrors from './screens/horrors.tsx'
import index from './screens/index.tsx'
import legions from './screens/legions.tsx'
import maneuvers from './screens/maneuvers.tsx'
import profile from './screens/profile.tsx'
import savants from './screens/savants.tsx'
import { type Screen } from '@/service'

export const screens: Record<string, Screen> = {
  index,
  dolls,
  savants,
  horrors,
  legions,
  groups,
  group,
  maneuvers,
  build,
  profile,
}
