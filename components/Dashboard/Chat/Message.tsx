import { useAuth } from "@/contexts/useAuth"
import { ChatMessage } from "@/models/Chat/type"
import { getAvatarSrc } from "@/models/User/utils"
import { Avatar } from "@nextui-org/react"

type Props = {
  message: ChatMessage
}

export default function ChatMessage({ message }: Props) {
  const { user } = useAuth()

  if (message.type === "bot")
    return (
      <div className="flex justify-end space-x-5 text-right">
        <div>{message.text}</div>
        <Avatar src="/logo.png" />
      </div>
    )

  return (
    <div className="flex space-x-5">
      <Avatar src={getAvatarSrc(user)} />
      <div>{message.text}</div>
    </div>
  )
}
