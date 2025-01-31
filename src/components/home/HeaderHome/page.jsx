import SearcherGeneral from "@/components/shared/SearcherGeneral/page"
import Image from "next/image"
import { BiSolidQuoteLeft } from "react-icons/bi"
import { BiSolidQuoteRight } from "react-icons/bi"

export default function HeaderHome() {
  return (
    <div className="w-full h-[700px] flex justify-center items-center  relative">
      <Image
        className="hidden sm:block"
        src="/img/headerHome2.png"
        alt="headerBackground"
        layout="fill"
        objectFit="cover"
        objectPosition="left"
      />
      <Image
        className="block sm:hidden"
        src="/img/headerHome3Resp.png"
        alt="headerBackground"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] h-full flex flex-col justify-center relative sm:px-10">
        <div className="relative w-fit ml-1">
          <BiSolidQuoteLeft className="absolute top-2 sm:-top-40 md:-top-16 left-2 sm:-left-12 text-azulads/20 text-4xl sm:text-7xl" />
          <h1 className="w-[290px] xs:w-[360px] sm:w-[550px] CTextShadow text-3xl xs:text-4xl sm:text-6xl font-bold leading-none mt-5 sm:-mt-32 md:-mt-10 text-azuloscuroads text-center sm:text-start font-[monserrat-bold]">
            Oportunidades que te conectan
            <span className="text-azulads block">con el éxito</span>
          </h1>
          <BiSolidQuoteRight className="absolute -bottom-2 sm:-bottom-10 right-10 sm:right-36 text-azulads/20 text-4xl sm:text-7xl" />
        </div>
        <div className="w-full flex justify-center">
          <SearcherGeneral />
        </div>
      </div>
    </div>
  )
}
