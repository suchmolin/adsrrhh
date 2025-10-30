export default async function getJobOffers(companyId, page = 1, itemsPerPage = 8) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
        if (!baseUrl) {
            throw new Error('API base URL is not configured')
        }
        
        const url = `/api/jobOffers?id=${companyId}&page=${page}&items_per_page=${itemsPerPage}`
        
        const resp = await fetch(url)
        if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}`)
        }
        const json = await resp.json()
        return json
    } catch (error) {
        console.error("Error fetching job offers data:", error)
        throw error
    }
}

