import BuscasTalentoLoginEmpresa from "@/components/empresa/BuscasTalentoLoginEmpresa/page"
import LoginEmpresa from "@/components/empresa/LoginEmpresa/page"
import FooterHome from "@/components/shared/FooterHome/page"
import NavbarHome from "@/components/shared/NavbarHome/page"

export default function CompanyLoginPage() {
    return (
        <>
            <NavbarHome />
            <div className="w-full flex flex-col items-center pt-32">
                <LoginEmpresa />
                <BuscasTalentoLoginEmpresa />
            </div>
            <FooterHome />
        </>
    )
}
