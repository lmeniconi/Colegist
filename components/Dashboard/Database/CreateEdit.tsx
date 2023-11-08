import {
  DATABASE_CONNECTION_TYPES,
  Database,
  DatabaseConnectionType,
} from "@/models/Database/types"
import { generateOptions } from "@/utils/helpers"
import { Key, useEffect, useState } from "react"
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Tab,
  Tabs,
} from "@nextui-org/react"
import { Controller, useForm } from "react-hook-form"
import {
  CreateDatabase,
  createDatabase,
  updateDatabase,
} from "@/models/Database/api"
import ModalActions from "@/components/Shared/Modal/Actions"

const DATABASE_CONNECTION_TYPES_OPTIONS = generateOptions(
  Array.from(DATABASE_CONNECTION_TYPES)
)

type Props = {
  database?: Database | null
  isOpen: boolean
  onOpenChange: () => void
}

export default function CreateEditDatabaseModal({
  database,
  isOpen,
  onOpenChange,
}: Props) {
  const { control, handleSubmit, setValue, reset, formState } =
    useForm<CreateDatabase>({
      defaultValues: {
        name: "",
        type: "connection",
        connection: null,
        host: "",
        port: null,
        user: "",
        password: "",
        database: "",
      },
    })

  const [selected, setSelected] = useState<Key>("connect")

  function setDefaultConnectionValues(connection: DatabaseConnectionType) {
    if (connection === "mysql") setValue("port", 3306)
    else if (connection === "postgres") setValue("port", 5432)
  }

  async function submit(data: CreateDatabase) {
    if (data.id) await updateDatabase(data.id, data)
    else await createDatabase(data)

    reset()
    onOpenChange()
  }

  useEffect(() => {
    if (isOpen) {
      if (database) {
        setValue("id", database.id)
        setValue("name", database.name)
        setValue("type", database.type)
        setValue("connection", database.connection)
        setValue("host", database.host)
        setValue("port", database.port)
        setValue("user", database.user)
        setValue("database", database.database)
      }

      return
    }
    reset()
  }, [isOpen])

  return (
    <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(submit)}>
            <ModalHeader className="flex flex-col gap-1">
              Base de datos
            </ModalHeader>

            <ModalBody>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Input
                    autoFocus
                    label="Nombre"
                    variant="bordered"
                    {...field}
                  />
                )}
              />

              <Tabs
                aria-label="Tipo de base de datos"
                selectedKey={selected}
                onSelectionChange={setSelected}
                color="primary"
              >
                <Tab key="connection" title="Conexión">
                  <div className="space-y-4">
                    <Controller
                      name="connection"
                      control={control}
                      render={({ field }) => (
                        <Select
                          label="Base de datos"
                          variant="bordered"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) => {
                            const value = e.target
                              .value as DatabaseConnectionType

                            field.onChange(value)
                            setDefaultConnectionValues(value)
                          }}
                        >
                          {DATABASE_CONNECTION_TYPES_OPTIONS.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Controller
                        control={control}
                        name="host"
                        render={({ field }) => (
                          <Input
                            label="Host"
                            variant="bordered"
                            {...field}
                            value={field.value ?? ""}
                          />
                        )}
                      />

                      <Controller
                        control={control}
                        name="port"
                        render={({ field }) => (
                          <Input
                            label="Puerto"
                            type="number"
                            variant="bordered"
                            {...field}
                            value={field.value?.toString() ?? ""}
                          />
                        )}
                      />

                      <Controller
                        control={control}
                        name="user"
                        render={({ field }) => (
                          <Input
                            label="Usuario"
                            variant="bordered"
                            {...field}
                            value={field.value ?? ""}
                          />
                        )}
                      />

                      <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                          <Input
                            label="Password"
                            type="password"
                            variant="bordered"
                            {...field}
                            value={field.value ?? ""}
                          />
                        )}
                      />

                      <Controller
                        control={control}
                        name="database"
                        render={({ field }) => (
                          <Input
                            label="Base de datos"
                            variant="bordered"
                            {...field}
                            value={field.value ?? ""}
                          />
                        )}
                      />
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </ModalBody>

            <ModalFooter>
              <ModalActions
                loading={formState.isSubmitting}
                onClose={onClose}
              />
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  )
}
