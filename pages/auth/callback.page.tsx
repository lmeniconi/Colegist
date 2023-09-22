import { useRouter } from "next/router"
import { ReactNode, useEffect } from "react"
import { GetStaticPropsResult } from "@/types/Props"
import FullScreenLoader from "@/components/Shared/Loader/FullScreen"
import LayoutBlank from "@/layouts/Blank"

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    const redirect = localStorage.getItem("redirect")
    if (redirect) localStorage.removeItem("redirect")

    router.push(redirect ?? "/dashboard")
  }, [])

  return <FullScreenLoader />
}

export function getStaticProps(): GetStaticPropsResult {
  return {
    props: {
      auth: false,
    },
  }
}

Page.getLayout = function getLayout(page: ReactNode) {
  return <LayoutBlank>{page}</LayoutBlank>
}
