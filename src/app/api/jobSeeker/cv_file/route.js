import { createServerAuthHeaders } from '@/utils/serverAuth'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return new Response(JSON.stringify({ error: 'ID parameter is required' }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    console.log("Base URL:", baseUrl)
    const url = `${baseUrl}/hr/job_seeker/cv_file?id=${id}`
    console.log("Full URL:", url)
    
    // Get auth headers with Bearer token
    const headers = await createServerAuthHeaders()
    
    const response = await fetch(url, {
      method: "GET",
      cache: "no-cache",
      headers: headers,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const json = await response.json()

    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error fetching CV file:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

