import {
  useQueryList,
  useQueryListOptions,
  useQueryListPaginated,
  useQueryListPaginatedOptions,
  useQueryListPaginatedQuery,
} from "@/hooks/useQuery"
import { Database } from "./types"
import apiAxios from "@/utils/api"

type useDatabasesFilters = {
  id?: string | number
  search?: string
  type?: string | string[]
}

export type useDatabasesQuery = useDatabasesFilters
export type usePaginatedDatabasesQuery = useQueryListPaginatedQuery &
  useDatabasesFilters

export function useDatabases(
  options?: useQueryListOptions & {
    query?: useDatabasesQuery
  }
) {
  return useQueryList<Database>("/databases", options)
}

export function usePaginatedDatabases(
  options: useQueryListPaginatedOptions & {
    query: usePaginatedDatabasesQuery
  }
) {
  return useQueryListPaginated<Database>("/databases", options)
}

export type CreateDatabase = Partial<Database> & {
  password?: string
}

export async function createDatabase(
  payload: CreateDatabase
): Promise<Database> {
  try {
    const { data: database } = await apiAxios.post<Database>(
      "/databases",
      payload
    )
    return database
  } catch (error) {
    // showErrorMessage(error)
    throw error
  }
}

export async function updateDatabase(id: number, payload: CreateDatabase) {
  try {
    const { data: database } = await apiAxios.put<Database>(
      `/databases/${id}`,
      payload
    )
    return database
  } catch (error) {
    // showErrorMessage(error)
    throw error
  }
}

export async function deleteDatabase(id: number) {
  try {
    await apiAxios.delete(`/databases/${id}`)
  } catch (error) {
    // showErrorMessage(error)
    throw error
  }
}
