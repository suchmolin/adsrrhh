import Image from "next/image"
import Link from "next/link"

export default function AcademiaCorporativaHome() {
  return (
    <div className="w-full flex justify-center bg-grisads pt-10 overflow-hidden">
      <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex flex-col lg:flex-row-reverse justify-center items-center">
        <div className="w-[375px] sm:w-[600px] h-[270px] sm:h-[500px] relative scale-x-[-1]">
          <Image
            src="/img/cademiacorporativaimg.png"
            alt="finding job"
            objectFit="contain"
            layout="fill"
            objectPosition="bottom"
          />
        </div>
        <div className="w-12/12 sm:w-9/12 lg:w-6/12 sm:px-4 flex flex-col text-center lg:text-start ">
          <h2 className="text-5xl sm:text-6xl text-primary font-bold mb-4 font-[poppins-extrabold]">
            <div className="relative inline-block w-[70px] aspect-square">
              <Image
                src="/img/academiacorporativaicon.png"
                alt="academia corporativa icon"
                objectFit="contain"
                layout="fill"
                objectPosition="bottom"
              />
            </div>
            cademia <br />
            Corporativa
          </h2>
          <h3 className="text-primary text-3xl sm:text-4xl font-[monserrat-bold] mb-4">
            Convertimos a tu equipo en un 10/10.
          </h3>
          <p className="text-sm xs:text-lg text-gray-900 mb-4">
            El éxito de tu empresa empieza con un equipo bien preparado. En{" "}
            <b>Academia Corporativa</b>, podrás lograrlo con nuestros programas
            de capacitación donde impulsamos:
          </p>
          <ul className="text-lg mb-4">
            <li className="flex gap-3 items-center mb-4">
              <Image
                src="/img/vistoazul.png"
                alt="checkmark"
                width={30}
                height={30}
              />
              Formación en liderazgo y gestión de equipos.
            </li>
            <li className="flex gap-3 items-center mb-4">
              <Image
                src="/img/vistoazul.png"
                alt="checkmark"
                width={30}
                height={30}
              />
              Desarrollo de habilidades técnicas especializadas.
            </li>
            <li className="flex gap-3 items-center mb-4">
              <Image
                src="/img/vistoazul.png"
                alt="checkmark"
                width={30}
                height={30}
              />
              Programas de actualización según las tendencias del mercado.
            </li>
          </ul>
          <div className="flex justify-center lg:justify-start pb-10">
            <Link
              className="rounded-md px-4 py-2 text-white bg-secondary hover:scale-105 duration-300 text-center w-fit font-[monserrat-bold] text-xl"
              href="/candidato/registro"
            >
              Empezar
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
