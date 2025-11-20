// Utility functions for JWT token management

/**
 * Decodes a JWT token and returns the payload
 * @param {string} token - The JWT token to decode
 * @returns {object|null} - The decoded payload or null if invalid
 */
export function decodeJWT(token) {
  if (!token) return null
  
  try {
    // JWT format: header.payload.signature
    const parts = token.split('.')
    if (parts.length !== 3) {
      console.error('Invalid JWT format')
      return null
    }
    
    // Decode the payload (second part)
    const payload = parts[1]
    
    // Add padding if needed for base64 decoding
    const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4)
    
    // Decode from base64
    const decodedPayload = atob(paddedPayload)
    
    // Parse JSON
    return JSON.parse(decodedPayload)
  } catch (error) {
    console.error('Error decoding JWT:', error)
    return null
  }
}

/**
 * Extracts user_id and rol from a JWT token
 * @param {string} token - The JWT token
 * @returns {object|null} - Object with user_id and rol, or null if invalid
 */
export function getTokenData(token) {
  const decoded = decodeJWT(token)
  if (!decoded) return null
  
  return {
    user_id: decoded.user_id,
    rol: decoded.rol
  }
}

