import { type CSSProperties } from 'react'
import { getCharacterTypeSrc } from '@higanbina/index.ts'
import { type NechronicaCharacter } from '@higanbina/ts/NechronicaDataHelper.ts'
import { Image } from 'antd'

const containerStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
}
const imageStyle: CSSProperties = {
  opacity: 0.1,
  width: '140%',
  height: '140%',
  filter: 'blur(1.2px)',
}

interface Props {
  character: NechronicaCharacter
}
export default function CharacterSmallCardBackImg({ character }: Props) {
  const type = character.additionalData.type
  const position = character.sheetData.basic.position

  return (
    <div style={containerStyle}>
      <Image
        src={getCharacterTypeSrc(type, position)}
        preview={false}
        style={imageStyle}
      />
    </div>
  )
}
