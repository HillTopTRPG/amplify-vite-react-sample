import { type RefObject, useEffect, useRef } from 'react'

interface Props {
  altKey?: boolean
  ctrlKey?: boolean
  metaKey?: boolean
  shiftKey?: boolean
  key: KeyboardEvent['key']
  onKeyDown?: (event: KeyboardEvent) => void
  targetRef?: RefObject<HTMLElement>
}

function useLatest<T>(value: T) {
  const ref = useRef(value)
  ref.current = value
  return ref
}

export default function useKeyBind({
  altKey,
  ctrlKey,
  metaKey,
  shiftKey,
  key,
  onKeyDown,
  targetRef,
}: Props) {
  const onKeyDownLatest = useLatest(onKeyDown)

  useEffect(() => {
    const eventListener = (event: KeyboardEvent) => {
      if (altKey && !event.altKey) return
      if (ctrlKey && !event.ctrlKey) return
      if (metaKey && !event.metaKey) return
      if (shiftKey && !event.shiftKey) return
      if (event.key !== key) return

      onKeyDownLatest.current?.(event)
    }

    if (targetRef?.current) {
      const target = targetRef.current
      target.addEventListener('keydown', eventListener, { passive: true })
      return () => target.removeEventListener('keydown', eventListener)
    } else {
      window.addEventListener('keydown', eventListener, { passive: true })
      return () => window.removeEventListener('keydown', eventListener)
    }
  }, [altKey, ctrlKey, key, metaKey, onKeyDownLatest, shiftKey, targetRef])
}
