export default async function validateExistEmail(email) {
  const resp = await fetch("/api/validateEmailExistEmp", {
    method: "POST",
    body: JSON.stringify({
      email_from: email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })

  const json = await resp.json()

  return json.exist
}
