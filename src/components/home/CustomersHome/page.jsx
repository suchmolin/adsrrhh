"use client"
import Image from "next/image"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function CustomersHome() {
  const customers = [
    {
      id: "lerobotica",
      img: "/img/logoLeroboticaVertical.png",
      banner: "/img/customers/leroboticabanner.png",
    },
    {
      id: "fyrlois",
      img: "/img/logoFyrlois.png",
      banner: "/img/customers/fyrloisbanner.png",
    },
    {
      id: "booster",
      img: "/img/logoBooster.png",
      banner: "/img/customers/boostermathbanner.png",
    },
    {
      id: "adspublicidad",
      img: "/img/logoAdsPublicidad.png",
      banner: "/img/customers/adspublicidadbanner.png",
    },
  ]
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 10000,
    autoplaySpeed: 1,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  }
  return (
    <div className="w-full flex flex-col justify-center items-center py-10  overflow-hidden bg-primary">
      <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] ">
        <h2 className="text-3xl xs:text-4xl text-white mb-7 text-center font-[monserrat-bold]">
          Empresas Afiliadas
        </h2>
      </div>

      <div className="w-full  slider-container">
        <Slider {...settings} className=" bg-primary">
          {customers.map((item) => (
            <div key={item.id} className="bg-primary">
              <div className="CShadow w-fit bg-white relative px-7 py-1 rounded-lg -ml-10">
                <div className="w-[100px] xs:w-[120px] sm:w-[180px] aspect-video relative">
                  <Image
                    src={item.img}
                    alt="logo marca1"
                    objectFit="contain"
                    layout="fill"
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}
