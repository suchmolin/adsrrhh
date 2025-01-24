import Image from "next/image"

export default function CustomersHome() {
  const customers = [
    { id: "lerobotica", img: "/img/logoLerobotica.png" },
    { id: "fyrlois", img: "/img/logoFyrlois.png" },
    { id: "booster", img: "/img/logoBooster.png" },
  ]
  return (
    <div className="w-full flex justify-center items-center py-10">
      <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex justify-center items-center gap-x-20 gap-y-10 flex-wrap">
        {customers.map((item) => (
          <div
            key={item.id}
            className="CShadow2 p-4 bg-white relative rounded-md"
          >
            <div className="w-[200px] aspect-video bg-white relative">
              <Image
                src={item.img}
                alt="logo marca1"
                objectFit="contain"
                layout="fill"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
