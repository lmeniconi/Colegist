import { Database } from "../Database/type"
import { User } from "../User/type"

export type Organization = {
  id: number
  name: string
  imageUrl: string | null
  users?: User[]
  databases?: Database[]
}
