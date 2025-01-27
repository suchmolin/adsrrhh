import Image from "next/image"
import { cursos } from "@/data/cursos"

export default function CursosRecomendados() {
  return (
    <div className="w-full flex flex-col justify-center items-center py-10">
      <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px]">
        <h2 className="text-4xl text-azulads font-[monserrat-bold] mb-7 text-center sm:text-start">
          Cursos Recomendados
        </h2>
      </div>

      <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex flex-row sm:flex-col lg:flex-row SM:items-center gap-x-7 gap-y-10 pb-10 relative overflow-x-scroll sm:overflow-y-scroll lg:overflow-x-scroll lg:overflow-y-hidden sm:h-[600px] lg:h-fit">
        {cursos.map((item) => (
          <a
            href={item.href}
            key={item.id}
            target="_blank"
            className="w-[360px]sm:min-w-[600px] lg:min-w-[600px] flex flex-col sm:flex-row rounded-md hover:shadow-md duration-300"
          >
            <div className="relative w-[260px] lg:w-[330px] aspect-square rounded-md overflow-hidden">
              <Image
                src={item.img}
                alt="sector empleo"
                objectFit="cover"
                layout="fill"
              />
            </div>
            <div className="sm:w-6/12 flex flex-col  p-2 xs:p-3">
              <h3 className="text-lg text-azulads">{item.titulo}</h3>
              <p className="text-base text-gray-500 py-4">{item.descripcion}</p>
              <p className="text-sm text-gray-500">{item.autor}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
