import React, { useState } from "react"
import {
  Navbar as UiNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react"
import Logo from "@/components/Shared/Logo"
import NextLink from "next/link"
import { useAuth } from "@/contexts/useAuth"

export default function Navbar() {
  const { user } = useAuth()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = ["Ir a Dashboard"]

  return (
    <UiNavbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {/* <NavbarItem>
          <UiLink color="foreground" href="#">
            Ejemplos
          </UiLink>
        </NavbarItem>
        <NavbarItem>
          <UiLink color="foreground" href="#" aria-current="page">
            Nosotros
          </UiLink>
        </NavbarItem> */}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          {Boolean(user) ? (
            <Button
              href="/dashboard/"
              as={NextLink}
              color="primary"
              variant="flat"
            >
              Ir al Dashboard
            </Button>
          ) : (
            <Button
              href="/auth/login"
              as={NextLink}
              color="primary"
              variant="flat"
            >
              Empezar
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </UiNavbar>
  )
}
