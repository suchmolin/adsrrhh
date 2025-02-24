"use client"
import Image from "next/image"
import Slider from "react-slick"
import { sectoresempleo } from "@/data/sectoresempleo"

export default function SectoresEmpleo() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }
  return (
    <div className="w-full flex flex-col justify-center items-center py-10  overflow-hidden">
      <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] ">
        <h2 className="text-4xl text-azulads font-[monserrat-bold] mb-7 text-center sm:text-start">
          Sectores de empleo
        </h2>
      </div>

      <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] slider-container">
        <Slider {...settings} className="slick-slider-custom">
          {sectoresempleo.map((item) => (
            <div key={item.id}>
              <div className="w-full flex justify-center items-center pb-10">
                <div className="w-[250px] aspect-square flex flex-col items-center gap-3">
                  <div className="relative w-full aspect-square rounded-md overflow-hidden">
                    <Image
                      src={item.img}
                      alt="sector empleo"
                      objectFit="cover"
                      layout="fill"
                    />
                  </div>
                  <p className="text-xl text-azulads text-center">
                    {item.titulo}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}
