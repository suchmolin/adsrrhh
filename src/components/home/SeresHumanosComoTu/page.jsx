import Image from "next/image"
import Link from "next/link"

export default function SeresHumanosComoTu() {
  return (
    <div className="w-full flex justify-center bg-white pt-5 overflow-hidden">
      <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex flex-col lg:flex-row justify-center items-center lg:items-end">
        <div className="w-[375px] sm:w-[600px] h-[270px] sm:h-[400px] relative">
          <Image
            src="/img/comotuimg.png"
            alt="finding job"
            objectFit="contain"
            layout="fill"
            objectPosition="bottom"
          />
        </div>
        <div className="w-12/12 sm:w-9/12 lg:w-6/12 sm:px-4 flex flex-col text-center lg:text-start pb-20">
          <h2 className="text-xl xs:text-2xl lg:text-3xl text-primary font-bold mb-4 flex flex-col items-center lg:items-start pt-3 sm:pt-0">
            Seres humanos
            <span className="font-[poppins-extrabold] text-5xl p-2 pr-4 border border-primary rounded-full w-fit ">
              Como Tú
            </span>
          </h2>

          <p className="text-sm xs:text-base text-primary font-[monserrat-bold]">
            Somos una empresa que conecta talentos y organizaciones con
            oportunidades de crecimiento a nivel global. Facilitamos el acceso a
            empleos, contrataciones y capacitaciones que impulsan el desarrollo
            personal y profesional
          </p>
        </div>
      </div>
    </div>
  )
}
