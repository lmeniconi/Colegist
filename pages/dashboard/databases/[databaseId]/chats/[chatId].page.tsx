import LayoutDashboard from "@/layouts/Dashboard"
import { sendChatPrompt, useChat } from "@/models/Database/Chat/api"
import { Button, Divider } from "@nextui-org/react"
import { useRouter } from "next/router"
import { FormEvent, ReactNode, useEffect, useRef, useState } from "react"
import ChatMessage from "@/components/Dashboard/Chat/Message"
import PromptInput from "./components/PromptInput"
import Link from "next/link"

export default function Page() {
  const router = useRouter()
  const databaseId = router.query.databaseId as string | undefined
  const chatId = router.query.chatId as string | undefined

  const { data: chat, refetch: refetchChat } = useChat(
    databaseId as string,
    chatId as string,
    {
      enabled: Boolean(databaseId) && Boolean(chatId),
    }
  )

  const [prompt, setPrompt] = useState("")

  async function submit(e: FormEvent) {
    e.preventDefault()

    if (!databaseId || !chatId || !prompt) return

    try {
      await sendChatPrompt(databaseId, chatId, prompt)
      setPrompt("")
      await refetchChat()
    } finally {
    }
  }

  const textArea = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (!textArea.current) return
    textArea.current.focus()
  }, [textArea])

  useEffect(() => {
    const events = new EventSource("http://localhost:3333/events")
    events.onmessage = (event) => {
      console.log(event.data)
    }

    return () => events.close()
  }, [])

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
        {chat?.messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </section>

      <section className="h-[10%]">
        <form onSubmit={submit}>
          <PromptInput
            textAreaRef={textArea}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </form>
      </section>
    </section>
  )
}

Page.getLayout = function getLayout(page: ReactNode) {
  return <LayoutDashboard withoutPadding>{page}</LayoutDashboard>
}
