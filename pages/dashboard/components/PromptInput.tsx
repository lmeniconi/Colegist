import { Input, InputProps } from "@nextui-org/react"
import { IconCornerDownLeft } from "@tabler/icons-react"

type Props = InputProps

export default function PromptInput(props: Props) {
  return (
    <Input
      placeholder="Todos los usuarios que su email sea @google.com"
      size="lg"
      endContent={<IconCornerDownLeft />}
      {...props}
    />
  )
}
