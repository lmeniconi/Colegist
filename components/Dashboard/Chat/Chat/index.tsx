import { createChat, sendChatPrompt, useChat } from "@/models/Database/Chat/api"
import { Button, Divider } from "@nextui-org/react"
import { useRouter } from "next/router"
import { FormEvent, useEffect, useRef, useState } from "react"
import ChatMessage from "@/components/Dashboard/Chat/Message"
import { Chat, ChatMessage as ChatMessageT } from "@/models/Database/Chat/types"
import { IconDots, IconMessageCircle2, IconMessages } from "@tabler/icons-react"
import PromptInput from "./PromptInput"
import DatabaseSelector from "../../Database/Selector"

export default function Chat() {
  const router = useRouter()

  const queryDatabaseId = router.query.databaseId as string | undefined
  const queryChatId = router.query.chatId as string | undefined

  const [chatId, setChatId] = useState<string | undefined>(queryChatId)
  const [databaseId, setDatabaseId] = useState<string | undefined>(
    queryDatabaseId
  )

  const { data: chat } = useChat(databaseId as string, chatId as string, {
    enabled: Boolean(databaseId) && Boolean(chatId),
    refetchInterval: 3000,
  })

  const [messages, setMessages] = useState<ChatMessageT[]>([])
  useEffect(() => {
    if (!chat || messages.length) return
    setMessages(chat.messages)
  }, [chat])

  const [prompt, setPrompt] = useState("")

  async function submit(e: FormEvent) {
    e.preventDefault()

    if (!databaseId || !prompt) return

    if (!chatId) {
      const createdChat = await createChat(databaseId, {
        prompt,
      })
      setChatId(createdChat.id)
      setPrompt("")
      return
    }

    await sendChatPrompt(databaseId, chatId, prompt)
    setPrompt("")
  }

  const textArea = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (!textArea.current) return
    textArea.current.focus()
  }, [textArea])

  return (
    <section className="h-screen p-10">
      <section className="h-[10%] flex flex-col justify-between">
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <IconMessageCircle2 />
            <h2 className="text-lg font-semibold">
              {chat?.computedTitle || "Nuevo chat"}
            </h2>
          </div>

          <DatabaseSelector
            value={databaseId}
            onSelectionChange={(keys) => {
              const value = Array.from(keys)[0] as string
              setDatabaseId(value)
            }}
          />

          <Button isIconOnly variant="light">
            <IconDots />
          </Button>
        </div>

        <Divider />
      </section>

      <section className="h-[82%] overflow-y-auto">
        {chat ? (
          <>
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
          </>
        ) : (
          <div className="flex justify-center items-center h-full">
            <div className="animate-fade space-y-5">
              <div className="text-center">
                <div className="flex justify-center">
                  <IconMessages size={120} />
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-medium">
                    Hace cualquier pregunta a tu base de datos
                  </p>
                  <p className="text-gray-400 font-light">
                    Para empezar a chatear, escribe un mensaje
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="h-[8%]">
        <form
          onSubmit={submit}
          className="animate-fade animate-delay-200 max-w-[50%] mx-auto"
        >
          <PromptInput
            textAreaRef={textArea}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={
              !databaseId || messages[messages.length - 1]?.type === "user"
            }
          />
        </form>
      </section>
    </section>
  )
}
