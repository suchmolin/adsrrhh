export default async function sendFormRegisterCandidate(data) {
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
    name: "Candidatos DB",
  }

  const resp = await fetch("/api/registerCand", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
  const json = await resp.json()
  return json
}
