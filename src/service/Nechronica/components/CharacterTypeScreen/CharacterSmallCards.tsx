import { useCallback } from 'react'
import { Divider, Flex, Spin, theme, Typography } from 'antd'
import CharacterSmallCard from '@/service/Nechronica/components/CharacterTypeScreen/CharacterSmallCard.tsx'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'
import { type NechronicaCharacter } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

const SEARCH_INPUT_WIDTH = 370

interface Props {
  viewType: 'normal' | 'group'
  searchedCharacters: NechronicaCharacter[]
  useCharacters: NechronicaCharacter[]
  selectedCharacters: string[]
  setSelectedCharacters: (characters: string[]) => void
  setHoverCharacter: (id: string | null) => void
  onUnGroup?: (id: string) => void
}
export default function CharacterSmallCards({
  viewType,
  searchedCharacters,
  useCharacters,
  selectedCharacters,
  setSelectedCharacters,
  setHoverCharacter,
  onUnGroup,
}: Props) {
  const { loading } = useNechronicaContext()
  const { token } = theme.useToken()

  const onSelectCharacter = useCallback(
    (id: string, isSelect: boolean) => {
      if (isSelect) {
        setSelectedCharacters([id, ...selectedCharacters])
      } else {
        setSelectedCharacters(selectedCharacters.filter((c) => c !== id))
      }
    },
    [selectedCharacters, setSelectedCharacters],
  )
  const onHoverCharacter = useCallback(
    (id: string, isEnter: boolean) => {
      setHoverCharacter(isEnter ? id : null)
    },
    [setHoverCharacter],
  )

  if (loading) return <Spin size="large" />

  if (!searchedCharacters.length) {
    const message = useCharacters.length
      ? 'Not Found'
      : 'キャラクターがまだ登録されていません'
    return (
      <Flex vertical align="center" style={{ width: SEARCH_INPUT_WIDTH }}>
        <Typography.Text
          style={{
            marginTop: 5,
            marginBottom: 15,
            color: token.colorTextDescription,
          }}
        >
          {message}
        </Typography.Text>

        <Divider
          style={{
            marginLeft: 11,
            marginRight: 11,
            width: SEARCH_INPUT_WIDTH - 11 * 2,
            minWidth: 'auto',
          }}
        />
      </Flex>
    )
  }

  return searchedCharacters.map((character) => (
    <CharacterSmallCard
      viewType={viewType}
      key={character.id}
      character={character}
      selected={selectedCharacters.includes(character.id)}
      onSelect={onSelectCharacter}
      onHover={onHoverCharacter}
      onUnGroup={() => onUnGroup?.call(null, character.id)}
    />
  ))
}
