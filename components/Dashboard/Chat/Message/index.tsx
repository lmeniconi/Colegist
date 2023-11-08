import { useAuth } from "@/contexts/useAuth"
import { ChatMessage } from "@/models/Database/Chat/types"
import { getAvatarSrc } from "@/models/User/utils"
import { Avatar } from "@nextui-org/react"
import TextRenderer from "./TextRenderer"

type Props = {
  message: ChatMessage
}

export default function ChatMessage({ message }: Props) {
  const { user } = useAuth()

  const isBot = message.type === "bot"

  return (
    <div
      className={`flex items-center py-10 px-5 space-x-5 ${
        isBot ? "bg-zinc-700" : "bg-transparent"
      }`}
    >
      <div className="w-12">
        {isBot ? (
          <Avatar src="/logo.png" className="w-12 h-12" />
        ) : (
          <Avatar src={getAvatarSrc(user)} className="w-12 h-12" />
        )}
      </div>
      <TextRenderer message={message.text} />
    </div>
  )
}
