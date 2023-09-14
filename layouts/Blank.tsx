import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export default function LayoutBlank({ children }: Props) {
  return <>{children}</>
}
