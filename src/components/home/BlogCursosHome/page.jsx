import Image from "next/image"
import Link from "next/link"

export default function BlogCursosHome() {
  return (
    <div className="w-full flex justify-center py-5 sm:py-12">
      <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex flex-wrap lg:flex-nowrap justify-center gap-10 overflow-hidden">
        <Link
          href="/blog"
          className="w-full sm:w-10/12 md:w-9/12 lg:w-6/12 xl:w-5/12 h-[370px] sm:h-[350px] flex relative items-end group"
        >
          <div className="w-6/12 h-full absolute">
            <div className="w-full h-full relative z-10">
              <Image
                src="/img/bloghome.png"
                alt="bloghome"
                objectFit="contain"
                layout="fill"
                objectPosition="bottom"
                className=" w-full h-full "
              />
            </div>
          </div>
          <div className="w-full h-full sm:h-3/4 bg-azuloscuroads rounded-xl CShadow2 flex flex-col items-end justify-center">
            <div className="w-full sm:w-7/12 h-full flex flex-col  items-center justify-between pr-10 pl-7 py-10 relative">
              <h2 className="font-[monserrat-bold] text-white text-xl text-right">
                Descubre consejos clave para impulsar tu carrera,
                <span className="text-[#35a1f8]">
                  {" "}
                  con el apoyo de un coach laboral.
                </span>
              </h2>
              <div className="w-full absolute bottom-10 left-20 xs:left-40 sm:left-8  xs:group-hover:left-12 duration-300">
                <div className="w-fit bg-[#35a1f8] text-white pr-2 sm:pr-4 pl-20 py-1 text-2xl sm:text-2xl font-[monserrat-bold]  sm:-ml-10 rounded-r-2xl xs:group-hover:scale-110 duration-300">
                  Ir al Blog
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link
          href="#cursosRecomendados"
          className="w-full sm:w-10/12 md:w-9/12 lg:w-6/12 xl:w-5/12 h-[370px] sm:h-[350px] flex relative items-end group"
        >
          <div className="w-7/12 h-full absolute -right-7">
            <div className="w-full h-full relative z-10">
              <Image
                src="/img/cursoshome.png"
                alt="bloghome"
                objectFit="contain"
                layout="fill"
                objectPosition="bottom"
                className=" w-full h-full "
              />
            </div>
          </div>
          <div className="w-full h-full sm:h-3/4 bg-azulclaroads rounded-xl CShadow2 flex flex-col items-start justify-center">
            <div className="w-full sm:w-7/12 h-full flex flex-col  items-center justify-between pr-7 pl-5 py-10">
              <h2 className="font-[monserrat-bold] text-azuloscuroads text-xl text-left">
                Haz crecer tu potencial con formacion diseñada
                <span className="text-[#35a1f8]">
                  {" "}
                  para tu éxito profesional.
                </span>
              </h2>
              <div className="w-full relative">
                <div className="w-fit bg-[#35a1f8] text-white pl-4 pr-20 xs:pr-28 py-1 text-2xl font-[monserrat-bold] rounded-l-2xl group-hover:scale-110 group-hover:right-18 sm:group-hover:-right-14 duration-300 absolute right-14 sm:-right-16 bottom-0">
                  Ver cursos
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
