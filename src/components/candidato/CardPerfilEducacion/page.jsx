import Image from "next/image"

export default function CardPerfilEducacion() {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full h-fit bg-white CShadow3 relative flex flex-col gap-3 py-5 rounded-xl px-10">
        <div className="w-full flex gap-2 items-center">
          <Image src="/img/birrete.png" width={40} height={40} alt="birrete" />
          <h2 className="font-[monserrat-black] text-primary text-2xl">
            Educación
          </h2>
        </div>
        <div className="pl-12">
          <div id="estudios" className="mb-4">
            <h3 className="text-primary text-lg font-bold">
              Estudios y capacitaciones
            </h3>
            <div className="">
              <p className="font-bold">Licenciado en Administración - UCAB</p>
              <p className="text-sm text-gray-700">2013 - 2018</p>
            </div>
            <div className="">
              <p className="font-bold">Licenciado en Administración - UCAB</p>
              <p className="text-sm text-gray-700">2013 - 2018</p>
            </div>
          </div>

          <div id="idiomas" className="mb-4">
            <h3 className="text-primary text-lg font-bold">Idiomas</h3>
            <div className="">
              <p className="font-bold">Español</p>
              <p className="text-sm text-gray-700">Nativo</p>
            </div>
            <div className="">
              <p className="font-bold">Inglés</p>
              <p className="text-sm text-gray-700">B2 - Intermedio Alto</p>
            </div>
          </div>

          <div id="habilidades" className="mb-4">
            <h3 className="text-primary text-lg font-bold">habilidades</h3>
            <div className="flex flex-wrap gap-2">
              <p className="px-2 py-1 bg-gray-200 text-primary text-center rounded-2xl font-bold">
                Liderazgo
              </p>
              <p className="px-2 py-1 bg-gray-200 text-primary text-center rounded-2xl font-bold">
                Planificación
              </p>
              <p className="px-2 py-1 bg-gray-200 text-primary text-center rounded-2xl font-bold">
                Toma de Decisiones
              </p>
              <p className="px-2 py-1 bg-gray-200 text-primary text-center rounded-2xl font-bold">
                Negociación
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-fit bg-white CShadow3 relative flex flex-col gap-3 py-5 rounded-xl px-10">
        <div className="w-full flex gap-2 items-center">
          <Image src="/img/maleta.png" width={40} height={40} alt="birrete" />
          <h2 className="font-[monserrat-black] text-primary text-2xl">
            Experiencia Laboral
          </h2>
        </div>
        <div className="pl-12">
          <div className="mb-4">
            <p className="font-bold">Director de Análisis Económico</p>
            <p className="text-sm text-gray-600 font-bold">Empresas Polar</p>
            <p className="text-sm font-bold mb-2">
              Octubre 2022 - Febrero 2025
            </p>
            <p className="text-sm text-gray-700">
              Lideré el análisis de tendencias económicas y financieras,
              desarrollando modelos predictivos para decisiones estratégicas.
              Supervisé la evaluación de mercados, identificación de riesgos y
              optimización de recursos, contribuyendo al éxito corporativo.
            </p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Director de Análisis Económico</p>
            <p className="text-sm text-gray-600 font-bold">Empresas Polar</p>
            <p className="text-sm font-bold mb-2">
              Octubre 2022 - Febrero 2025
            </p>
            <p className="text-sm text-gray-700">
              Lideré el análisis de tendencias económicas y financieras,
              desarrollando modelos predictivos para decisiones estratégicas.
              Supervisé la evaluación de mercados, identificación de riesgos y
              optimización de recursos, contribuyendo al éxito corporativo.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
