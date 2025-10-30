export default async function updateJobSeeker(idcandidato, updatedData) {
  try {
    const url = `/api/jobSeeker?id=${idcandidato}`
    
    // Crear FormData para manejar archivos
    const formData = new FormData()
    
    // Agregar todos los campos de datos
    Object.keys(updatedData).forEach((key) => {
      if ((key === 'profile_image' || key === 'image_1920') && updatedData[key] instanceof File) {
        formData.append(key, updatedData[key])
      } else {
        formData.append(key, updatedData[key])
      }
    })
    
    const resp = await fetch(url, {
      method: 'PUT',
      body: formData
    })
    
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`)
    }
    
    const json = await resp.json()
    return json
  } catch (error) {
    console.error("Error updating job seeker data:", error)
    throw error
  }
}
