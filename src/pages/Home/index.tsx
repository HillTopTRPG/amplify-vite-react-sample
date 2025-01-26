import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import nechronicaIconImg from '@Nechronica/images/icon.png'
import { CloseOutlined } from '@ant-design/icons'
import { Flex, theme as AntTheme, Layout, Drawer, Button, Menu } from 'antd'
import HomeHeaderContents from './HomeHeaderContents.tsx'
import SystemCard from './SystemCard.tsx'
import useScreenSize from '@/hooks/useScreenSize.ts'
import HomeBackImage from '@/pages/Home/HomeBackImage.tsx'
import HomeFooterContents from '@/pages/Home/HomeFooterContents.tsx'
import HomeTalk from '@/pages/Home/HomeTalk.tsx'
import HomeTextBlock from '@/pages/Home/HomeTextBlock.tsx'
import HomeTitleBlock from '@/pages/Home/HomeTitleBlock.tsx'
import { MENU_LINKS } from '@/pages/Home/constate.ts'
import { themeSelector, useSelector } from '@/store'

const TOOL_DESCRIPTIONS = [
  'Memento Nexusは、TRPGのオンラインセッション環境を補助する、アカウント制のWebツールです。\nTRPGのシステムごとに専用の画面を提供することで、データ項目の準備やアイコンの配置などが最小限の操作で効率よく管理・整理できるようになり、その分ユーザーはゲーム本来の楽しさに集中できるようになります。\n遊び心と技術研鑽を兼ねた趣味制作として、無料でご利用いただけます。',
]
const TOOL_FEATURES = [
  'Memento Nexusの特徴的な機能は以下の2点です。\n- QRコードを使ってスマホをセッション中の補助端末として活用\n- アカウントを作っていないユーザー向けのデータの公開・非公開を設定\n上記以外の機能は個々のTRPGシステム向けの専用機能によります。',
  'Memento Nexusはデータ整理の補助ツールとして、以下の機能は敢えて備えておりません。\n- 画像アップロード機能\n- チャット機能（ダイスボット機能）\nこれらの機能はメインとなる他のオンラインセッションツールまたはプラグインを導入したチャットツール（Discordなど）との併用でご利用ください。',
]

const FONT_URLS = [
  'https://fonts.googleapis.com/css2?family=RocknRoll+One&display=swap',
] as const

const loadFonts = () => {
  const subs = FONT_URLS.map((fontUrl: string) => {
    const link = document.createElement('link')
    link.href = fontUrl
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    return () => {
      document.head
        .querySelectorAll(`[href="${fontUrl}"]`)
        .forEach((e) => e.remove())
    }
  })
  return () => {
    subs.forEach((sub) => sub())
  }
}

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
  const theme = useSelector(themeSelector)
  const { token } = AntTheme.useToken()
  const { isMobile } = useScreenSize(false)
  const navigate = useNavigate()

  useEffect(loadFonts, [])

  const [viewTitleText, setViewTitleText] = useState(true)
  const [zoomUpBack, setZoomUpBack] = useState(0)
  const [viewBackTalk, setViewBackTalk] = useState(false)

  const timerId = useRef<number | null>(null)
  const selectToolAnchorRef = useRef<HTMLDivElement>(null)
  const toolContainerRef = useRef<HTMLDivElement>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

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

    const headerStyle: CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
      gap: 18,
      color: theme === 'dark' ? token.colorBgContainer : token.colorBgBlur,
      borderBottom: `solid 1px ${theme === 'dark' ? '#222' : '#e7e7e7'}`,
      padding: '0 20px',
    }

    const footerStyle: CSSProperties = {
      ...headerStyle,
      padding: '3px 20px 8px 20px',
      height: 64,
    }

    const contentStyle: CSSProperties = {
      backgroundColor: 'transparent',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      height: 'fit-content',
    }

    return (
      <>
        <Layout style={{ overflow: 'hidden', height: '100vh' }}>
          <Layout.Header style={headerStyle}>
            <HomeHeaderContents
              toggleDrawerOpen={() => setDrawerOpen((v) => !v)}
            />
          </Layout.Header>
          <Drawer
            title="Basic Drawer"
            onClose={() => setDrawerOpen(false)}
            open={drawerOpen}
            closeIcon={false}
            width={250}
            extra={
              <Button
                type="text"
                shape="circle"
                icon={<CloseOutlined />}
                onClick={() => setDrawerOpen(false)}
              />
            }
          >
            <Menu
              inlineIndent={10}
              mode="inline"
              style={{ border: 'none' }}
              items={MENU_LINKS.map((info, idx) => ({
                key: idx,
                label: info.label,
                onClick: () => navigate(info.to),
              }))}
              selectable={false}
            />
          </Drawer>
          <Layout
            onScrollCapture={(e) => {
              const scrollTop =
                'scrollTop' in e.target &&
                typeof e.target.scrollTop === 'number'
                  ? e.target.scrollTop
                  : 0
              setViewTitleText(scrollTop < 100)
              const isFinalScroll =
                (toolContainerRef.current?.getBoundingClientRect().top ?? 0) <
                60
              if (isFinalScroll) {
                setZoomUpBack(2)
              } else if (
                (selectToolAnchorRef.current?.getBoundingClientRect().top ??
                  0) < 115
              ) {
                setZoomUpBack(1)
              } else {
                setZoomUpBack(0)
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
            }}
            style={{ flexGrow: 1, overflow: 'hidden', position: 'relative' }}
          >
            <HomeBackImage zoomUpBack={zoomUpBack} />
            <HomeTalk open={viewBackTalk} />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: 'auto',
              }}
            >
              <Layout.Content style={contentStyle}>
                <Flex
                  vertical
                  gap={10}
                  align="center"
                  style={{ height: 'fit-content' }}
                >
                  <HomeTitleBlock view={viewTitleText || zoomUpBack > 0} />
                  <HomeTextBlock
                    texts={TOOL_DESCRIPTIONS}
                    style={{ marginTop: 300 }}
                  />
                  <HomeTextBlock title="特徴" texts={TOOL_FEATURES} />
                  <div ref={selectToolAnchorRef}></div>
                  <Flex
                    wrap
                    vertical={isMobile}
                    gap={12}
                    align="center"
                    justify="center"
                    style={{
                      marginTop: '400px',
                      padding: '0 10px',
                      opacity: zoomUpBack === 1 ? 1 : 0,
                      transition: 'opacity 200ms ease-in-out',
                    }}
                    ref={toolContainerRef}
                  >
                    {toolInfoList.map((tool, idx) => (
                      <SystemCard key={idx} {...tool} />
                    ))}
                  </Flex>
                  <div style={{ paddingBottom: '70vh' }} />
                </Flex>
              </Layout.Content>
            </div>
          </Layout>
          <Layout.Footer style={footerStyle}>
            <HomeFooterContents />
          </Layout.Footer>
        </Layout>
      </>
    )
  }, [
    drawerOpen,
    isMobile,
    navigate,
    theme,
    token.colorBgBlur,
    token.colorBgContainer,
    viewBackTalk,
    viewTitleText,
    zoomUpBack,
  ])
}
