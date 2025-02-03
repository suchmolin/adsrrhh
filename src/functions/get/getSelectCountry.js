export default async function getSelectCountry() {
  try {
    const resp = await fetch("/api/selectCountry")
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`)
    }
    const json = await resp.json()

    return json
  } catch (error) {
    console.error("Error fetching type ID:", error)
    throw error
  }
}
