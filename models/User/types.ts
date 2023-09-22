import { Organization } from "../Organization/types"

export type User = {
  id: number
  email: string
  username: string
  imageUrl: string | null
  organizationId: number | null
  organization?: Organization
}
