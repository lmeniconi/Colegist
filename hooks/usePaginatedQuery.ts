import { useState, useEffect } from "react"
import { useQueryListPaginatedQuery } from "./useQuery"
import { JsonQueryString } from "../utils/api"

export default function usePaginatedQuery<T extends JsonQueryString>(
  initialValue: T,
): [
  query: useQueryListPaginatedQuery & T,
  setQuery: React.Dispatch<
    React.SetStateAction<useQueryListPaginatedQuery & T>
  >,
] {
  const [query, setQuery] = useState({
    ...initialValue,
    page: 1,
  })
  const [lastPage, setLastPage] = useState(1)

  useEffect(() => {
    if (query.page === 1 && lastPage === 1) return

    if (query.page !== lastPage) {
      setLastPage(query.page)
      return
    }

    setQuery({
      ...query,
      page: 1,
    })
  }, [query])

  return [query, setQuery]
}
