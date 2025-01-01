import { useMemo } from 'react'
import { StarFilled, StarOutlined } from '@ant-design/icons'
import { Button, type CardProps, Checkbox, Flex, Image, Typography } from 'antd'
import classNames from 'classnames'
import { clone } from 'lodash-es'
import styles from './CharacterSmallCard.module.css'
import DeleteConfirmButton from '@/components/DeleteConfirmButton.tsx'
import PublicCard from '@/components/PublicCard.tsx'
import StyledRadar, { makeChartData } from '@/components/StyledRadar.tsx'
import { useScreenContext } from '@/context/screenContext.ts'
import { useUserAttributes } from '@/context/userAttributesContext.ts'
import { getCharacterTypeSrc } from '@/service/Nechronica'
import CharacterSettingButton from '@/service/Nechronica/components/CharacterTypeScreen/CharacterSettingButton.tsx'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'
import { type NechronicaCharacter } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import mapping from '@/service/Nechronica/ts/mapping.json'

type CharacterCardProps = {
  selected: boolean
  character: NechronicaCharacter
  onSelect: (id: string, isSelect: boolean) => void
  onHover: (id: string, isEnter: boolean) => void
  viewType?: 'normal' | 'simple'
}
export default function CharacterSmallCard({
  selected,
  character,
  onSelect,
  onHover,
}: CharacterCardProps) {
  const { updateCharacter, deleteCharacter } = useNechronicaContext()
  const { scope } = useScreenContext()
  const { currentIsMe } = useUserAttributes()

  const toggleStared = useMemo(
    () => () => {
      const newData = clone(character)
      newData.additionalData.stared = !newData.additionalData.stared
      updateCharacter(newData)
    },
    [character, updateCharacter],
  )

  const cardProps: CardProps = useMemo(
    () => ({
      hoverable: false,
      onMouseOverCapture: () => onHover(character.id, true),
      onMouseOutCapture: () => onHover(character.id, false),
      onTouchStartCapture: () => {},
      bordered: false,
      styles: {
        body: {
          padding: 0,
          width: 178,
          position: 'relative',
          overflow: 'hidden',
        },
      },
      style: {
        cursor: 'pointer',
      },
      actions:
        scope === 'private' && currentIsMe
          ? [
              <DeleteConfirmButton
                key={0}
                name={character.name}
                onConfirm={() => deleteCharacter(character.id)}
              />,
              <Button
                type="text"
                onClick={toggleStared}
                icon={
                  character.additionalData.stared ? (
                    <StarFilled />
                  ) : (
                    <StarOutlined />
                  )
                }
              />,
              <CharacterSettingButton character={character} />,
            ]
          : undefined,
    }),
    [scope, currentIsMe, character, toggleStared, onHover, deleteCharacter],
  )

  const basic = character.sheetData.basic

  const constBlocks = useMemo(
    () => (
      <>
        <Flex align="center" style={{ padding: '0 4px' }} gap={5}>
          <Typography.Text style={{ fontSize: 11, lineHeight: '18px' }}>
            {mapping.CHARACTER_POSITION[basic.position].text}
          </Typography.Text>
        </Flex>
        <Flex align="center" style={{ padding: '0 4px' }} gap={5}>
          <Typography.Text style={{ fontSize: 11, lineHeight: '18px' }}>
            {mapping.CHARACTER_CLASS[basic.mainClass].text}
          </Typography.Text>
          <Typography.Text style={{ fontSize: 11, lineHeight: '18px' }}>
            /
          </Typography.Text>
          <Typography.Text style={{ fontSize: 11, lineHeight: '18px' }}>
            {mapping.CHARACTER_CLASS[basic.subClass].text}
          </Typography.Text>
        </Flex>
      </>
    ),
    [basic.mainClass, basic.position, basic.subClass],
  )

  const radarData = makeChartData(character)

  return (
    <PublicCard key={character.id} data={character} cardProps={cardProps}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '-20%',
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <Image
          src={getCharacterTypeSrc(
            character.additionalData.type,
            basic.position,
          )}
          preview={false}
          style={{
            opacity: 0.1,
            width: '140%',
            height: '140%',
            filter: 'blur(2px)',
          }}
        />
      </div>
      <Flex
        align="center"
        justify="flex-end"
        style={{
          position: 'absolute',
          top: 8,
          left: 50,
          right: 10,
          height: 22,
          marginBottom: 8,
          pointerEvents: 'none',
        }}
      >
        <Checkbox checked={selected} />
      </Flex>
      <Flex
        vertical
        gap={3}
        className={classNames(
          styles.hoverable,
          selected ? styles.active : null,
        )}
        style={{ paddingTop: 35 }}
        onClick={() => onSelect(character.id, !selected)}
      >
        <Flex
          vertical
          align="flex-start"
          style={{ flexGrow: 1, padding: '0 10px' }}
        >
          <Typography.Text strong ellipsis style={{ padding: '0 4px' }}>
            {basic.characterName}
          </Typography.Text>
          {character.additionalData.type === 'doll' ? constBlocks : null}
        </Flex>
        <div
          style={{
            width: 180,
            height: 170,
            marginTop: -10,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          <StyledRadar data={radarData} type="small" size={180} />
        </div>
      </Flex>
    </PublicCard>
  )
}
