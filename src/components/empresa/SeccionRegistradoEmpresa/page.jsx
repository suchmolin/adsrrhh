import Image from "next/image"

export default function SeccionRegistradoEmpresa() {
  return (
    <div className="hidden sm:block w-5/12  px-4 ">
      <div className="w-full aspect-square relative">
        <Image
          src="/img/registroempresa.png"
          alt="register image 1"
          objectFit="contain"
          layout="fill"
        />
      </div>
    </div>
  )
}
