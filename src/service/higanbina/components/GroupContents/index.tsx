import { useCallback, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import CharacterDetailSider from '@higanbina/components/DetailSider/CharacterDetailSider'
import type { CharacterGroupRelation } from '@higanbina/ts/NechronicaDataHelper.ts'
import { Button, Flex, Modal, Result, Spin } from 'antd'
import CharacterSmallCard from '../CharacterTypeScreen/CharacterSmallCard.tsx'
import CharacterSmallCards from '../CharacterTypeScreen/CharacterSmallCards.tsx'
import useNechronicaFilteredCharacters from '@/hooks/gameData/useNechronicaFilteredCharacters.tsx'
import useNechronicaGroupRelations from '@/hooks/gameData/useNechronicaGroupRelations.ts'
import useNechronicaSearchCharacter from '@/hooks/gameData/useNechronicaSearchCharacter.ts'
import useScreenSize from '@/hooks/useScreenSize.ts'
import { useSelectIds } from '@/hooks/useSelectIds.ts'
import { useAppSelector } from '@/store'
import { updateCharacterGroup } from '@/store/commonSlice.ts'
import { selectDrawerStatus } from '@/store/drawerStatusSlice.ts'
import { typedOmit } from '@/utils/types.ts'

export default function GroupContents() {
  const { groupId } = useParams()

  const characterGroupRelations = useNechronicaGroupRelations()
  const drawerStatus = useAppSelector(selectDrawerStatus)
  const screenSize = useScreenSize(drawerStatus)

  const [loading, useCharacters] = useNechronicaFilteredCharacters()

  const characterGroupRelation = useMemo(() => {
    if (loading) return null
    return characterGroupRelations.find((cg) => cg.id === groupId) ?? null
  }, [characterGroupRelations, groupId, loading])

  const {
    searchedCharacters,
    selectedCharacters,
    setSelectedCharacters,
    setHoverCharacter,
    detailList,
  } = useNechronicaSearchCharacter(characterGroupRelation?.characters ?? [])

  const [selectIds, setSelectIds, onSelectCharacter] = useSelectIds()

  const [targetCharacterGroup, setTargetCharacterGroup] =
    useState<CharacterGroupRelation | null>(null)

  const handleCancel = useCallback(() => {
    setSelectIds([])
    setTargetCharacterGroup(null)
  }, [setSelectIds])

  const handleOk = useCallback(() => {
    if (!targetCharacterGroup) return
    updateCharacterGroup({
      ...typedOmit(targetCharacterGroup, 'characters'),
      characterIds: [...targetCharacterGroup.characterIds, ...selectIds],
    })
    handleCancel()
  }, [handleCancel, selectIds, targetCharacterGroup])

  const onAddCharacters = useCallback(() => {
    if (!characterGroupRelation) return
    setTargetCharacterGroup(characterGroupRelation)
  }, [characterGroupRelation])

  const onUnGroup = useCallback(
    (characterId: string) => {
      if (!characterGroupRelation) return
      updateCharacterGroup({
        ...typedOmit(characterGroupRelation, 'characters'),
        characterIds: characterGroupRelation.characterIds.filter(
          (id) => id !== characterId,
        ),
      })
    },
    [characterGroupRelation],
  )

  const contents = useMemo(
    () => (
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
          gap={11}
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
        <CharacterDetailSider characters={detailList} />
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
    ),
    [
      detailList,
      handleCancel,
      handleOk,
      onAddCharacters,
      onSelectCharacter,
      onUnGroup,
      screenSize.isMobile,
      searchedCharacters,
      selectIds,
      selectedCharacters,
      setHoverCharacter,
      setSelectedCharacters,
      targetCharacterGroup,
      useCharacters,
    ],
  )

  if (loading) return <Spin size="large" />
  if (characterGroupRelation) return contents
  return (
    <Result
      status="404"
      title="404"
      subTitle="このグループは存在しないか、非公開です。"
    />
  )
}
