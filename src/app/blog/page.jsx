import BlogCard from "@/components/blog/BlogCard/page"
import FooterHome from "@/components/shared/FooterHome/page"
import NavbarHome from "@/components/shared/NavbarHome/page"
import { data } from "@/data/blog"

export default function BlogPage() {
  return (
    <>
      <NavbarHome />
      <div className="w-full flex flex-col items-center pt-40">
        <h1 className="text-3xl text-azulads font-[monserrat-bold] mb-10">
          BLOG - Últimos artículos
        </h1>
        <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex flex-wrap justify-center gap-10">
          {data.map((item) => (
            <BlogCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <FooterHome />
    </>
  )
}
