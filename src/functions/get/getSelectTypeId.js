export default async function getSelectTypeId() {
  const resp = await fetch("/api/selectTypeId")
  console.log({ typeid: JSON.parse(resp.body) })
  const json = await resp.json()

  return json
}
