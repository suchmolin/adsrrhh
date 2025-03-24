import Image from "next/image"
import Link from "next/link"
import { FaAngleLeft } from "react-icons/fa6"

export default function NavCandidato() {
  return (
    <div className="w-full px-10 py-7 flex justify-between">
      <div className="flex gap-10 items-center text-primary ">
        <Link
          className="hover:scale-105 duration-300 flex items-center"
          href="/"
        >
          <FaAngleLeft /> Inicio
        </Link>
        <Link href="/empresa/registro" className="hover:scale-105 duration-300">
          Registro de Empresa
        </Link>{" "}
      </div>
      <Link className="relative w-[120px] aspect-video" href="/">
        <Image
          src="/img/logoadsrrhh2.png"
          layout="fill"
          objectFit="contain"
          alt="Ads Recursos Humanos Logo"
        />
      </Link>
    </div>
  )
}
