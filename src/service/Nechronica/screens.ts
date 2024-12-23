import dolls from './screens/dolls.tsx'
import groups from './screens/groups.tsx'
import horrors from './screens/horrors.tsx'
import index from './screens/index.tsx'
import legions from './screens/legions.tsx'
import savants from './screens/savants.tsx'

const screens = {
  index,
  dolls,
  savants,
  horrors,
  legions,
  groups,
} as const

export default screens
