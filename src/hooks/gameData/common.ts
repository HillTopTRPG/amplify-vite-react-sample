export type PublishObject = {
  readonly id: string
  readonly owner: string
  readonly public: boolean
}

export const sortPublishObjects = (items: PublishObject[]) => {
  const newItems = [...items]
  newItems.sort((a, b) => {
    if (a.id < b.id) return -1
    if (a.id > b.id) return 1
    return 0
  })
  return newItems
}
