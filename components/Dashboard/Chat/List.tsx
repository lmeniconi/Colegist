import { Chat } from "@/models/Chat/types"
import { Button, Card, CardBody } from "@nextui-org/react"

type Props = {
  chats: Chat[]
}

export default function ChatList({ chats }: Props) {
  return chats.map((chat) => (
    <li key={chat.id}>
      <Card className="py-2">
        <CardBody>
          <p className="text-xl">{chat.title ?? "Sin titulo"}</p>
        </CardBody>
      </Card>
    </li>
  ))
}
