import dayjs from "dayjs"
import { capitalize } from "lodash"
require("dayjs/locale/es")
dayjs.locale("es")

Object.freeze(dayjs)
export default dayjs

export function formatDate(date?: string | Date | dayjs.Dayjs): string {
  if (!date) return ""

  const str = dayjs(date).format("DD MMMM YYYY").split(" ")
  str[1] = capitalize(str[1])

  return str.join(" ")
}
