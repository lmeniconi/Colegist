import { Button, InputProps, Textarea } from "@nextui-org/react"
import { IconSend } from "@tabler/icons-react"
import { useRef } from "react"

type Props = InputProps & {
  textAreaRef?: React.MutableRefObject<HTMLInputElement | null>
  wrapperClassName?: string
}

export default function PromptInput(props: Props) {
  const { textAreaRef, value, wrapperClassName, ...textAreaProps } = props

  const sendButton = useRef<HTMLButtonElement>(null)

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      sendButton.current?.click()
    }
  }

  return (
    <div
      className={`flex justify-between items-center rounded-xl border border-gray-500  px-2 py-0.5 ${wrapperClassName}`}
    >
      <Textarea
        ref={textAreaRef}
        placeholder="Escribe tu pregunta"
        radius="none"
        minRows={1}
        maxRows={2}
        className="w-[90%]"
        classNames={{
          inputWrapper: "bg-transparent",
        }}
        // @ts-ignore
        onKeyDown={handleKeyDown}
        {...textAreaProps}
        value={value}
      />

      <div className="w-[10%] flex justify-center">
        <Button
          ref={sendButton}
          isIconOnly
          color={value?.length ? "primary" : "default"}
          aria-label="Enviar"
          type="submit"
        >
          <IconSend color="white" />
        </Button>
      </div>
    </div>
  )
}
