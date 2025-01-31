import type { Schema } from '@amplify/data/resource.ts'
import { generateClient } from 'aws-amplify/api'
import type { CharacterGroup } from '@/service'
import { useAppSelector } from '@/store'
import { selectCharacterGroups } from '@/store/commonSlice.ts'
import { selectMe } from '@/store/userAttributesSlice.ts'
import { typedPick } from '@/utils/types.ts'

const client = generateClient<Schema>()

export default function useCreateCharacterGroup() {
  const me = useAppSelector(selectMe)
  const characterGroups = useAppSelector(selectCharacterGroups)

  return (group: Pick<CharacterGroup, 'system' | 'name' | 'characterIds'>) => {
    // 重複チェック
    const compare = (cg: CharacterGroup) =>
      (['name'] as const).every((p) => cg[p] === group[p]) &&
      cg.system === group.system &&
      cg.owner === me?.userName
    if (characterGroups.some(compare)) return

    client.models.CharacterGroup.create({
      ...typedPick(group, 'name', 'system'),
      additionalData: JSON.stringify({ stared: false }),
      characterIds: JSON.stringify(group.characterIds),
      owner: me?.userName || '',
      public: false,
    })
  }
}
