import { debounce } from "lodash"
import { useEffect, useState } from "react"

export default function useDebouncedValue(value: any, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const debounceFunction = debounce((newValue) => {
      setDebouncedValue(newValue)
    }, delay)

    debounceFunction(value)

    return () => {
      debounceFunction.cancel()
    }
  }, [value, delay])

  return debouncedValue
}
