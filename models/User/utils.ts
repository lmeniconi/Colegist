import { User } from "./types"

export function getAvatarSrc(user?: User) {
  return (
    user?.imageUrl ??
    `https://ui-avatars.com/api/?name=${user?.email}&background=random`
  )
}
