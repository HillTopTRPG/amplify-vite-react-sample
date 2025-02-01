import type { Schema } from '@amplify/data/resource.ts'
import type {
  NechronicaAdditionalData,
  NechronicaCharacter,
  NechronicaDataHelper,
} from '@higanbina/ts/NechronicaDataHelper.ts'
import { generateClient } from 'aws-amplify/api'
import { useAppSelector } from '@/store'
import { selectNechronicaCharacters } from '@/store/nechronicaSlice.ts'
import { selectMe } from '@/store/userAttributesSlice.ts'
import { type PromiseType } from '@/utils/types.ts'

const client = generateClient<Schema>()

export default function useCreateNechronicaCharacter() {
  const me = useAppSelector(selectMe)
  const characters = useAppSelector(selectNechronicaCharacters)

  return (
    character: NonNullable<
      PromiseType<ReturnType<typeof NechronicaDataHelper.fetch>>
    >,
  ) => {
    // 重複チェック
    const compare = (c: NechronicaCharacter) =>
      (['type', 'sheetId'] as const).every(
        (p) => c.additionalData[p] === character.additionalData[p],
      ) && c.owner === me?.userName
    if (characters.some(compare)) return

    const additionalData: NechronicaAdditionalData = {
      ...character.additionalData,
      stared: false,
    }

    client.models.NechronicaCharacter.create({
      name: character.sheetData.basic.characterName,
      additionalData: JSON.stringify(additionalData),
      sheetData: JSON.stringify(character.sheetData),
      owner: me?.userName || '',
      public: false,
    })
  }
}
