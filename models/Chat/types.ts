import { User } from "../User/types"

export type Chat = {
  id: string
  title: string | null
  description: string | null
  messages: ChatMessage[]
  userId: number
  user?: User
  createdAt: string
  updatedAt: string
}

export type ChatMessage = {
  type: "user" | "bot"
  text: string
}
