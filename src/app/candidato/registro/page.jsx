import FormRegistroCandidato from "@/components/candidato/FormRegistroCandidato/page"
import NavCandidato from "@/components/candidato/NavCandidato/page"
import SeccionRegistrado from "@/components/candidato/SeccionRegistrado/page"
import FooterHome from "@/components/shared/FooterHome/page"

import Link from "next/link"

export default function RegistroCandidatoPage() {
  return (
    <>
      <NavCandidato />
      <div className="w-full flex flex-col items-center bg-grisads pty-10">
        <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex items-center">
          <FormRegistroCandidato />
          <SeccionRegistrado />
        </div>
        <div className="w-full mt-5 bg-white flex justify-center items-center py-7 CShadow2">
          <h2 className="sm:text-2xl text-primary mr-5">
            ¿Ya estás registrado?
          </h2>
          <Link
            className="px-3 sm:px-7 py-1 bg-primary text-white sm:text-lg rounded-md"
            href="/candidato/login"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
      <FooterHome />
    </>
  )
}
