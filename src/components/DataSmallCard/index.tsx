import {
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  useState,
} from 'react'
import {
  CloseOutlined,
  MenuOutlined,
  ShareAltOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons'
import {
  Badge,
  Button,
  Card,
  type CardProps,
  Checkbox,
  Flex,
  theme,
  Typography,
} from 'antd'
import classNames from 'classnames'
import CardDrawer from './CardDrawer.tsx'
import {
  SmallCardDataProvider,
  useSmallCardDataContext,
} from '@/components/DataSmallCard/context.ts'
import { useScreenContext } from '@/context/screenContext.ts'
import { useUserAttributes } from '@/context/userAttributesContext.ts'
import styles from '@/service/Nechronica/components/Hoverable.module.css'

const cardStyle: CSSProperties = {
  width: 180,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  boxShadow:
    'rgba(127, 127, 127, 0.16) 0px 6px 16px 0px, rgba(127, 127, 127, 0.24) 0px 3px 6px -4px, rgba(127, 127, 127, 0.1) 0px 9px 28px 8px',
}

const cardHeaderStyle: CSSProperties = {
  position: 'absolute',
  top: 8,
  left: 44,
  right: 11,
  height: 22,
  marginBottom: 8,
  pointerEvents: 'none',
}

const cardBodyStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  zIndex: 0,
}

const contentsContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  padding: '35px 14px 14px',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
}

export type SmallCardData = {
  public: boolean
  owner: string
  name: string
  additionalData: { stared: boolean }
}

interface Props {
  data: SmallCardData
  cardProps: CardProps
  selected?: boolean
  shareDrawerContents: ReactNode
  operationDrawerContents: (operateType: string) => ReactNode
  backgroundElm?: ReactNode
  contentsContainerProps: HTMLAttributes<HTMLElement>
  children: ReactNode
}
export default function DataSmallCard({
  data,
  cardProps,
  selected,
  shareDrawerContents,
  operationDrawerContents,
  backgroundElm,
  contentsContainerProps,
  children,
}: Props) {
  const { token } = theme.useToken()
  const { currentIsMe } = useUserAttributes()
  const { scope } = useScreenContext()
  const [shareOpen, setShareOpen] = useState(false)
  const [operateOpen, setOperateOpen] = useState<string>('')
  return (
    <Badge.Ribbon
      placement="start"
      text={data.public ? '公開' : '非公開'}
      color={data.public ? 'blue' : 'orange'}
      style={{ display: 'flex' }}
    >
      <SmallCardDataProvider
        data={data}
        shareOpen={shareOpen}
        setShareOpen={setShareOpen}
        operateOpen={operateOpen}
        setOperateOpen={setOperateOpen}
      >
        <Card
          bordered={false}
          hoverable={false}
          {...cardProps}
          actions={
            scope === 'private' && currentIsMe ? cardProps.actions : undefined
          }
          style={{
            ...cardStyle,
            ...cardProps.style,
          }}
          styles={{
            ...cardProps.styles,
            body: {
              padding: 0,
              flexGrow: 1,
              ...cardProps.styles?.body,
            },
          }}
        >
          <Flex align="center" justify="flex-end" style={cardHeaderStyle}>
            {scope === 'private' && currentIsMe ? null : (
              <Typography.Text
                ellipsis
                italic
                style={{
                  fontSize: 11,
                  color: token.colorTextDescription,
                  flexGrow: 1,
                }}
              >
                @{data.owner ?? ''}
              </Typography.Text>
            )}
            {selected !== undefined ? (
              <Checkbox style={{ alignSelf: 'flex-end' }} checked={selected} />
            ) : null}
          </Flex>
          <div style={cardBodyStyle}>
            <CardDrawer
              data={data}
              open={shareOpen}
              onClose={() => setShareOpen(false)}
            >
              {shareDrawerContents}
            </CardDrawer>
            <CardDrawer
              data={data}
              open={operateOpen}
              onClose={() => setOperateOpen('')}
            >
              {operationDrawerContents(operateOpen)}
            </CardDrawer>
            {backgroundElm}
            <Typography.Link
              {...contentsContainerProps}
              className={classNames(
                styles.hoverable,
                selected ? styles.active : null,
              )}
              style={contentsContainerStyle}
            >
              {children}
            </Typography.Link>
          </div>
        </Card>
      </SmallCardDataProvider>
    </Badge.Ribbon>
  )
}

function FavoriteButton({ toggle }: { toggle: () => void }) {
  const { data } = useSmallCardDataContext()
  return (
    <Button
      type="text"
      onClick={toggle}
      icon={data?.additionalData?.stared ? <StarFilled /> : <StarOutlined />}
    />
  )
}
DataSmallCard.FavoriteButton = FavoriteButton

function ShareButton() {
  const { shareOpen, toggleShare } = useSmallCardDataContext()
  return (
    <Button
      type="text"
      onClick={toggleShare}
      icon={shareOpen ? <CloseOutlined /> : <ShareAltOutlined />}
    />
  )
}
DataSmallCard.ShareButton = ShareButton

function OperateButton({ operateType }: { operateType: string }) {
  const { operateOpen, toggleOperate } = useSmallCardDataContext()
  return (
    <Button
      type="text"
      onClick={() => toggleOperate(operateType)}
      icon={operateOpen ? <CloseOutlined /> : <MenuOutlined />}
    />
  )
}
DataSmallCard.OperateButton = OperateButton
