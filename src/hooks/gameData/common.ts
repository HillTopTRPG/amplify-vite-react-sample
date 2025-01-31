export type PublishObject = {
  readonly id: string
  readonly owner: string
  readonly public: boolean
}

export const sortPublishObjects = (items: PublishObject[]) =>
  structuredClone(items).sort((a, b) => a.id.localeCompare(b.id))
