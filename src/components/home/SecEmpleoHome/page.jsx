import Image from "next/image"
import Link from "next/link"

export default function SecEmpleoHome() {
  return (
    <div className="w-full flex justify-center bg-azulclaroads pt-5 mt-5 overflow-hidden">
      <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex flex-col lg:flex-row justify-center items-center lg:items-end">
        <div className="w-[375px] sm:w-[600px] h-[270px] sm:h-[400px] relative">
          <Image
            src="/img/findingjob2.png"
            alt="finding job"
            objectFit="contain"
            layout="fill"
            objectPosition="bottom"
          />
        </div>
        <div className="w-12/12 sm:w-9/12 lg:w-8/12 sm:px-4 flex flex-col text-center lg:text-start pb-10">
          <h2 className="text-xl xs:text-2xl lg:text-3xl text-azuloscuroads font-bold mb-4 font-[monserrat-bold]">
            <span className="text-azulads">ADS Recursos Humanos,</span> Eleva tu
            carrera profesional al siguiente nivel junto a nosotros.
          </h2>
          <h3 className="text-azuloscuroads text-sm xs:text-base lg:text-lg font-[monserrat-bold]">
            Tu siguiente empleo te está esperando.
          </h3>
          <p className="text-sm xs:text-base text-gray-700 mb-4">
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
              href="/candidato/registro"
            >
              Comienza la Busqueda
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
