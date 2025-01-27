import Image from "next/image"
import Link from "next/link"

export default function SeccionDescriptiva() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex flex-col lg:flex-row justify-center items-center">
        <div className="w-9/12 sm:w-6/12 lg:w-5/12 aspect-square relative">
          <Image
            src="/img/findingjob.png"
            alt="finding job"
            objectFit="contain"
            layout="fill"
          />
        </div>
        <div className="w-12/12 sm:w-9/12 lg:w-7/12 sm:px-4 flex flex-col text-center lg:text-start">
          <h2 className="text-2xl lg:text-3xl text-azulads font-bold mb-4 font-[monserrat-bold]">
            ADS Recursos Humanos, Eleva tu carrera profesional al siguiente
            nivel junto a nosotros.
          </h2>
          <h3 className="text-azuloscuroads text-xl lg:text-2xl mb-4 font-[monserrat-bold]">
            Tu siguiente empleo te está esperando.
          </h3>
          <p className="text-gray-700 mb-4">
            En ADS Recursos Humanos, creemos en el potencial de cada individuo.
            Nuestra misión es conectarte con el trabajo donde puedas desarrollar
            tus habilidades al máximo y alcanzar tus metas profesionales. Si
            buscas un lugar donde tu talento sea valorado y donde puedas crecer
            junto a un equipo apasionado, ¡esta es tu oportunidad! Únete a
            nosotros y descubre nuevas oportunidades para impulsar tu carrera.
          </p>
          <div className="flex justify-center lg:justify-start">
            <Link
              className="CShadow2 rounded-sm px-4 py-2 text-white bg-azulads hover:scale-105 duration-300 text-center w-fit"
              href="#"
            >
              Comienza la Busqueda
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
