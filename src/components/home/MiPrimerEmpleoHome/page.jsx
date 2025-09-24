import Image from "next/image"
import Link from "next/link"

export default function MiPrimerEmpleoHome() {
  return (
    <div className="w-full flex justify-center bg-white pt-10 overflow-hidden">
      <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex flex-col lg:flex-row-reverse justify-center items-center ">
        <div className="w-[375px] sm:w-[600px] h-[270px] sm:h-[500px] relative">
          <Image
            src="/img/miprimerempleoimg2.png"
            alt="finding job"
            objectFit="contain"
            layout="fill"
            objectPosition="bottom"
          />
        </div>
        <div className="w-12/12 sm:w-9/12 lg:w-6/12 sm:px-4 flex flex-col text-center lg:text-start items-center lg:items-start">
          <div className="text-4xl xs:text-6xl text-primary font-bold mb-4 font-[poppins-extrabold] relative w-fit pr-10 xs:pr-14 text-left">
            <div className="absolute right-0 top-2">
              <div className="relative w-[80px] xs:w-[120px] aspect-square">
                <Image
                  src="/img/miprimerempleoicon.png"
                  objectFit="contain"
                  layout="fill"
                  alt="mi primer empleo iamgen"
                />
              </div>
            </div>
            <span>
              Mi Primer <br />
              Empleo
            </span>
          </div>
          <h3 className="text-primary text-xl xs:text-4xl font-[monserrat-bold] mb-4">
            ¡Voy por mi primer empleo!
          </h3>
          <p className="text-sm xs:text-lg text-gray-900 mb-4">
            Dar el primer paso en el mundo laboral puede ser un reto. En{" "}
            <b>Mi Primer Empleo,</b> te conectamos con oportunidades diseñadas
            para que empieces tu camino profesional. Accede a:
          </p>
          <ul className="text-lg mb-4">
            <li className="flex gap-3 items-center mb-4">
              <Image
                src="/img/vistoazul.png"
                alt="checkmark"
                width={30}
                height={30}
              />
              Tu primera experiencia laboral en empresas confiables.
            </li>
            <li className="flex gap-3 items-center mb-4">
              <Image
                src="/img/vistoazul.png"
                alt="checkmark"
                width={30}
                height={30}
              />
              Capacitaciones para mejorar tus habilidades.
            </li>
            <li className="flex gap-3 items-center mb-4">
              <Image
                src="/img/vistoazul.png"
                alt="checkmark"
                width={30}
                height={30}
              />
              Pasantías y oportunidades de aprendizaje.
            </li>
          </ul>
          <div className="flex justify-center lg:justify-start pb-10">
            <Link
              className="rounded-md px-4 py-2 text-white bg-secondary hover:scale-105 duration-300 text-center w-fit font-[monserrat-bold] text-xl"
              href="/candidato/registro"
            >
              Iniciar
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
