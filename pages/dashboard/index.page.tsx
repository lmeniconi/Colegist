import FadeIn from "@/components/Shared/FadeIn"
import { createChat, useChats } from "@/models/Chat/api"
import { Chat, ChatMessage as ChatMessageType } from "@/models/Chat/type"
import { useDatabases } from "@/models/Database/api"
import { Database } from "@/models/Database/type"
import {
  Tabs,
  Tab,
  Divider,
  Card,
  CardBody,
  Button,
  Textarea,
  Select,
  SelectItem,
  Selection,
} from "@nextui-org/react"
import { IconDatabase, IconSend, IconWand } from "@tabler/icons-react"
import { Key, useState } from "react"
import ChatMessage from "@/components/Dashboard/Chat/Message"

export default function Page() {
  const { data: databases } = useDatabases()
  const [databaseId, setDatabaseId] = useState<Selection>(new Set([]))

  const [tab, setTab] = useState<Key>("sql")

  const [mode, setMode] = useState<null | "newChat" | "chat">(null)

  const { data: chats } = useChats()

  const [chat, setChat] = useState<Chat | null>(null)
  const [message, setMessage] = useState("")
  async function submitMessage() {
    if (!message) return
    const newChat = await createChat({
      message,
    })
    setChat(newChat)
  }

  const messages: ChatMessageType[] = [
    {
      type: "user",
      text: "Como podria hacer un query que cuente todos los services que hay para un service_category_l1",
    },
    {
      type: "bot",
      text: `SELECT COUNT(s.id) AS total_services
FROM services s
INNER JOIN service_categories_l3 sc3 ON s.service_category_l3_id = sc3.id
INNER JOIN service_categories_l2 sc2 ON sc3.service_category_l2_id = sc2.id
INNER JOIN service_categories_l1 sc1 ON sc2.service_category_l1_id = sc1.id
WHERE sc1.name = 'service_category_l1_nombre_deseado';
`,
    },
  ]

  return (
    <FadeIn className="space-y-16">
      <Select
        label="Selecciona una base de datos"
        variant="bordered"
        className="max-w-xs"
        selectedKeys={databaseId}
        onSelectionChange={setDatabaseId}
      >
        {databases?.map((database) => (
          <SelectItem key={database.id} value={database.id}>
            {database.name}
          </SelectItem>
        )) ?? []}
      </Select>

      <Tabs
        aria-label="Options"
        color="primary"
        variant="bordered"
        selectedKey={tab}
        onSelectionChange={setTab}
      >
        <Tab
          key="sql"
          title={
            <div className="flex items-center space-x-2">
              <IconWand />
              <span>SQL</span>
            </div>
          }
        />
        <Tab
          disabled
          key="data"
          title={
            <div className="flex items-center space-x-2">
              <IconDatabase />
              <span>Data</span>
            </div>
          }
        />
      </Tabs>

      {tab === "sql" && (
        <div className="max-w-7xl mx-auto">
          {mode === "newChat" ? (
            <div className="space-y-5">
              <div className="flex justify-between">
                <Button
                  color="primary"
                  variant="bordered"
                  onClick={() => setMode(null)}
                >
                  Volver
                </Button>
                <h2 className=" text-4xl font-semibold ">Nuevo Chat</h2>
              </div>

              <Divider />

              <div className="space-y-3">
                <div className="h-[50vh]">
                  <div className="space-y-12">
                    {messages.map((message, index) => (
                      <ChatMessage key={index} message={message} />
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border flex justify-between items-center px-2">
                  <Textarea
                    placeholder="Escribe tu pregunta"
                    radius="none"
                    variant="underlined"
                    classNames={{
                      inputWrapper: "border-0",
                    }}
                    minRows={1}
                    value={message}
                    onValueChange={setMessage}
                  />
                  <Button
                    isIconOnly
                    color="success"
                    aria-label="Enviar"
                    onClick={submitMessage}
                  >
                    <IconSend color="white" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <h2 className=" text-4xl font-semibold ">Genera SQL</h2>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={() => setMode("newChat")}
                >
                  Crear nuevo chat
                </Button>
              </div>

              <Divider />

              <ol className="space-y-5">
                {chats?.map((chat) => (
                  <li key={chat.id}>
                    <Card className="py-2">
                      <CardBody>
                        <div className="flex justify-between">
                          <p className="text-xl">
                            {chat.title ?? "Sin titulo"}
                          </p>
                          <Button color="primary" onClick={submitMessage}>
                            Ver mas
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </FadeIn>
  )
}
