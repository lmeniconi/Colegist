import FadeIn from "@/components/Shared/FadeIn"
import { useChats } from "@/models/Chat/api"
import { Divider, Selection } from "@nextui-org/react"
import { ReactNode, useState } from "react"
import DatabaseSelector from "@/components/Dashboard/Database/Selector"
import ModeSelector, { ModeKey } from "./components/ModeSelector"
import PromptInput from "./components/PromptInput"
import ChatList from "@/components/Dashboard/Chat/List"
import LayoutDashboard from "@/layouts/Dashboard"

export default function Page() {
  const [mode, setMode] = useState<ModeKey>("sql")
  const [databaseId, setDatabaseId] = useState<Selection>(new Set([]))
  const { data: chats } = useChats(1)

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
        <PromptInput />

        {chats?.length && (
          <>
            <Divider />
            <ChatList chats={[]} />
          </>
        )}
      </div>
    </FadeIn>
  )
}

Page.getLayout = function getLayout(page: ReactNode) {
  return <LayoutDashboard withoutPadding>{page}</LayoutDashboard>
}
