import { useAppSelector } from '@/store'
import { selectCommonLoading } from '@/store/commonSlice.ts'
import { selectNechronicaLoading } from '@/store/nechronicaSlice.ts'
import { selectUserAttributesLoading } from '@/store/userAttributesSlice.ts'

export default function useNechronicaLoading() {
  const userAttributesLoading = useAppSelector(selectUserAttributesLoading)
  const commonLoading = useAppSelector(selectCommonLoading)
  const nechronicaLoading = useAppSelector(selectNechronicaLoading)

  return userAttributesLoading || nechronicaLoading || commonLoading
}
