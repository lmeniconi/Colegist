import { createContext, ReactNode, useContext, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { AxiosError } from "axios"
import { PageProps } from "../types/Props"
import { User } from "../models/User/type"
import { isAdmin as validateIsAdmin } from "../utils/auth"
import apiAxios from "../utils/api"
import FullScreenLoader from "../components/Shared/Loader/FullScreen"

export type AuthContextType = {
  user?: User
  refetch: () => void
  isAdmin: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")

  return context
}

type Props = {
  children: ReactNode
  pageProps: PageProps
}

export default function AuthProvider({ children, pageProps }: Props) {
  const router = useRouter()
  const isAuthPage = pageProps.auth ?? true

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["me", isAuthPage],
    queryFn: async (): Promise<User> => (await apiAxios.get("/me")).data,
    onError: () => {
      if (!isAuthPage) return
      localStorage.setItem("redirect", router.asPath)
      router.push("/")
    },
    retry: (_, error: AxiosError) => error.response?.status !== 401,
  })

  const isAdmin = useMemo(() => validateIsAdmin(user), [user])

  function unauthorized() {
    router.push("/dashboard")
    return <FullScreenLoader />
  }

  if (isAuthPage) {
    if (isLoading || !user) return <FullScreenLoader />

    if (pageProps.admin && !validateIsAdmin(user)) return unauthorized()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        refetch,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
