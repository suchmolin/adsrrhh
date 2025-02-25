import Image from "next/image"

export default function SectoresUbicacion() {
  const ubicacion = [
    {
      id: "distritocapital",
      titulo: "Distrito Capital",
      img: "/img/caracas.jpeg",
    },
    { id: "puertoordaz", titulo: "Puerto Ordaz", img: "/img/poz.jpg" },
    {
      id: "barquisimeto",
      titulo: "Barquisimeto",
      img: "/img/barquisimeto.jpg",
    },
    {
      id: "maturin",
      titulo: "Maturín",
      img: "/img/maturin.webp",
    },
  ]
  return (
    <div className="w-full flex flex-col justify-center items-center py-10">
      <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] ">
        <h2 className="text-4xl text-primary font-[monserrat-bold] mb-7 text-center sm:text-start">
          Ubicación
        </h2>
      </div>

      <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex justify-center items-center gap-x-7 gap-y-10 flex-wrap md:flex-nowrap">
        {ubicacion.map((item) => (
          <div
            key={item.id}
            className="w-10/12 sm:w-5/12 md:w-3/12 flex flex-col items-center gap-3"
          >
            <div className="relative w-full aspect-video rounded-xl overflow-hidden">
              <Image
                src={item.img}
                alt="sector empleo"
                objectFit="cover"
                layout="fill"
              />
            </div>
            <p className="text-center text-xl lg:text-2xl text-primary">
              {item.titulo}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
