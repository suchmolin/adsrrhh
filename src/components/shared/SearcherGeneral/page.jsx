import { FaSearch } from "react-icons/fa"
import SelectEstados from "../SelectEstados/page"
import Link from "next/link"
import { PiSuitcaseSimpleBold } from "react-icons/pi"
import { GrLocation } from "react-icons/gr"

export default function SearcherGeneral() {
  return (
    <div className="absolute bottom-7 md:bottom-20 w-11/12 md:h-[100px] bg-grisads rounded-xl flex gap-4 items-center px-10 py-5 sm:py-10 flex-col md:flex-row">
      <div className="w-full md:w-6/12 flex flex-col justify-center-center">
        <label
          className="text-primary font-[monserrat-bold] flex gap-1 items-center mb-3"
          htmlFor="search"
        >
          <PiSuitcaseSimpleBold /> Buscar ofertas de:
        </label>
        <div className="flex w-full">
          <input
            id="search"
            className="w-full rounded-md text-gray-600 ring-0 border outline-none focus:ring-primary focus:ring-1 placeholder:text-gray-400 pr-10 border-gray-300"
            type="text"
            placeholder="Puesto, oferta o palabra clave"
          />
          {/* <Link href="/candidato/registro" className="w-fit flex items-center">
            <FaSearch className="text-2xl text-azulads -ml-9 hover:scale-105 duration-300 cursor-pointer" />
          </Link> */}
        </div>
      </div>
      <div className="w-full md:w-4/12  flex flex-col">
        <span className="text-primary font-[monserrat-bold] flex gap-1 items-center mb-3">
          <GrLocation />
          Ciudad:
        </span>
        <SelectEstados />
      </div>
      <div className="w-full md:w-2/12 flex items-end mt-8">
        <Link
          href="/candidato/registro"
          className="w-full rounded-lg bg-secondary text-white font-[monserrat-bold] py-2 text-center"
        >
          Buscar
        </Link>
      </div>
    </div>
  )
}
