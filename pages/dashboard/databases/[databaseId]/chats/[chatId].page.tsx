import LayoutDashboard from "@/layouts/Dashboard"
import { useChat } from "@/models/Database/Chat/api"
import { Button, Divider } from "@nextui-org/react"
import { useRouter } from "next/router"
import {
  FormEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import ChatMessage from "@/components/Dashboard/Chat/Message"
import PromptInput from "./components/PromptInput"
import Link from "next/link"
import { io, Socket } from "socket.io-client"
import { ChatMessage as ChatMessageT } from "@/models/Database/Chat/types"

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL as string

export default function Page() {
  const router = useRouter()
  const databaseId = router.query.databaseId as string | undefined
  const chatId = router.query.chatId as string | undefined

  const [chatTitle, setChatTitle] = useState("")

  const { data: chat } = useChat(databaseId as string, chatId as string, {
    enabled: Boolean(databaseId) && Boolean(chatId),
    refetchInterval: !chatTitle ? 2000 : false,
  })

  useEffect(() => {
    if (!chat?.title) return
    setChatTitle(chat.title)
  }, [chat])

  const [messages, setMessages] = useState<ChatMessageT[]>([])
  useEffect(() => {
    if (!chat || messages.length) return
    setMessages(chat.messages)
  }, [chat])

  const socket = useRef<Socket | null>(null)
  useEffect(() => {
    if (!chat || socket.current) return

    socket.current = io(NEXT_PUBLIC_API_URL)

    socket.current.emit("chats:join", {
      chatId,
    })
    socket.current.on("chats:new-message", (message: ChatMessageT) =>
      setMessages((messages) => [...messages, message])
    )

    return () => {
      socket.current?.disconnect()
    }
  }, [chat])

  const [prompt, setPrompt] = useState("")

  async function submit(e: FormEvent) {
    e.preventDefault()

    if (!databaseId || !chatId || !prompt) return
    socket.current?.emit("chats:send-message", {
      message: prompt,
      chatId,
    })
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
          <Button as={Link} href="/dashboard" color="primary" variant="ghost">
            Volver
          </Button>
          <h2 className=" text-4xl font-semibold">{chat?.computedTitle}</h2>
          <div></div>
        </div>

        <Divider />
      </section>

      <section className="h-[80%] overflow-y-auto">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </section>

      <section className="h-[10%]">
        <form onSubmit={submit}>
          <PromptInput
            textAreaRef={textArea}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            // disabled={!chat || messages[messages.length - 1]?.type === "user"}
          />
        </form>
      </section>
    </section>
  )
}

Page.getLayout = function getLayout(page: ReactNode) {
  return <LayoutDashboard withoutPadding>{page}</LayoutDashboard>
}
