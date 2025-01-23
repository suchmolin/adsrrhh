import Link from "next/link"
import NavbarHomeResp from "../NavbarHomeResp/page"
export default function NavbarHome() {
  return (
    <nav className="absolute CShadow w-full h-[80px] flex px-10 justify-between items-center bg-white/95">
      <div className="flex gap-7 md:gap-10 h-full items-center">
        <h1 className="text-4xl text-black">ADS RRHH</h1>
        <Link
          className="hidden sm:block text-gray-400 hover:text-red-500 hover:scale-105 duration-300"
          href="#"
        >
          Buscar Empleo
        </Link>
      </div>
      <div className="hidden h-full sm:flex gap-7 md:gap-10 items-center">
        <Link
          className="CShadow2 rounded-sm px-4 py-2 text-white bg-red-400 hover:scale-105 duration-300"
          href="#"
        >
          Postulante
        </Link>
        <Link
          className="CShadow2 rounded-sm px-4 py-2 bg-white text-red-400 hover:scale-105 duration-300"
          href="#"
        >
          Empresa
        </Link>
      </div>
      <NavbarHomeResp />
    </nav>
  )
}
