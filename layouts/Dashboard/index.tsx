import { ReactNode } from "react"
import Sidebar from "./Sidebar"

type Props = {
  children: ReactNode
  // spacing?: SpacingValue
}

export default function LayoutDashboard({ children }: Props) {
  // const router = useRouter()
  // const links: SpotlightAction[] = Links.map(
  //   (link) =>
  //     ({
  //       ...link,
  //       onTrigger: () => router.push(link.href),
  //     }) as unknown as SpotlightAction,
  // )

  // const [opened] = useState(false)

  return (
    <section className="flex">
      <section className="w-2/12">
        <Sidebar />
      </section>
      <main className="w-10/12 p-10">{children}</main>
    </section>
  )

  // <AppShell
  //   navbarOffsetBreakpoint="sm"
  //   asideOffsetBreakpoint="sm"
  //   navbar={<Navbar opened={opened} />}
  // >
  //   <Stack spacing={spacing} px="xl">
  //     <Topbar />

  //     {children}
  //   </Stack>
  // </AppShell>
}
