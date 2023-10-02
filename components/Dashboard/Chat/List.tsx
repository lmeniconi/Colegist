import { Chat } from "@/models/Database/Chat/types"
import { getChatPath } from "@/models/Database/Chat/utils"
import { Button } from "@nextui-org/react"
import Link from "next/link"

type Props = {
  chats: Chat[]
}

export default function ChatList({ chats }: Props) {
  return (
    <div className="space-y-5">
      {chats.map((chat) => (
        <Button
          key={chat.id}
          as={Link}
          href={getChatPath(chat.databaseId, chat.id)}
          className="w-full py-6"
        >
          {chat.computedTitle}
        </Button>
      ))}
    </div>
  )
}
