import { useAuth } from "@/contexts/useAuth"
import { getAvatarSrc } from "@/models/User/utils"
import {
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Listbox,
  ListboxItem,
  User,
} from "@nextui-org/react"
import {
  IconDatabase,
  IconSearch,
  IconStar,
  IconUsers,
} from "@tabler/icons-react"
import NextLink from "next/link"
import { useRouter } from "next/router"

export default function Sidebar() {
  const { user } = useAuth()
  const router = useRouter()

  function goTo(path: string) {
    router.push(path)
  }

  return (
    <section className="h-screen p-5">
      <section className="h-4/6  space-y-4">
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <User
              as="button"
              name={user?.username}
              description={user?.email}
              avatarProps={{
                src: getAvatarSrc(user),
                isBordered: true,
              }}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownSection showDivider>
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-bold">Usuario</p>
                <p className="font-bold">@{user?.username}</p>
              </DropdownItem>
            </DropdownSection>
            <DropdownSection>
              <DropdownItem key="settings">Configuración</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Ayuda y Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                <NextLink href="/auth/logout">Cerrar Sesión</NextLink>
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>

        <Divider />

        <Listbox
          variant="flat"
          aria-label="Listbox menu with descriptions"
          className="space-y-3"
        >
          <ListboxItem
            key="query"
            description="Crea una nueva consulta"
            startContent={<IconSearch className="text-primary-500" />}
            onClick={() => goTo("/dashboard")}
          >
            Consultar
          </ListboxItem>
          <ListboxItem
            key="starred"
            description="Consultas guardadas"
            startContent={<IconStar className="text-yellow-500" />}
          >
            Favoritos
          </ListboxItem>

          <ListboxItem
            key="databases"
            description="Administra tus bases de datos"
            startContent={<IconDatabase className="text-indigo-500" />}
            onClick={() => goTo("/dashboard/databases")}
          >
            Bases de Datos
          </ListboxItem>
          <ListboxItem
            key="organization"
            description="Administra tu organización"
            startContent={<IconUsers className="text-orange-500" />}
          >
            Organización
          </ListboxItem>
        </Listbox>
      </section>
      <section className="h-2/6"></section>
    </section>
  )
}
