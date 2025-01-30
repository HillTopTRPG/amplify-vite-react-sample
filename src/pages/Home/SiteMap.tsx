import { type CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import { theme, Typography } from 'antd'
import styles from './SiteMap.module.css'
import Rubies from '@/layouts/HomeLayout/Rubies.tsx'
import { MENU_LINKS, TOOL_INFO_LIST } from '@/layouts/HomeLayout/constate.ts'
import { useAppSelector } from '@/store'
import { selectTheme } from '@/store/themeSlice.ts'

interface Props {
  onHomeNavigate: (refIndex: number) => void
}
export default function SiteMap({ onHomeNavigate }: Props) {
  const { token } = theme.useToken()
  const navigate = useNavigate()
  const themeType = useAppSelector(selectTheme)

  const rgb = themeType === 'dark' ? 0 : 246
  const color = `rgb(${rgb}, ${rgb}, ${rgb})`
  const linkStyle: CSSProperties = {
    backgroundColor: color,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    pointerEvents: 'auto',
    border: '1px solid grey',
    color: token.colorText,
    height: '2em',
  }

  return (
    <div className={styles.sitemap} style={{ color }}>
      <ul>
        <li>
          <Typography.Link onClick={() => onHomeNavigate(0)} style={linkStyle}>
            ホーム
          </Typography.Link>
          <ul>
            <li>
              <Typography.Link
                onClick={() => onHomeNavigate(1)}
                style={linkStyle}
              >
                ツール一覧
              </Typography.Link>
              <ul>
                {TOOL_INFO_LIST.map((tool, idx) => (
                  <li key={idx}>
                    <Typography.Link
                      onClick={() => {
                        const to = tool.actions?.at(0)?.to
                        if (to) navigate(to)
                      }}
                      style={{ ...linkStyle, paddingBottom: 3 }}
                    >
                      <Rubies {...tool} />
                      <Typography.Text
                        style={{
                          color: token.colorTextDescription,
                          fontSize: 10,
                        }}
                      >
                        （{tool.system}）
                      </Typography.Text>
                    </Typography.Link>
                  </li>
                ))}
              </ul>
            </li>
            {MENU_LINKS.map((link, idx) => (
              <li key={idx}>
                <Typography.Link
                  onClick={() => navigate(link.to)}
                  style={linkStyle}
                >
                  {link.label}
                </Typography.Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  )
}
