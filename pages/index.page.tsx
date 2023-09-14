import LayoutHome from "@/layouts/Home"
import { GetStaticPropsResult } from "@/types/Props"
import { Button } from "@nextui-org/button"
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Link as UiLink,
} from "@nextui-org/react"
import { ReactNode } from "react"
import FadeIn from "@/components/Shared/FadeIn"
import Moon from "./components/Moon"

export default function Page() {
  return (
    <div className="space-y-28">
      <section className="relative h-screen flex justify-center items-center ">
        <div className="absolute left-0 right-0 bottom-0 z-0">
          <Moon />
        </div>

        <FadeIn className="z-10 space-y-16 max-w-5xl text-center">
          <h1 className="text-7xl font-bold ">
            Habla con tu Base de Datos <br /> sin saber de codigo
          </h1>
          <p className="text-2xl">
            Colegist convierte el lenguaje natural en SQL sin necesidad de
            conocimientos en SQL. <br /> Damos el poder del analisis de datos a
            cualquier miembro del equipo
          </p>

          <Button
            as={UiLink}
            href="#como-funciona"
            color="primary"
            size="lg"
            variant="shadow"
          >
            Ver Más
          </Button>
        </FadeIn>
      </section>

      <div className="container mx-auto space-y-28">
        <section id="como-funciona" className="space-y-12">
          <div className="text-center space-y-12">
            <h1 className="text-7xl font-bold ">¿Cómo funciona?</h1>
            <p className="text-2xl font-thin">
              Colegist utiliza Machine Learning para entender el lenguaje
              natural y convertirlo en SQL. <br /> Colegist se conecta a tu base
              de datos y te permite hacer consultas sin saber SQL
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3">
            <Card className="max-w-[400px]">
              <CardHeader className="flex gap-3">
                <p className="text-md">Texto a SQL</p>
              </CardHeader>
              <Divider />
              <CardBody>
                <p>
                  Colegist puede entender el lenguaje natural y convertirlo en
                  SQL
                </p>
              </CardBody>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}

export function getStaticProps(): GetStaticPropsResult {
  return {
    props: {
      auth: false,
    },
  }
}

Page.getLayout = function getLayout(page: ReactNode) {
  return <LayoutHome>{page}</LayoutHome>
}
