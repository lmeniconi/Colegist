import { useQuery } from "@tanstack/react-query"
import { FetchOptions, JsonQueryString, fetch } from "../utils/api"
import { Modify } from "../types/Utils"
import { Paginated } from "../types/Api"

type UseQueryOptions = FetchOptions & {
  enabled?: boolean
  cacheTime?: number
  refetchOnMount?: boolean
  refetchOnReconnect?: boolean
  refetchInterval?: number | false
  retry?: boolean | number
}

export type useQueryListOptions = UseQueryOptions

export function useQueryList<T>(path: string, options?: useQueryListOptions) {
  if (options?.query?.page)
    throw new Error("useQueryList does not support pagination")

  return useQuery({
    queryKey: [path, options?.query],
    queryFn: ({ signal }) =>
      fetch<T[]>(path, {
        ...options,
        signal,
      }),
    refetchOnWindowFocus: false,
    ...options,
  })
}

export type useQueryListPaginatedQuery = JsonQueryString & { page: number }
export type useQueryListPaginatedOptions = Modify<
  UseQueryOptions,
  {
    query: useQueryListPaginatedQuery
  }
>

export function useQueryListPaginated<T>(
  path: string,
  options: useQueryListPaginatedOptions,
) {
  if (!options?.query?.page)
    throw new Error("useQueryListPaginated requires a page number")

  const queryKey = `paginated-${path}`

  return useQuery({
    queryKey: [queryKey, options.query],
    queryFn: ({ signal }) =>
      fetch<Paginated<T>>(path, {
        ...options,
        signal,
      }),
    ...options,
  })
}

export type useQueryItemOptions = UseQueryOptions

export function useQueryItem<T>(
  path: string,
  id?: string | number,
  options?: useQueryItemOptions,
) {
  const fullPath = `${path}/${id}`

  return useQuery({
    queryKey: [fullPath, options],
    queryFn: ({ signal }) =>
      fetch<T>(fullPath, {
        ...options,
        signal,
      } as FetchOptions),
    ...options,
    refetchOnWindowFocus: false,
    enabled: (options?.enabled ?? true) && Boolean(id),
  })
}

export type useQueryDataOptions = UseQueryOptions

export function useQueryData<T>(path: string, options?: useQueryDataOptions) {
  return useQuery({
    queryKey: [path, options?.query],
    queryFn: ({ signal }) =>
      fetch<T>(path, {
        ...options,
        signal,
      } as FetchOptions),
    refetchOnWindowFocus: false,
    ...options,
  })
}
