import { SelectOutlined } from '@ant-design/icons'
import { Badge, Flex, theme, Typography } from 'antd'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import styles from './CharacterTypeIcon.module.css'
import { getCharacterTypeSrc, getClassSrc } from '@/service/Nechronica'
import type { NechronicaType } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import mapping from '@/service/Nechronica/ts/mapping.json'

const SIZE = 64

export default function CharacterTypeIcon(
  props:
    | {
        type: Exclude<NechronicaType, 'doll'>
        num: number
        onClick: () => void
      }
    | {
        type: Extract<NechronicaType, 'doll'>
        num: number
        onClick: () => void
        position?: 1 | 2 | 3 | 4 | 5 | 6
        class?: 1 | 2 | 3 | 4 | 5 | 6 | 7
      },
) {
  const { t: i18nT } = useTranslation()
  const { token } = theme.useToken()
  let src: string
  let text: string
  let deg: string
  let distance: string
  if (props.type === 'doll') {
    if ('position' in props) {
      src = getCharacterTypeSrc(props.type, props.position!)
      text = mapping.CHARACTER_POSITION[props.position!]?.text ?? '??'
      // deg = `${((props.position > 3 ? props.position + 1 : props.position) - 0.5) * (360 / 7) + 270}deg`
      deg = `${(props.position! - 1) * (360 / 6) + 270}deg`
      distance = '140px'
    } else if ('class' in props) {
      src = getClassSrc(props.class!)
      text = mapping.CHARACTER_CLASS[props.class!]?.text ?? '??'
      deg = `${(props.class! - 1) * (360 / 7) + 270}deg`
      distance = '140px'
    } else {
      src = getClassSrc(8)
      text = '??'
      deg = '0deg'
      distance = '140px'
    }
  } else {
    src = getCharacterTypeSrc(props.type, 0)
    text = i18nT(`Nechronica.CHARACTER_TYPE.${props.type}`)
    deg = `${['savant', 'horror', 'legion'].indexOf(props.type) * (360 / 3) + 270}deg`
    distance = '140px'
  }

  return (
    <div
      className={styles.container}
      style={{
        ['--deg' as never]: deg,
        ['--deg-neg' as never]: `-${deg}`,
        ['--distance' as never]: distance,
      }}
      onClick={props.onClick}
    >
      <Flex
        vertical
        className={classNames(styles.contents, props.num === 0 && styles.empty)}
        align="center"
        gap={5}
      >
        <Typography.Text
          style={{
            fontSize: 13,
            height: 14,
            marginTop: -14,
            color: token.colorLink,
          }}
        >
          {text}
          <SelectOutlined style={{ fontSize: 10 }} />
        </Typography.Text>
        <Badge
          count={props.num}
          offset={[0, 50]}
          style={{ zIndex: 1 }}
          overflowCount={99}
          styles={{
            indicator: {
              fontSize: 16,
              width: 30,
              height: 30,
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}
          color="blue"
        >
          <div
            className={styles.image}
            style={{
              backgroundImage: `url(${src})`,
              width: SIZE,
              height: SIZE,
              zIndex: 0,
            }}
          />
        </Badge>
      </Flex>
    </div>
  )
}
