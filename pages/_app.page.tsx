import "@/styles/globals.css"
import { NextUIProvider } from "@nextui-org/react"
import type { AppProps } from "next/app"
import Head from "next/head"
import { ReactElement, ReactNode, useState } from "react"
import { NextPage } from "next"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AuthProvider from "@/contexts/useAuth"
import LayoutDashboard from "@/layouts/Dashboard"

type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ||
    ((page: ReactNode) => <LayoutDashboard>{page}</LayoutDashboard>)

  const [queryClient] = useState(() => new QueryClient())

  return (
    <>
      <Head>
        <title>Colegist</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <NextUIProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider pageProps={pageProps}>
            {getLayout(<Component {...pageProps} />)}
          </AuthProvider>
        </QueryClientProvider>
      </NextUIProvider>
    </>
  )
}
