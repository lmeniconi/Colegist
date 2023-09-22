import { Database } from "../Database/types"
import { User } from "../User/types"

export type Organization = {
  id: number
  name: string
  imageUrl: string | null
  users?: User[]
  databases?: Database[]
}
