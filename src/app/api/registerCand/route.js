export async function POST(req, res) {
  try {
    const data = await req.json()
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/hr/application"
    console.log(data)

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
    console.error("Error fetching registerCandidate prod:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
