import { EditOutlined, TagOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  type CardProps,
  Flex,
  List,
  Select,
  Space,
  Tag,
  theme,
  Typography,
} from 'antd'
import { type TextProps } from 'antd/es/typography/Text'
import { useTranslation } from 'react-i18next'
import { useScreenContext } from '@/context/screen.ts'
import { type NechronicaCharacter, PARTS_TUPLE } from '@/service/Nechronica'
import CharacterAvatar from '@/service/Nechronica/components/CharacterAvatar.tsx'
import ClassAvatar from '@/service/Nechronica/components/ClassAvatar.tsx'
import PartsListItem from '@/service/Nechronica/components/PartsListItem.tsx'
import RoiceButton from '@/service/Nechronica/components/RoiceButton.tsx'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'
import {
  NechronicaDataHelper,
  type NechronicaManeuver,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import mapping from '@/service/Nechronica/ts/mapping.json'
import { clone } from '@/service/common/PrimaryDataUtility.ts'

const MANEUVER_LINE_RANGE = [3, 8] as const

function getManeuverLineNum(maneuvers: NechronicaManeuver[]) {
  const lineManeuverMax = PARTS_TUPLE.map(
    (tuple) => maneuvers.filter((m) => tuple[1].includes(m.parts)).length,
  ).reduce((prev, curr) => (prev > curr ? prev : curr))
  return lineManeuverMax < MANEUVER_LINE_RANGE[0]
    ? MANEUVER_LINE_RANGE[0]
    : lineManeuverMax > MANEUVER_LINE_RANGE[1]
      ? MANEUVER_LINE_RANGE[1]
      : lineManeuverMax
}

type CharacterCardProps = { character: NechronicaCharacter }
export default function CharacterCard({ character }: CharacterCardProps) {
  const { updateCharacter, deleteCharacter } = useNechronicaContext()
  const { screenSize } = useScreenContext()
  const containerWidth =
    70 + getManeuverLineNum(character.sheetData.maneuverList) * 60
  const { token } = theme.useToken()
  const { t: i18nT } = useTranslation()

  const reloadCharacter = async () => {
    const fetchData = await NechronicaDataHelper.fetch(character.sheetId)
    if (!fetchData) return
    updateCharacter(character.id, 'doll', fetchData)
  }

  const onDeleteCharacter = () => {
    deleteCharacter(character.id)
  }

  const onChangeCharacterName = (newValue: string) => {
    const newData = clone(character)
    newData.sheetData.basic.characterName = newValue
    updateCharacter(newData.id, newData.type, newData.sheetData)
  }

  const onChangeBasePosition = (newValue: number) => {
    const newData = clone(character)
    newData.sheetData.basic.basePosition = newValue
    updateCharacter(newData.id, newData.type, newData.sheetData)
  }

  const cardProps: CardProps = {
    actions: [
      <Button onClick={reloadCharacter}>再読込</Button>,
      <Button onClick={onDeleteCharacter}>削除</Button>,
    ],
    styles: {
      body: {
        padding: '8px 3px',
        width: containerWidth,
        maxWidth: screenSize.viewPortWidth,
        overflow: 'hidden',
      },
    },
    style: {
      backgroundColor: token.colorBgElevated,
    },
  }

  const classDividerProps: TextProps = {
    style: {
      fontSize: 10,
      alignSelf: 'flex-end',
      padding: '0 3px',
    },
  }

  const basic = character.sheetData.basic
  const isSameClass = basic.mainClass === basic.subClass

  const basicPositionSelect = (
    <>
      <Flex vertical>
        <Typography.Text strong style={{ fontSize: 10 }}>
          初期配置
        </Typography.Text>
        <Select
          value={basic.basePosition}
          onChange={onChangeBasePosition}
          options={mapping.CHARACTER_LOCATION.map((l) => ({
            value: l['init-pos-value'],
            label: i18nT(l.text) || '-',
          }))}
        />
      </Flex>
    </>
  )

  return (
    <Card {...cardProps}>
      <Flex vertical gap={3}>
        <Flex align="center">
          <Tag icon={<TagOutlined />}>タグなし</Tag>
          <Button type="text" icon={<EditOutlined />} />
        </Flex>
        <Flex
          align="flex-end"
          justify="flex-start"
          style={{ padding: '6px 3px' }}
        >
          <CharacterAvatar type={character.type} position={basic.position} />
          <Flex vertical justify="flex-end" style={{ flexGrow: 1 }} gap={6}>
            <Typography.Text
              strong
              editable={{ onChange: onChangeCharacterName }}
            >
              {character.sheetData.basic.characterName}
            </Typography.Text>
            <Flex align="center">
              <Typography.Text {...classDividerProps}>/</Typography.Text>
              <ClassAvatar value={basic.mainClass} />
              {isSameClass ? null : (
                <>
                  <Typography.Text {...classDividerProps}>/</Typography.Text>
                  <ClassAvatar value={basic.subClass} />
                </>
              )}
              <Flex justify="center" align="center" style={{ flexGrow: 1 }}>
                {basicPositionSelect}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Space wrap={true} size={4} style={{ padding: '0 3px' }}>
          {character.sheetData.roiceList.map((roice, index) => (
            <RoiceButton key={index} roice={roice} />
          ))}
        </Space>
        <List>
          {PARTS_TUPLE.map(([src, parts], index) => (
            <PartsListItem
              key={index}
              maneuverList={character.sheetData.maneuverList}
              src={src}
              parts={parts}
              basic={character.sheetData.basic}
            />
          ))}
        </List>
      </Flex>
    </Card>
  )
}
