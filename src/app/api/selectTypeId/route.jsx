export async function GET() {
  const url = process.env.URL_ODOO + "/type_id"
  const response = await fetch(url)
  console.log({ apitypeid: response })

  return response
}
