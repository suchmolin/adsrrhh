export default async function sendFormRegisterEmpresa(data, formData) {
  data = {
    ...data,
  }

  try {
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })

    const resp = await fetch(
      "https://g396cxxh-8069.use2.devtunnels.ms/hr/company",
      {
        method: "POST",
        body: formData,
        cache: "no-cache",
      }
    )

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
