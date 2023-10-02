import {
  useQueryData,
  useQueryList,
  useQueryListOptions,
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
  return useQueryList<Chat>(`databases/${databaseId}/chats`, options)
}

export function useChat(
  databaseId: string | number,
  chatId: string | number,
  options?: useQueryListOptions
) {
  return useQueryData<Chat>(`databases/${databaseId}/chats/${chatId}`, options)
}

export type CreateChat = {
  prompt: string
}
export async function createChat(
  databaseId: string | number,
  chat: CreateChat
): Promise<Chat> {
  try {
    const { data } = await apiAxios.post<Chat>(
      `databases/${databaseId}/chats`,
      chat
    )
    return data
  } catch (error) {
    throw error
  }
}

export async function sendChatPrompt(
  databaseId: string | number,
  chatId: string | number,
  prompt: string
) {
  try {
    await apiAxios.put(`databases/${databaseId}/chats/${chatId}`, {
      prompt,
    })
  } catch (error) {
    throw error
  }
}
