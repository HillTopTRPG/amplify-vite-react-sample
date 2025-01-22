import { nechronicaTypes } from '@Nechronica/index.ts'
import { Radio } from 'antd'
import { useTranslation } from 'react-i18next'
import {
  makingNechronicaCharacterTypeSelector,
  useAppDispatch,
  useSelector,
} from '@/store'
import { setMakingCharacterType } from '@/store/nechronicaSlice.ts'

export default function CharacterTypeRadioGroup() {
  const dispatch = useAppDispatch()
  const { t: i18nT } = useTranslation()
  const characterType = useSelector(makingNechronicaCharacterTypeSelector)

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
