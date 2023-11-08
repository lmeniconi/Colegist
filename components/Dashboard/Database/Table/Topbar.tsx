import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Selection,
} from "@nextui-org/react"
import {
  IconChevronDown,
  IconDatabasePlus,
  IconSearch,
} from "@tabler/icons-react"
import { DATABASE_TYPES_MAP } from "."
import { Database } from "@/models/Database/types"
import { Paginated } from "@/types/Api"

type Props = {
  databases?: Paginated<Database>
  search: string
  onSearchChange: (value: string) => void
  type: Selection
  onChangeType: (value: Selection) => void
  onCreateNew?: () => void
}

export default function DatabaseTableTopbar({
  databases,
  search,
  onSearchChange,
  type,
  onChangeType,
  onCreateNew,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-xs"
          placeholder="Buscar..."
          startContent={<IconSearch />}
          value={search}
          onClear={() => onSearchChange("")}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                color="success"
                endContent={<IconChevronDown size={15} />}
                variant="flat"
              >
                Tipo
              </Button>
            </DropdownTrigger>

            <DropdownMenu
              disallowEmptySelection
              aria-label="Filtro de tipo de base de datos"
              closeOnSelect={false}
              selectedKeys={type}
              onSelectionChange={onChangeType}
              selectionMode="multiple"
            >
              {Object.values(DATABASE_TYPES_MAP).map((type) => (
                <DropdownItem key={type.id}>{type.label}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          {onCreateNew && (
            <Button
              color="primary"
              endContent={<IconDatabasePlus />}
              onClick={onCreateNew}
            >
              Nueva base de datos
            </Button>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {databases?.meta.total} users
        </span>
      </div>
    </div>
  )
}
