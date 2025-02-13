import Link from "next/link"

export default function BuscasEmpleoLoginCandidato() {
  return (
    <div className="w-full bg-gray-100 flex justify-center">
      <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex flex-col py-10">
        <h2 className="text-azulads text-2xl xs:text-3xl font-[monserrat-bold]">
          ¿Buscas empleo y no estás registrado?
        </h2>
        <h3 className="text-azuloscuroads text-lg font-[monserrat-bold]">
          Nosotros te ayudamos
        </h3>
        <div className="w-full flex flex-wrap md:flex-nowrap gap-4 mt-4">
          <div className="w-full md:w-4/12 flex gap-2">
            <div className="w-[50px] lg:w-[80px] bg-[#90c4e9] aspect-square p-2 rounded-md flex justify-end items-center">
              <p className="text-6xl font-[monserrat-bold] text-white">1</p>
            </div>
            <div className="w-10/12 flex flex-col justify-end">
              <h4 className="text-azulads font-[monserrat-bold]">
                Crea tu perfil
              </h4>
              <p className="text-gray-700 text-sm">
                Destaca tus habilidades y experiencia para captar la atención de
                las empresas.
              </p>
            </div>
          </div>
          <div className="w-full md:w-4/12 flex gap-2">
            <div className="w-[50px] lg:w-[80px] bg-[#90c4e9] aspect-square p-2 rounded-md flex justify-end items-center">
              <p className="text-6xl font-[monserrat-bold] text-white">2</p>
            </div>
            <div className="w-10/12 flex flex-col justify-end">
              <h4 className="text-azulads font-[monserrat-bold]">
                Postulate a las mejores oportunidades
              </h4>
              <p className="text-gray-700 text-sm">
                Encuentra vacantes que se adapten a ti y sigue el estado de tus
                aplicaciones
              </p>
            </div>
          </div>
          <div className="w-full md:w-4/12 flex gap-2">
            <div className="w-[50px] lg:w-[80px] bg-[#90c4e9] aspect-square p-2 rounded-md flex justify-end items-center">
              <p className="text-6xl font-[monserrat-bold] text-white">3</p>
            </div>
            <div className="w-10/12 flex flex-col justify-end">
              <h4 className="text-azulads font-[monserrat-bold]">
                Actualiza tu información constantemente
              </h4>
              <p className="text-gray-700 text-sm">
                Mantén tu perfil al día y multiplica las posibilidades de se
                contactado por empresas.
              </p>
            </div>
          </div>
        </div>
        <div className="pt-10 flex items-center justify-center">
          <Link
            className="py-2 px-4 bg-azulads rounded-md text-white hover:scale-105 duration-300"
            href="/candidato/registro"
          >
            ¡Registrate Aquí!
          </Link>
        </div>
      </div>
    </div>
  )
}
