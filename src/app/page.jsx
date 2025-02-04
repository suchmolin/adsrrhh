import BlogCursosHome from "@/components/home/BlogCursosHome/page"
import CursosRecomendados from "@/components/home/CursosRecomendados/page"
import CustomersHome from "@/components/home/CustomersHome/page"
import HeaderHome from "@/components/home/HeaderHome/page"
import SecCapacitacionHome from "@/components/home/SecCapacitacionHome/page"
import SecEmpleoHome from "@/components/home/SecEmpleoHome/page"
import SecEmpresaHome from "@/components/home/SecEmpresaHome/page"
import SecPrimerEmpleoHome from "@/components/home/SecPrimerEmpleoHome/page"
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
      <SecEmpresaHome />
      <SectoresEmpleo />
      <SecEmpleoHome />
      <BlogCursosHome />
      <SectoresUbicacion />
      <SecPrimerEmpleoHome />
      <CursosRecomendados />
      <SecCapacitacionHome />
      <FooterHome />
    </>
  )
}
