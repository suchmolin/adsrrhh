import LoginCandidato from "@/components/candidato/LoginCandidato/page"
import FooterHome from "@/components/shared/FooterHome/page"
import NavbarHome from "@/components/shared/NavbarHome/page"
import BuscasEmpleoLoginCandidato from "../BuscasEmpleoLoginCandidato/page"

export default function CandidateLoginPage() {
  return (
    <>
      <NavbarHome />
      <div className="w-full flex flex-col items-center pt-32">
        <LoginCandidato />
        <BuscasEmpleoLoginCandidato />
      </div>
      <FooterHome />
    </>
  )
}
