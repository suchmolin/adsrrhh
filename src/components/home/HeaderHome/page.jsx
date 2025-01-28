import SearcherGeneral from "@/components/shared/SearcherGeneral/page"
import Image from "next/image"
import { BiSolidQuoteLeft } from "react-icons/bi"
import { BiSolidQuoteRight } from "react-icons/bi"

export default function HeaderHome() {
  return (
    <div className="w-full h-[700px] flex justify-center items-center bg-gradient-to-r from-white to-gray-200 relative">
      <Image
        src="/img/headerHome.png"
        alt="header home"
        layout="fill"
        objectFit="cover"
        objectPosition="left"
      />
      <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] h-full flex flex-col justify-center relative sm:px-10">
        <div className="relative w-fit">
          <BiSolidQuoteLeft className="absolute -top-36 sm:-top-40 md:-top-16 -left-2 sm:-left-12 text-azulads/20 text-4xl sm:text-7xl" />
          <h1 className="sm:w-[550px] CTextShadow text-4xl xs:text-5xl sm:text-7xl font-bold leading-none -mt-32 md:-mt-10 text-azuloscuroads text-center sm:text-start font-[monserrat-bold]">
            Oportunidades que te conectan
            <span className="text-azulads block">con el éxito</span>
          </h1>
          <BiSolidQuoteRight className="absolute bottom-0 xs:-bottom-4 sm:-bottom-10 right-6 sm:right-24 text-azulads/20 text-4xl sm:text-7xl" />
        </div>
        <div className="w-full flex justify-center">
          <SearcherGeneral />
        </div>
      </div>
    </div>
  )
}
