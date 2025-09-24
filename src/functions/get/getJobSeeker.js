export default async function getJobSeeker(idcandidato) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    if (!baseUrl) {
      throw new Error('API base URL is not configured')
    }
    
    const url = `${baseUrl}/hr/job_seeker?id=${idcandidato}`
    console.log("Fetching job seeker from:", url)
    
    const resp = await fetch(url)
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`)
    }
    const json = await resp.json()
    console.log("JSON:", json)
    return json
  } catch (error) {
    console.error("Error fetching job seeker data:", error)
    throw error
  }
}
