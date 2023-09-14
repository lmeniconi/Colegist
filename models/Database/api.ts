import {
  useQueryList,
  useQueryListOptions,
  useQueryListPaginated,
  useQueryListPaginatedOptions,
  useQueryListPaginatedQuery,
} from "@/hooks/useQuery"
import { Database } from "./type"
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
  },
) {
  return useQueryList<Database>("/databases", options)
}

export function usePaginatedDatabases(
  options: useQueryListPaginatedOptions & {
    query: usePaginatedDatabasesQuery
  },
) {
  return useQueryListPaginated<Database>("/databases", options)
}

export type CreateDatabase = Partial<Database> & {
  password?: string
}
export async function createDatabase(
  database: CreateDatabase,
): Promise<Database> {
  try {
    const { data } = await apiAxios.post<Database>("/databases", database)
    return data
  } catch (error) {
    // showErrorMessage(error)
    throw error
  }
}
