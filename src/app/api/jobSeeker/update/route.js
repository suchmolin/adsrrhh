import { createServerAuthHeaders } from '@/utils/serverAuth'

export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return new Response(JSON.stringify({ error: 'ID parameter is required' }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const formData = await request.formData()
    
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    if (!baseUrl) {
      throw new Error('API base URL is not configured')
    }
    
    const url = `${baseUrl}/hr/job_seeker_update?id=${id}`
    console.log("Updating job seeker CV at:", url)
    
    // Get auth headers with Bearer token
    const authHeaders = await createServerAuthHeaders()
    
    // Send FormData with file
    // Note: Don't set Content-Type header when sending FormData - 
    // fetch will automatically set it with the correct boundary
    const resp = await fetch(url, {
      method: 'PUT',
      body: formData,
      headers: authHeaders,
      cache: "no-cache",
    })
    
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`)
    }
    
    const json = await resp.json()
    console.log("CV update response:", json)
    
    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error updating job seeker CV:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

