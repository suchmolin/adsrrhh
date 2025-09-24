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
    has_vehicle: data.has_vehicle === "true",
    residence_change: data.residence_change === "true",
    company_id: "ADS Recursos humanos",
    
  }

  try {
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })

    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/hr/job_seeker`, {
      method: "POST",
      body: formData,
      cache: "no-cache",
    })

    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`)
    }

    const json = await resp.json()
    

  if (json && json.job_seeker) {
    window.location.href = `/candidato/perfil/${json.job_seeker}`;
  }
  return true
  } catch (error) {
    console.error("Error fetching register candidate:", error)
    throw error
  }
}
