import { nechronicaTypes } from '@higanbina/index.ts'
import { Radio } from 'antd'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  selectMakingCharacterType,
  setMakingCharacterType,
} from '@/store/nechronicaSlice.ts'

export default function CharacterTypeRadioGroup() {
  const dispatch = useAppDispatch()
  const { t: i18nT } = useTranslation()
  const characterType = useAppSelector(selectMakingCharacterType)

  return (
    <Radio.Group
      value={characterType}
      onChange={(e) => dispatch(setMakingCharacterType(e.target.value))}
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
