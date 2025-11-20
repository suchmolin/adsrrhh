import { createServerAuthHeaders } from '@/utils/serverAuth'

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url)
    const jobOfferId = searchParams.get('id')
    
    if (!jobOfferId) {
      return new Response(JSON.stringify({ error: 'Job offer ID parameter is required' }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const body = await request.json()
    console.log("Application data received:", body)
    console.log("Job offer ID:", jobOfferId)
    
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    if (!baseUrl) {
      throw new Error('API base URL is not configured')
    }
    
    const url = `${baseUrl}/hr/application?id=${jobOfferId}`
    console.log("Applying to job offer at:", url)
    
    // Get auth headers with Bearer token
    const headers = await createServerAuthHeaders({
      'Content-Type': 'application/json',
    })
    
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
      cache: "no-cache",
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error("Error response:", errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const json = await response.json()
    console.log("Application submitted successfully:", json)
    
    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error submitting application:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

