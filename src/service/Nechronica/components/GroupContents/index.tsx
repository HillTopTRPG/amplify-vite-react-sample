import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Flex, Modal } from 'antd'
import { useScreenContext } from '@/context/screenContext.ts'
import { useUserAttributes } from '@/context/userAttributesContext.ts'
import { useSelectIds } from '@/hooks/useSelectIds.ts'
import CharacterSmallCard from '@/service/Nechronica/components/CharacterTypeScreen/CharacterSmallCard.tsx'
import CharacterSmallCards from '@/service/Nechronica/components/CharacterTypeScreen/CharacterSmallCards.tsx'
import DetailSider from '@/service/Nechronica/components/CharacterTypeScreen/DetailSider.tsx'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'
import { useSearchCharacter } from '@/service/Nechronica/hooks/useSearchCharacter.ts'
import type { CharacterGroupRelation } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import { typedOmit } from '@/utils/types.ts'

export default function GroupContents() {
  const { groupId } = useParams()

  const { characters, characterGroupRelations, updateCharacterGroup } =
    useNechronicaContext()
  const characterGroupRelation = characterGroupRelations.find(
    (cg) => cg.id === groupId,
  )
  const { currentUser } = useUserAttributes()
  const { screenSize } = useScreenContext()

  const useCharacters = characters.filter(
    (c) => c.owner === currentUser?.userName,
  )

  const {
    searchedCharacters,
    selectedCharacters,
    hoverCharacter,
    setSelectedCharacters,
    setHoverCharacter,
  } = useSearchCharacter(characterGroupRelation?.characters ?? [])

  const [detailList, setDetailList] = useState<string[]>([])

  useEffect(() => {
    const list = [...selectedCharacters]
    if (hoverCharacter) {
      const index = list.indexOf(hoverCharacter)
      if (index !== -1) list.splice(index, 1)
      list.unshift(hoverCharacter)
    }
    setDetailList(list)
  }, [hoverCharacter, selectedCharacters, setDetailList])

  const [selectIds, setSelectIds, onSelectCharacter] = useSelectIds()

  const [targetCharacterGroup, setTargetCharacterGroup] =
    useState<CharacterGroupRelation | null>(null)

  const handleCancel = () => {
    setSelectIds([])
    setTargetCharacterGroup(null)
  }

  const handleOk = () => {
    if (!targetCharacterGroup) return
    updateCharacterGroup({
      ...typedOmit(targetCharacterGroup, 'characters'),
      characterIds: [...targetCharacterGroup.characterIds, ...selectIds],
    })
    handleCancel()
  }

  const onAddCharacters = () => {
    if (!characterGroupRelation) return
    setTargetCharacterGroup(characterGroupRelation)
  }

  const onUnGroup = (characterId: string) => {
    if (!characterGroupRelation) return
    updateCharacterGroup({
      ...typedOmit(characterGroupRelation, 'characters'),
      characterIds: characterGroupRelation.characterIds.filter(
        (id) => id !== characterId,
      ),
    })
  }

  return (
    <>
      <Button style={{ alignSelf: 'flex-start' }} onClick={onAddCharacters}>
        キャラクターを追加
      </Button>
      <Flex
        align="flex-start"
        justify={screenSize.isMobile ? 'space-evenly' : 'flex-start'}
        style={{
          margin: '10px 0',
          alignContent: 'flex-start',
        }}
        wrap
        gap={9}
      >
        <CharacterSmallCards
          viewType="group"
          onUnGroup={onUnGroup}
          searchedCharacters={searchedCharacters}
          useCharacters={useCharacters}
          selectedCharacters={selectedCharacters}
          setSelectedCharacters={setSelectedCharacters}
          setHoverCharacter={setHoverCharacter}
        />
      </Flex>
      <DetailSider detailList={detailList} />
      <Modal
        title="追加するキャラを選択してください。"
        open={Boolean(targetCharacterGroup)}
        onOk={handleOk}
        onCancel={handleCancel}
        height="80vh"
        width="100vw"
        closable={false}
        style={{ padding: '0', margin: 7 }}
        styles={{
          content: { padding: 5, height: '80vh' },
          body: { overflow: 'auto', height: 'calc(100% - 76px)' },
          header: { padding: 5, marginBottom: 5 },
          footer: { marginTop: 5 },
        }}
      >
        <Flex
          wrap
          gap={9}
          align="flex-start"
          justify="flex-start"
          style={{ overflow: 'auto', height: '100%', padding: 6 }}
        >
          {useCharacters
            .filter((c) => !targetCharacterGroup?.characterIds.includes(c.id))
            .map((character) => (
              <CharacterSmallCard
                key={character.id}
                viewType="simple"
                character={character}
                selected={selectIds.includes(character.id)}
                onSelect={onSelectCharacter}
              />
            ))}
        </Flex>
      </Modal>
    </>
  )
}
