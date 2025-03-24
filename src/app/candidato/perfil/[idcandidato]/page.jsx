import CardPerfilCandidato from "@/components/candidato/CardPerfilCandidato/page"
import CardPerfilEducacion from "@/components/candidato/CardPerfilEducacion/page"
import Image from "next/image"
import Link from "next/link"
import { FaAngleLeft } from "react-icons/fa6"

export default async function PerfilCandidato({ params }) {
  const { idcandidato } = await params
  return (
    <>
      <div className="w-full px-10 py-1 flex justify-between bg-grisads relative">
        <div className="flex gap-10 items-center text-primary ">
          <Link
            className="hover:scale-105 duration-300 flex items-center"
            href="/"
          >
            <FaAngleLeft /> Inicio
          </Link>
          <Link
            href="/"
            className="hover:scale-105 duration-300 px-4 py-2 bg-secondary text-white rounded-md"
          >
            Buscar Empleo
          </Link>{" "}
        </div>
        <Link className="relative w-[120px] aspect-video" href="/">
          <Image
            src="/img/logoadsrrhh2.png"
            layout="fill"
            objectFit="contain"
            alt="Ads Recursos Humanos Logo"
          />
        </Link>
      </div>
      <div className="w-full flex justify-center items-center py-10 bg-gray-50 relative">
        <div className="absolute bottom-0 left-20">
          <div className="w-[400px] aspect-video relative">
            <Image
              src="/img/imagenfondocandidato.png"
              layout="fill"
              objectFit="contain"
              alt="foto de fondo candidatos"
            />
          </div>
        </div>
        <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex flex-wrap justify-center">
          <h1 className="text-primary text-5xl font-[monserrat-black] pb-5">
            ¡Tu futuro comienza con un perfil completo!
          </h1>
          <div className="w-5/12 flex justify-center px-8">
            <CardPerfilCandidato />
          </div>
          <div className="w-7/12 flex justify-center px-7">
            <CardPerfilEducacion />
          </div>
        </div>
      </div>
    </>
  )
}
