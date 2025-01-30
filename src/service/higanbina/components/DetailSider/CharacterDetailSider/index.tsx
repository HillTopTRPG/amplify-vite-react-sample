import DetailSiderLayout from '@higanbina/components/DetailSider/DetailSiderLayout.tsx'
import { type NechronicaCharacter } from '@higanbina/ts/NechronicaDataHelper.ts'
import SelectedCharacterElm from './SelectedCharacterElm.tsx'

interface Props {
  characters: NechronicaCharacter[]
}
export default function CharacterDetailSider({ characters }: Props) {
  return (
    <DetailSiderLayout width={420} vertical minMainContentsWidth={789}>
      <SelectedCharacterElm characters={characters} />
    </DetailSiderLayout>
  )
}
