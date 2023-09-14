import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export default function Icon({ children }: Props) {
  return children

  // return (
  //   <ThemeIcon
  //     {...rest}
  //     variant="outline"
  //     sx={{
  //       border: 0,
  //     }}
  //   >
  //     {children}
  //   </ThemeIcon>
  // )
}
