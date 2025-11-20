/**
 * Valida que una contraseña cumpla con los requisitos de seguridad:
 * - Al menos una letra mayúscula
 * - Al menos una letra minúscula
 * - Mínimo 6 caracteres
 * - Máximo 15 caracteres
 * - Al menos un símbolo de: *./-_!"#$%&
 * 
 * @param {string} password - La contraseña a validar
 * @returns {object} - { isValid: boolean, message: string }
 */
export const validatePasswordStrength = (password) => {
  // Validar longitud mínima
  if (password.length < 6) {
    return {
      isValid: false,
      message: "La contraseña debe tener al menos 6 caracteres"
    }
  }

  // Validar longitud máxima
  if (password.length > 15) {
    return {
      isValid: false,
      message: "La contraseña no puede tener más de 15 caracteres"
    }
  }

  // Validar que tenga al menos una mayúscula
  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: "La contraseña debe contener al menos una letra mayúscula"
    }
  }

  // Validar que tenga al menos una minúscula
  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      message: "La contraseña debe contener al menos una letra minúscula"
    }
  }

  // Validar que tenga al menos un símbolo permitido
  // Símbolos permitidos: .*/-_!"#$%&
  // El guión (-) va al final de la clase de caracteres para evitar problemas de escape
  const allowedSymbols = /[.*\/_!"#$%&-]/
  if (!allowedSymbols.test(password)) {
    return {
      isValid: false,
      message: "La contraseña debe contener al menos un símbolo (.*/-_!\"#$%&)"
    }
  }

  // Si pasa todas las validaciones
  return {
    isValid: true,
    message: ""
  }
}

