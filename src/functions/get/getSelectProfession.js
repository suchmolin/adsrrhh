export default async function getSelectProfession() {
  try {
    const resp = await fetch("/api/selectProfession")
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`)
    }
    const json = await resp.json()
    console.log({ profession: json })

    return json
  } catch (error) {
    console.error("Error fetching profession:", error)
    throw error
  }
}
