import { useMemo } from 'react'
import { getCharacterTypeSrc, getClassSrc } from '@Nechronica/index.ts'
import type { NechronicaType } from '@Nechronica/ts/NechronicaDataHelper.ts'
import mapping from '@Nechronica/ts/mapping.json'
import { SelectOutlined } from '@ant-design/icons'
import { Typography, Flex, theme } from 'antd'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import styles from './CharacterTypeItemSet.module.css'

interface DollsProps {
  type: Extract<NechronicaType, 'doll'>
  num: number
  onClick: () => void
  position?: 1 | 2 | 3 | 4 | 5 | 6
  class?: 1 | 2 | 3 | 4 | 5 | 6 | 7
}

interface EnemiesProps {
  type: Exclude<NechronicaType, 'doll'>
  num: number
  onClick: () => void
}

export default function CharacterTypeItemSet(props: DollsProps | EnemiesProps) {
  const { t: i18nT } = useTranslation()
  const { token } = theme.useToken()

  let src: string
  let text: string
  if (props.type === 'doll') {
    if ('position' in props) {
      src = getCharacterTypeSrc(props.type, props.position!)
      text = mapping.CHARACTER_POSITION[props.position!]?.text ?? '??'
    } else if ('class' in props) {
      src = getClassSrc(props.class!)
      text = mapping.CHARACTER_CLASS[props.class!]?.text ?? '??'
    } else {
      src = getClassSrc(8)
      text = '??'
    }
  } else {
    src = getCharacterTypeSrc(props.type, 0)
    text = i18nT(`Nechronica.CHARACTER_TYPE.${props.type}`)
  }

  const valueText =
    props.type !== 'doll'
      ? props.type === 'legion'
        ? `${props.num}種類`
        : `${props.num}体`
      : props.num
        ? `${props.num}体`
        : '-'

  return useMemo(
    () => (
      <Typography.Link style={{ overflow: 'visible' }}>
        <Flex
          align="stretch"
          gap={20}
          className={classNames(
            styles.container,
            props.num === 0 && styles.empty,
          )}
          onClick={props.onClick}
        >
          <div
            className={styles.image}
            style={{ backgroundImage: `url(${src})` }}
          />
          <Flex vertical align="flex-start" justify="space-evenly">
            <Typography.Text style={{ fontSize: 12 }}>{text}</Typography.Text>
            <Flex
              gap={10}
              align="baseline"
              style={{
                userSelect: 'none',
                color: valueText === '-' ? token.colorTextDisabled : undefined,
              }}
            >
              <span style={{ fontSize: 24 }}>{valueText}</span>
              <SelectOutlined />
            </Flex>
          </Flex>
        </Flex>
      </Typography.Link>
    ),
    [props.num, props.onClick, src, text, token.colorTextDisabled, valueText],
  )
}
