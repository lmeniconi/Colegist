import { Button, InputProps, Textarea } from "@nextui-org/react"
import { IconSend } from "@tabler/icons-react"
import { useRef } from "react"

type Props = InputProps & {
  textAreaRef?: React.MutableRefObject<HTMLInputElement | null>
}

export default function PromptInput(props: Props) {
  const { textAreaRef, value, ...textAreaProps } = props

  const sendButton = useRef<HTMLButtonElement>(null)

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      sendButton.current?.click()
    }
  }

  return (
    <div className="flex justify-between items-center rounded-lg border px-2 py-0.5">
      <Textarea
        ref={textAreaRef}
        placeholder="Escribe tu pregunta"
        radius="none"
        minRows={1}
        maxRows={3}
        className="w-[97%] pr-5"
        classNames={{
          inputWrapper: "bg-transparent",
        }}
        // @ts-ignore
        onKeyDown={handleKeyDown}
        {...textAreaProps}
        value={value}
      />

      <div className="w-[3%]">
        <Button
          ref={sendButton}
          isIconOnly
          color={value?.length ? "success" : "default"}
          aria-label="Enviar"
          type="submit"
        >
          <IconSend color="white" />
        </Button>
      </div>
    </div>
  )
}
