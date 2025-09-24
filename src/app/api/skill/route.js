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
    console.log("Skill data received:", body)
    
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    if (!baseUrl) {
      throw new Error('API base URL is not configured')
    }
    
    const url = `${baseUrl}/hr/job_seeker/lines?id=${id}`
    console.log("Saving skill at:", url)
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: "no-cache",
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const json = await response.json()
    console.log("Skill saved successfully:", json)
    
    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error saving skill:", error)
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

    const body = await request.json()
    console.log("Skill update data received:", body)
    
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    if (!baseUrl) {
      throw new Error('API base URL is not configured')
    }
    
    const url = `${baseUrl}/hr/job_seeker?id=${id}`
    console.log("Updating skills at:", url)
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: "no-cache",
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const json = await response.json()
    console.log("Skills updated successfully:", json)
    
    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error updating skills:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}