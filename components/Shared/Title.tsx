import { ReactNode } from "react"

type Props = {
  children: ReactNode
  description?: string
}

export default function Title({ children, description }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-4xl font-bold">{children}</p>
      {description && <p className="text-lg">{description}</p>}
    </div>
  )
}
