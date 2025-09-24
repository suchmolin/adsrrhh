// Utility functions for cookie management

export function getCookie(name) {
  if (typeof document === 'undefined') return null
  
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null
}

export function setCookie(name, value, days = 7) {
  if (typeof document === 'undefined') return
  
  const expires = new Date()
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
  
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`
}

export function deleteCookie(name) {
  if (typeof document === 'undefined') return
  
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

export function hasValidSession() {
  const sessionId = getCookie('candidato_session')
  return sessionId !== null && sessionId !== ''
}

export function logout() {
  deleteCookie('candidato_session')
  if (typeof window !== 'undefined') {
    window.location.href = '/candidato/login'
  }
}
