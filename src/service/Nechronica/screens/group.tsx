import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GroupOutlined } from '@ant-design/icons'
import { Empty, Flex, Modal } from 'antd'
import ScreenContainer from '@/components/layout/ScreenContainer.tsx'
import { useScreenContext } from '@/context/screen.ts'
import { useUserAttributes } from '@/context/userAttributes.ts'
import { useSelectIds } from '@/hooks/useSelectIds.ts'
import type { Screen } from '@/service'
import CharacterCard from '@/service/Nechronica/components/CharacterCard.tsx'
import CharacterSmallCard from '@/service/Nechronica/components/CharacterSmallCard.tsx'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'
import type { CharacterGroupRelation } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import { typedOmit } from '@/utils/types.ts'

const spec = { label: 'グループ', icon: GroupOutlined }

const screen: Omit<Screen, 'authorize'> = {
  ...spec,
  param: 'groupId',
  /* eslint-disable react-hooks/rules-of-hooks */
  contents: () => {
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

    const charactersElm = useMemo(() => {
      if (!characterGroupRelation?.characters)
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      return characterGroupRelation.characters.map((character) => {
        return <CharacterCard key={character.id} character={character} />
      })
    }, [characterGroupRelation?.characters])

    return (
      <ScreenContainer {...spec}>
        <Flex vertical align="stretch" style={{ marginTop: 10, gap: 12 }}>
          {charactersElm}
        </Flex>
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
            align={'flex-start'}
            justify={screenSize.isMobile ? 'space-evenly' : 'flex-start'}
            style={{ overflow: 'auto', height: '100%' }}
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
                  onHover={() => {}}
                />
              ))}
          </Flex>
        </Modal>
      </ScreenContainer>
    )
  },
}

export default screen
