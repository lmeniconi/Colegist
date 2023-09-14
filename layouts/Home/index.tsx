import { ReactNode } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"

type Props = {
  children: ReactNode
}

export default function LayoutHome({ children }: Props) {
  return (
    <section>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </section>
  )
}
