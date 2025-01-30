export default async function getSelectTypeId() {
  const resp = await fetch("/api/selectTypeId")
  console.log({ typeid: resp })
  const json = await resp.json()

  return json
}
