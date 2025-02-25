import Image from "next/image"
import Link from "next/link"
import { FaStar } from "react-icons/fa6"

export default function ConectandoTalentoHome() {
  return (
    <div className="w-full flex justify-center bg-grisads pt-10 overflow-hidden">
      <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex flex-col lg:flex-row justify-center items-center">
        <div className="w-[375px] sm:w-[600px] h-[270px] sm:h-[500px] relative">
          <Image
            src="/img/conectandotalentosimg.png"
            alt="finding job"
            objectFit="contain"
            layout="fill"
            objectPosition="bottom"
          />
        </div>
        <div className="w-12/12 sm:w-9/12 lg:w-6/12 sm:px-4 flex flex-col text-center lg:text-start ">
          <h2 className="text-5xl sm:text-6xl text-primary font-bold mb-4 font-[poppins-extrabold] ">
            Conectando <br />
            <span className=" flex items-center flex-col lg:flex-row">
              Talentos
              <span className="text-4xl flex ml-3 text-amarilloads">
                <FaStar />
                <FaStar />
                <FaStar />
              </span>
            </span>
          </h2>
          <h3 className="text-primary text-3xl sm:text-4xl font-[monserrat-bold] mb-4">
            ¡Qué tu día, sean todos los días!
          </h3>
          <p className="text-sm xs:text-lg text-gray-900 mb-4">
            Si eres una empresa buscando sumar talento a tu equipo, &nbsp;{" "}
            <b>Conectando Talentos</b> es tu mejor aliado. Haz crecer tu equipo
            con el talento indicado, sin complicaciones. Te ofrecemos:
          </p>
          <ul className="text-lg mb-4">
            <li className="flex gap-3 items-center mb-4">
              <Image
                src="/img/vistoverde.png"
                alt="checkmark"
                width={30}
                height={30}
              />
              Publicación de vacantes con máxima visibilidad.
            </li>
            <li className="flex gap-3 items-center mb-4">
              <Image
                src="/img/vistoverde.png"
                alt="checkmark"
                width={30}
                height={30}
              />
              Filtros avanzados para encontrar el perfil perfecto.
            </li>
            <li className="flex gap-3 items-center mb-4">
              <Image
                src="/img/vistoverde.png"
                alt="checkmark"
                width={30}
                height={30}
              />
              Acceso a una base de datos con talento altamente calificado.
            </li>
          </ul>
          <div className="flex justify-center lg:justify-start pb-10">
            <Link
              className="rounded-md px-4 py-2 text-white bg-primary hover:scale-105 duration-300 text-center w-fit font-[monserrat-bold] text-xl"
              href="/candidato/registro"
            >
              Conectar
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
