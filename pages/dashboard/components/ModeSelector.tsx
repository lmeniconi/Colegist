import { Tab, Tabs, TabsProps } from "@nextui-org/react"
import { IconDatabase, IconWand } from "@tabler/icons-react"

const MODES: {
  key: "sql" | "data"
  icon: React.FC
  title: string
}[] = [
  {
    key: "sql",
    icon: IconWand,
    title: "SQL",
  },
  {
    key: "data",
    icon: IconDatabase,
    title: "Data",
  },
]

const MODES_KEYS = MODES.map((mode) => mode.key)
export type ModeKey = (typeof MODES_KEYS)[number]

type Props = TabsProps

export default function ModeSelector(props: Props) {
  return (
    <Tabs aria-label="Options" color="primary" variant="bordered" {...props}>
      {MODES.map((mode) => (
        <Tab
          key={mode.key}
          title={
            <div className="flex items-center space-x-2">
              <mode.icon />
              <span>{mode.title}</span>
            </div>
          }
        />
      ))}
    </Tabs>
  )
}
