import { useEffect } from 'react'

const FONT_URLS = [
  'https://fonts.googleapis.com/css2?family=RocknRoll+One&display=swap',
] as const

const loadFonts = () => {
  const subs = FONT_URLS.map((fontUrl: string) => {
    const link = document.createElement('link')
    link.href = fontUrl
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    return () => {
      document.head
        .querySelectorAll(`[href="${fontUrl}"]`)
        .forEach((e) => e.remove())
    }
  })
  return () => {
    subs.forEach((sub) => sub())
  }
}
export default function useTitleCustomFont() {
  useEffect(loadFonts, [])
}
