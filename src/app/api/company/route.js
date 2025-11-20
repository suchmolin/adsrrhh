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
    const url = `${baseUrl}/hr/company?id=${id}`
    console.log("Full URL:", url)
    
    // Get auth headers with Bearer token
    const headers = await createServerAuthHeaders()
    
    const response = await fetch(url, {
      mode: "no-cors",
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
    console.error("Error fetching company:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

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
    
    const url = `${baseUrl}/hr/company?id=${id}`
    console.log("Updating company at:", url)
    
    // Get auth headers with Bearer token
    const authHeaders = await createServerAuthHeaders()
    
    // Check if image_1920 is present in the FormData
    const hasImage = formData.has('image_1920')
    console.log("Has image_1920:", hasImage)
    
    let requestBody
    let headers = { ...authHeaders }
    
    if (hasImage) {
      // If image_1920 is present, send as FormData
      requestBody = formData
      console.log("Sending as FormData with image")
    } else {
      // If no image_1920, convert FormData to JSON object
      const jsonData = Object.fromEntries(formData)
      requestBody = JSON.stringify(jsonData)
      headers['Content-Type'] = 'application/json'
      console.log("Sending as JSON:", jsonData)
    }
    
    const resp = await fetch(url, {
      method: 'PUT',
      body: requestBody,
      headers: headers,
      cache: "no-cache",
    })
    console.log("respondiendo", resp);
    
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`)
    }
    
    const json = await resp.json()
    console.log("Update response:", json)
    
    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error updating company:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
