export default function LoginCandidato() {
  return (
    <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex flex-col">
      <h1 className="text-azulads text-3xl font-[monserrat-bold]">
        Acceso a candidato
      </h1>
      <h2 className="text-azuloscuroads text-lg font-[monserrat-bold]">
        El primer paso hacia tu proximo gran empleo
      </h2>
      <form action="" className="rounded-xl bg-azulclaroads p-4 my-4">
        <h3 className="text-azuloscuroads text-lg mb-4">Ingresa ahora</h3>
        <div className="w-full flex flex-wrap sm:flex-nowrap gap-4">
          <div className="w-full sm:w-5/12 pr-5">
            <input
              type="email"
              placeholder="Correo Electrónico"
              className="ring-0 border-none outline-none w-full px-2 bg-white rounded-lg focus:ring-azulads"
            />
          </div>
          <div className="w-full sm:w-5/12 pr-5">
            <input
              type="password"
              placeholder="Contraseña"
              className="ring-0 border-none outline-none w-full px-2 bg-white rounded-lg focus:ring-azulads"
            />
          </div>
          <div className="w-full sm:w-2/12 pr-5">
            <button className="bg-azulads text-white p-2 rounded-md w-full">
              Ingresar
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
