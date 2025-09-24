import Image from "next/image"
import Link from "next/link"

export default function CapacitaProHome() {
  return (
    <div className="w-full flex justify-center bg-grisads pt-10 overflow-hidden">
      <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex flex-col lg:flex-row justify-center items-center">
        <div className="w-[375px] sm:w-[600px] h-[270px] sm:h-[420px] relative -mt-10">
          <Image
            src="/img/capacitaproimg.png"
            alt="finding job"
            objectFit="contain"
            layout="fill"
            objectPosition="bottom"
          />
        </div>
        <div className="w-12/12 sm:w-9/12 lg:w-6/12 sm:px-4 flex flex-col text-center lg:text-start pt-5 items-center lg:items-start">
          <div className="text-5xl sm:text-6xl text-primary font-bold mb-4 font-[poppins-extrabold] relative w-fit">
            <div className="absolute -top-5 sm:-top-6 -left-5 sm:-left-6">
              <div className="relative w-[50px] sm:w-[60px] aspect-square">
                <Image
                  src="/img/capacitaproicon.png"
                  alt="capacitapro icon"
                  objectFit="contain"
                  layout="fill"
                />
              </div>
            </div>
            <span>CapacitaPro</span>
          </div>
          <h3 className="text-primary text-sm xs:text-base lg:text-4xl font-[monserrat-bold] mb-4">
            Tu talento. Tu poder.Tu futuro.
          </h3>
          <p className="text-sm xs:text-lg text-gray-900 mb-4">
            ¿Listo para mejorar tus habilidades? En &nbsp; <b>CapacitaPro</b>,
            puedes disfrutar de programas de capacitación para que desarrolles
            todo tu potencial. Con ellos obtienes:
          </p>
          <ul className="text-lg mb-4">
            <li className="flex gap-3 items-center mb-4">
              <Image
                src="/img/vistoverde.png"
                alt="checkmark"
                width={30}
                height={30}
              />
              Formación técnica y profesional en distintas áreas.
            </li>
            <li className="flex gap-3 items-center mb-4">
              <Image
                src="/img/vistoverde.png"
                alt="checkmark"
                width={30}
                height={30}
              />
              Desarrollo de habilidades blandas y liderazgo
            </li>
            <li className="flex gap-3 items-center mb-4">
              <Image
                src="/img/vistoverde.png"
                alt="checkmark"
                width={30}
                height={30}
              />
              Clases online y presenciales con expertos en la industria.
            </li>
          </ul>
          <div className="flex justify-center lg:justify-start pb-20">
            <Link
              className="rounded-md px-4 py-2 text-white bg-primary hover:scale-105 duration-300 text-center w-fit font-[monserrat-bold]"
              href="/candidato/registro"
            >
              Comenzar
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
