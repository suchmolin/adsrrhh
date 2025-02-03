"use client"

import getSelectCountry from "@/functions/get/getSelectCountry"
import sendFormRegisterEmpresa from "@/functions/post/sendFormRegisterEmpresa"
import {
  validateFirstForm,
  validateSecondForm,
} from "@/functions/validate/formRegistroEmpresas"
import { FileInput, Label, Radio, Select, TextInput } from "flowbite-react"
import { useEffect, useState } from "react"
import RegEmpresaModal from "../RegEmpresaModal/page"

export default function FormRegistroCandidato() {
  const [selectCountry, setSelectCountry] = useState([])
  const [regExitoso, setRegExitoso] = useState(false)
  const [etapaForm, setEtapaForm] = useState(1)
  const [error, setError] = useState({ status: false, msg: "" })
  const [data, setData] = useState({
    email_from: "",
    password: "",
    confirmpassword: "",
    name: "",
    vat: "",
    country_id: "",
    city: "",
    street: "",
    contact_name: "",
    phone: "",
  })
  const customTheme = {
    field: {
      input: {
        colors: {
          gray: "border-gray-300 bg-gray-50 text-gray-900 focus:border-azulads focus:ring-azulads",
        },
      },
    },
  }

  useEffect(() => {
    getSelectCountry().then((res) => setSelectCountry(res))
  }, [])

  const submitForm = async (e) => {
    //document.getElementById("submitbutton").disabled = true
    if (!validateSecondForm(e, setError, data)) return

    const formData = new FormData()
    formData.append("file", document.getElementById("file-upload").files[0])

    const response = await sendFormRegisterEmpresa(data, formData)

    if (response.status === "ok") setRegExitoso(true)
  }

  return (
    <div className="w-full sm:w-7/12 px-3 sm:px-0">
      <h1 className="text-2xl sm:text-3xl text-azulads font-[monserrat-bold]">
        Registro de Empresa
      </h1>
      <form
        onSubmit={(e) => submitForm(e)}
        className="w-full rounded-lg my-5 bg-azulclaroads px-5 sm:px-10 py-10 flex gap-x-2 gap-y-3 flex-wrap"
        encType="multipart/form-data"
      >
        {etapaForm === 1 && (
          <>
            <h2 className="text-xl font-[monserrat-bold] text-azulads text-center xs:text-start">
              Datos de inicio de sesión
            </h2>
            <div className="w-full">
              <div className="mb-1 block">
                <Label
                  htmlFor="email_from"
                  value="Correo electrónico corporativo"
                />
              </div>
              <TextInput
                onChange={(e) => {
                  setData({ ...data, email_from: e.target.value })
                }}
                value={data.email_from}
                theme={customTheme}
                id="email_from"
                type="email"
                placeholder="example@email.com"
                required
              />
            </div>
            <div className="w-full">
              <div className="mb-1 block">
                <Label htmlFor="password" value="Contraseña" />
              </div>
              <TextInput
                onChange={(e) => setData({ ...data, password: e.target.value })}
                value={data.password}
                theme={customTheme}
                id="password"
                type="password"
                placeholder="*********"
                required
              />
              <div className="text-xs text-gray-500">
                <p>{"(6 - 12 caracteres)"}</p>
              </div>
            </div>
            <div className="w-full mb-4">
              <div className="mb-1 block">
                <Label htmlFor="confirmpassword" value="Confirmar contraseña" />
              </div>
              <TextInput
                onChange={(e) =>
                  setData({ ...data, confirmpassword: e.target.value })
                }
                value={data.confirmpassword}
                theme={customTheme}
                id="confirmpassword"
                type="password"
                placeholder="*********"
                required
              />
            </div>
            {error.status && (
              <div className="w-full text-red-400">{error.msg}</div>
            )}
            <div className="w-full flex justify-end items-center">
              <button
                id="1stbutton"
                onClick={(e) =>
                  validateFirstForm(e, setError, data, setEtapaForm, etapaForm)
                }
                className="px-4 py-1 bg-azulads text-white rounded-md"
              >
                Siguiente
              </button>
            </div>
          </>
        )}
        {etapaForm === 2 && (
          <>
            <h2 className="w-full text-xl font-[monserrat-bold] text-azulads">
              Información de la empresa
            </h2>

            <div className="w-full sm:w-7/12">
              <div className="mb-1 block">
                <Label htmlFor="name" value="Nombre fiscal de la empresa" />
              </div>
              <TextInput
                onChange={(e) => setData({ ...data, name: e.target.value })}
                value={data.name}
                theme={customTheme}
                id="name"
                type="text"
                placeholder="Nombre fiscal de la empresa"
                required
              />
            </div>
            <div className="w-full sm:w-4/12">
              <div className="mb-1 block">
                <Label htmlFor="vat" value="RIF" />
              </div>
              <TextInput
                onChange={(e) => setData({ ...data, vat: e.target.value })}
                value={data.vat}
                theme={customTheme}
                id="vat"
                type="text"
                placeholder="RIF"
                required
              />
            </div>

            <div className="w-full sm:w-5/12">
              <div className="mb-2 block">
                <Label htmlFor="country_id" value="País" />
              </div>
              <Select
                onChange={(e) =>
                  setData({ ...data, country_id: e.target.value })
                }
                id="country_id"
                required
              >
                <option value="">Seleccione</option>
                {selectCountry.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="w-full sm:w-6/12 mt-1">
              <div className="mb-1 block">
                <Label htmlFor="city" value="Ciudad" />
              </div>
              <TextInput
                onChange={(e) => setData({ ...data, city: e.target.value })}
                value={data.city}
                theme={customTheme}
                id="city"
                type="text"
                placeholder="Ciudad"
                required
              />
            </div>

            <div className="w-full">
              <div className="mb-1 block">
                <Label htmlFor="street" value="Dirección completa" />
              </div>
              <TextInput
                onChange={(e) => setData({ ...data, street: e.target.value })}
                value={data.street}
                theme={customTheme}
                id="street"
                type="text"
                placeholder="Direccion completa"
                required
              />
            </div>
            <div className="w-full sm:w-7/12">
              <div className="mb-1 block">
                <Label
                  htmlFor="contact_name"
                  value="Nombre de la persona de contacto"
                />
              </div>
              <TextInput
                onChange={(e) =>
                  setData({ ...data, contact_name: e.target.value })
                }
                value={data.contact_name}
                theme={customTheme}
                id="contact_name"
                type="text"
                placeholder="Nombre de la persona de contacto"
                required
              />
            </div>
            <div className="w-full sm:w-4/12">
              <div className="mb-1 block">
                <Label htmlFor="phone" value="Numero de contacto" />
              </div>
              <TextInput
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                value={data.phone}
                theme={customTheme}
                id="phone"
                type="number"
                placeholder="+584141234567"
                required
              />
            </div>

            <div className="w-full">
              <div className="mb-2 block">
                <Label
                  htmlFor="file-upload"
                  value="Cargue el logo de la empresa (.jpg, .jpeg, .png, .webp)"
                />
              </div>

              <FileInput
                className="bg-clip-padding file:bg-transparent"
                id="file-upload"
                accept=".jpg, .jpeg, .png, .webp"
                required
              />
            </div>

            <div className="w-full flex justify-between mt-4 items-center">
              <button
                onClick={() => setEtapaForm(etapaForm - 1)}
                className="text-sm xs:text-base px-2 xs:px-4 h-fit py-1 bg-azulads text-white rounded-md"
              >
                Volver
              </button>
              <input
                type="submit"
                id="submitbutton"
                value="Finalizar Registro"
                className="text-sm xs:text-base bg-azulads text-white py-1 px-2 xs:px-4 block rounded-md disabled:opacity-50 disabled:cursor-wait cursor-pointer"
              />
            </div>
          </>
        )}
      </form>
      <RegEmpresaModal regExitoso={regExitoso} name={data.name} />
    </div>
  )
}
