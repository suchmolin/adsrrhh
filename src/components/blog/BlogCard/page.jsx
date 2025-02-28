import Image from "next/image"
import Link from "next/link"

export default function BlogCard({ item }) {
  return (
    <Link
      href={`/blog/${item.id}`}
      className="w-[330px] flex flex-col gap-4  hover:scale-[102%] duration-300"
    >
      <div className="w-full aspect-square relative rounded-xl overflow-hidden">
        <Image
          src={item.img}
          alt={item.titulo}
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div className="w-full h-[390px] p-4 flex flex-col justify-between rounded-xl bg-white">
        <div className="w-full">
          <h3 className="text-lg text-primary font-[monserrat-bold] mb-4">
            {item.titulo}
          </h3>
          <p className="text-gray-700 mb-4 text-sm">{item.descripcion}</p>
        </div>
        <div className="w-full flex flex-wrap gap-2">
          {item.cat.map((cat) => (
            <span
              key={cat}
              className="text-sm px-2 py-1 text-white bg-primary rounded-md"
            >
              {cat}
            </span>
          ))}
          <div className="w-full py-4 text-primary font-[monserrat-bold]">
            Leer más {">>"}
          </div>
        </div>
      </div>
    </Link>
  )
}
