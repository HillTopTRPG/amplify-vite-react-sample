import nechronicaIconImg from '@higanbina/images/icon.png'

type ToolInfo = {
  name: string
  kana: string
  since: string
  version: string
  iconImg: string
  system: string
  features: string[]
  description: string
  badge: string
  actions?: { to: string; label: string }[]
}

export const MENU_LINKS = [
  {
    label: '利用規約',
    to: '/rules',
  },
  {
    label: 'プライバシーポリシー',
    to: '/privacy',
  },
  {
    label: 'ヘルプ',
    to: '/help',
  },
  {
    label: 'お問い合わせ',
    to: '/inquiry',
  },
]

export const TOOL_INFO_LIST: ToolInfo[] = [
  {
    name: '彼岸雛',
    kana: 'ヒガンビナ',
    since: '2025-XX-XX',
    version: '0.0.0',
    iconImg: nechronicaIconImg,
    system: '永い後日談のネクロニカ',
    features: ['キャラ管理️', 'キャラメイク', 'シナリオ管理', 'セッション'],
    description: 'Waddlefyのネクロニカ専用機能を\n更にパワーアップさせた超力作',
    badge: '',
    actions: [{ to: '/higanbina', label: '利用する' }],
  },
]
