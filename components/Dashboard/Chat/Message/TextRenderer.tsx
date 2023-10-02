import { Code } from "@nextui-org/react"
import { useMemo } from "react"

type Props = {
  message: string
}

type MessagePart = {
  type: "text" | "sql"
  content: string
}

export default function TextRenderer({ message }: Props) {
  const parts = useMemo<MessagePart[]>(() => {
    const parts: MessagePart[] = []

    const regex = /```(sql)?\n([\s\S]*?)```/g
    let match

    let currentIndex = 0

    while ((match = regex.exec(message)) !== null) {
      const sqlType = match[1] === "sql" ? "sql" : "text"
      const content = match[2]

      if (currentIndex < match.index)
        parts.push({
          type: "text",
          content: message.substring(currentIndex, match.index),
        })

      parts.push({
        type: sqlType,
        content,
      })

      currentIndex = regex.lastIndex
    }

    if (currentIndex < message.length)
      parts.push({
        type: "text",
        content: message.substring(currentIndex),
      })

    return parts
  }, [message])

  return (
    <div className="space-y-5">
      {parts.map((part, index) => (
        <div key={index}>
          {part.type === "text" ? (
            <p>{part.content}</p>
          ) : (
            <Code>{part.content}</Code>
          )}
        </div>
      ))}
    </div>
  )
}
