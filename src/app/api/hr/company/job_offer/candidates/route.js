import { createServerAuthHeaders } from '@/utils/serverAuth'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const jobOfferId = searchParams.get('id')
    
    if (!jobOfferId) {
      return new Response(JSON.stringify({ error: 'Job offer ID parameter is required' }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    if (!baseUrl) {
      throw new Error('API base URL is not configured')
    }
    
    const url = `${baseUrl}/hr/company/job_offer/candidates?id=${jobOfferId}`
    console.log("Fetching candidates for job offer at:", url)
    
    // Get auth headers with Bearer token
    const headers = await createServerAuthHeaders()
    
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
      cache: "no-cache",
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error("Error response:", errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const json = await response.json()
    console.log("Candidates fetched successfully:", json)
    
    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error fetching candidates:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

