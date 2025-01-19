import { useId } from 'react'
import { posSelections } from '@Nechronica/ts/NechronicaDataHelper.ts'
import { Select, Space, theme, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

interface Props {
  value: number
  onChange: (value: number) => void
}
export default function SelectRoiceId({ value, onChange }: Props) {
  const { t: i18nT } = useTranslation()
  const { token } = theme.useToken()
  const id = useId()
  return (
    <Space.Compact style={{ alignItems: 'stretch', justifyItems: 'center' }}>
      <label
        htmlFor={id}
        style={{
          whiteSpace: 'nowrap',
          borderStyle: 'solid',
          borderWidth: '1px 0 1px 1px',
          borderColor: token.colorBorderBg,
          borderRadius: `${token.borderRadius}px 0 0 ${token.borderRadius}px`,
          paddingLeft: 11,
          paddingRight: 11,
          display: 'flex',
          alignItems: 'center',
          justifyItems: 'center',
        }}
      >
        <Typography.Text strong style={{ fontSize: 'inherit' }}>
          種類
        </Typography.Text>
      </label>
      <Select
        id={id}
        showSearch
        value={value}
        onChange={onChange}
        optionFilterProp="label"
        options={posSelections.map((s) => ({
          label: s.value ? `${i18nT(s.text)}(${i18nT(s.subTitle)})` : '-',
          value: s.value,
        }))}
        style={{ width: '15rem' }}
      />
    </Space.Compact>
  )
}
