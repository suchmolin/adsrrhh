"use client"
import getSelectProfession from "@/functions/get/getSelectProfession"
import getSelectTypeId from "@/functions/get/getSelectTypeId"
import sendFormRegisterCandidate from "@/functions/post/sendFormRegisterCandidate"

import {
  validateFirstForm,
  validateSecondForm,
  validateThirdForm,
} from "@/functions/validate/formRegistroCandidatos"
import { FileInput, Label, Radio, Select, TextInput } from "flowbite-react"
import { useEffect, useState } from "react"

export default function FormRegistroCandidato() {
  const [selectTypeId, setSelectTypeId] = useState([])
  const [selectProfession, setSelectProfession] = useState([])
  const [etapaForm, setEtapaForm] = useState(1)
  const [error, setError] = useState({ status: false, msg: "" })
  const [data, setData] = useState({
    email_from: "",
    password: "",
    confirmpassword: "",
    partner_name: "",
    birth_date: "",
    gender: "",
    otrogenero: "",
    city: "",
    otraciudad: "",
    address: "",
    partner_phone: "",
    type_id: "",
    profession_id: "",
    otrogradodeinstruccion: "",
    year_of_experience: "",
    residence_change: "",
    has_vehicle: "",
    salary_expected: "",
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

  const submitForm = async (e) => {
    document.getElementById("submitbutton").disabled = true
    if (!validateThirdForm(e, setError, data)) return

    const response = await sendFormRegisterCandidate({
      ...data,
      file: document.getElementById("file-upload").files[0],
    })
    console.log(response)
  }

  useEffect(() => {
    getSelectTypeId().then((res) => setSelectTypeId(res))
    getSelectProfession().then((res) => setSelectProfession(res))
  }, [])

  return (
    <div className="w-full sm:w-7/12 px-3 sm:px-0">
      <h1 className="text-2xl sm:text-3xl text-azulads font-[monserrat-bold]">
        Registro de Candidato
      </h1>
      <form
        onSubmit={(e) => submitForm(e)}
        className="w-full rounded-lg my-5 bg-azulclaroads px-5 sm:px-10 py-10 flex gap-2 flex-wrap"
      >
        {etapaForm === 1 && (
          <>
            <h2 className="text-xl font-[monserrat-bold] text-azulads text-center xs:text-start">
              Datos de inicio de sesión
            </h2>
            <div className="w-full">
              <div className="mb-1 block">
                <Label htmlFor="email_from" value="Correo electrónico" />
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
            <h2 className="text-xl font-[monserrat-bold] text-azulads">
              Información personal
            </h2>
            <div className="w-full">
              <div className="mb-1 block">
                <Label htmlFor="partner_name" value="Nombres y Apellidos" />
              </div>
              <TextInput
                onChange={(e) =>
                  setData({ ...data, partner_name: e.target.value })
                }
                value={data.partner_name}
                theme={customTheme}
                id="partner_name"
                type="Text"
                placeholder="Nombres y Apellidos"
                required
              />
            </div>
            <div className="w-full">
              <div className="mb-1 block">
                <Label htmlFor="birth_date" value="Fecha de nacimiento" />
              </div>
              <TextInput
                onChange={(e) =>
                  setData({ ...data, birth_date: e.target.value })
                }
                value={data.birth_date}
                theme={customTheme}
                id="birth_date"
                type="date"
                required
              />
            </div>
            <div className="w-full flex">
              <fieldset className="flex flex-col xs:flex-row  gap-4">
                <legend className="mb-1">Género</legend>
                <div className="flex items-center gap-2">
                  <Radio
                    onChange={(e) =>
                      setData({ ...data, gender: e.target.value })
                    }
                    id="masculino"
                    name="gender"
                    value="male"
                  />
                  <Label htmlFor="united-state">Masculino</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    onChange={(e) =>
                      setData({ ...data, gender: e.target.value })
                    }
                    id="femenino"
                    name="gender"
                    value="female"
                  />
                  <Label htmlFor="united-state">Femenino</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    onChange={(e) =>
                      setData({ ...data, gender: e.target.value })
                    }
                    id="otrogenero"
                    name="gender"
                    value="other"
                  />
                  <Label htmlFor="united-state">Otro</Label>
                </div>
                {data.gender === "otrogenero" && (
                  <TextInput
                    onChange={(e) =>
                      setData({ ...data, otrogenero: e.target.value })
                    }
                    value={data.otrogenero}
                    theme={customTheme}
                    id="otrogen"
                    type="Text"
                    placeholder="Especifique"
                  />
                )}
              </fieldset>
            </div>
            <div className="w-full flex items-end">
              <div className="w-full sm:w-6/12">
                <div className="mb-1 block">
                  <Label htmlFor="city" value="Ciudad" />
                </div>
                <Select
                  onChange={(e) => setData({ ...data, city: e.target.value })}
                  id="city"
                  required
                >
                  <option value="">Seleccione la Ciudad</option>
                  <option value="Puerto Ordaz">Puerto Ordaz</option>
                  <option value="Maracay">Maracay</option>
                  <option value="Valencia">Valencia</option>
                  <option value="Caracas">Caracas</option>
                  <option value="Barquisimeto">Barquisimeto</option>
                  <option value="Mérida">Mérida</option>
                  <option value="Los Teques">Los Teques</option>
                  <option value="San Antonio de los Altos">
                    San Antonio de los Altos
                  </option>
                  <option value="Guarenas - Guatire">Guarenas - Guatire</option>
                  <option value="Maturín">Maturín</option>
                  <option value="Maracaibo">Maracaibo</option>
                  <option value="otraciudad">Otro</option>
                </Select>
              </div>
              {data.city === "otraciudad" && (
                <div className="w-full sm:w-6/12">
                  <TextInput
                    onChange={(e) =>
                      setData({ ...data, otraciudad: e.target.value })
                    }
                    value={data.otraciudad}
                    theme={customTheme}
                    id="otraciudad"
                    type="Text"
                    placeholder="Especifique Ciudad"
                  />
                </div>
              )}
            </div>
            <div className="w-full">
              <div className="mb-1 block">
                <Label htmlFor="address" value="Dirección de habitación" />
              </div>
              <TextInput
                onChange={(e) => setData({ ...data, address: e.target.value })}
                value={data.address}
                theme={customTheme}
                id="address"
                type="Text"
                placeholder="Dirección de habitación"
                required
              />
            </div>
            <div className="w-full">
              <div className="mb-1 block">
                <Label htmlFor="partner_phone" value="Numero de teléfono" />
              </div>
              <TextInput
                onChange={(e) =>
                  setData({ ...data, partner_phone: e.target.value })
                }
                value={data.partner_phone}
                theme={customTheme}
                id="partner_phone"
                type="number"
                placeholder="+584141234567"
                required
              />
            </div>
            {error.status && (
              <div className="w-full text-red-400">{error.msg}</div>
            )}
            <div className="w-full flex justify-between items-center mt-4">
              <button
                onClick={() => setEtapaForm(etapaForm - 1)}
                className="text-sm xs:text-base px-4 py-1 bg-azulads text-white rounded-md"
              >
                Volver
              </button>
              <button
                id="2ndbutton"
                onClick={(e) =>
                  validateSecondForm(e, setError, data, setEtapaForm, etapaForm)
                }
                className="text-sm xs:text-base px-4 py-1 bg-azulads text-white rounded-md"
              >
                Siguiente
              </button>
            </div>
          </>
        )}
        {etapaForm === 3 && (
          <>
            <div className="w-full sm:w-7/12">
              <div className="mb-2 block">
                <Label htmlFor="type_id" value="Grado de Instrucción" />
              </div>
              <Select
                onChange={(e) => setData({ ...data, type_id: e.target.value })}
                id="type_id"
                required
              >
                <option value="">Seleccione</option>
                {selectTypeId.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="w-full sm:w-5/12">
              <div className="mb-2 block">
                <Label htmlFor="profession_id" value="Profesión" />
              </div>
              <Select
                onChange={(e) =>
                  setData({ ...data, profession_id: e.target.value })
                }
                id="profession_id"
                required
              >
                <option value="">Seleccione</option>
                {selectProfession.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </div>
            {data.profession_id === "93" && (
              <div className="w-full sm:w-5/12">
                <div className="mb-2 block">
                  <Label htmlFor="otrogradodeinstruccion" value="Especifique" />
                </div>
                <TextInput
                  onChange={(e) =>
                    setData({
                      ...data,
                      otrogradodeinstruccion: e.target.value,
                    })
                  }
                  value={data.otrogradodeinstruccion}
                  theme={customTheme}
                  id="otrogradodeinstruccion"
                  type="Text"
                  placeholder="Especifique"
                />
              </div>
            )}
            <div className="w-full ">
              <div className="mb-2 block">
                <Label
                  htmlFor="year_of_experience"
                  value="Años de experiencia"
                />
              </div>
              <TextInput
                onChange={(e) =>
                  setData({
                    ...data,
                    year_of_experience: e.target.value,
                  })
                }
                value={data.year_of_experience}
                theme={customTheme}
                id="year_of_experience"
                type="number"
                min="0"
                max="50"
                required
              />
            </div>

            <div className="w-full">
              <div className="mb-2 block">
                <Label
                  htmlFor="residence_change"
                  value="¿Posee usted disponibilidad para cambiar de residencia?"
                />
              </div>
              <Select
                onChange={(e) =>
                  setData({
                    ...data,
                    residence_change: e.target.value,
                  })
                }
                id="residence_change"
                required
              >
                <option value="">Seleccione</option>

                <option value={true}>Si</option>
                <option value={false}>No</option>
              </Select>
            </div>
            <div className="w-full">
              <div className="mb-2 block">
                <Label
                  htmlFor="has_vehicle"
                  value="¿Por favor indique si posee vehículo ?"
                />
              </div>
              <Select
                onChange={(e) =>
                  setData({
                    ...data,
                    has_vehicle: e.target.value,
                  })
                }
                id="has_vehicle"
                required
              >
                <option value="">Seleccione</option>

                <option value={true}>Si</option>
                <option value={false}>No</option>
              </Select>
            </div>
            <div className="w-full mb-4">
              <div className="mb-2 block">
                <Label
                  htmlFor="salary_expected"
                  value="Por favor indique su expectativa salarial en dolares (USD)"
                />
              </div>
              <TextInput
                onChange={(e) =>
                  setData({
                    ...data,
                    salary_expected: e.target.value,
                  })
                }
                value={data.salary_expected}
                theme={customTheme}
                id="salary_expected"
                type="number"
                min="0"
                required
              />
            </div>
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="file-upload" value="Anexar Curriculum (.pdf)" />
              </div>

              <FileInput
                className="bg-clip-padding file:bg-transparent"
                id="file-upload"
                accept=".pdf"
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
    </div>
  )
}
