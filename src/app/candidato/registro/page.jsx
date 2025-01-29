import FormRegistroCandidato from "@/components/candidato/FormRegistroCandidato/page"
import SeccionRegistrado from "@/components/candidato/SeccionRegistrado/page"
import NavbarHome from "@/components/shared/NavbarHome/page"

export default function RegistroCandidatoPage() {
  return (
    <>
      <NavbarHome />
      <div className="w-full flex flex-col items-center pt-40">
        <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex">
          <FormRegistroCandidato />
          <SeccionRegistrado />
        </div>
        <div className="w-full "></div>
      </div>
    </>
  )
}
