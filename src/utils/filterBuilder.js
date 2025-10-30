/**
 * Construye el domain array para filtros según el formato requerido
 * @param {Object} filters - Objeto con los filtros aplicados
 * @returns {Array} Domain array en el formato correcto
 */
export function buildDomainArray(filters) {
    const domain = []
    
    // Nombre/Puesto - búsqueda con ilike
    if (filters.name && filters.name.trim()) {
        domain.push(["name", "ilike", filters.name.trim()])
    }
    
    // Ubicación - búsqueda con ilike
    const ubicationValue = filters.location || filters.ubication
    if (ubicationValue && ubicationValue.trim()) {
        domain.push(["ubication", "ilike", ubicationValue.trim()])
    }
    
    // Rango salarial - múltiples condiciones AND
    if (filters.salaryMin && filters.salaryMin > 0) {
        domain.push(["salary", ">=", parseInt(filters.salaryMin)])
    }
    if (filters.salaryMax && filters.salaryMax > 0) {
        domain.push(["salary", "<=", parseInt(filters.salaryMax)])
    }
    
    // Modalidad - valor exacto
    if (filters.modality && filters.modality !== '') {
        domain.push(["modality", "=", filters.modality])
    }
    
    // Tipo de trabajo - valor exacto
    if (filters.workType && filters.workType !== '') {
        domain.push(["type_of_workday", "=", filters.workType])
    }
    
    // Experiencia - valor exacto (trainee, junior, semi_senior, senior)
    if (filters.experience && filters.experience !== '') {
        domain.push(["experience", "=", filters.experience])
    }
    
    // Log para depuración
    if (domain.length > 0) {
        console.log("Domain array generado:", JSON.stringify(domain))
    }
    
    return domain
}

/**
 * Convierte el domain array a string para envío en query params
 * @param {Array} domain - Domain array
 * @returns {string} String JSON del domain array
 * 
 * Ejemplo de salida:
 * [["ubication","ilike","Barquisimeto"]] -> '[["ubication","ilike","Barquisimeto"]]'
 * 
 * URL resultante:
 * /hr/all_job_offer?page=1&items_per_page=12&domain=[["ubication","ilike","Barquisimeto"]]
 */
export function domainArrayToString(domain) {
    return JSON.stringify(domain)
}

/**
 * Construye filtros complejos con operadores OR y AND
 * @param {Object} options - Opciones para filtros complejos
 * @returns {Array} Domain array con operadores complejos
 */
export function buildComplexDomain(options = {}) {
    const domain = []
    
    // Ejemplo: (Senior O Lead) Y modalidad distinta de "onsite"
    if (options.nameOrTerms && options.nameOrTerms.length > 0) {
        if (options.nameOrTerms.length === 1) {
            domain.push(["name", "ilike", options.nameOrTerms[0]])
        } else {
            // Construir OR para múltiples términos de nombre
            const orConditions = options.nameOrTerms.map(term => ["name", "ilike", term])
            domain.push("|", ...orConditions)
        }
    }
    
    // Agregar condiciones adicionales con AND
    if (options.excludeModality) {
        domain.push(["modality", "!=", options.excludeModality])
    }
    
    return domain
}
