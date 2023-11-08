import Chat from "@/components/Dashboard/Chat/Chat"
import LayoutDashboard from "@/layouts/Dashboard"
import { ReactNode } from "react"

export default function Page() {
  return <Chat />
}

Page.getLayout = function getLayout(page: ReactNode) {
  return <LayoutDashboard withoutPadding>{page}</LayoutDashboard>
}
