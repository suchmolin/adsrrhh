import { FileInput, Label, Radio, Select, TextInput } from "flowbite-react"

export default function FormRegistroCandidato() {
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
          className="w-11/12 rounded-lg my-5 bg-gray-200 px-10 py-10 flex gap-4 flex-wrap"
        >
          <div className="w-[500px] mb-4">
            <div className="mb-2 block">
              <Label htmlFor="nombreyapellido" value="Nombres y Apellidos" />
            </div>
            <TextInput
              theme={customTheme}
              id="nombreyapellido"
              type="Text"
              placeholder="Nombres y Apellidos"
              required
            />
          </div>
          <div className="w-[500px] mb-4">
            <div className="mb-2 block">
              <Label htmlFor="email" value="Correo electrónico" />
            </div>
            <TextInput
              theme={customTheme}
              id="email"
              type="email"
              placeholder="example@email.com"
              required
            />
          </div>
          <div className="w-[300px] mb-4">
            <div className="mb-2 block">
              <Label htmlFor="edad" value="Edad" />
            </div>
            <TextInput theme={customTheme} id="edad" type="number" required />
          </div>
          <div className="w-[500px] mb-4 flex">
            <fieldset className="flex  gap-4">
              <legend className="mb-4">Género</legend>
              <div className="flex items-center gap-2">
                <Radio id="masculino" name="genero" value="masculino" />
                <Label htmlFor="united-state">Masculino</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="femenino" name="genero" value="femenino" />
                <Label htmlFor="united-state">Femenino</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="otrogenero" name="genero" value="otrogenero" />
                <Label htmlFor="united-state">Otro:</Label>
              </div>
              <TextInput
                theme={customTheme}
                id="otrogen"
                type="Text"
                placeholder="Especifique genero"
              />
            </fieldset>
          </div>
          <div className="w-[300px]">
            <div className="mb-2 block">
              <Label htmlFor="ciudad" value="Ciudad" />
            </div>
            <Select id="ciudad" required>
              <option>Seleccione la Ciudad</option>
              <option>Puerto Ordaz</option>
              <option>Maracay</option>
              <option>Valencia</option>
              <option>Caracas</option>
              <option>Barquisimeto</option>
              <option>Mérida</option>
              <option>Los Teques</option>
              <option>San Antonio de los Altos</option>
              <option>Guarenas - Guatire</option>
              <option>Maturín</option>
              <option>Maracaibo</option>
              <option>Otro</option>
            </Select>
          </div>
          <div className="w-[300px]">
            <div className="mb-2 block">
              <Label htmlFor="otraciudad" value="Especifique Ciudad" />
            </div>
            <TextInput
              theme={customTheme}
              id="otraciudad"
              type="Text"
              placeholder="Especifique Ciudad"
            />
          </div>
          <div className="w-[500px] mb-4">
            <div className="mb-2 block">
              <Label
                htmlFor="direcciondehabitacion"
                value="Dirección de habitación"
              />
            </div>
            <TextInput
              theme={customTheme}
              id="direcciondehabitacion"
              type="Text"
              placeholder="Dirección de habitación"
              required
            />
          </div>
          <div className="w-[500px] mb-4">
            <div className="mb-2 block">
              <Label htmlFor="telefono" value="Numero de teléfono" />
            </div>
            <TextInput
              theme={customTheme}
              id="telefono"
              type="number"
              placeholder="+584141234567"
              required
            />
          </div>
          <div className="w-[300px]">
            <div className="mb-2 block">
              <Label
                htmlFor="gradodeinstruccion"
                value="Grado de Instrucción"
              />
            </div>
            <Select id="gradodeinstruccion" required>
              <option>Seleccione</option>
              <option>Médico Cirujano</option>
              <option>Licenciatura en Enfermería</option>
              <option>Arquitectura</option>
              <option>Licenciatura en Nutrición y Dietética</option>
              <option>Abogado</option>
              <option>Licenciatura en Contabilidad.</option>
              <option>Ingeniería en Informatica</option>
              <option>Licenciatura en Comunicación Social</option>
              <option>Licenciatura en Finanzas.</option>
              <option>Licenciatura en Economía.</option>
              <option>Diseño Grafico</option>
              <option>Licenciatura en Educación</option>
              <option>Filosofía y Letras.</option>
              <option>OtrComercio Internacionalo</option>
              <option>Licenciatura en Administración</option>
              <option>Licenciatura en Psicología</option>
              <option>Relacionista Industrial</option>
              <option>Bachiller</option>
              <option>Educación Básica</option>
              <option>Técnico Superior Universitario</option>
              <option>Otro</option>
            </Select>
          </div>
          <div className="w-[300px]">
            <div className="mb-2 block">
              <Label
                htmlFor="otrogradodeinstruccion"
                value="Especifique otro grado de instrucción"
              />
            </div>
            <TextInput
              theme={customTheme}
              id="otrogradodeinstruccion"
              type="Text"
              placeholder="Especifique otro grado de instrucción"
            />
          </div>
          <div className="w-[300px]">
            <div className="mb-2 block">
              <Label htmlFor="anosdeexperiencia" value="Años de experiencia" />
            </div>
            <Select id="anosdeexperiencia" required>
              <option>Seleccione</option>

              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5 a 9</option>
              <option>10 a 14</option>
              <option>15 a 19</option>
              <option>20 a 24</option>
              <option>25 o más</option>
            </Select>
          </div>
          <div className="w-[400px]">
            <div className="mb-2 block">
              <Label
                htmlFor="areadeinteres"
                value="Por favor indique el area al cual desea postularse"
              />
            </div>
            <Select id="areadeinteres" required>
              <option>Seleccione</option>

              <option>Ventas</option>
              <option>Recursos Humanos</option>
              <option>Administración</option>
              <option>Docencia</option>
              <option>Atención al Cliente</option>
              <option>Tren Gerencial</option>
              <option>MKT</option>
              <option>Otro</option>
            </Select>
          </div>
          <div className="w-[300px]">
            <div className="mb-2 block">
              <Label
                htmlFor="otraareadeinteres"
                value="Espefique otro area de interes"
              />
            </div>
            <TextInput
              theme={customTheme}
              id="otraareadeinteres"
              type="Text"
              placeholder="Espefique otro area de interes"
            />
          </div>
          <div className="w-full mb-4">
            <div className="mb-2 block">
              <Label
                htmlFor="experienciapasada"
                value="Explique brevemente la experiencia más significativa que posee usted dentro del área al cuál se postula"
              />
            </div>
            <TextInput
              theme={customTheme}
              id="experienciapasada"
              type="Text"
              required
            />
          </div>
          <div className="w-[250px]">
            <div className="mb-2 block">
              <Label
                htmlFor="cambioresidencia"
                value="¿Posee usted disponibilidad para cambiar de residencia?
*"
              />
            </div>
            <Select id="cambioresidencia" required>
              <option>Seleccione</option>

              <option>Si</option>
              <option>No</option>
            </Select>
          </div>
          <div className="w-[250px]">
            <div className="mb-2 block">
              <Label
                htmlFor="vehiculopropio"
                value="¿Por favor indique si posee vehículo ?

*"
              />
            </div>
            <Select id="vehiculopropio" required>
              <option>Seleccione</option>

              <option>Si</option>
              <option>No</option>
            </Select>
          </div>
          <div className="w-[250px] mb-4">
            <div className="mb-2 block">
              <Label
                htmlFor="salario"
                value="Por favor indique su expectativa salarial (No coloque a convenir)
"
              />
            </div>
            <TextInput theme={customTheme} id="salario" type="Text" required />
          </div>
          <div className="w-[400px]">
            <div className="mb-2 block">
              <Label htmlFor="file-upload" value="Anexar Curriculum (.pdf)" />
            </div>
            <FileInput id="file-upload" accept=".pdf" required />
          </div>
          <div className="w-full">
            <input
              type="submit"
              value="Registrarse"
              className="bg-azulads text-white py-2 px-4 block rounded-md mt-2 text-2xl"
            />
          </div>
        </form>
      </div>
    </div>
  )
}
