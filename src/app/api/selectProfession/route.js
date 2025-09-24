export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    console.log("Base URL:", baseUrl)
    const url = baseUrl + "/hr/profession"
    console.log("Full URL:", url)
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const json = await response.json()

    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error fetching profession:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
