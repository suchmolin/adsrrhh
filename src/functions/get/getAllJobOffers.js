import { buildDomainArray, domainArrayToString } from '@/utils/filterBuilder'

export default async function getAllJobOffers(filters = {}) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
        if (!baseUrl) {
            throw new Error('API base URL is not configured')
        }
        
        // Build domain array for filters
        const domain = buildDomainArray(filters)
        
        // Build query parameters manually to avoid URL encoding
        let queryParams = `page=${filters.page || '1'}&items_per_page=${filters.itemsPerPage || '12'}`
        
        // Add domain parameter if there are filters
        if (domain.length > 0) {
            const domainString = domainArrayToString(domain)
            queryParams += `&domain=${domainString}`
            console.log("Domain string being sent:", domainString)
        }
        
        const url = `/api/allJobOffers?${queryParams}`
        console.log("Full URL being requested:", url)
        
        const resp = await fetch(url)
        if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}`)
        }
        const json = await resp.json()
        return json
    } catch (error) {
        console.error("Error fetching all job offers data:", error)
        throw error
    }
}
