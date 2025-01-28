"use client"
import { FileInput, Label, Radio, Select, TextInput } from "flowbite-react"
import { useState } from "react"

export default function FormRegistroCandidato() {
  const [etapaForm, setEtapaForm] = useState(1)
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    nombreyapellido: "",
    edad: "",
    genero: "",
    otrogenero: "",
    ciudad: "",
    otraciudad: "",
    direcciondehabitacion: "",
    telefono: "",
    gradodeinstruccion: "",
    otrogradodeinstruccion: "",
    anosdeexperiencia: "",
    cambioresidencia: "",
    vehiculopropio: "",
    salario: "",
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
  return (
    <div className="w-full flex justify-center pt-40">
      <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px]">
        <h1 className="text-3xl text-azulads font-[monserrat-bold]">
          Registro de Candidato
        </h1>
        <form
          action="#"
          className="w-6/12 rounded-lg my-5 bg-gray-200 px-10 py-10 flex gap-2 flex-wrap"
        >
          {etapaForm === 1 && (
            <>
              <h2 className="text-xl font-[monserrat-bold] text-azulads">
                Datos de inicio de sesión
              </h2>
              <div className="w-full">
                <div className="mb-1 block">
                  <Label htmlFor="email" value="Correo electrónico" />
                </div>
                <TextInput
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  value={data.email}
                  theme={customTheme}
                  id="email"
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
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
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
                  <Label
                    htmlFor="confirmpassword"
                    value="Confirmar contraseña"
                  />
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
              <div className="w-full flex justify-end items-center">
                <button
                  onClick={(e) => setEtapaForm(etapaForm + 1)}
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
                Datos de inicio de sesión
              </h2>
              <div className="w-full">
                <div className="mb-1 block">
                  <Label
                    htmlFor="nombreyapellido"
                    value="Nombres y Apellidos"
                  />
                </div>
                <TextInput
                  onChange={(e) =>
                    setData({ ...data, nombreyapellido: e.target.value })
                  }
                  value={data.nombreyapellido}
                  theme={customTheme}
                  id="nombreyapellido"
                  type="Text"
                  placeholder="Nombres y Apellidos"
                  required
                />
              </div>
              <div className="w-2/12">
                <div className="mb-1 block">
                  <Label htmlFor="edad" value="Edad" />
                </div>
                <TextInput
                  onChange={(e) => setData({ ...data, edad: e.target.value })}
                  value={data.edad}
                  theme={customTheme}
                  id="edad"
                  type="number"
                  required
                />
              </div>
              <div className="w-9/12 flex">
                <fieldset className="flex  gap-4">
                  <legend className="mb-1">Género</legend>
                  <div className="flex items-center gap-2">
                    <Radio
                      onChange={(e) =>
                        setData({ ...data, genero: e.target.value })
                      }
                      id="masculino"
                      name="genero"
                      value="masculino"
                    />
                    <Label htmlFor="united-state">Masculino</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      onChange={(e) =>
                        setData({ ...data, genero: e.target.value })
                      }
                      id="femenino"
                      name="genero"
                      value="femenino"
                    />
                    <Label htmlFor="united-state">Femenino</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      onChange={(e) =>
                        setData({ ...data, genero: e.target.value })
                      }
                      id="otrogenero"
                      name="genero"
                      value="otrogenero"
                    />
                    <Label htmlFor="united-state">Otro:</Label>
                  </div>
                  {data.genero === "otrogenero" && (
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
                <div className="w-6/12">
                  <div className="mb-1 block">
                    <Label htmlFor="ciudad" value="Ciudad" />
                  </div>
                  <Select
                    onChange={(e) =>
                      setData({ ...data, ciudad: e.target.value })
                    }
                    id="ciudad"
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
                    <option value="Guarenas - Guatire">
                      Guarenas - Guatire
                    </option>
                    <option value="Maturín">Maturín</option>
                    <option value="Maracaibo">Maracaibo</option>
                    <option value="otraciudad">Otro</option>
                  </Select>
                </div>
                {data.ciudad === "otraciudad" && (
                  <div className="w-6/12">
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
                  <Label
                    htmlFor="direcciondehabitacion"
                    value="Dirección de habitación"
                  />
                </div>
                <TextInput
                  onChange={(e) =>
                    setData({ ...data, direcciondehabitacion: e.target.value })
                  }
                  value={data.direcciondehabitacion}
                  theme={customTheme}
                  id="direcciondehabitacion"
                  type="Text"
                  placeholder="Dirección de habitación"
                  required
                />
              </div>
              <div className="w-full">
                <div className="mb-1 block">
                  <Label htmlFor="telefono" value="Numero de teléfono" />
                </div>
                <TextInput
                  onChange={(e) =>
                    setData({ ...data, telefono: e.target.value })
                  }
                  value={data.telefono}
                  theme={customTheme}
                  id="telefono"
                  type="number"
                  placeholder="+584141234567"
                  required
                />
              </div>
              <div className="w-full flex justify-between items-center mt-4">
                <button
                  onClick={() => setEtapaForm(etapaForm - 1)}
                  className="px-4 py-1 bg-azulads text-white rounded-md"
                >
                  Volver
                </button>
                <button
                  onClick={() => setEtapaForm(etapaForm + 1)}
                  className="px-4 py-1 bg-azulads text-white rounded-md"
                >
                  Siguiente
                </button>
              </div>
            </>
          )}
          {etapaForm === 3 && (
            <>
              <div className="w-7/12">
                <div className="mb-2 block">
                  <Label
                    htmlFor="gradodeinstruccion"
                    value="Grado de Instrucción"
                  />
                </div>
                <Select
                  onChange={(e) =>
                    setData({ ...data, gradodeinstruccion: e.target.value })
                  }
                  id="gradodeinstruccion"
                  required
                >
                  <option value="">Seleccione</option>
                  <option value="Médico Cirujano">Médico Cirujano</option>
                  <option value="Licenciatura en Enfermería">
                    Licenciatura en Enfermería
                  </option>
                  <option value="Arquitectura">Arquitectura</option>
                  <option value="Licenciatura en Nutrición y Dietética">
                    Licenciatura en Nutrición y Dietética
                  </option>
                  <option value="Abogado">Abogado</option>
                  <option value="Licenciatura en Contabilidad">
                    Licenciatura en Contabilidad
                  </option>
                  <option value="Ingeniería en Informatica">
                    Ingeniería en Informatica
                  </option>
                  <option value="Licenciatura en Comunicación Social">
                    Licenciatura en Comunicación Social
                  </option>
                  <option value="Licenciatura en Finanzas">
                    Licenciatura en Finanzas
                  </option>
                  <option value="Licenciatura en Economía">
                    Licenciatura en Economía
                  </option>
                  <option value="Diseño Grafico">Diseño Grafico</option>
                  <option value="Licenciatura en Educación">
                    Licenciatura en Educación
                  </option>
                  <option value="Filosofía y Letras">Filosofía y Letras</option>
                  <option value="OtrComercio Internacionalo">
                    OtrComercio Internacionalo
                  </option>
                  <option value="Licenciatura en Administración">
                    Licenciatura en Administración
                  </option>
                  <option value="Licenciatura en Psicología">
                    Licenciatura en Psicología
                  </option>
                  <option value="Relacionista Industrial">
                    Relacionista Industrial
                  </option>
                  <option value="Bachiller">Bachiller</option>
                  <option value="Educación Básica">Educación Básica</option>
                  <option value="Técnico Superior Universitario">
                    Técnico Superior Universitario
                  </option>
                  <option value="otrogrado">Otro</option>
                </Select>
              </div>
              {data.gradodeinstruccion === "otrogrado" && (
                <div className="w-4/12">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="otrogradodeinstruccion"
                      value="Especifique"
                    />
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
              <div className="w-full flex-col justify-end">
                <div className="mb-2 block">
                  <Label
                    htmlFor="anosdeexperiencia"
                    value="Años de experiencia"
                  />
                </div>
                <Select
                  onChange={(e) =>
                    setData({ ...data, anosdeexperiencia: e.target.value })
                  }
                  id="anosdeexperiencia"
                  required
                >
                  <option value="">Seleccione</option>

                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="5">4</option>
                  <option value="5 a 9">5 a 9</option>
                  <option value="10 a 14">10 a 14</option>
                  <option value="15 a 19">15 a 19</option>
                  <option value="20 a 24">20 a 24</option>
                  <option value="25 o más">25 o más</option>
                </Select>
              </div>

              <div className="w-full">
                <div className="mb-2 block">
                  <Label
                    htmlFor="cambioresidencia"
                    value="¿Posee usted disponibilidad para cambiar de residencia?"
                  />
                </div>
                <Select id="cambioresidencia" required>
                  <option>Seleccione</option>

                  <option>Si</option>
                  <option>No</option>
                </Select>
              </div>
              <div className="w-full">
                <div className="mb-2 block">
                  <Label
                    htmlFor="vehiculopropio"
                    value="¿Por favor indique si posee vehículo ?"
                  />
                </div>
                <Select id="vehiculopropio" required>
                  <option>Seleccione</option>

                  <option>Si</option>
                  <option>No</option>
                </Select>
              </div>
              <div className="w-full mb-4">
                <div className="mb-2 block">
                  <Label
                    htmlFor="salario"
                    value="Por favor indique su expectativa salarial (No coloque a convenir)
"
                  />
                </div>
                <TextInput
                  theme={customTheme}
                  id="salario"
                  type="Text"
                  required
                />
              </div>
              <div className="w-[400px]">
                <div className="mb-2 block">
                  <Label
                    htmlFor="file-upload"
                    value="Anexar Curriculum (.pdf)"
                  />
                </div>
                <FileInput id="file-upload" accept=".pdf" required />
              </div>
              <div className="w-full flex justify-between mt-4 items-center">
                <button
                  onClick={() => setEtapaForm(etapaForm - 1)}
                  className="px-4 h-fit py-1 bg-azulads text-white rounded-md"
                >
                  Volver
                </button>
                <input
                  type="submit"
                  value="Finalizar Registro"
                  className="bg-azulads text-white py-1 px-4 block rounded-md mt-2"
                />
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  )
}
