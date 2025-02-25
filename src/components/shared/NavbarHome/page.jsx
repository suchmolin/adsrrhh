import Link from "next/link"
import NavbarHomeResp from "../NavbarHomeResp/page"
import Image from "next/image"
export default function NavbarHome() {
  return (
    <nav className="absolute w-full h-[80px] sm:h-[130px] flex px-5 sm:px-10 justify-between items-center z-50">
      <div className="flex gap-7 md:gap-10 h-full items-center text-azuloscuroads text-xl">
        <Link
          href="/"
          className="w-[110px] sm:w-[140px] sm:h-full aspect-square relative hover:scale-[102%] duration-300"
        >
          <Image
            src="/img/logoadsrrhh2.png"
            alt="ads recursos humanos"
            objectFit="contain"
            layout="fill"
          />
        </Link>
        <Link
          className="hidden sm:block hover:scale-105 duration-300 hover:text-azulads"
          href="/candidato/registro"
        >
          Buscar Empleo
        </Link>
        <Link
          className="hidden sm:block hover:scale-105 duration-300 hover:text-azulads"
          href="/empresa/registro"
        >
          Registro de Empresa
        </Link>
      </div>

      <NavbarHomeResp />
    </nav>
  )
}
