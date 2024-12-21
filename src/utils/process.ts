export async function sequentialPromiseReduce<T>(
  list: T[],
  process: (v: T) => void,
) {
  return list.reduce(
    async (acc, v) => {
      await acc
      return process(v)
    },
    new Promise<void>((resolve) => resolve()),
  )
}
