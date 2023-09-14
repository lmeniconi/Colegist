import { capitalize, upperCase } from "lodash"

export function generateOptions(
  list: string[],
  options?: {
    format?: "capitalize" | "uppercase"
    labels?: {
      [key: string]: string
    }
  },
): {
  label: string
  value: string
}[] {
  const { format = "capitalize", labels = {} } = options || {}

  return list.map((value) => {
    let label: string = labels[value]
    if (!label) {
      label = value.split("_").join(" ")

      format === "capitalize"
        ? (label = capitalize(label))
        : (label = upperCase(label))
    }

    return {
      label,
      value,
    }
  })
}

export function getStringValue(
  value: string | number | boolean | undefined | null,
) {
  if (value === undefined || value === null) return "null"
  return value.toString()
}
