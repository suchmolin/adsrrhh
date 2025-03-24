import Image from "next/image"

export default function CardPerfilCandidato() {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full bg-white CShadow3 relative flex flex-col items-center gap-3 py-5 rounded-xl px-3">
        <div className="relative rounded-full overflow-hidden w-[170px] aspect-square group">
          <Image
            src="/img/imagen-candidatos.png"
            layout="fill"
            objectFit="cover"
            alt="Foto de Perfil"
          />
          <div className="w-full h-full bg-grisads/90 opacity-0 group-hover:opacity-100 absolute duration-300 cursor-pointer flex items-center justify-center">
            <div className="w-5/12 aspect-square relative opacity-70">
              <Image
                src="/img/editar.png"
                layout="fill"
                objectFit="contain"
                alt="editar"
              />
            </div>
          </div>
        </div>
        <div className="w-full text-center">
          <h2 className="font-[monserrat-black] text-2xl mb-1">
            Nombre Candidato
          </h2>
          <p className="text-xl">V-27.653.418</p>
        </div>
        <div className="w-full px-10 flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="font-bold">Fecha de Nacimiento:</p>
            <p className="text-gray-700">02/08/1993</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Género:</p>
            <p className="text-gray-700">Masculino</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Ciudad:</p>
            <p className="text-gray-700">Barquisimeto</p>
          </div>
        </div>
      </div>

      <div className="w-full bg-white CShadow3 relative flex flex-col items-center gap-3 py-5 rounded-xl px-10">
        <h2 className="text-primary text-3xl text-center font-[monserrat-black]">
          Contacto
        </h2>
        <div className="w-full flex justify-between">
          <p className="font-bold flex items-center">
            <Image
              src="/img/direccion.png"
              width={20}
              height={20}
              alt="telefono"
            />
            Dirección:
          </p>
          <p className="text-gray-700">Tiuna Park II. Depto 9-12</p>
        </div>
        <div className="w-full flex justify-between">
          <p className="font-bold flex items-center">
            <Image src="/img/mail.png" width={20} height={20} alt="telefono" />
            E-mail:
          </p>
          <p className="text-gray-700">jsuchmolin.ads@gmail.com</p>
        </div>
        <div className="w-full flex justify-between">
          <p className="font-bold flex items-center">
            <Image src="/img/celu.png" width={20} height={20} alt="telefono" />
            Teléfono:
          </p>
          <p className="text-gray-700">+58 412 5167792</p>
        </div>
      </div>
    </div>
  )
}
