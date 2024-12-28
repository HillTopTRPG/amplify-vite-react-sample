import dolls from './screens/dolls.tsx'
import dollsForGuest from './screens/dollsForGuest.tsx'
import group from './screens/group.tsx'
import groups from './screens/groups.tsx'
import horrors from './screens/horrors.tsx'
import horrorsForGuest from './screens/horrorsForGuest.tsx'
import index from './screens/index.tsx'
import indexForGuest from './screens/indexForGuest.tsx'
import legions from './screens/legions.tsx'
import legionsForGuest from './screens/legionsForGuest.tsx'
import savants from './screens/savants.tsx'
import savantsForGuest from './screens/savantsForGuest.tsx'

const screens = {
  index,
  dolls,
  savants,
  horrors,
  legions,
  groups,
  indexForGuest,
  dollsForGuest,
  savantsForGuest,
  horrorsForGuest,
  legionsForGuest,
  group,
} as const

export default screens
