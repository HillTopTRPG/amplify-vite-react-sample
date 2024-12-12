import jsonp from 'jsonp'

export async function getJsonByGet<T>(
  url: string,
  authorization?: string,
): Promise<T> {
  const headers: HeadersInit = {}
  if (authorization !== undefined) {
    headers.Authorization = authorization
  }

  const result: Response = await window.fetch(url, { method: 'GET', headers })

  const status = result.status
  if (status !== 200) {
    const errMsg = await result.text()
    throw new Error(`${status}: ${errMsg} [GET] ${url}`)
  }

  return (await result.json()) as T
}

export async function getJsonByJsonp<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    jsonp(
      url,
      { name: 'getJson', timeout: 10000 },
      (error: Error | null, data: unknown) => {
        if (error) reject(error)
        resolve(data as T)
      },
    )
  })
}
