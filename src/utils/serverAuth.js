// Utility functions for server-side authentication in API routes
import { cookies } from 'next/headers'

/**
 * Gets the session token from cookies in server-side API routes
 * @returns {string|null} - The session token or null if not found
 */
export async function getServerSessionToken() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session_token')
  return token?.value || null
}

/**
 * Gets authorization headers for server-side API requests
 * @returns {object} - Headers object with Authorization header, or empty object if no token
 */
export async function getServerAuthHeaders() {
  const token = await getServerSessionToken()
  if (!token) {
    return {}
  }
  
  return {
    'Authorization': `Bearer ${token}`
  }
}

/**
 * Creates headers for authenticated server-side API requests
 * @param {object} additionalHeaders - Additional headers to include
 * @returns {object} - Headers object with Authorization and additional headers
 */
export async function createServerAuthHeaders(additionalHeaders = {}) {
  const authHeaders = await getServerAuthHeaders()
  return {
    ...authHeaders,
    ...additionalHeaders
  }
}

