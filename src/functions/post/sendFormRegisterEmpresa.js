export default async function sendFormRegisterEmpresa(data, formData) {
  data = {
    ...data,
  }

  try {
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })

    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/hr/company`, {
      method: "POST",
      body: formData,
      cache: "no-cache",
    })

    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`)
    }

    const json = await resp.json()

    return json
  } catch (error) {
    console.error("Error fetching register candidate:", error)
    throw error
  }
}
