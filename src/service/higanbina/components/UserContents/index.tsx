import { useMemo } from 'react'
import { Flex, Spin } from 'antd'
import { useAppSelector } from '@/store'
import { selectUserAttributesLoading } from '@/store/userAttributesSlice.ts'

export default function UserContents() {
  const loading = useAppSelector(selectUserAttributesLoading)

  const contents = useMemo(
    () => (
      <>
        <Flex
          align="flex-start"
          justify="flex-start"
          style={{
            margin: '10px 0',
            alignContent: 'flex-start',
          }}
          wrap
          gap={11}
        >
          aaaa
        </Flex>
      </>
    ),
    [],
  )

  if (loading) return <Spin size="large" />
  return contents
}
