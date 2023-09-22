import {
  useQueryList,
  useQueryListOptions,
  useQueryListPaginated,
  useQueryListPaginatedOptions,
  useQueryListPaginatedQuery,
} from "@/hooks/useQuery"
import apiAxios from "@/utils/api"
import { Chat } from "./types"

type filters = {
  id?: string | number
  search?: string
}

export type useDatabasesQuery = filters
export type usePaginatedDatabasesQuery = useQueryListPaginatedQuery & filters

export function useChats(
  databaseId: string | number,
  options?: useQueryListOptions & {
    query?: useDatabasesQuery
  }
) {
  return useQueryList<Chat>(`${databaseId}/chats`, options)
}

export function usePaginatedDatabases(
  databaseId: string | number,
  options: useQueryListPaginatedOptions & {
    query: usePaginatedDatabasesQuery
  }
) {
  return useQueryListPaginated<Chat>(`${databaseId}/chats`, options)
}

export type CreateChat = {
  message: string
}
export async function createChat(
  databaseId: string | number,
  chat: CreateChat
): Promise<Chat> {
  try {
    const { data } = await apiAxios.post<Chat>(`${databaseId}/chats`, chat)
    return data
  } catch (error) {
    throw error
  }
}
