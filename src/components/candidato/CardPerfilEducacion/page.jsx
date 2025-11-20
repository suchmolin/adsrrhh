import Image from "next/image"
import { useState, useEffect } from "react"
import getSkills from "@/functions/get/getSkills"

export default function CardPerfilEducacion({ jobSeekerData, candidatoId, onDataRefresh, readOnly = false }) {
  // Extract education and experience data from jobSeekerData
  const initialEducationData = jobSeekerData?.education_ids || []
  const initialExperienceData = jobSeekerData?.experience_ids || []

  // Local state for education and experience data
  const [educationData, setEducationData] = useState(initialEducationData)
  const [experienceData, setExperienceData] = useState(initialExperienceData)

  // Load skills options on component mount
  useEffect(() => {
    loadSkillsOptions()
  }, [])

  // Update local state when jobSeekerData changes
  useEffect(() => {
    setEducationData(jobSeekerData?.education_ids || [])
    setExperienceData(jobSeekerData?.experience_ids || [])
    setLanguagesData(jobSeekerData?.languages_ids || [])
    setSkillsData(jobSeekerData?.skill_ids || [])
  }, [jobSeekerData])

  // Load skills options from API
  const loadSkillsOptions = async () => {
    setIsLoadingSkills(true)
    try {
      const skills = await getSkills()
      setSkillsOptions(skills || [])
    } catch (error) {

      setError('Error al cargar las habilidades disponibles')
    } finally {
      setIsLoadingSkills(false)
    }
  }

  // Education form state
  const [showEducationForm, setShowEducationForm] = useState(false)
  const [educationForm, setEducationForm] = useState({
    degree: '',
    specialization: '',
    institution_name: '',
    start_date: '',
    end_date: '',
    in_progress: false
  })

  // Delete confirmation state
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [deleteType, setDeleteType] = useState('') // 'education' or 'experience'
  const [isDeleting, setIsDeleting] = useState(false)

  // Experience form state
  const [showExperienceForm, setShowExperienceForm] = useState(false)
  const [experienceForm, setExperienceForm] = useState({
    position: '',
    company: '',
    start_date: '',
    end_date: '',
    in_progress: false,
    description: ''
  })

  // Loading states
  const [isSavingEducation, setIsSavingEducation] = useState(false)
  const [isSavingExperience, setIsSavingExperience] = useState(false)
  const [isSavingLanguage, setIsSavingLanguage] = useState(false)
  const [error, setError] = useState(null)

  // Languages state
  const [languagesData, setLanguagesData] = useState(jobSeekerData?.languages_ids || [])
  const [showLanguageForm, setShowLanguageForm] = useState(false)
  const [languageForm, setLanguageForm] = useState({
    name: '',
    level: ''
  })

  // Skills state
  const [skillsData, setSkillsData] = useState(jobSeekerData?.skill_ids || [])
  const [showAddSkill, setShowAddSkill] = useState(false)
  const [skillInput, setSkillInput] = useState('')
  const [filteredSkills, setFilteredSkills] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isSavingSkill, setIsSavingSkill] = useState(false)
  const [skillsOptions, setSkillsOptions] = useState([])
  const [isLoadingSkills, setIsLoadingSkills] = useState(false)

  // Education degree options
  const degreeOptions = [
    'Bachiller',
    'Licenciado',
    'Ingeniero',
    'Diplomado',
    'Master',
    'Doctorado'
  ]

  // Language options
  const languageOptions = [
    'Español',
    'Inglés',
    'Francés',
    'Alemán',
    'Italiano',
    'Portugués',
    'Chino Mandarín',
    'Japonés',
    'Coreano',
    'Ruso',
    'Árabe',
    'Holandés',
    'Sueco',
    'Noruego',
    'Danés',
    'Finlandés',
    'Polaco',
    'Checo',
    'Húngaro',
    'Rumano',
    'Búlgaro',
    'Griego',
    'Turco',
    'Hebreo',
    'Hindi',
    'Bengalí',
    'Tailandés',
    'Vietnamita',
    'Indonesio',
    'Malayo',
    'Filipino',
    'Swahili',
    'Afrikáans',
    'Otro'
  ]

  // Language level options
  const languageLevels = [
    { name: 'Principiante', value: 'beginner' },
    { name: 'Intermedio', value: 'intermediate' },
    { name: 'Intermedio Alto', value: 'upper_intermediate' },
    { name: 'Avanzado', value: 'advanced' },
    { name: 'Nativo/Bilingue', value: 'native' }
  ]

  // Function to get readable language level name
  const getLanguageLevelName = (levelValue) => {
    const level = languageLevels.find(l => l.value === levelValue)
    return level ? level.name : levelValue
  }

  // Handle education form input changes
  const handleEducationFormChange = (field, value) => {
    setEducationForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle in progress checkbox
  const handleInProgressChange = (checked) => {
    setEducationForm(prev => ({
      ...prev,
      in_progress: checked,
      end_date: checked ? '' : prev.end_date
    }))
  }

  // Save education to API
  const saveEducation = async (educationData) => {
    try {
      const url = `/api/education?id=${candidatoId}`

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          education_ids: educationData
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      return result
    } catch (error) {

      throw error
    }
  }

  // Handle education form submission
  const handleEducationSubmit = async (e) => {
    e.preventDefault()
    setIsSavingEducation(true)
    setError(null)

    try {
      // Prepare education data
      const educationData = [{
        degree: educationForm.degree,
        specialization: educationForm.specialization,
        institution_name: educationForm.institution_name,
        start_date: educationForm.start_date,
        end_date: educationForm.in_progress ? null : educationForm.end_date
      }]

      // Save to API
      const result = await saveEducation(educationData)

      // Add new education to local state
      if (result && result.education_ids) {


        // Add the new education item to local state
        const newEducationItem = {
          degree: educationForm.degree,
          specialization: educationForm.specialization,
          institution_name: educationForm.institution_name,
          start_date: educationForm.start_date,
          end_date: educationForm.in_progress ? null : educationForm.end_date
        }

        setEducationData(prev => [...prev, newEducationItem])
      }

      // Reset form and close
      setEducationForm({
        degree: '',
        specialization: '',
        institution_name: '',
        start_date: '',
        end_date: '',
        in_progress: false
      })
      setShowEducationForm(false)
    } catch (error) {

      setError('Error al guardar la educación. Por favor, inténtalo de nuevo.')
    } finally {
      setIsSavingEducation(false)
    }
  }

  // Handle delete item
  const handleDeleteClick = (item, type) => {
    setItemToDelete(item)
    setDeleteType(type)
    setShowDeleteModal(true)
  }

  // Delete education from API
  const deleteEducation = async (educationId) => {
    try {
      const url = `/api/education?id=${educationId}&line=education_ids`

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      return result
    } catch (error) {

      throw error
    }
  }

  // Delete experience from API
  const deleteExperience = async (experienceId) => {
    try {
      const url = `/api/experience?id=${experienceId}&line=experience_ids`

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      return result
    } catch (error) {

      throw error
    }
  }

  // Delete language from API
  const deleteLanguage = async (languageId) => {
    try {
      const url = `/api/language?id=${languageId}&line=language_ids`

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      return result
    } catch (error) {

      throw error
    }
  }

  // Confirm delete
  const handleConfirmDelete = async () => {
    setIsDeleting(true)
    setError(null)

    try {
      // Get the ID of the item to delete
      let itemId = null

      if (deleteType === 'education') {
        // Find the education item index to get its ID
        const educationIndex = educationData.findIndex(item =>
          item.degree === itemToDelete.degree &&
          item.specialization === itemToDelete.specialization &&
          item.institution_name === itemToDelete.institution_name
        )
        itemId = educationData[educationIndex]?.id
      } else if (deleteType === 'experience') {
        // Find the experience item index to get its ID
        const experienceIndex = experienceData.findIndex(item =>
          item.position === itemToDelete.position &&
          item.company === itemToDelete.company
        )
        itemId = experienceData[experienceIndex]?.id
      } else if (deleteType === 'language') {
        // Find the language item index to get its ID
        const languageIndex = languagesData.findIndex(item =>
          item.name === itemToDelete.name &&
          item.level === itemToDelete.level
        )
        itemId = languagesData[languageIndex]?.id
      } else if (deleteType === 'skill') {
        // For skills, we get the ID directly from the item
        itemId = itemToDelete.id
      }

      // If no ID found, show error (except for skills which are handled differently)
      if (!itemId && deleteType !== 'skill') {
        setError('No se pudo encontrar el ID del elemento a eliminar')
        return
      }

      // Call the appropriate delete function
      if (deleteType === 'education') {
        await deleteEducation(itemId)
        // Remove from local state
        setEducationData(prev => prev.filter((_, index) => index !== educationData.findIndex(item =>
          item.degree === itemToDelete.degree &&
          item.specialization === itemToDelete.specialization &&
          item.institution_name === itemToDelete.institution_name
        )))
      } else if (deleteType === 'experience') {
        await deleteExperience(itemId)
        // Remove from local state
        setExperienceData(prev => prev.filter((_, index) => index !== experienceData.findIndex(item =>
          item.position === itemToDelete.position &&
          item.company === itemToDelete.company
        )))
      } else if (deleteType === 'language') {
        await deleteLanguage(itemId)
        // Remove from local state
        setLanguagesData(prev => prev.filter((_, index) => index !== languagesData.findIndex(item =>
          item.name === itemToDelete.name &&
          item.level === itemToDelete.level
        )))
      } else if (deleteType === 'skill') {
        // For skills, we need to send the updated array without the deleted skill (only IDs)
        const updatedSkillsArray = skillsData
          .filter(skill =>
            !((skill.id && skill.id === itemToDelete.id) || skill.name === itemToDelete.name)
          )
          .map(skill => skill.id)

        await updateSkills(updatedSkillsArray)

        // Remove from local state
        setSkillsData(prev => prev.filter(skill =>
          !((skill.id && skill.id === itemToDelete.id) || skill.name === itemToDelete.name)
        ))
      }

      // Close modal and reset state
      setShowDeleteModal(false)
      setItemToDelete(null)
      setDeleteType('')
      setError(null)

    } catch (error) {

      setError('Error al eliminar el elemento. Por favor, inténtalo de nuevo.')
    } finally {
      setIsDeleting(false)
    }
  }

  // Cancel delete
  const handleCancelDelete = () => {
    setShowDeleteModal(false)
    setItemToDelete(null)
    setDeleteType('')
  }

  // Handle experience form input changes
  const handleExperienceFormChange = (field, value) => {
    setExperienceForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle language form input changes
  const handleLanguageFormChange = (field, value) => {
    setLanguageForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle skill input change
  const handleSkillInputChange = (value) => {
    setSkillInput(value)

    if (value.length > 0) {
      const filtered = skillsOptions.filter(skill =>
        skill.name.toLowerCase().includes(value.toLowerCase()) &&
        !skillsData.some(addedSkill =>
          (addedSkill.id && addedSkill.id === skill.id) ||
          addedSkill.name === skill.name
        )
      )
      setFilteredSkills(filtered)
      setShowSuggestions(true)
    } else {
      setFilteredSkills([])
      setShowSuggestions(false)
    }
  }

  // Handle skill selection from suggestions
  const handleSkillSelect = (skill) => {
    setSkillInput(skill.name)
    setShowSuggestions(false)
    setFilteredSkills([])
  }

  // Handle add skill button click
  const handleAddSkillClick = () => {
    setShowAddSkill(true)
    setSkillInput('')
    setError(null)
  }

  // Handle cancel add skill
  const handleCancelAddSkill = () => {
    setShowAddSkill(false)
    setSkillInput('')
    setShowSuggestions(false)
    setFilteredSkills([])
    setError(null)
  }

  // Handle experience in progress checkbox
  const handleExperienceInProgressChange = (checked) => {
    setExperienceForm(prev => ({
      ...prev,
      in_progress: checked,
      end_date: checked ? '' : prev.end_date
    }))
  }

  // Save experience to API
  const saveExperience = async (experienceData) => {
    try {
      const url = `/api/experience?id=${candidatoId}`

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          experience_ids: experienceData
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      return result
    } catch (error) {

      throw error
    }
  }

  // Save language to API
  const saveLanguage = async (languageData) => {
    try {
      const url = `/api/language?id=${candidatoId}`

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language_ids: languageData
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      return result
    } catch (error) {

      throw error
    }
  }

  // Update skills to API
  const updateSkills = async (skillsArray) => {
    try {
      const url = `/api/skill?id=${candidatoId}`

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skill_ids: skillsArray
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      return result
    } catch (error) {

      throw error
    }
  }

  // Handle experience form submission
  const handleExperienceSubmit = async (e) => {
    e.preventDefault()
    setIsSavingExperience(true)
    setError(null)

    try {
      // Prepare experience data
      const experienceData = [{
        company: experienceForm.company,
        position: experienceForm.position,
        start_date: experienceForm.start_date,
        end_date: experienceForm.in_progress ? null : experienceForm.end_date,
        description: experienceForm.description
      }]

      // Save to API
      const result = await saveExperience(experienceData)

      // Add new experience to local state
      if (result && result.experience_ids) {


        // Add the new experience item to local state
        const newExperienceItem = {
          company: experienceForm.company,
          position: experienceForm.position,
          start_date: experienceForm.start_date,
          end_date: experienceForm.in_progress ? null : experienceForm.end_date,
          description: experienceForm.description
        }

        setExperienceData(prev => [...prev, newExperienceItem])
      }

      // Reset form and close
      setExperienceForm({
        position: '',
        company: '',
        start_date: '',
        end_date: '',
        in_progress: false,
        description: ''
      })
      setShowExperienceForm(false)
    } catch (error) {

      setError('Error al guardar la experiencia. Por favor, inténtalo de nuevo.')
    } finally {
      setIsSavingExperience(false)
    }
  }

  // Handle language form submission
  const handleLanguageSubmit = async (e) => {
    e.preventDefault()
    setIsSavingLanguage(true)
    setError(null)

    try {
      // Prepare language data
      const languageData = [{
        name: languageForm.name,
        level: languageForm.level
      }]

      // Save to API
      const result = await saveLanguage(languageData)

      // Add new language to local state
      if (result && result.language_ids) {


        // Add the new language item to local state
        const newLanguageItem = {
          name: languageForm.name,
          level: languageForm.level
        }

        setLanguagesData(prev => [...prev, newLanguageItem])
      }

      // Reset form and close
      setLanguageForm({
        name: '',
        level: ''
      })
      setShowLanguageForm(false)
    } catch (error) {

      setError('Error al guardar el idioma. Por favor, inténtalo de nuevo.')
    } finally {
      setIsSavingLanguage(false)
    }
  }

  // Handle save skill
  const handleSaveSkill = async () => {
    if (!skillInput.trim()) {
      setError('Por favor, escribe o selecciona una habilidad')
      return
    }

    // Find the skill by name
    const selectedSkill = skillsOptions.find(skill =>
      skill.name.toLowerCase() === skillInput.toLowerCase()
    )

    if (!selectedSkill) {
      setError('Habilidad no encontrada en la lista')
      return
    }

    // Check if skill is already added
    if (skillsData.some(skill =>
      (skill.id && skill.id === selectedSkill.id) ||
      skill.name === selectedSkill.name
    )) {
      setError('Esta habilidad ya está agregada')
      return
    }

    setIsSavingSkill(true)
    setError(null)

    try {
      // Prepare new skills array with existing skills + new skill (only IDs)
      const newSkillsArray = [
        ...skillsData.map(skill => skill.id),
        selectedSkill.id
      ]

      // Update skills via API
      const result = await updateSkills(newSkillsArray)

      // Update local state
      if (result) {

        setSkillsData(prev => [...prev, { id: selectedSkill.id, name: selectedSkill.name }])
      }

      // Reset form and close
      setSkillInput('')
      setShowAddSkill(false)
      setShowSuggestions(false)
      setFilteredSkills([])
    } catch (error) {

      setError('Error al guardar la habilidad. Por favor, inténtalo de nuevo.')
    } finally {
      setIsSavingSkill(false)
    }
  }

  // Add skill directly from list click (modal)
  const handleAddSkillFromList = async (skill) => {
    if (skillsData.some(s => (s.id && s.id === skill.id) || s.name === skill.name)) {
      return
    }

    setIsSavingSkill(true)
    setError(null)

    try {
      const newSkillsArray = [
        ...skillsData.map(s => s.id),
        skill.id
      ]

      const result = await updateSkills(newSkillsArray)

      if (result) {
        setSkillsData(prev => [...prev, { id: skill.id, name: skill.name }])
      }
    } catch (error) {
      setError('Error al guardar la habilidad. Por favor, inténtalo de nuevo.')
    } finally {
      setIsSavingSkill(false)
    }
  }
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full h-fit bg-white CShadow3 relative flex flex-col gap-3 py-5 rounded-xl px-5 lg:px-10">
        <div className="w-full flex gap-2 items-center">
          <Image src="/img/birrete.png" width={40} height={40} alt="birrete" />
          <h2 className="font-[monserrat-black] text-primary text-2xl">
            Educación
          </h2>
        </div>
        <div className="px-5 sm:pl-12">
          <div id="estudios" className="mb-4">
            <h3 className="text-primary text-lg font-bold">
              Estudios y capacitaciones
            </h3>
            {educationData && educationData.length > 0 ? (
              <>
                {educationData.map((education, index) => (
                  <div key={index} className="mb-3 relative group">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-bold">
                          {education.degree} - {education.specialization} - {education.institution_name || 'Institución no especificada'}
                        </p>
                        <p className="text-sm text-gray-700">

                          {`${education.start_date || "Año no especificado"} - ${education.end_date ? education.end_date : 'En curso'}`}


                        </p>
                        {education.description && (
                          <p className="text-sm text-gray-600 mt-1">{education.description}</p>
                        )}
                      </div>
                      {!readOnly && (
                        <button
                          onClick={() => handleDeleteClick(education, 'education')}
                          className="ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                          title="Eliminar educación"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {!readOnly && (
                  <button
                    onClick={() => {
                      setShowEducationForm(true)
                      setError(null)
                    }}
                    className="mt-3 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    + Agregar Educación
                  </button>
                )}
              </>
            ) : (
              <div className="text-center py-6">
                <div className="text-gray-500 italic mb-4">
                  No tienes información de educación registrada
                </div>
                {!readOnly && (
                  <button
                    onClick={() => {
                      setShowEducationForm(true)
                      setError(null)
                    }}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    + Agregar Educación
                  </button>
                )}
              </div>
            )}
          </div>

          <div id="idiomas" className="mb-4">
            <h3 className="text-primary text-lg font-bold">Idiomas</h3>
            {languagesData && languagesData.length > 0 ? (
              <>
                {languagesData.map((language, index) => (
                  <div key={index} className="mb-3 relative group">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-bold">{language.name}</p>
                        <p className="text-sm text-gray-700">{getLanguageLevelName(language.level)}</p>
                      </div>
                      {!readOnly && (
                        <button
                          onClick={() => handleDeleteClick(language, 'language')}
                          className="ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                          title="Eliminar idioma"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {!readOnly && (
                  <button
                    onClick={() => {
                      setShowLanguageForm(true)
                      setError(null)
                    }}
                    className="mt-3 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    + Agregar Idioma
                  </button>
                )}
              </>
            ) : (
              <div className="text-center py-6">
                <div className="text-gray-500 italic mb-4">
                  No tienes información de idiomas registrada
                </div>
                {!readOnly && (
                  <button
                    onClick={() => {
                      setShowLanguageForm(true)
                      setError(null)
                    }}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    + Agregar Idioma
                  </button>
                )}
              </div>
            )}
          </div>

          <div id="habilidades" className="mb-4">
            <h3 className="text-primary text-lg font-bold">Habilidades</h3>

            {/* Skills list */}
            {skillsData && skillsData.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {skillsData.map((skill, index) => (
                  <div key={skill.id || index} className="relative group">
                    <div className="flex items-center">
                      <p className="px-2 py-1 bg-gray-200 text-primary text-center rounded-2xl font-bold pr-8">
                        {skill.name}
                      </p>
                      {!readOnly && (
                        <button
                          onClick={() => handleDeleteClick(skill, 'skill')}
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100 transition-colors opacity-0 group-hover:opacity-100"
                          title="Eliminar habilidad"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add skill form or button */}
            {!readOnly && (
              <>
                {!showAddSkill ? (
                  <>
                    {skillsData && skillsData.length > 0 ? (
                      <>
                        {skillsOptions.filter(skill => !skillsData.some(addedSkill =>
                          (addedSkill.id && addedSkill.id === skill.id) ||
                          addedSkill.name === skill.name
                        )).length === 0 ? (
                          <div className="text-center py-2">
                            <p className="text-gray-500 text-sm italic">
                              Todas las habilidades disponibles han sido agregadas
                            </p>
                          </div>
                        ) : (
                          <button
                            onClick={handleAddSkillClick}
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                          >
                            + Agregar Habilidad
                          </button>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-6">
                        <div className="text-gray-500 italic mb-4">
                          No tienes habilidades registradas
                        </div>
                        <button
                          onClick={handleAddSkillClick}
                          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                        >
                          + Agregar Habilidad
                        </button>
                      </div>
                    )}
                  </>
                ) : (
              <>
                {/* Skills Modal */}
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-xl p-6 w-full max-w-xl mx-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-primary">Agregar Habilidades</h3>
                      <button
                        onClick={handleCancelAddSkill}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                      >
                        ×
                      </button>
                    </div>

                    <div className="mb-4">
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => handleSkillInputChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder={isLoadingSkills ? 'Cargando habilidades...' : 'Buscar habilidad...'}
                        disabled={isLoadingSkills}
                      />
                    </div>

                    <div className="border border-gray-200 rounded-lg max-h-80 overflow-y-auto">
                      {isLoadingSkills ? (
                        <div className="p-4 text-sm text-gray-500">Cargando habilidades...</div>
                      ) : (
                        (() => {
                          const availableSkills = skillsOptions.filter(skill => !skillsData.some(addedSkill => (addedSkill.id && addedSkill.id === skill.id) || addedSkill.name === skill.name))
                          const displayed = (skillInput.trim().length > 0)
                            ? availableSkills.filter(skill => skill.name.toLowerCase().includes(skillInput.toLowerCase()))
                            : availableSkills
                          if (displayed.length === 0) {
                            return <div className="p-4 text-sm text-gray-500">No hay habilidades para mostrar</div>
                          }
                          return (
                            <ul className="divide-y divide-gray-100">
                              {displayed.map((skill) => (
                                <li key={skill.id} className="flex items-center justify-between px-4 py-2">
                                  <span className="text-sm text-gray-800">{skill.name}</span>
                                  <button
                                    onClick={() => handleAddSkillFromList(skill)}
                                    disabled={isSavingSkill}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 disabled:opacity-50"
                                    title="Agregar"
                                  >
                                    +
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )
                        })()
                      )}
                    </div>

                    {error && (
                      <div className="mt-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                        {error}
                      </div>
                    )}

                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        onClick={handleCancelAddSkill}
                        disabled={isSavingSkill}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>
              </>
                )}
              </>
            )}

            {/* Error message */}
            {error && (
              <div className="mt-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Education Form Modal */}
      {showEducationForm && !readOnly && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-primary">Agregar Educación</h3>
              <button
                onClick={() => setShowEducationForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleEducationSubmit} className="space-y-4">
              {/* Grado de Instrucción */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grado de Instrucción *
                </label>
                <select
                  value={educationForm.degree}
                  onChange={(e) => handleEducationFormChange('degree', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Seleccionar grado</option>
                  {degreeOptions.map((degree) => (
                    <option key={degree} value={degree}>
                      {degree}
                    </option>
                  ))}
                </select>
              </div>

              {/* Especialización */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Especialización *
                </label>
                <input
                  type="text"
                  value={educationForm.specialization}
                  onChange={(e) => handleEducationFormChange('specialization', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Ej: Administración de Empresas"
                  required
                />
              </div>

              {/* Nombre de la Institución */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de la Institución *
                </label>
                <input
                  type="text"
                  value={educationForm.institution_name}
                  onChange={(e) => handleEducationFormChange('institution_name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Ej: Universidad Central de Venezuela"
                  required
                />
              </div>

              {/* Fecha de Inicio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Inicio *
                </label>
                <input
                  type="date"
                  value={educationForm.start_date}
                  onChange={(e) => handleEducationFormChange('start_date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              {/* En Curso Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="in_progress"
                  checked={educationForm.in_progress}
                  onChange={(e) => handleInProgressChange(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="in_progress" className="ml-2 text-sm text-gray-700">
                  En curso
                </label>
              </div>

              {/* Fecha de Finalización */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Finalización {!educationForm.in_progress && '*'}
                </label>
                <input
                  type="date"
                  value={educationForm.end_date}
                  onChange={(e) => handleEducationFormChange('end_date', e.target.value)}
                  disabled={educationForm.in_progress}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${educationForm.in_progress ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                  required={!educationForm.in_progress}
                />
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Botones */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEducationForm(false)}
                  disabled={isSavingEducation}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSavingEducation}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSavingEducation ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Guardando...
                    </>
                  ) : (
                    'Guardar'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Experience Form Modal */}
      {showExperienceForm && !readOnly && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-primary">Agregar Experiencia Laboral</h3>
              <button
                onClick={() => setShowExperienceForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleExperienceSubmit} className="space-y-4">
              {/* Cargo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cargo *
                </label>
                <input
                  type="text"
                  value={experienceForm.position}
                  onChange={(e) => handleExperienceFormChange('position', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Ej: Desarrollador Frontend"
                  required
                />
              </div>

              {/* Empresa */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Empresa *
                </label>
                <input
                  type="text"
                  value={experienceForm.company}
                  onChange={(e) => handleExperienceFormChange('company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Ej: Tech Solutions S.A."
                  required
                />
              </div>

              {/* Fecha de Inicio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Inicio *
                </label>
                <input
                  type="date"
                  value={experienceForm.start_date}
                  onChange={(e) => handleExperienceFormChange('start_date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              {/* En Curso Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="experience_in_progress"
                  checked={experienceForm.in_progress}
                  onChange={(e) => handleExperienceInProgressChange(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="experience_in_progress" className="ml-2 text-sm text-gray-700">
                  En curso
                </label>
              </div>

              {/* Fecha de Finalización */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Finalización {!experienceForm.in_progress && '*'}
                </label>
                <input
                  type="date"
                  value={experienceForm.end_date}
                  onChange={(e) => handleExperienceFormChange('end_date', e.target.value)}
                  disabled={experienceForm.in_progress}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${experienceForm.in_progress ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                  required={!experienceForm.in_progress}
                />
              </div>

              {/* Descripción del Cargo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción del Cargo
                </label>
                <textarea
                  value={experienceForm.description}
                  onChange={(e) => handleExperienceFormChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Describe las responsabilidades y logros en este cargo..."
                  rows={4}
                />
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Botones */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowExperienceForm(false)}
                  disabled={isSavingExperience}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSavingExperience}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSavingExperience ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Guardando...
                    </>
                  ) : (
                    'Guardar'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Language Form Modal */}
      {showLanguageForm && !readOnly && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-primary">Agregar Idioma</h3>
              <button
                onClick={() => setShowLanguageForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleLanguageSubmit} className="space-y-4">
              {/* Idioma */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Idioma *
                </label>
                <select
                  value={languageForm.name}
                  onChange={(e) => handleLanguageFormChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Seleccionar idioma</option>
                  {languageOptions.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>

              {/* Nivel de Dominio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nivel de Dominio *
                </label>
                <select
                  value={languageForm.level}
                  onChange={(e) => handleLanguageFormChange('level', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Seleccionar nivel</option>
                  {languageLevels.map((level) => (
                    <option key={level.name} value={level.value}>
                      {level.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Botones */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowLanguageForm(false)}
                  disabled={isSavingLanguage}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSavingLanguage}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSavingLanguage ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Guardando...
                    </>
                  ) : (
                    'Guardar'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && !readOnly && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 w-10 h-10 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                ¿Estás seguro de que quieres eliminar este elemento?
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                {deleteType === 'education'
                  ? 'Esta acción eliminará permanentemente la información de educación seleccionada.'
                  : deleteType === 'experience'
                    ? 'Esta acción eliminará permanentemente la información de experiencia laboral seleccionada.'
                    : deleteType === 'language'
                      ? 'Esta acción eliminará permanentemente la información de idioma seleccionada.'
                      : 'Esta acción eliminará permanentemente la habilidad seleccionada.'
                }
              </p>

              <div className="bg-gray-50 rounded-lg p-3 mb-6">
                <p className="text-sm font-medium text-gray-900">
                  {deleteType === 'education'
                    ? `${itemToDelete?.degree} - ${itemToDelete?.specialization}`
                    : deleteType === 'experience'
                      ? `${itemToDelete?.position || itemToDelete?.job_title} - ${itemToDelete?.company || itemToDelete?.company_name}`
                      : deleteType === 'language'
                        ? `${itemToDelete?.name} - ${getLanguageLevelName(itemToDelete?.level)}`
                        : itemToDelete?.name
                  }
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCancelDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isDeleting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Eliminando...
                    </>
                  ) : (
                    'Eliminar'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full h-fit bg-white CShadow3 relative flex flex-col gap-3 py-5 rounded-xl px-5 lg:px-10">
        <div className="w-full flex gap-2 items-center">
          <Image src="/img/maleta.png" width={40} height={40} alt="birrete" />
          <h2 className="font-[monserrat-black] text-primary text-2xl">
            Experiencia Laboral
          </h2>
        </div>
        <div className="px-5 sm:pl-12">
          {experienceData && experienceData.length > 0 ? (
            <>
              {experienceData.map((experience, index) => (
                <div key={index} className="mb-4 relative group">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-bold">
                        {experience.position || experience.job_title || 'Cargo no especificado'}
                      </p>
                      <p className="text-sm text-gray-600 font-bold">
                        {experience.company || experience.company_name || 'Empresa no especificada'}
                      </p>
                      <p className="text-sm font-bold mb-2">

                        {`${experience.start_date || "Período no especificado"} - ${experience.end_date ? experience.end_date : 'En curso'}`}


                      </p>
                      {experience.description && (
                        <p className="text-sm text-gray-700">
                          {experience.description}
                        </p>
                      )}
                      {experience.responsibilities && (
                        <p className="text-sm text-gray-700 mt-2">
                          <span className="font-semibold">Responsabilidades:</span> {experience.responsibilities}
                        </p>
                      )}
                    </div>
                    {!readOnly && (
                      <button
                        onClick={() => handleDeleteClick(experience, 'experience')}
                        className="ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                        title="Eliminar experiencia"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
                ))}
              {!readOnly && (
                <button
                  onClick={() => {
                    setShowExperienceForm(true)
                    setError(null)
                  }}
                  className="mt-3 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  + Agregar Experiencia Laboral
                </button>
              )}
            </>
          ) : (
            <div className="text-center py-6">
              <div className="text-gray-500 italic mb-4">
                No tienes información de experiencia laboral registrada
              </div>
              {!readOnly && (
                <button
                  onClick={() => {
                    setShowExperienceForm(true)
                    setError(null)
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  + Agregar Experiencia Laboral
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
