export default async function getCompany(idempresa) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    if (!baseUrl) {
      throw new Error('API base URL is not configured')
    }
    
    const url = `${baseUrl}/hr/company?id=${idempresa}`
    
    const resp = await fetch(url)
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`)
    }
    const json = await resp.json()
    return json
  } catch (error) {
    console.error("Error fetching company data:", error)
    throw error
  }
}
