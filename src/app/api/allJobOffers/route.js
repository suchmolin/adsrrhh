export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const itemsPerPage = searchParams.get('items_per_page') || '12'
    const domain = searchParams.get('domain')
    
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    console.log("Base URL:", baseUrl)
    
    // Build query parameters
    let queryParams = `page=${page}&items_per_page=${itemsPerPage}`
    
    // Add domain parameter if provided
    if (domain) {
      queryParams += `&domain=${domain}`
      console.log("Domain filter:", domain)
    }
    
    const url = `${baseUrl}/hr/all_job_offer?${queryParams}`
    console.log("Full URL:", url)
    
    const response = await fetch(url, {
      method: "GET",
      mode: "no-cors",
      cache: "no-cache",
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
    console.error("Error fetching all job offers:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
