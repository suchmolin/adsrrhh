import { createAuthHeaders } from '@/utils/auth'

export default async function getJobSeekerCV(idcandidato) {
  try {
    if (!idcandidato) {
      throw new Error('Job seeker ID is required')
    }
    
    // Use Next.js API route instead of direct backend call
    const url = `/api/jobSeeker/cv_file?id=${idcandidato}`
    
    // Include authorization headers with Bearer token
    const headers = createAuthHeaders({
      'Content-Type': 'application/json',
    })
    
    const resp = await fetch(url, {
      method: 'GET',
      headers: headers,
      cache: 'no-cache',
    })
    
    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP error! status: ${resp.status}`)
    }
    
    const json = await resp.json()
    return json
  } catch (error) {
    console.error("Error fetching job seeker CV:", error)
    throw error
  }
}

