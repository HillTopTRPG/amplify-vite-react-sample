import { useMemo, useRef, useState } from 'react'
import { GroupOutlined } from '@ant-design/icons'
import { Button, Flex, Input, type InputRef, Modal, Space } from 'antd'
import ScreenContainer from '@/components/layout/ScreenContainer.tsx'
import { useScreenContext } from '@/context/screen.ts'
import { useUserAttributes } from '@/context/userAttributes.ts'
import { useSelectIds } from '@/hooks/useSelectIds.ts'
import type { Screen } from '@/service'
import CharacterSmallCard from '@/service/Nechronica/components/CharacterSmallCard.tsx'
import GroupBlock from '@/service/Nechronica/components/GroupBlock.tsx'
import ScreenSubTitle from '@/service/Nechronica/components/ScreenSubTitle.tsx'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'
import type { CharacterGroupRelation } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import { typedOmit } from '@/utils/types.ts'

const label = 'グループ'
const authorize = true
const viewMenu = true
const icon = GroupOutlined
/* eslint-disable react-hooks/rules-of-hooks */
const contents = () => {
  const {
    characters,
    characterGroupRelations,
    createCharacterGroup,
    updateCharacterGroup,
    deleteCharacterGroup,
  } = useNechronicaContext()
  const { currentUser } = useUserAttributes()
  const { screenSize } = useScreenContext()

  const useCharacters = characters.filter(
    (c) => c.owner === currentUser?.userName,
  )

  const [selectIds, setSelectIds, onSelectCharacter] = useSelectIds()

  const useCharacterGroups = characterGroupRelations.filter(
    (cg) => cg.owner === currentUser?.userName,
  )

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

  const [affixContainer, setAffixContainer] = useState<HTMLElement | null>(null)

  const groups = useMemo(() => {
    const onGroupDelete = (group: CharacterGroupRelation) => {
      deleteCharacterGroup(group.id)
    }
    const onChangeGroupName = (group: CharacterGroupRelation, name: string) => {
      updateCharacterGroup({
        ...typedOmit(group, 'characters'),
        name,
      })
    }
    const onDeleteCharacter = (
      group: CharacterGroupRelation,
      characterIds: string[],
    ) => {
      updateCharacterGroup({
        ...typedOmit(group, 'characters'),
        characterIds: group.characterIds.filter(
          (id) => !characterIds.includes(id),
        ),
      })
    }
    return useCharacterGroups.map((group) => {
      if (!affixContainer) return null
      return (
        <GroupBlock
          key={group.id}
          group={group}
          affixContainer={affixContainer}
          onAddCharacter={() => setTargetCharacterGroup(group)}
          onGroupDelete={() => onGroupDelete(group)}
          onChangeGroupName={(name) => onChangeGroupName(group, name)}
          onDeleteCharacter={(ids) => onDeleteCharacter(group, ids)}
        />
      )
    })
  }, [
    affixContainer,
    deleteCharacterGroup,
    updateCharacterGroup,
    useCharacterGroups,
  ])

  const createGroupNameInputRef = useRef<InputRef>(null)
  const [newGroupName, setNewGroupName] = useState('')
  const onCreateCharacterGroup = async () => {
    if (!newGroupName) return
    if (characterGroupRelations.some(({ name }) => name === newGroupName))
      return

    setNewGroupName('')
    createGroupNameInputRef?.current?.blur()
    createGroupNameInputRef?.current?.focus()
    createCharacterGroup({
      name: newGroupName,
      characterIds: [],
    })
  }

  return (
    <ScreenContainer title={label} icon={icon} ref={setAffixContainer}>
      <Flex vertical align="stretch" style={{ marginTop: 10, gap: 12 }}>
        <Space.Compact direction="vertical" style={{ alignSelf: 'flex-start' }}>
          <ScreenSubTitle title={`${label}登録`} />
          <Space.Compact>
            <Input
              size="large"
              value={newGroupName}
              placeholder="追加するグループの名前"
              onChange={(e) => setNewGroupName(e.target.value)}
              ref={createGroupNameInputRef}
            />
            <Button size="large" onClick={onCreateCharacterGroup}>
              追加
            </Button>
          </Space.Compact>
        </Space.Compact>
        {groups}
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
}
/* eslint-enable react-hooks/rules-of-hooks */

const packed: Screen = {
  label,
  authorize,
  viewMenu,
  icon,
  contents,
}

export default packed
