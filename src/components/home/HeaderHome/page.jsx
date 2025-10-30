import SearcherGeneral from "@/components/shared/SearcherGeneral/page"
import Image from "next/image"
import { BiSolidQuoteLeft } from "react-icons/bi"
import { BiSolidQuoteRight } from "react-icons/bi"

export default function HeaderHome({ imgHeader = "/img/headerHome3.png", bgSearcher, initialFilters = {} }) {
  return (
    <div className="w-full h-[800px] sm:h-[700px] md:h-[600px] flex justify-center items-center  relative">
      <Image
        className="hidden sm:block"
        src={imgHeader}
        alt="headerBackground"
        layout="fill"
        objectFit="cover"
        objectPosition="left"
      />
      <Image
        className="block sm:hidden"
        src="/img/headerHome4Resp.png"
        alt="headerBackground"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] h-full flex flex-col items-center md:items-start justify-center relative sm:px-10">
        <div className="relative w-fit ml-1 flex items-center">
          <div className="w-[50px] xs:w-[65px] sm:w-[80px] aspect-square relative xs:mr-5 sm:-mt-52 md:mt-0 ">
            <Image
              src="/img/vistoverde.png"
              layout="fill"
              objectFit="contain"
              alt="visto verde"
            />
          </div>
          <h1 className="w-[230px] xs:w-[260px] sm:w-[430px] text-3xl xs:text-4xl sm:text-6xl font-bold leading-none mt-5 sm:-mt-52 md:-mt-2 text-azuloscuroads text-center sm:text-start font-[monserrat-bold] bg-[url('/img/lineaverde.png')] bg-bottom bg-no-repeat bg-contain pb-5 sm:pb-9">
            {" "}
            ¡Soy tu gran oportunidad!
          </h1>
        </div>
        <div className="w-full flex justify-center">
          <SearcherGeneral bgSearcher={bgSearcher} initialFilters={initialFilters} />
        </div>
      </div>
    </div>
  )
}
