import FormRegistroEmpresa from "@/components/empresa/FormRegistroEmpresa/page"
import FooterHome from "@/components/shared/FooterHome/page"

import Link from "next/link"
import { FaAngleLeft } from "react-icons/fa6"
import SeccionRegistradoEmpresa from "@/components/empresa/SeccionRegistradoEmpresa/page"

export default function RegistroEmpresaPage() {
  return (
    <>
      <div className="w-full px-10 py-7 flex justify-between">
        <Link
          className="text-xl text-azulads font-[monserrat-bold] flex items-center"
          href="/"
        >
          <FaAngleLeft /> Inicio
        </Link>
        <Link
          className="px-3 sm:px-7 py-1 bg-azulads text-white sm:text-lg rounded-md"
          href="/empresa/login"
        >
          Iniciar Sesión
        </Link>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex items-center">
          <FormRegistroEmpresa />
          <SeccionRegistradoEmpresa />
        </div>
        <div className="w-full mt-5 bg-azulclaroads flex justify-center items-center py-7">
          <h2 className="sm:text-3xl text-azuloscuroads font-[monserrat-bold] mr-5">
            ¿Ya tienes una empresa registrada?
          </h2>
          <Link
            className="px-3 sm:px-7 py-1 bg-azulads text-white sm:text-lg rounded-md"
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
