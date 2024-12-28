import { useState } from 'react'

export function useSelectIds() {
  const [selectedIds, setSelectIds] = useState<string[]>([])

  const onSelectItem = (id: string, isSelect: boolean) => {
    if (isSelect) {
      setSelectIds([id, ...selectedIds])
    } else {
      setSelectIds(selectedIds.filter((c) => c !== id))
    }
  }

  return [selectedIds, setSelectIds, onSelectItem] as const
}
