// Utility functions for cookie management
import { getTokenData } from './jwt'

export function getCookie(name) {
  if (typeof document === 'undefined') return null
  
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    const cookieValue = parts.pop().split(';').shift()
    // Decode the value if it was encoded
    return cookieValue ? decodeURIComponent(cookieValue) : null
  }
  return null
}

export function setCookie(name, value, days = 7) {
  if (typeof document === 'undefined') return
  
  const expires = new Date()
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
  
  // Encode the value to handle special characters
  const encodedValue = encodeURIComponent(value)
  
  // Build cookie string - only use secure in HTTPS
  const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:'
  const secureFlag = isSecure ? '; secure' : ''
  
  document.cookie = `${name}=${encodedValue}; expires=${expires.toUTCString()}; path=/; samesite=strict${secureFlag}`
  
  console.log(`Cookie ${name} set with value length: ${value.length}`)
}

export function deleteCookie(name) {
  if (typeof document === 'undefined') return
  
  // Delete cookie with all possible attributes to ensure it's removed
  const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:'
  const secureFlag = isSecure ? '; secure' : ''
  
  // Delete with path and all attributes
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; samesite=strict${secureFlag}`
  
  // Also try without secure flag in case it was set differently
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; samesite=strict`
  
  // Also try with just path to cover all cases
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
  
  console.log(`Cookie ${name} deleted`)
}

/**
 * Gets the session token from cookies
 * @returns {string|null} - The session token or null if not found
 */
export function getSessionToken() {
  return getCookie('session_token')
}

/**
 * Checks if there is a valid session token
 * @returns {boolean} - True if session token exists and is valid
 */
export function hasValidSession() {
  const token = getSessionToken()
  if (!token) return false
  
  // Verify token is valid by decoding it
  const tokenData = getTokenData(token)
  return tokenData !== null && tokenData.user_id !== undefined
}

/**
 * Checks if there is a valid candidate session
 * @returns {boolean} - True if session token exists and role is job_seeker
 */
export function hasValidCandidatoSession() {
  const token = getSessionToken()
  if (!token) {
    console.log('hasValidCandidatoSession: No token found')
    return false
  }
  
  const tokenData = getTokenData(token)
  if (!tokenData) {
    console.log('hasValidCandidatoSession: Token data is null')
    return false
  }
  
  const isValid = tokenData.rol === 'job_seeker'
  console.log('hasValidCandidatoSession:', isValid, 'rol:', tokenData.rol, 'user_id:', tokenData.user_id)
  return isValid
}

/**
 * Checks if there is a valid company session
 * @returns {boolean} - True if session token exists and role is company
 */
export function hasValidEmpresaSession() {
  const token = getSessionToken()
  if (!token) {
    console.log('hasValidEmpresaSession: No token found')
    return false
  }
  
  const tokenData = getTokenData(token)
  if (!tokenData) {
    console.log('hasValidEmpresaSession: Token data is null')
    return false
  }
  
  const isValid = tokenData.rol === 'company'
  console.log('hasValidEmpresaSession:', isValid, 'rol:', tokenData.rol, 'user_id:', tokenData.user_id)
  return isValid
}

/**
 * Gets the user ID from the session token
 * @returns {string|null} - The user_id from the token or null if not found
 */
export function getUserIdFromToken() {
  const token = getSessionToken()
  if (!token) return null
  
  const tokenData = getTokenData(token)
  return tokenData?.user_id || null
}

/**
 * Gets the role from the session token
 * @returns {string|null} - The role from the token (job_seeker or company) or null if not found
 */
export function getRoleFromToken() {
  const token = getSessionToken()
  if (!token) return null
  
  const tokenData = getTokenData(token)
  return tokenData?.rol || null
}

export function logout() {
  deleteCookie('session_token')
  // Keep backward compatibility - also delete old cookies
  deleteCookie('candidato_session')
  deleteCookie('empresa_session')
  if (typeof window !== 'undefined') {
    window.location.href = '/'
  }
}
