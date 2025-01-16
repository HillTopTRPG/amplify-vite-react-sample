import { Radio } from 'antd'
import { useTranslation } from 'react-i18next'
import { nechronicaTypes } from '@/service/Nechronica'
import { useCharacterMakeContext } from '@/service/Nechronica/components/BuildContents/context.ts'

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
