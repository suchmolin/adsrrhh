import Image from "next/image"

export default function SectoresEmpleo() {
  const sectores = [
    { id: "informatica", titulo: "Informática", img: "/img/informatica.png" },
    { id: "docencia", titulo: "Docencia", img: "/img/docencia.png" },
    { id: "ventas", titulo: "Ventas", img: "/img/ventas.png" },
    {
      id: "administrativo",
      titulo: "Administrativo",
      img: "/img/administrativo.jpg",
    },
  ]
  return (
    <div className="w-full flex flex-col justify-center items-center py-10">
      <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] ">
        <h2 className="text-4xl text-red-500 mb-7 text-center sm:text-start">
          Sectores de empleo
        </h2>
      </div>

      <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex justify-center items-center gap-x-7 gap-y-10 flex-wrap md:flex-nowrap">
        {sectores.map((item) => (
          <div
            key={item.id}
            className="w-10/12 sm:w-5/12 md:w-3/12 flex flex-col items-center gap-3"
          >
            <div className="relative w-full aspect-square rounded-md overflow-hidden">
              <Image
                src={item.img}
                alt="sector empleo"
                objectFit="cover"
                layout="fill"
              />
            </div>
            <p className="text-2xl text-red-400">{item.titulo}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
