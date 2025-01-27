import { type ReactNode, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import nechronicaIconImg from '@Nechronica/images/icon.png'
import { Flex } from 'antd'
import SystemCard from './SystemCard.tsx'
import { useDebounce } from '@/hooks/useDebounce.tsx'
import useScreenSize from '@/hooks/useScreenSize.ts'
import HomeLayout from '@/layouts/HomeLayout'
import HomeBackImage from '@/pages/Home/HomeBackImage.tsx'
import HomeFooterContents from '@/pages/Home/HomeFooterContents.tsx'
import HomeTalk from '@/pages/Home/HomeTalk.tsx'
import HomeTextBlock from '@/pages/Home/HomeTextBlock.tsx'
import HomeTitleBlock from '@/pages/Home/HomeTitleBlock.tsx'

const TOOL_DESCRIPTIONS = [
  'Memento Nexusは、TRPGのオンラインセッション環境を補助する、アカウント制のWebツールです。\nTRPGのシステムごとに専用の画面を提供することで、データ項目の準備やアイコンの配置などが最小限の操作で効率よく管理・整理できるようになり、その分ユーザーはゲーム本来の楽しさに集中できるようになります。\n遊び心と技術研鑽を兼ねた趣味制作として、無料でご利用いただけます。',
]
const TOOL_FEATURES = [
  'Memento Nexusの特徴的な機能は以下の2点です。\n- QRコードを使ってスマホをセッション中の補助端末として活用\n- アカウントを作っていないユーザー向けのデータの公開・非公開を設定\n上記以外の機能は個々のTRPGシステム向けの専用機能によります。',
  'Memento Nexusはデータ整理の補助ツールとして、以下の機能は敢えて備えておりません。\n- 画像アップロード機能\n- チャット機能（ダイスボット機能）\nこれらの機能はメインとなる他のオンラインセッションツールまたはプラグインを導入したチャットツール（Discordなど）との併用でご利用ください。',
]

type ToolInfo = {
  toolName: string
  toolNameKana: string
  since: string
  version: string
  iconImg: string
  systems: string[]
  features: string[]
  description: string
  badge: string
  actions?: ReactNode[]
}

export default function Home() {
  const { isMobile } = useScreenSize(false)

  const [viewTitleText, setViewTitleText] = useState(true)
  const [status, setStatus] = useState(0)
  const [lastStatus, setLastStatus] = useState(0)
  const [viewBackTalk, setViewBackTalk] = useState(false)

  const timerId = useRef<number | null>(null)
  const topAnchorRef = useRef<HTMLDivElement>(null)
  const bottomAnchorRef = useRef<HTMLDivElement>(null)
  const selectToolAnchorRef = useRef<HTMLDivElement>(null)
  const toolContainerRef = useRef<HTMLDivElement>(null)
  const debounce = useDebounce(10)

  return useMemo(() => {
    const toolInfoList: ToolInfo[] = [
      {
        toolName: '彼岸雛',
        toolNameKana: 'ヒガンビナ',
        since: '2025-XX-XX',
        version: '0.0.0',
        iconImg: nechronicaIconImg,
        systems: ['永い後日談のネクロニカ'],
        features: ['キャラ管理️', 'キャラメイク', 'セッション'],
        description:
          'Waddlefyのネクロニカ専用機能を\n更にパワーアップさせた超力作',
        badge: 'おすすめ',
        actions: [
          <Link to="/public/nechronica" key={0}>
            利用する
          </Link>,
        ],
      },
    ]

    const onScroll = (scrollTop: number) => {
      debounce(() => {
        setViewTitleText(scrollTop < 100)
        const isFinalScroll =
          (toolContainerRef.current?.getBoundingClientRect().top ?? 0) < 60
        setLastStatus(status)
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
          }, 100)
        } else {
          setViewBackTalk(false)
        }
      })
    }

    return (
      <HomeLayout
        footerContents={
          <HomeFooterContents
            status={status}
            refs={[topAnchorRef, selectToolAnchorRef, bottomAnchorRef]}
          />
        }
        layoutBack={
          <>
            <HomeBackImage status={status} lastStatus={lastStatus} />
            <HomeTalk open={viewBackTalk} />
          </>
        }
        onScrollCapture={(e) => {
          const scrollTop =
            'scrollTop' in e.target && typeof e.target.scrollTop === 'number'
              ? e.target.scrollTop
              : 0
          onScroll(scrollTop)
        }}
      >
        <Flex
          vertical
          gap={10}
          align="center"
          style={{ height: 'fit-content' }}
        >
          <div ref={topAnchorRef}></div>
          <HomeTitleBlock view={viewTitleText || status > 0} />
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
          <div ref={selectToolAnchorRef}></div>
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
            {toolInfoList.map((tool, idx) => (
              <SystemCard key={idx} {...tool} />
            ))}
          </Flex>
          <div ref={bottomAnchorRef}></div>
          <div style={{ paddingBottom: '70vh' }} />
        </Flex>
      </HomeLayout>
    )
  }, [status, lastStatus, viewBackTalk, viewTitleText, isMobile, debounce])
}
