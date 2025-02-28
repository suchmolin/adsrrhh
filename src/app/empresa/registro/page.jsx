import FormRegistroEmpresa from "@/components/empresa/FormRegistroEmpresa/page"
import FooterHome from "@/components/shared/FooterHome/page"

import Link from "next/link"
import { FaAngleLeft } from "react-icons/fa6"
import SeccionRegistradoEmpresa from "@/components/empresa/SeccionRegistradoEmpresa/page"
import Image from "next/image"

export default function RegistroEmpresaPage() {
  return (
    <>
      <div className="w-full px-10 py-7 flex justify-between">
        <div className="flex gap-10 items-center text-primary ">
          <Link
            className="hover:scale-105 duration-300 flex items-center"
            href="/"
          >
            <FaAngleLeft /> Inicio
          </Link>
          <Link
            href="/candidato/registro"
            className="hover:scale-105 duration-300"
          >
            Registro de Candidato
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
      <div className="w-full flex flex-col items-center bg-grisads pty-10">
        <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex items-center">
          <FormRegistroEmpresa />
          <SeccionRegistradoEmpresa />
        </div>
        <div className="w-full mt-5 bg-white flex justify-center items-center py-7 CShadow2">
          <h2 className="sm:text-2xl text-primary mr-5">
            ¿Ya tienes una empresa registrada?
          </h2>
          <Link
            className="px-3 sm:px-7 py-1 bg-primary text-white sm:text-lg rounded-md"
            href="/empresa/login"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
      <FooterHome />
    </>
  )
}
