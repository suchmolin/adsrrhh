import valEmail from "./email"
import validateExistEmail from "./emailExistRegisterEmp"

const resetErrorFrom = (setError) => {
  setError({ status: false, msg: "" })
  document
    .querySelectorAll(".border-red-400")
    .forEach((input) => input.classList.remove("border-red-400"))
}

export const validateFirstForm = async (
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

  //const validateEmailExist = await validateExistEmail(data.email_from)

  /*if (validateEmailExist) {
    setError({
      status: true,
      msg: "Este correo ya está registrado",
    })
    document.getElementById("email_from").classList.add("border-red-400")
    return
  }*/
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

export const validateSecondForm = async (e, setError, data) => {
  e.preventDefault()
  resetErrorFrom(setError)
  if (!data.name) {
    setError({
      status: true,
      msg: "Nombre inválido",
    })
    document.getElementById("name").classList.add("border-red-400")
    return
  }
  if (data.vat === "") {
    setError({
      status: true,
      msg: "RIF inválido",
    })
    document.getElementById("vat").classList.add("border-red-400")
    return
  }
  return true
}
