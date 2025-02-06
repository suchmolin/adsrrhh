import Image from "next/image"
import Link from "next/link"

export default function BlogCard({ item }) {
  return (
    <Link
      href={`/blog/${item.id}`}
      className="w-[330px] rounded-lg bg-white CShadow2 flex flex-col overflow-hidden hover:scale-[102%] duration-300"
    >
      <div className="w-full aspect-video relative">
        <Image
          src={item.img}
          alt={item.titulo}
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div className="w-full h-full p-4 flex flex-col justify-between">
        <div className="w-full">
          <h3 className="text-xl text-azuloscuroads font-[monserrat-bold] mb-4">
            {item.titulo}
          </h3>
          <p className="text-gray-700 mb-4 text-sm">{item.descripcion}</p>
        </div>
        <div className="w-full flex flex-wrap gap-2">
          {item.cat.map((cat) => (
            <span className="text-sm px-2 py-1 text-white bg-azulads rounded-md">
              {cat}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
