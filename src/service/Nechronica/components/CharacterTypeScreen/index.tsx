import { useCallback, useEffect, useRef, useState } from 'react'
import { type InputRef, Layout, theme } from 'antd'
import CharacterTypeScreenContainer from './CharacterTypeScreenContainer.tsx'
import DetailSider from './DetailSider.tsx'
import { useUserAttributes } from '@/context/userAttributesContext.ts'
import useKeyBind from '@/hooks/useKeyBind.ts'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'
import {
  type NechronicaCharacter,
  type NechronicaType,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

type CharacterTypeScreenProps = { characterType: NechronicaType; label: string }
export default function CharacterTypeScreen({
  characterType,
  label,
}: CharacterTypeScreenProps) {
  const { loading, characters } = useNechronicaContext()
  const { currentUser } = useUserAttributes()
  const { token } = theme.useToken()

  const makeUseCharacters = useCallback(
    () =>
      characters.filter((c) => {
        if (c.additionalData.type !== characterType) return false
        if (!currentUser) return true
        return c.owner === currentUser.userName
      }),
    [characterType, characters, currentUser],
  )

  const [useCharacters, setUseCharacters] =
    useState<NechronicaCharacter[]>(makeUseCharacters)

  useEffect(() => {
    if (loading) return
    setUseCharacters(makeUseCharacters())
  }, [loading, makeUseCharacters])

  const sheetIdInputRef = useRef<InputRef>(null)
  const searchInputRef = useRef<InputRef>(null)

  const affixContainerRef = useRef<HTMLDivElement>(null)

  useKeyBind({
    key: 'k',
    metaKey: true,
    onKeyDown: () => {
      searchInputRef.current?.focus()
    },
  })

  useKeyBind({
    key: 'a',
    metaKey: true,
    onKeyDown: () => {
      sheetIdInputRef.current?.focus()
    },
  })

  const [detailList, setDetailList] = useState<string[]>([])

  // const [searchParams] = useSearchParams()
  //
  // const outputParams = () => {
  //   const filterPosition = searchParams.get('position')
  //   const filterClass = searchParams.get('class')
  //   console.log(
  //     JSON.stringify(
  //       {
  //         filterPosition,
  //         filterClass,
  //       },
  //       null,
  //       2,
  //     ),
  //   )
  // }
  // outputParams()

  return (
    <Layout style={{ backgroundColor: 'transparent', height: '100%' }}>
      <Layout>
        <Layout.Content
          ref={affixContainerRef}
          style={{ overflow: 'hidden scroll', position: 'relative' }}
        >
          <CharacterTypeScreenContainer
            label={label}
            characterType={characterType}
            searchInputRef={searchInputRef}
            affixContainerRef={affixContainerRef}
            useCharacters={useCharacters}
            setDetailList={setDetailList}
          />
        </Layout.Content>
      </Layout>
      <Layout.Sider
        breakpoint="md"
        reverseArrow
        width={420}
        style={{
          backgroundColor: token.colorBgElevated,
          overflow: 'hidden scroll',
          position: 'relative',
        }}
      >
        <DetailSider detailList={detailList} />
      </Layout.Sider>
    </Layout>
  )
}
