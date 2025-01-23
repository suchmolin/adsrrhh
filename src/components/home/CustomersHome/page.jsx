import Image from "next/image"

export default function CustomersHome() {
  return (
    <div className="w-full flex justify-center items-center py-10">
      <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex justify-center items-center gap-x-20 gap-y-10 flex-wrap">
        <div className="CShadow2 p-4 bg-white relative rounded-md">
          <div className="w-[200px] aspect-square bg-white relative">
            <Image
              src="/img/logoLerobotica.png"
              alt="logo marca1"
              objectFit="contain"
              layout="fill"
            />
          </div>
        </div>
        <div className="CShadow2 p-4 bg-white relative rounded-md">
          <div className="w-[200px] aspect-square bg-white relative">
            <Image
              src="/img/logoFyrlois.png"
              alt="logo marca1"
              objectFit="contain"
              layout="fill"
            />
          </div>
        </div>
        <div className="CShadow2 p-4 bg-white relative rounded-md">
          <div className="w-[200px] aspect-square bg-white relative">
            <Image
              src="/img/logoBooster.png"
              alt="logo marca1"
              objectFit="contain"
              layout="fill"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
