import DatabaseTable from "@/components/Dashboard/Database/Table"
import FadeIn from "@/components/Shared/FadeIn"
import Title from "@/components/Shared/Title"

export default function Page() {
  return (
    <FadeIn className="space-y-20">
      <Title description="Conecta tus bases de datos o sube tu schema para poder hacer consultas">
        Bases de Datos
      </Title>
      <DatabaseTable />
    </FadeIn>
  )
}
