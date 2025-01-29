import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flex, Typography } from 'antd'
import SystemCard from './SystemCard.tsx'
import { useDebounce } from '@/hooks/useDebounce.tsx'
import useScreenSize from '@/hooks/useScreenSize.ts'
import HomeLayout from '@/layouts/HomeLayout'
import { TOOL_INFO_LIST } from '@/layouts/HomeLayout/constate.ts'
import HomeBackImage from '@/pages/Home/HomeBackImage.tsx'
import HomeFooter from '@/pages/Home/HomeFooter.tsx'
import HomeTalk from '@/pages/Home/HomeTalk.tsx'
import HomeTextBlock from '@/pages/Home/HomeTextBlock.tsx'
import HomeTitleBlock from '@/pages/Home/HomeTitleBlock.tsx'

const TOOL_DESCRIPTIONS = [
  'Memento Nexusは、TRPGのオンラインセッション環境を補助する、アカウント制のWebツールです。\nTRPGのシステムごとに専用の画面を提供することで、データ項目の準備やアイコンの配置などが最小限の操作で効率よく管理・整理できるようになり、その分ユーザーはゲーム本来の楽しさに集中できるようになります。\n遊び心と技術研鑽を兼ねた趣味制作として、無料でご利用いただけます。',
]
const TOOL_FEATURES = [
  'Memento Nexusの特徴は以下の3点です。\n- TRPGシステムごとに専用のツールがあり、独自の画面・機能が用意されています。\n- QRコードを使ってスマホをセッション中の補助端末として活用\n- アカウントを作っていないユーザー向けのデータの公開・非公開を設定',
  'Memento Nexusはデータ整理の補助ツールとして、以下の機能は敢えて備えておりません。\n- 画像アップロード機能\n- チャット機能（ダイスボット機能）\nこれらの機能はメインとなる他のオンラインセッションツールまたはプラグインを導入したチャットツール（Discordなど）との併用でご利用ください。',
]

const getScrollTop = (): number => {
  return Math.max(document.documentElement.scrollTop, document.body.scrollTop)
}

export default function Home() {
  const { isMobile } = useScreenSize(false)

  const [viewTitleText, setViewTitleText] = useState(true)
  const [status, setStatus] = useState(0)
  const [viewBackTalk, setViewBackTalk] = useState(false)
  const navigate = useNavigate()

  const timerId = useRef<number | null>(null)
  const topAnchorRef = useRef<HTMLDivElement>(null)
  const bottomAnchorRef = useRef<HTMLDivElement>(null)
  const selectToolAnchorRef = useRef<HTMLDivElement>(null)
  const toolContainerRef = useRef<HTMLDivElement>(null)
  const debounce = useDebounce(10)

  const onScroll = useCallback((): void => {
    debounce(() => {
      const scrollTop = getScrollTop()
      setViewTitleText(scrollTop < 100)
      const isFinalScroll =
        (bottomAnchorRef.current?.getBoundingClientRect().top ?? 0) < 150
      if (isFinalScroll) {
        setStatus(2)
      } else if (
        (selectToolAnchorRef.current?.getBoundingClientRect().top ?? 0) < 150
      ) {
        setStatus(1)
      } else {
        setStatus(0)
      }
      if (timerId.current) {
        clearTimeout(timerId.current)
        timerId.current = null
      }
      if (isFinalScroll) {
        timerId.current = window.setTimeout(() => {
          setViewBackTalk(true)
        }, 600)
      } else {
        setViewBackTalk(false)
      }
    })
  }, [debounce])

  useEffect(() => {
    document.addEventListener('scroll', onScroll)
    return (): void => document.removeEventListener('scroll', onScroll)
  }, [onScroll])

  return useMemo(() => {
    return (
      <HomeLayout
        footer={
          <HomeFooter
            status={status}
            refs={[topAnchorRef, selectToolAnchorRef, bottomAnchorRef]}
          />
        }
        layoutBack={
          <>
            <HomeBackImage status={status} />
            <HomeTalk open={viewBackTalk} />
          </>
        }
      >
        <Flex vertical gap={10} align="center">
          <div ref={topAnchorRef}></div>
          <HomeTitleBlock view={viewTitleText || status > 0} status={status} />
          <HomeTextBlock
            texts={TOOL_DESCRIPTIONS}
            style={{ marginTop: 'calc((100vh - 128px) * 0.45)' }}
          />
          <HomeTextBlock
            title="特徴"
            texts={TOOL_FEATURES}
            style={{
              opacity: status ? 0 : 1,
              transition: 'opacity 200ms ease-in-out',
            }}
          />
          <div id="tools" ref={selectToolAnchorRef}></div>
          <Flex
            wrap
            vertical={isMobile}
            gap={12}
            align="center"
            justify="center"
            style={{
              marginTop: 'calc((100vh - 128px - 250px - 34px - 30px))',
              padding: '0 10px',
              opacity: status === 1 ? 1 : 0,
              transition: 'opacity 200ms ease-in-out',
            }}
            ref={toolContainerRef}
          >
            {TOOL_INFO_LIST.map((tool, idx) => (
              <SystemCard
                key={idx}
                {...tool}
                actions={tool.actions?.map((action, idx) => (
                  <Typography.Link
                    key={idx}
                    onClick={() => navigate(action.to)}
                  >
                    {action.label}
                  </Typography.Link>
                ))}
              />
            ))}
          </Flex>
          <div ref={bottomAnchorRef}></div>
          <div style={{ paddingBottom: '100vh' }} />
        </Flex>
      </HomeLayout>
    )
  }, [status, viewBackTalk, viewTitleText, isMobile, navigate])
}
