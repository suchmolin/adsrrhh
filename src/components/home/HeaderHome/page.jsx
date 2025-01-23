import SelectEstados from "@/components/shared/SelectEstados/page"
import { FaSearch } from "react-icons/fa"
export default function HeaderHome() {
  return (
    <div className="w-full h-[400px] flex justify-center items-center bg-gray-50">
      <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex justify-center items-center">
        <div className="w-11/12 md:h-[100px] bg-gray-300/90 rounded-md flex gap-4 items-center mt-32 px-10 py-5 flex-col md:flex-row">
          <div className="w-full md:w-7/12 flex items-center">
            <input
              className="w-full rounded-md text-gray-600 ring-0 border-none outline-none focus:ring-red-400 placeholder:text-gray-400 pr-10"
              type="text"
              placeholder="Cargo, vacantes, empleo..."
            />
            <button>
              <FaSearch className="text-2xl text-red-400 -ml-9 hover:scale-105 duration-300 cursor-pointer" />
            </button>
          </div>
          <div className="w-full md:w-5/12 ">
            <SelectEstados />
          </div>
        </div>
      </div>
    </div>
  )
}
