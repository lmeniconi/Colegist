import {
  useQueryList,
  useQueryListOptions,
  useQueryListPaginated,
  useQueryListPaginatedOptions,
  useQueryListPaginatedQuery,
} from "@/hooks/useQuery"
import apiAxios from "@/utils/api"
import { Chat } from "./type"

type filters = {
  id?: string | number
  search?: string
  type?: string | string[]
}

export type useDatabasesQuery = filters
export type usePaginatedDatabasesQuery = useQueryListPaginatedQuery & filters

export function useChats(
  options?: useQueryListOptions & {
    query?: useDatabasesQuery
  }
) {
  return useQueryList<Chat>("/chats", options)
}

export function usePaginatedDatabases(
  options: useQueryListPaginatedOptions & {
    query: usePaginatedDatabasesQuery
  }
) {
  return useQueryListPaginated<Chat>("/chats", options)
}

export type CreateDatabase = {
  message: string
}
export async function createChat(chat: CreateDatabase): Promise<Chat> {
  try {
    const { data } = await apiAxios.post<Chat>("/chats", chat)
    return data
  } catch (error) {
    throw error
  }
}
