import FadeIn from "@/components/Shared/FadeIn"
import { createChat, useChats } from "@/models/Database/Chat/api"
import { Divider, Selection } from "@nextui-org/react"
import { FormEvent, ReactNode, useState } from "react"
import DatabaseSelector from "@/components/Dashboard/Database/Selector"
import ModeSelector, { ModeKey } from "./components/ModeSelector"
import PromptInput from "./components/PromptInput"
import ChatList from "@/components/Dashboard/Chat/List"
import LayoutDashboard from "@/layouts/Dashboard"
import { useRouter } from "next/router"
import { getChatPath } from "@/models/Database/Chat/utils"

export default function Page() {
  const router = useRouter()

  const [mode, setMode] = useState<ModeKey>("sql")
  const [databaseId, setDatabaseId] = useState<Selection>(new Set([]))
  const { data: chats } = useChats(1)

  const [prompt, setPrompt] = useState<string>("")
  const [sending, setSending] = useState<boolean>(false)
  async function submit(e: FormEvent) {
    e.preventDefault()

    const dId = Array.from(databaseId)[0]
    if (!dId || !prompt) return

    try {
      setSending(true)
      const chat = await createChat(dId, {
        prompt,
      })
      router.push(getChatPath(chat.databaseId, chat.id))
    } catch (error) {
      console.error(error)
    } finally {
      setSending(false)
    }
  }

  return (
    <FadeIn className="space-y-16 h-screen p-10">
      <ModeSelector
        selectedKey={mode}
        onSelectionChange={(mode) => setMode(mode as ModeKey)}
      />

      <div className="space-y-5 max-w-lg mx-auto">
        <DatabaseSelector
          className="w-full"
          selectedKeys={databaseId}
          onSelectionChange={setDatabaseId}
        />
        <form onSubmit={submit}>
          <PromptInput
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={sending || !Array.from(databaseId).length}
          />
        </form>

        {Boolean(chats?.length) && chats && (
          <>
            <Divider />
            <ChatList chats={chats} />
          </>
        )}
      </div>
    </FadeIn>
  )
}

Page.getLayout = function getLayout(page: ReactNode) {
  return <LayoutDashboard withoutPadding>{page}</LayoutDashboard>
}
