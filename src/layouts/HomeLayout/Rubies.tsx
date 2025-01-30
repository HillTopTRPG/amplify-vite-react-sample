import { Fragment } from 'react'

interface Props {
  name: string
  kana: string
}
export default function Rubies({ name, kana }: Props) {
  return name.split(' ').map((n, idx) => (
    <Fragment key={idx}>
      {idx ? ' ' : null}
      <ruby style={{ rubyPosition: 'under' }}>
        {n}
        <rp>(</rp>
        <rt>{kana.split(' ')[idx]}</rt>
        <rp>)</rp>
      </ruby>
    </Fragment>
  ))
}
