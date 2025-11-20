export default async function updateJobSeekerCV(idcandidato, file) {
  try {
    if (!idcandidato) {
      throw new Error('Job seeker ID is required')
    }
    
    if (!file || !(file instanceof File)) {
      throw new Error('File is required')
    }
    
    const url = `/api/jobSeeker/update?id=${idcandidato}`
    
    // Crear FormData con el archivo
    const formData = new FormData()
    formData.append('cv_file', file)
    
    const resp = await fetch(url, {
      method: 'PUT',
      body: formData
    })
    
    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP error! status: ${resp.status}`)
    }
    
    const json = await resp.json()
    return json
  } catch (error) {
    console.error("Error updating job seeker CV:", error)
    throw error
  }
}

