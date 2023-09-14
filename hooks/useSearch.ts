import { useState } from "react"
import useDebouncedValue from "./useDebouncedValue"

export default function useSearch(
  initialValue?: string,
): [
  search: string,
  setSearch: (value: string) => void,
  debouncedSearch: string,
] {
  const [search, setSearch] = useState(initialValue ?? "")
  const [debouncedSearch] = useDebouncedValue(search)

  return [search, setSearch, debouncedSearch]
}
