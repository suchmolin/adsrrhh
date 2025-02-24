import BlogCursosHome from "@/components/home/BlogCursosHome/page"
import CursosRecomendados from "@/components/home/CursosRecomendados/page"
import CustomersHome from "@/components/home/CustomersHome/page"
import HeaderHome from "@/components/home/HeaderHome/page"
import MiPrimerEmpleoHome from "@/components/home/MiPrimerEmpleoHome/page"
import EmpleHoyHome from "@/components/home/EmpleHoyHome/page"
import SeresHumanosComoTu from "@/components/home/SeresHumanosComoTu/page"
import ConectandoTalentoHome from "@/components/home/ConectandoTalentoHome/page"
import SectoresEmpleo from "@/components/home/SectoresEmpleo/page"
import SectoresUbicacion from "@/components/home/SectoresUbicacion/page"
import FooterHome from "@/components/shared/FooterHome/page"
import NavbarHome from "@/components/shared/NavbarHome/page"
import CapacitaProHome from "@/components/home/CapacitaProHome/page"
import AcademiaCorporativaHome from "@/components/home/AcademiaCorporativaHome/page"

export default function ReclutamientoLandingPage() {
  return (
    <>
      <NavbarHome />
      <HeaderHome />
      <CustomersHome />
      <SeresHumanosComoTu />
      <EmpleHoyHome />
      <SectoresUbicacion />
      <ConectandoTalentoHome />
      <MiPrimerEmpleoHome />
      <CapacitaProHome />
      <CursosRecomendados />
      <AcademiaCorporativaHome />

      <BlogCursosHome />
      {/* <SectoresEmpleo /> */}
      <FooterHome />
    </>
  )
}
