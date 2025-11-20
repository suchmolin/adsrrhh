// Utility functions for authentication and API requests

import { getSessionToken } from './cookies'

/**
 * Gets the authorization header with Bearer token
 * @returns {object} - Headers object with Authorization header, or empty object if no token
 */
export function getAuthHeaders() {
  const token = getSessionToken()
  if (!token) {
    return {}
  }
  
  return {
    'Authorization': `Bearer ${token}`
  }
}

/**
 * Creates headers for authenticated API requests
 * @param {object} additionalHeaders - Additional headers to include
 * @returns {object} - Headers object with Authorization and additional headers
 */
export function createAuthHeaders(additionalHeaders = {}) {
  const authHeaders = getAuthHeaders()
  return {
    ...authHeaders,
    ...additionalHeaders
  }
}

/**
 * Makes an authenticated fetch request
 * @param {string} url - The URL to fetch
 * @param {object} options - Fetch options (method, body, etc.)
 * @returns {Promise<Response>} - The fetch response
 */
export async function authenticatedFetch(url, options = {}) {
  const token = getSessionToken()
  
  const headers = {
    ...options.headers,
    ...getAuthHeaders()
  }
  
  return fetch(url, {
    ...options,
    headers
  })
}

