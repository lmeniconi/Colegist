// import { ModulePermission } from "@/utils/auth"
import {
  GetStaticPropsResult as NextGetStaticPropsResult,
  GetServerSidePropsResult as NextGetServerSidePropsResult,
} from "next"

export type AuthProps = {
  auth?: boolean
  admin?: boolean
  // permissions?: ModulePermission[]
}

export type MetaProps = {
  title?: string
}

export type PageProps = AuthProps & {
  meta?: MetaProps
}

export type GetStaticPropsResult = NextGetStaticPropsResult<PageProps>
export type GetServerSidePropsResult = NextGetServerSidePropsResult<PageProps>
