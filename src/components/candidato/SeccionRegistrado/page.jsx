import Link from "next/link"

export default function SeccionRegistrado() {
  return (
    <div className="w-6/12 pl-4 pt-14">
      <div className="w-full rounded-md bg-gray-100 p-10">
        <div className="flex gap-4 items-center">
          <h2 className="text-3xl text-azulads font-[monserrat-bold]">
            ¿Ya estás registrado?
          </h2>
          <Link href="#" className="px-4 py-1 bg-azulads text-white rounded-md">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  )
}
