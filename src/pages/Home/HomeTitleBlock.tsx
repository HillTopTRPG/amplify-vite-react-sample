import { type CSSProperties, useMemo } from 'react'
import { Flex, Typography } from 'antd'
import Rubies from '@/layouts/HomeLayout/Rubies.tsx'
import styles from '@/pages/Home/CustomFont.module.css'

const TOOL_NAME = 'Memento Nexus'
const TOOL_NAME_KANA = 'メメント ネクサス'

const TITLE_TEXT_STYLE: CSSProperties = {
  color: '#000',
  textShadow: '1px 1px 2px white, 0 0 14px white, 0 0 4px white',
}

interface Props {
  view: boolean
  status: number
}
export default function HomeTitleBlock({ view, status }: Props) {
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
          transition: 'opacity 200ms ease-in-out',
          opacity: view ? 1 : 0,
          pointerEvents: 'none',
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
          <Rubies name={TOOL_NAME} kana={TOOL_NAME_KANA} />
        </Typography.Title>
        {status > 0 ? (
          <Typography.Title
            level={4}
            className={styles.customFont}
            style={{ margin: '20px 0 0', ...TITLE_TEXT_STYLE }}
          >
            {status === 1 ? 'ツール一覧' : ''}
          </Typography.Title>
        ) : null}
      </Flex>
    ),
    [view, status],
  )
}
