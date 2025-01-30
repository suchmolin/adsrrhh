export default async function getSelectProfession() {
  const resp = await fetch("/api/selectProfession")
  const json = await resp.json()
  console.log({ profession: JSON.parse(resp.body) })

  return json
}
