export default async function sendFormRegisterCandidate(data, formData) {
  if (data.gender === "otrogenero") data = { ...data, gender: data.otrogenero }
  if (data.city === "otraciudad") data = { ...data, city: data.otraciudad }
  if (parseInt(data.profession_id) === 94) {
    data = { ...data, profession_id: data.otrogradodeinstruccion }
  } else {
    data = { ...data, profession_id: parseInt(data.profession_id) }
  }
  data = {
    ...data,
    type_id: parseInt(data.type_id),
    has_vehicle: data.has_vehicle === "true",
    residence_change: data.residence_change === "true",
    salary_expected: parseInt(data.salary_expected),
    year_of_experience: parseInt(data.year_of_experience),
    profession: parseInt(data.profession),
    name: "Candidatos DB",
    company_id: "ADS Recursos humanos",
  }

  try {
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })

    const resp = await fetch(
      "https://g396cxxh-8069.use2.devtunnels.ms/hr/application",
      {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        cache: "no-cache",
      }
    )
    console.log("resp", resp)

    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`)
    }

    const json = await resp.json()
    console.log("json", json)

    return json
  } catch (error) {
    console.error("Error fetching register candidate:", error)
    throw error
  }
}
