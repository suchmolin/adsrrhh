export async function POST(req, res) {
  try {
    const data = await req.json()
    const { type = "job_seeker" } = data // Default to job_seeker if no type specified
    const url =
      process.env.NEXT_PUBLIC_API_BASE_URL + `/hr/validate/exist/user/identification_card?type=${type}`

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
    console.error("Error validating ID:", error)
    return new Response(JSON.stringify({ error: error.message, exist: false }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
