import BlogCard from "@/components/blog/BlogCard/page"
import FooterHome from "@/components/shared/FooterHome/page"
import NavbarHome from "@/components/shared/NavbarHome/page"
import { data } from "@/data/blog"
import Image from "next/image"
import Link from "next/link"

export default function BlogPage() {
  return (
    <>
      <NavbarHome />
      <div className="w-full flex flex-col items-center pt-40 pb-10 bg-grisads">
        <h1 className="text-2xl sm:text-3xl text-primary font-[monserrat-bold] mb-10 flex items-center">
          <div className="relative w-[50px] aspect-square">
            <Image
              src="/img/vistoverde.png"
              objectFit="contain"
              layout="fill"
              alt="visto verde"
            />
          </div>
          Blog - Últimos artículos
        </h1>
        <Link
          href={`/blog/${data[0].id}`}
          className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex flex-col md:flex-row justify-center gap-4 pb-10 hover:scale-[102%] duration-300 items-center md:items-start"
        >
          <div className="w-[330px] md:w-5/12 relative overflow-hidden h-[300px] rounded-xl">
            <Image
              src={data[0].img}
              layout="fill"
              objectFit="cover"
              alt={data[0].titulo}
            />
          </div>
          <div className="w-[330px] md:w-5/12 h-[300px] p-4 rounded-xl bg-white ">
            <div className="w-full h-full p-4 flex flex-col justify-between">
              <div className="w-full">
                <h3 className="text-xl text-primary font-[monserrat-bold] mb-4">
                  {data[0].titulo}
                </h3>
                <p className="text-gray-700 mb-4 text-sm">
                  {data[0].descripcion}
                </p>
              </div>
              <div className="w-full flex flex-wrap gap-2">
                {data[0].cat.map((cat) => (
                  <span
                    key={cat}
                    className="text-sm px-2 py-1 text-white bg-primary rounded-md"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>
        <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex flex-wrap justify-center gap-10">
          {data.slice(1, data.length).map((item) => (
            <BlogCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <FooterHome />
    </>
  )
}
