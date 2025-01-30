export async function GET() {
  const url = process.env.URL_ODOO + "/profession"
  const response = await fetch(url)
  console.log({ apiprofession: response })

  return response
}
