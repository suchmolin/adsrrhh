export default async function getSelectTypeId() {
  const resp = await fetch("/api/selectTypeId")
  const json = await resp.json()

  console.log({ typeid: await resp.json() })

  return json
}
