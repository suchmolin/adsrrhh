import { createServerAuthHeaders } from '@/utils/serverAuth'

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return new Response(JSON.stringify({ error: 'ID parameter is required' }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const body = await request.json()
    console.log("Experience data received:", body)
    
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    if (!baseUrl) {
      throw new Error('API base URL is not configured')
    }
    
    const url = `${baseUrl}/hr/job_seeker/lines?id=${id}`
    console.log("Saving experience at:", url)
    
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
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const json = await response.json()
    console.log("Experience saved successfully:", json)
    
    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error saving experience:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const line = searchParams.get('line')
    
    if (!id) {
      return new Response(JSON.stringify({ error: 'ID parameter is required' }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (!line) {
      return new Response(JSON.stringify({ error: 'Line parameter is required' }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }
    
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    if (!baseUrl) {
      throw new Error('API base URL is not configured')
    }
    
    const url = `${baseUrl}/hr/job_seeker/lines?id=${id}&line=${line}`
    console.log("Deleting experience at:", url)
    
    // Get auth headers with Bearer token
    const headers = await createServerAuthHeaders({
      'Content-Type': 'application/json',
    })
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: headers,
      cache: "no-cache",
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const json = await response.json()
    console.log("Experience deleted successfully:", json)
    
    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error deleting experience:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}