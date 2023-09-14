import { User } from "@/models/User/type"
import { getAvatarSrc } from "@/models/User/utils"
import {
  AvatarProps,
  Skeleton as UiSkeleton,
  Avatar as UiAvatar,
} from "@nextui-org/react"

type Props = {
  user?: User
} & Omit<AvatarProps, "src" | "name" | "isBordered">

export default function Avatar(props: Props) {
  const { user, ...avatarProps } = props

  if (!user) return <Skeleton />
  return (
    <UiAvatar
      isBordered
      src={getAvatarSrc(user)}
      name={user?.email}
      {...avatarProps}
    />
  )
}

function Skeleton() {
  return <UiSkeleton className="flex rounded-full w-10 h-10" />
}
