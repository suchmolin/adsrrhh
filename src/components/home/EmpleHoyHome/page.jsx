import Image from "next/image"
import Link from "next/link"

export default function EmpleHoyHome() {
  return (
    <div className="w-full flex justify-center bg-grisads pt-10 overflow-hidden">
      <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex flex-col lg:flex-row-reverse  justify-center items-center">
        <div className="w-[375px] sm:w-[600px] h-[270px] sm:h-[500px] relative">
          <Image
            src="/img/emplehoyimg.png"
            alt="finding job"
            objectFit="contain"
            layout="fill"
            objectPosition="bottom"
          />
        </div>
        <div className="w-12/12 sm:w-9/12 lg:w-5/12 sm:px-4 flex flex-col items-center lg:items-start text-center lg:text-start ">
          <div className="text-5xl xs:text-6xl text-primary font-bold mb-4 font-[poppins-extrabold] flex items-center">
            EmpleH
            <Image
              src="/img/odeemplehoy.png"
              alt="ode emplehoy"
              width={60}
              height={50}
            />{" "}
            y
          </div>
          <h3 className="text-primary text-4xl font-[monserrat-bold] mb-4">
            ¡Hoy SÍ, hoy es tu día!
          </h3>
          <p className="text-sm xs:text-lg text-gray-900 mb-4">
            Sabemos lo importante que es encontrar un trabajo que impulse tu
            pasión. Por eso, en &nbsp;
            <b>EmpleHoy</b>, te conectamos con oportunidades laborales pensadas
            en tu perfil y tus sueños donde tendrás:
          </p>
          <ul className="text-lg">
            <li className="flex gap-3 items-center mb-4">
              <Image
                src="/img/vistoazul.png"
                alt="checkmark"
                width={30}
                height={30}
              />
              Acceso a oportunidades laborales actualizadas.
            </li>
            <li className="flex gap-3 items-center mb-4">
              <Image
                src="/img/vistoazul.png"
                alt="checkmark"
                width={30}
                height={30}
              />
              Postulación fácil y rápida.
            </li>
            <li className="flex gap-3 items-center mb-4">
              <Image
                src="/img/vistoazul.png"
                alt="checkmark"
                width={30}
                height={30}
              />
              Conexión directa con empresas en búsqueda de talento
            </li>
          </ul>
          <div className="flex justify-center lg:justify-start pb-10">
            <Link
              className="rounded-md px-4 py-2 text-white bg-secondary hover:scale-105 duration-300 text-center w-fit  font-[monserrat-bold] text-xl"
              href="/candidato/registro"
            >
              Acceder
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
