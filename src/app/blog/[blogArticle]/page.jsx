import Image from "next/image"
import { data } from "@/data/blog"
import NavbarHome from "@/components/shared/NavbarHome/page"
import FooterHome from "@/components/shared/FooterHome/page"

export default async function ArticulosBlog({ params }) {
  const { blogArticle } = await params

  const blog = data.find((item) => item.id === blogArticle)

  return (
    <>
      <NavbarHome />
      <div className="w-full flex flex-col items-center pt-40 pb-10">
        <div className="relative w-10/12 h-[300px] sm:h-[400px] rounded-2xl overflow-hidden">
          <Image
            layout="fill"
            objectFit="cover"
            src={`${blog.imgPrincipal}`}
            alt={blog.titulo}
          />
        </div>
        <div className="w-11/12 lg:w-7/12 py-5  border-b-2 border-gray-200">
          <h2 className="text-[#001A70] text-3xl sm:text-5xl lg:text-6xl py-10 px-5 text-center font-bold">
            {blog.titulo}
          </h2>
          <div className="flex gap-3 items-center border-b-2 border-gray-200 pb-10">
            <span className="relative rounded-full overflow-hidden w-[50px] h-[50px]">
              <Image
                layout="fill"
                objectFit="cover"
                src={`${blog.fotoAutor}`}
                alt={blog.autor}
              />
            </span>
            <p className="text-[#001A70] text-xl font-bold">{blog.autor}</p>
            <span className="text-4xl text-[#001A70]">-</span>
            <p className="text-gray-500 text-lg font-bold">
              {blog.fechaPublicado}
            </p>
          </div>
          {blog.contenido.map((item, i) => (
            <>
              {item.titulo && (
                <h2
                  key={"titulo" + i}
                  className="text-[#001A70] text-3xl sm:text-4xl py-10 px-5 font-bold"
                >
                  {item.titulo}
                </h2>
              )}
              {item.subtitulo && (
                <h3
                  key={"subtitulo" + i}
                  className="text-[#001A70] text-xl py-10 px-5 font-bold"
                >
                  {item.subtitulo}
                </h3>
              )}
              {item.texto &&
                item.texto.map((parr, i) => {
                  return parr.indexOf("<<") >= 0 ? (
                    <p
                      key={"texto" + i}
                      className="text-gray-500 text-lg py-5 px-1 md:px-5"
                    >
                      {parr.slice(0, parr.indexOf("<<"))}

                      {
                        <a
                          className="text-[#001A70] font-bold transition-all duration-300"
                          href={parr.slice(
                            parr.indexOf("==") + 2,
                            parr.indexOf(">>")
                          )}
                        >
                          {parr.slice(
                            parr.indexOf("<<") + 2,
                            parr.indexOf("==")
                          )}
                        </a>
                      }

                      {parr.slice(parr.indexOf(">>") + 2, parr.lenght)}
                    </p>
                  ) : parr.indexOf("<br>") >= 0 ? (
                    <p
                      key={"texto" + i}
                      className="text-gray-500 text-lg py-5 px-1 md:px-5"
                    >
                      {parr.slice(0, parr.indexOf("<br>"))}
                      <br />
                      {parr.slice(parr.indexOf("<br>") + 4, parr.lenght)}
                    </p>
                  ) : parr.indexOf("<b>") >= 0 ? (
                    <p
                      key={"textob" + i}
                      className="text-gray-500 text-lg py-5 px-1 md:px-5"
                    >
                      {parr.slice(0, parr.indexOf("<b>"))}
                      <b>
                        {parr.slice(
                          parr.indexOf("<b>") + 3,
                          parr.indexOf("</b>")
                        )}
                      </b>

                      {parr.slice(parr.indexOf("</b>") + 4, parr.lenght)}
                    </p>
                  ) : (
                    <p
                      key={"texto" + i}
                      className="text-gray-500 text-lg py-5 px-1 md:px-5"
                    >
                      {parr}
                    </p>
                  )
                })}
              {item.ul && (
                <ul
                  key={"ul" + i}
                  className="text-gray-500 text-lg py-5 px-1 md:px-5"
                >
                  {item.ul.map((li, i) => {
                    return li.indexOf("<b>") >= 0 ? (
                      <li key={"li" + i} className="list-disc">
                        {li.slice(0, li.indexOf("<b>"))}
                        <span className="font-bold">
                          {li.slice(li.indexOf("<b>") + 3, li.indexOf("</b>"))}
                        </span>

                        {li.slice(li.indexOf("</b>") + 4, li.lenght)}
                      </li>
                    ) : (
                      <li key={"li" + i} className="list-disc">
                        {li}
                      </li>
                    )
                  })}
                </ul>
              )}
              {item.img && (
                <div className="w-full flex justify-center">
                  <div className="w-full h-[300px] relative overflow-hidden rounded-2xl">
                    <Image
                      key={"img" + i}
                      src={`${item.img}`}
                      alt={item.titulo}
                      objectFit="cover"
                      layout="fill"
                    />
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
      <FooterHome />
    </>
  )
}
