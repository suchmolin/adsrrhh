import { FaSearch } from "react-icons/fa"
import SelectEstados from "../SelectEstados/page"
import Link from "next/link"

export default function SearcherGeneral() {
  return (
    <div className="absolute bottom-7 md:bottom-20 w-11/12 md:h-[100px] bg-azulads/40 rounded-xl flex gap-4 items-center px-10 py-10 flex-col md:flex-row">
      <div className="w-full md:w-7/12 flex flex-col justify-center-center">
        <label className="text-white" htmlFor="search">
          Buscar ofertas de:
        </label>
        <div className="flex w-full">
          <input
            id="search"
            className="w-full rounded-md text-gray-600 ring-0 border-none outline-none focus:ring-azulads placeholder:text-gray-400 pr-10"
            type="text"
            placeholder="Puesto, oferta o palabra clave"
          />
          <Link href="/candidato/registro" className="w-fit flex items-center">
            <FaSearch className="text-2xl text-azulads -ml-9 hover:scale-105 duration-300 cursor-pointer" />
          </Link>
        </div>
      </div>
      <div className="w-full md:w-5/12  flex flex-col">
        <span className="text-white">Ciudad:</span>
        <SelectEstados />
      </div>
    </div>
  )
}
