import { type CSSProperties, Fragment, useMemo } from 'react'
import { Flex, Typography } from 'antd'
import styles from '@/pages/Home/CustomFont.module.css'

const TOOL_NAME = 'Memento Nexus'
const TOOL_NAME_KANA = 'メメント ネクサス'

const TITLE_TEXT_STYLE: CSSProperties = {
  color: '#000',
  textShadow: '1px 1px 2px white, 0 0 14px white, 0 0 4px white',
}

interface Props {
  view: boolean
}
export default function HomeTitleBlock({ view }: Props) {
  return useMemo(
    () => (
      <Flex
        vertical
        align="center"
        style={{
          position: 'fixed',
          top: 64,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          margin: '15px auto 230px',
          backgroundColor: 'transparent',
          transition: 'opacity 200ms ease-in-out',
          opacity: view ? 1 : 0,
          pointerEvents: view ? undefined : 'none',
        }}
      >
        <Typography.Text style={{ fontSize: 14, ...TITLE_TEXT_STYLE }}>
          TRPG オンラインセッションをより便利にする補助ツール
        </Typography.Text>
        <Typography.Title
          level={2}
          className={styles.customFont}
          style={{ margin: 0, ...TITLE_TEXT_STYLE }}
        >
          {TOOL_NAME.split(' ').map((n, idx) => (
            <Fragment key={idx}>
              {idx ? ' ' : null}
              <ruby style={{ rubyPosition: 'under' }}>
                {n}
                <rp>(</rp>
                <rt>{TOOL_NAME_KANA.split(' ')[idx]}</rt>
                <rp>)</rp>
              </ruby>
            </Fragment>
          ))}
        </Typography.Title>
      </Flex>
    ),
    [view],
  )
}
