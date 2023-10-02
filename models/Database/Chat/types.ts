import { User } from "../../User/types"
import { Database } from "../types"

export type Chat = {
  id: string
  title: string | null
  computedTitle: string
  description: string | null
  messages: ChatMessage[]
  databaseId: number
  database?: Database
  userId: number
  user?: User
  createdAt: string
  updatedAt: string
}

export type ChatMessage = {
  type: "user" | "bot"
  text: string
}
