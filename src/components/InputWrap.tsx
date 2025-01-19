import { forwardRef, type KeyboardEvent, type Ref, useState } from 'react'
import { Input, type InputProps, type InputRef } from 'antd'

const InputWrap = forwardRef<InputRef, InputProps>(function Component(
  props: InputProps,
  ref: Ref<InputRef>,
) {
  // 入力の変換モードの管理
  const [isComposing, setIsComposing] = useState(false)
  const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!props.onPressEnter) return
    if (isComposing) return
    props.onPressEnter(e)
  }
  return (
    <Input
      {...props}
      onCompositionStart={() => setIsComposing(true)}
      onCompositionEnd={() => setIsComposing(false)}
      onPressEnter={onPressEnter}
      ref={ref}
    />
  )
})

export default InputWrap
