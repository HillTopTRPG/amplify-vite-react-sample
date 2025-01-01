import { useCallback, useMemo, useState } from 'react'
import { SelectOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Button, Flex, Popover, QRCode, Switch, Typography } from 'antd'
import { clone, omit } from 'lodash-es'
import { useScreenContext } from '@/context/screenContext.ts'
import { type CharacterGroup } from '@/service'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'

export default function GroupShareButton({ group }: { group: CharacterGroup }) {
  const [open, setOpen] = useState(false)
  const { updateCharacterGroup } = useNechronicaContext()
  const { getScreenUrl } = useScreenContext()
  const shareUrl = useMemo(
    () =>
      getScreenUrl({
        scope: 'public',
        screen: 'groups',
        urlParam: group.id,
      }),
    [getScreenUrl, group.id],
  )
  const onChangeGroupPublic = useCallback(
    (nextPublic: boolean) => {
      const newValue = omit(clone(group), 'characters')
      newValue.public = nextPublic
      updateCharacterGroup(newValue)
      setOpen(false)
    },
    [group, updateCharacterGroup],
  )

  return (
    <Popover
      title="共有"
      trigger="click"
      open={open}
      onOpenChange={(v) => setOpen(v)}
      content={
        <Flex vertical align="flex-start" gap={6}>
          <Switch
            checkedChildren="有効"
            unCheckedChildren="無効"
            onChange={(v) => onChangeGroupPublic(v)}
            defaultValue={group.public}
          />
          <Flex align="center" gap={6}>
            <Typography.Text style={{ color: 'inherit' }}>
              <Typography.Link href={shareUrl} target="_blank">
                シェアページのリンク
                <SelectOutlined />
              </Typography.Link>
            </Typography.Text>
            <Typography.Text
              copyable={{ format: 'text/plain', text: shareUrl }}
            />
          </Flex>
          <QRCode value={shareUrl} size={100} />
        </Flex>
      }
    >
      <Button type="text" icon={<ShareAltOutlined />} />
    </Popover>
  )
}