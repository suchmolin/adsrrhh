export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body
    
    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password are required' }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    if (!baseUrl) {
      throw new Error('API base URL is not configured')
    }
    
    const url = `${baseUrl}/hr/auth/login`
    console.log("Login URL:", url)
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      cache: "no-cache",
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return new Response(JSON.stringify({ 
        error: errorData.message || 'Login failed',
        status: response.status 
      }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      })
    }

    const json = await response.json()
    console.log("Login response:", json)

    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error in login:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
