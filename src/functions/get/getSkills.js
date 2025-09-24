export default async function getSkills() {
  try {
    const resp = await fetch("/api/skills")
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`)
    }
    const json = await resp.json()

    return json
  } catch (error) {
    console.error("Error fetching skills:", error)
    throw error
  }
}
