import valEmail from "./email"

const resetErrorFrom = (setError) => {
  setError({ status: false, msg: "" })
  document
    .querySelectorAll(".border-red-400")
    .forEach((input) => input.classList.remove("border-red-400"))
}

export const validateFirstForm = (
  e,
  setError,
  data,
  setEtapaForm,
  etapaForm
) => {
  e.preventDefault()
  resetErrorFrom(setError)
  if (!valEmail(data.email_from)) {
    setError({
      status: true,
      msg: "Correo electrónico inválido",
    })
    document.getElementById("email_from").classList.add("border-red-400")
    return
  }
  if (data.password.length < 6 || data.password.length > 12) {
    setError({ status: true, msg: "Contraseña inválida" })
    document.getElementById("password").classList.add("border-red-400")
    return
  }
  if (data.password !== data.confirmpassword) {
    setError({ status: true, msg: "Las contraseñas no coinciden" })
    document.getElementById("password").classList.add("border-red-400")
    document.getElementById("confirmpassword").classList.add("border-red-400")
    return
  }

  setEtapaForm(etapaForm + 1)
}

export const validateSecondForm = (
  e,
  setError,
  data,
  setEtapaForm,
  etapaForm
) => {
  e.preventDefault()
  resetErrorFrom(setError)
  if (data.partner_name === "") {
    setError({ status: true, msg: "Nombre y Apellido inválido" })
    document.getElementById("partner_name").classList.add("border-red-400")
    return
  }
  if (data.birth_date === "") {
    setError({ status: true, msg: "Fecha de nacimiento no válida" })
    document.getElementById("birth_date").classList.add("border-red-400")
    return
  }
  if (data.gender === "") {
    setError({ status: true, msg: "Seleccione un género" })
    return
  }
  if (data.gender === "otrogenero" && data.otrogenero === "") {
    setError({ status: true, msg: "Especifique género" })
    return
  }
  if (data.city === "") {
    setError({ status: true, msg: "Seleccione una ciudad" })
    return
  }
  if (data.city === "otraciudad" && data.otraciudad === "") {
    setError({ status: true, msg: "Especifique la ciudad" })
    return
  }
  if (data.address === "") {
    setError({
      status: true,
      msg: "Debe proporcionar una dirección de habitacion",
    })
    return
  }
  if (data.partner_phone === "") {
    setError({ status: true, msg: "Debe proporcionar un número de teléfono" })
    return
  }

  setEtapaForm(etapaForm + 1)
}
