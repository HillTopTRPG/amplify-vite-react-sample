import { useCharacterMakeContext } from '@Nechronica/components/BuildContents/context.ts'
import { nechronicaTypes } from '@Nechronica/index.ts'
import { Radio } from 'antd'
import { useTranslation } from 'react-i18next'

export default function CharacterTypeRadioGroup() {
  const { t: i18nT } = useTranslation()
  const { characterType, setCharacterType } = useCharacterMakeContext()

  return (
    <Radio.Group
      value={characterType}
      onChange={(e) => setCharacterType(e.target.value)}
      options={nechronicaTypes.map((nt) => ({
        label: i18nT(`Nechronica.CHARACTER_TYPE.${nt}`),
        value: nt,
        style: { whiteSpace: 'nowrap' },
      }))}
      optionType="button"
      buttonStyle="solid"
    />
  )
}
