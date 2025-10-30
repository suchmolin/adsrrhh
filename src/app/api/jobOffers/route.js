export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const page = searchParams.get('page') || '1'
    const itemsPerPage = searchParams.get('items_per_page') || '8'
    
    if (!id) {
      return new Response(JSON.stringify({ error: 'ID parameter is required' }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    console.log("Base URL:", baseUrl)
    const url = `${baseUrl}/hr/company/job_offer?id=${id}&page=${page}&items_per_page=${itemsPerPage}`
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
    console.error("Error fetching job offers:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { searchParams } = new URL(request.url)
    const companyId = searchParams.get('id')
    
    if (!companyId) {
      return new Response(JSON.stringify({ error: 'Company ID parameter is required' }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }
    
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const url = `${baseUrl}/hr/company/job_offer?id=${companyId}`
    
    console.log("Creating job offer:", body)
    console.log("Company ID:", companyId)
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    console.log("Response:", response)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const json = await response.json()
    console.log("Job offer created:", json)

    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error creating job offer:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    const { searchParams } = new URL(request.url)
    const jobOfferId = searchParams.get('id')
    
    if (!jobOfferId) {
      return new Response(JSON.stringify({ error: 'Job offer ID parameter is required' }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }
    
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const url = `${baseUrl}/hr/company/job_offer?id=${jobOfferId}`

    body.skill_ids = body.skill_ids.split(',').map(id => parseInt(id))
    
    console.log("Updating job offer:", body)
    console.log("Job offer ID:", jobOfferId)
    console.log("Update URL:", url)
    
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const json = await response.json()
    console.log("Job offer updated:", json)

    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error updating job offer:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export async function DELETE(request) {
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
    const url = `${baseUrl}/hr/company/job_offer?id=${jobOfferId}`
    
    console.log("Deleting job offer with ID:", jobOfferId)
    console.log("Delete URL:", url)
    
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const json = await response.json()
    console.log("Job offer deleted:", json)

    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error deleting job offer:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
