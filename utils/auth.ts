import { User } from "../models/User/types"

export function isAdmin(user?: User) {
  if (!user) return false
  return !user.organizationId
}

// export function validatePermission(permission: ModulePermission, user?: User) {
//   if (!user || !user.role || !user.role.permissions) return false
//   if (isAdmin(user)) return true

//   return user.role.permissions.some((p) => p.id === permission)
// }
