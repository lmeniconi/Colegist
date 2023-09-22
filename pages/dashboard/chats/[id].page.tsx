import { Button, Divider, Textarea } from "@nextui-org/react"
import { IconSend } from "@tabler/icons-react"
import { useRouter } from "next/router"

export default function Page() {
  const router = useRouter()
  const id = router.query.id as string | undefined

  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        <Button color="primary" variant="bordered">
          Volver
        </Button>
        <h2 className=" text-4xl font-semibold ">Nuevo Chat</h2>
      </div>

      <Divider />

      <div className="space-y-3">
        <div className="h-[50vh]">
          <div className="space-y-12">
            {/* {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))} */}
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
          />
          <Button isIconOnly color="success" aria-label="Enviar">
            <IconSend color="white" />
          </Button>
        </div>
      </div>
    </div>
  )
}
