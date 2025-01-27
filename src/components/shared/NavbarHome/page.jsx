import Link from "next/link"
import NavbarHomeResp from "../NavbarHomeResp/page"
import Image from "next/image"
export default function NavbarHome() {
  return (
    <nav className="absolute w-full h-[130px] flex px-10 justify-between items-center z-50">
      <div className="flex gap-7 md:gap-10 h-full items-center text-azuloscuroads text-xl">
        <div className="h-full aspect-square relative">
          <Image
            src="/img/logoadsrrhh.png"
            alt="ads recursos humanos"
            objectFit="contain"
            layout="fill"
          />
        </div>
        <Link
          className="hidden sm:block hover:scale-105 duration-300 hover:text-azulads"
          href="#"
        >
          Buscar Empleo
        </Link>
        <Link
          className="hidden sm:block hover:scale-105 duration-300 hover:text-azulads"
          href="#"
        >
          Registro de Empresa
        </Link>
      </div>

      <NavbarHomeResp />
    </nav>
  )
}
