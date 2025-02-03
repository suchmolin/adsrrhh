import { Modal } from "flowbite-react"
import Link from "next/link"

import { FiCheckSquare } from "react-icons/fi"

export default function RegEmpresaModal({ regExitoso, name }) {
  return (
    <Modal show={regExitoso}>
      <Modal.Body>
        <div className="flex flex-col items-center px-5">
          <FiCheckSquare className="text-[250px] text-green-400" />
        </div>
        <p className="text-3xl text-azulads font-[monserrat-bold] text-center mb-5">
          Registro de Empresa Exitoso
        </p>
        <p className="text-xl text-gray-700  text-center">
          Gracias {name} por participar en nuestro proceso de pre-registro.
          Serás notificado cuando se active el modulo para publicar tus vacantes
          de empleo.
        </p>
        <div className="w-full flex justify-center">
          <Link
            href="/"
            className="mt-5 px-4 py-1 bg-azulads text-white text-2xl rounded-md"
          >
            Volver al inicio
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  )
}
