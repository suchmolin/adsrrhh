import Image from "next/image"
import { cursos } from "@/data/cursos"

export default function CursosRecomendados() {
  return (
    <div
      id="cursosRecomendados"
      className="w-full flex flex-col justify-center items-center pt-10 overflow-hidden bg-primary"
    >
      <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px]">
        <h2 className="text-4xl text-white font-[monserrat-bold] mb-7 text-center sm:text-start">
          Cursos Recomendados
        </h2>
      </div>

      <div className="w-full flex flex-row  gap-x-10 gap-y-10 pb-10 relative overflow-x-scroll px-4">
        {cursos.map((item) => (
          <a
            href={item.href}
            key={item.id}
            target="_blank"
            className="w-fit flex flex-col gap-3 rounded-md hover:shadow-md duration-300"
          >
            <div className="relative w-[300px] sm:w-[330px] h-[220px] rounded-2xl overflow-hidden">
              <Image
                src={item.img}
                alt="sector empleo"
                objectFit="cover"
                layout="fill"
              />
            </div>
            <div className="flex flex-col  p-2 xs:p-3 rounded-2xl bg-white h-[250px]">
              <h3 className="text-base text-primary font-[monserrat-bold] mb-2">
                {item.titulo}
              </h3>
              <p className="text-sm text-gray-800 mb-4">{item.descripcion}</p>
              <p className="text-sm text-gray-800">{item.autor}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
