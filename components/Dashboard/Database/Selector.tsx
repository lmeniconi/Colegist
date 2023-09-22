import { useDatabases } from "@/models/Database/api"
import { Select, SelectItem, SelectProps } from "@nextui-org/react"

type Props = Omit<SelectProps, "children">

export default function DatabaseSelector(props: Props) {
  const { data: databases } = useDatabases()

  return (
    <Select
      label="Selecciona una base de datos"
      variant="bordered"
      className="max-w-xs"
      size="sm"
      {...props}
    >
      {databases?.map((database) => (
        <SelectItem key={database.id} value={database.id}>
          {database.name}
        </SelectItem>
      )) ?? []}
    </Select>
  )
}
