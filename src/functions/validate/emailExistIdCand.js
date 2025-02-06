export default async function validateExistIdCandidate(data) {
  const resp = await fetch("/api/validateExistIdCand", {
    method: "POST",
    body: JSON.stringify({
      identification_card: data.identification_card,
      type_of_identification_card: data.type_of_identification_card,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })

  const json = await resp.json()

  return json.exist
}
