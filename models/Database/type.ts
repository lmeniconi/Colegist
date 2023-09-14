export type Database = {
  id: number
  name: string
  type: "connection" | "schema"
  host: string | null
  port: number | null
  user: string | null
  database: string | null
  connection: DatabaseConnectionType | null
  createdAt: string
  updatedAt: string
}

export const DATABASE_CONNECTION_TYPES = ["mysql", "postgres"] as const
export type DatabaseConnectionType = (typeof DATABASE_CONNECTION_TYPES)[number]
