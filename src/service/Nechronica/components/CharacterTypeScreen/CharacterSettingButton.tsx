import { useCallback, useState } from 'react'
import { ShareAltOutlined } from '@ant-design/icons'
import { Button, Flex, Popover, Switch } from 'antd'
import { clone } from 'lodash-es'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'
import { type NechronicaCharacter } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

export default function CharacterSettingButton({
  character,
}: {
  character: NechronicaCharacter
}) {
  const [open, setOpen] = useState(false)

  const { updateCharacter } = useNechronicaContext()
  const onChangeCharacterPublic = useCallback(
    (nextPublic: boolean) => {
      const newValue = clone(character)
      newValue.public = nextPublic
      updateCharacter(newValue)
      setOpen(false)
    },
    [character, updateCharacter],
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
            onChange={(v) => onChangeCharacterPublic(v)}
            defaultValue={character.public}
          />
        </Flex>
      }
    >
      <Button type="text" icon={<ShareAltOutlined />} />
    </Popover>
  )
}
