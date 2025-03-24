import BuscasEmpleoLoginCandidato from "@/components/candidato/BuscasEmpleoLoginCandidato/page"
import LoginCandidato from "@/components/candidato/LoginCandidato/page"
import FooterHome from "@/components/shared/FooterHome/page"
import NavbarHome from "@/components/shared/NavbarHome/page"

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
