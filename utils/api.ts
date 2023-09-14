import axios from "axios"

export type JsonQueryString = Record<
  string,
  string | number | boolean | number[] | string[] | undefined
>

const apiAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

Object.freeze(apiAxios)
export default apiAxios

export type FetchOptions = {
  query?: JsonQueryString
  signal?: AbortSignal
}

export async function fetch<T>(
  endpoint: string,
  props?: FetchOptions,
): Promise<T> {
  const queryString = props?.query ? `?${generateQueryString(props.query)}` : ""
  return (
    await apiAxios.get(`${endpoint}${queryString}`, {
      signal: props?.signal,
    })
  ).data
}

export function generateQueryString(jsonQueryString: JsonQueryString): string {
  if (!jsonQueryString) return ""

  const queryString: string[] = []
  Object.keys(jsonQueryString).forEach((key) => {
    const data = jsonQueryString[key]

    if (data === "" || data === undefined || data === null) return

    let query = ""
    if (Array.isArray(data))
      query = data.map((value) => `${key}=${value}`).join("&")
    else query = `${key}=${data}`

    queryString.push(query)
  })

  return queryString.join("&")
}

export function getTotalPages(total: number, perPage: number): number {
  if (total === 0) return 1
  return Math.ceil(total / perPage)
}
