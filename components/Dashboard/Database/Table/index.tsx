import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  ButtonProps,
  Selection,
  useDisclosure,
} from "@nextui-org/react"
import React, { Key, useCallback, useEffect, useState } from "react"
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react"
import usePaginatedQuery from "@/hooks/usePaginatedQuery"
import { formatDate } from "@/utils/dayjs"
import DatabaseTableBottombar from "./Bottombar"
import DatabaseTableTopbar from "./Topbar"
import useSearch from "@/hooks/useSearch"
import {
  deleteDatabase as apiDeleteDatabase,
  usePaginatedDatabases,
  usePaginatedDatabasesQuery,
} from "@/models/Database/api"
import { Database } from "@/models/Database/types"
import CreateEditDatabaseModal from "../CreateEdit"
import DeleteModal from "@/components/Shared/Modal/Delete"

export const DATABASE_TYPES_MAP: {
  [key in Database["type"]]: {
    id: Database["type"]
    label: string
    color: ButtonProps["color"]
  }
} = {
  connection: {
    id: "connection",
    label: "Conexión",
    color: "primary",
  },
  schema: {
    id: "schema",
    label: "Esquema",
    color: "secondary",
  },
}

const COLUMNS: {
  id: string
  name: string
  sortable?: boolean
}[] = [
  { id: "name", name: "Nombre" },
  { id: "type", name: "Tipo" },
  {
    id: "createdAt",
    name: "Creado el",
    sortable: true,
  },
  {
    id: "actions",
    name: "Acciones",
  },
]

type Props = {
  className?: string
}

export default function DatabaseTable({ className }: Props) {
  const [query, setQuery] = usePaginatedQuery<usePaginatedDatabasesQuery>({
    page: 1,
    search: "",
    type: "",
  })
  const { data: databases, isLoading: loadingDatabases } =
    usePaginatedDatabases({
      query,
    })

  const [search, setSearch, debouncedSearch] = useSearch("")
  useEffect(
    () => setQuery((prev) => ({ ...prev, search: debouncedSearch })),
    [debouncedSearch]
  )

  const [type, setType] = useState<Selection>("all")
  useEffect(() => {
    const value = Array.from(type) as Database["type"][]

    if (
      type === "all" ||
      value.length === Object.values(DATABASE_TYPES_MAP).length
    ) {
      setQuery({
        ...query,
        type: "",
      })
      return
    }

    setQuery({
      ...query,
      type: value,
    })
  }, [type])

  const [selected, setSelected] = useState<Selection>(new Set([]))

  // Modal
  const [selectedDatabase, setSelectedDatabase] = useState<Database | null>(
    null
  )
  const {
    isOpen: createEditModalIsOpen,
    onOpen: onOpenCreateEditModal,
    onOpenChange: onOpenCreateEditModalChange,
  } = useDisclosure()

  const {
    isOpen: deleteModalIsOpen,
    onOpen: onOpenDeleteModal,
    onOpenChange: onOpenDeleteModalChange,
  } = useDisclosure()

  useEffect(() => {
    if (createEditModalIsOpen || deleteModalIsOpen) return
    setSelectedDatabase(null)
  }, [createEditModalIsOpen, deleteModalIsOpen])

  const [deleting, setDeleting] = useState<boolean>(false)
  async function deleteDatabase() {
    if (!selectedDatabase?.id) return

    try {
      setDeleting(true)
      await apiDeleteDatabase(selectedDatabase.id)
      onOpenDeleteModalChange()
    } finally {
      setDeleting(false)
    }
  }

  const renderCell = useCallback((database: Database, columnKey: Key) => {
    const cellValue = database[columnKey as keyof Database]

    switch (columnKey) {
      case "name":
        return <p className="text-bold text-small capitalize">{cellValue}</p>
      case "type":
        return (
          <Chip
            className="capitalize"
            color={DATABASE_TYPES_MAP[database.type].color}
            size="sm"
            variant="flat"
          >
            {DATABASE_TYPES_MAP[database.type].label}
          </Chip>
        )
      case "createdAt":
        return <p>{formatDate(database.createdAt)}</p>
      case "actions":
        return (
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <IconDotsVertical className="text-default-300" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                color="warning"
                startContent={<IconEdit />}
                onClick={() => {
                  setSelectedDatabase(database)
                  onOpenCreateEditModal()
                }}
              >
                Editar
              </DropdownItem>
              <DropdownItem
                color="danger"
                startContent={<IconTrash />}
                onClick={() => {
                  setSelectedDatabase(database)
                  onOpenDeleteModal()
                }}
              >
                Borrar
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )
      default:
        return cellValue
    }
  }, [])

  return (
    <>
      <Table
        aria-label="Tabla de bases de datos"
        isHeaderSticky
        selectedKeys={selected}
        // selectionMode="multiple"
        onSelectionChange={setSelected}
        topContent={
          <DatabaseTableTopbar
            databases={databases}
            search={search}
            onSearchChange={setSearch}
            type={type}
            onChangeType={setType}
            onCreateNew={onOpenCreateEditModal}
          />
        }
        topContentPlacement="outside"
        bottomContent={
          <DatabaseTableBottombar
            selectedKeys={selected}
            databases={databases}
            onChangePage={(page) => setQuery({ ...query, page })}
          />
        }
        bottomContentPlacement="outside"
        className={className}
      >
        <TableHeader columns={COLUMNS}>
          {(column) => (
            <TableColumn
              key={column.id}
              align={column.id === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={databases?.data ?? []}
          emptyContent="Ninguna base de datos encontrada"
          isLoading={loadingDatabases}
        >
          {(database) => (
            <TableRow>
              {(columnKey) => (
                <TableCell>{renderCell(database, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <CreateEditDatabaseModal
        database={selectedDatabase}
        isOpen={createEditModalIsOpen}
        onOpenChange={onOpenCreateEditModalChange}
      />
      <DeleteModal
        isOpen={deleteModalIsOpen}
        onOpenChange={onOpenDeleteModalChange}
        onConfirm={deleteDatabase}
        loading={deleting}
      />
    </>
  )
}
