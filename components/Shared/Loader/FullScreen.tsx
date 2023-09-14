import { Spinner } from "@nextui-org/react"

export default function FullScreenLoader() {
  return (
    <div className="absolute top-0 left-0 h-screen w-full flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  )
}
