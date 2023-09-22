import FullScreenLoader from "@/components/Shared/Loader/FullScreen"
import LayoutBlank from "@/layouts/Blank"
import apiAxios from "@/utils/api"
import { ReactNode, useEffect } from "react"

export default function Page() {
  useEffect(() => {
    apiAxios.post("/logout").finally(() => {
      window.location.href = "/"
    })
  }, [])

  return <FullScreenLoader />
}

Page.getLayout = function getLayout(page: ReactNode) {
  return <LayoutBlank>{page}</LayoutBlank>
}
