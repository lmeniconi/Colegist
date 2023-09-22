import { ReactNode, useEffect } from "react"
import { GetStaticPropsResult } from "@/types/Props"
import FullScreenLoader from "@/components/Shared/Loader/FullScreen"
import LayoutBlank from "@/layouts/Blank"

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL as string

export default function Page() {
  useEffect(() => {
    window.location.href = `${NEXT_PUBLIC_API_URL}/login`
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
