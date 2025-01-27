import CursosRecomendados from "@/components/home/CursosRecomendados/page"
import CustomersHome from "@/components/home/CustomersHome/page"
import HeaderHome from "@/components/home/HeaderHome/page"
import SeccionDescriptiva from "@/components/home/SeccionDescriptiva/page"
import SectoresEmpleo from "@/components/home/SectoresEmpleo/page"
import SectoresUbicacion from "@/components/home/SectoresUbicacion/page"
import FooterHome from "@/components/shared/FooterHome/page"
import NavbarHome from "@/components/shared/NavbarHome/page"

export default function ReclutamientoLandingPage() {
  return (
    <>
      <NavbarHome />
      <HeaderHome />
      <CustomersHome />
      <SeccionDescriptiva />
      <SectoresEmpleo />
      <CursosRecomendados />
      <SectoresUbicacion />
      <FooterHome />
    </>
  )
}
