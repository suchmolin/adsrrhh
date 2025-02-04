import Image from "next/image"
import Link from "next/link"

export default function SecPrimerEmpleoHome() {
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
            <span className="text-azulads">¡Tu primer empleo te espera!</span>{" "}
            Inicia tu carrera profesional con nosotros y alcanza tus metas.
          </h2>

          <p className="text-sm xs:text-base text-gray-700 mb-4">
            ¿Acabas de graduarte y buscas tu primera oportunidad laboral? En
            nuestra empresa, te ofrecemos la posibilidad de adquirir experiencia
            y desarrollar tus habilidades en un ambiente dinámico y desafiante.
            ¡Únete a nuestro equipo y comienza a construir tu futuro!
          </p>
          <div className="flex justify-center lg:justify-start">
            <Link
              className="CShadow2 rounded-sm px-4 py-2 text-white bg-azulads hover:scale-105 duration-300 text-center w-fit"
              href="/candidato/registro"
            >
              Busca tu primer empleo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
