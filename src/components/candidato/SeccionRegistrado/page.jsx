import Image from "next/image"

export default function SeccionRegistradoCandidato() {
  return (
    <div className="hidden sm:block w-5/12  px-4 ">
      <div className="w-full rounded-xl overflow-hidden mb-4 h-[130px] lg:h-[160px] relative">
        <Image
          src="/img/registerpage.png"
          alt="register image 1"
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div className="w-full rounded-xl overflow-hidden mb-4 h-[130px] lg:h-[160px] relative">
        <Image
          src="/img/registerpage2.png"
          alt="register image 1"
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div className="w-full rounded-xl overflow-hidden mb-4 h-[130px] lg:h-[160px] relative">
        <Image
          src="/img/registerpage3.png"
          alt="register image 1"
          objectFit="cover"
          layout="fill"
        />
      </div>
    </div>
  )
}
