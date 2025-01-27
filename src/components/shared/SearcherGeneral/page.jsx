import { FaSearch } from "react-icons/fa"
import SelectEstados from "../SelectEstados/page"

export default function SearcherGeneral() {
  return (
    <div className="absolute bottom-10 md:bottom-20 w-11/12 md:h-[100px] bg-azulads/20 rounded-xl flex gap-4 items-center px-10 py-10 flex-col md:flex-row">
      <div className="w-full md:w-7/12 flex flex-col justify-center-center">
        <label htmlFor="search">Buscar ofertas de:</label>
        <div className="flex">
          <input
            id="search"
            className="w-full rounded-md text-gray-600 ring-0 border-none outline-none focus:ring-red-400 placeholder:text-gray-400 pr-10"
            type="text"
            placeholder="Puesto, oferta o palabra clave"
          />
          <button>
            <FaSearch className="text-2xl text-red-400 -ml-9 hover:scale-105 duration-300 cursor-pointer" />
          </button>
        </div>
      </div>
      <div className="w-full md:w-5/12  flex flex-col">
        <span>Ciudad:</span>
        <SelectEstados />
      </div>
    </div>
  )
}
