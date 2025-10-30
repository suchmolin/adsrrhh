import { useState, useEffect } from "react"
import Image from "next/image"
import getSkills from "@/functions/get/getSkills"

export default function ModalCreateJobOffer({ isOpen, onClose, onCreateSuccess, companyId, existingOffer = null }) {
    const isEditMode = !!existingOffer

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        salary: '',
        modality: 'onsite',
        city: '',
        job_type: '',
        experience_level: '',
        skill_ids: []
    })
    const [skills, setSkills] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (isOpen) {
            fetchSkills()
            // If editing, load existing offer data
            if (existingOffer) {
                // Parse skill_ids - could be array or comma-separated string
                let skillIds = []
                if (existingOffer.skill_ids) {
                    if (Array.isArray(existingOffer.skill_ids)) {
                        skillIds = existingOffer.skill_ids.map(skill =>
                            typeof skill === 'object' ? skill.id : skill
                        )
                    } else if (typeof existingOffer.skill_ids === 'string') {
                        skillIds = existingOffer.skill_ids.split(',').filter(id => id.trim() !== '').map(id => parseInt(id))
                    }
                }

                // Use _key fields first, then fallback to other field names
                // Modality: modality_key > modality (with normalization)
                let modalityValue = existingOffer.modality_key || existingOffer.modality || 'onsite'
                if (!existingOffer.modality_key) {
                    // Only normalize if not using _key field
                    if (modalityValue === 'presencial' || modalityValue === 'on-site') {
                        modalityValue = 'onsite'
                    } else if (modalityValue === 'remoto' || modalityValue === 'remote') {
                        modalityValue = 'online'
                    } else if (modalityValue === 'hibrido' || modalityValue === 'hybrid') {
                        modalityValue = 'hybrid'
                    }
                }

                // Job type: type_of_workday_key > job_type > type_of_workday
                const jobTypeValue = existingOffer.type_of_workday_key || existingOffer.job_type || existingOffer.type_of_workday || ''

                // Experience: experience_key > experience_level > experience
                const experienceValue = existingOffer.experience_key || existingOffer.experience_level || existingOffer.experience || ''

                setFormData({
                    name: existingOffer.name || '',
                    description: existingOffer.description || '',
                    salary: existingOffer.salary ? String(existingOffer.salary) : '',
                    modality: modalityValue,
                    city: existingOffer.ubication || '',
                    job_type: jobTypeValue,
                    experience_level: experienceValue,
                    skill_ids: skillIds
                })
            } else {
                // Reset form for new offer
                setFormData({
                    name: '',
                    description: '',
                    salary: '',
                    modality: 'onsite',
                    city: '',
                    job_type: '',
                    experience_level: '',
                    skill_ids: []
                })
            }
        }
    }, [isOpen, existingOffer])

    const fetchSkills = async () => {
        try {
            const skillsData = await getSkills()
            // Handle different response formats
            const skillsArray = Array.isArray(skillsData)
                ? skillsData
                : (skillsData.skills || [])

            setSkills(skillsArray)

        } catch (err) {

        }
    }

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSkillToggle = (skillId) => {
        setFormData(prev => ({
            ...prev,
            skill_ids: prev.skill_ids.includes(skillId)
                ? prev.skill_ids.filter(id => id !== skillId)
                : [...prev.skill_ids, skillId]
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            // Prepare the data in the correct format
            const dataToSend = {
                name: formData.name,
                description: formData.description,
                salary: parseFloat(formData.salary) || 0,
                modality: formData.modality,
                ubication: formData.city,
                type_of_workday: formData.job_type,
                experience: formData.experience_level,
                skill_ids: formData.skill_ids.join(',')
            }

            // Determine the API endpoint and method based on edit mode
            const offerId = isEditMode ? existingOffer.id : companyId
            const method = isEditMode ? 'PUT' : 'POST'
            const url = `/api/jobOffers?id=${offerId}`

            // Call the API endpoint
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend)
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || (isEditMode ? 'Error al actualizar la oferta laboral' : 'Error al crear la oferta laboral'))
            }

            // Reset form
            setFormData({
                name: '',
                description: '',
                salary: '',
                modality: 'onsite',
                city: '',
                job_type: '',
                experience_level: '',
                skill_ids: []
            })

            onClose()
            if (onCreateSuccess) {
                onCreateSuccess()
            }
        } catch (err) {
            setError(err.message || (isEditMode ? 'Error al actualizar la oferta laboral' : 'Error al crear la oferta laboral'))
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        setFormData({
            name: '',
            description: '',
            salary: '',
            modality: 'presencial',
            city: '',
            job_type: '',
            experience_level: '',
            skill_ids: []
        })
        setError(null)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-11/12 md:w-3/4 lg:w-2/3 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-2xl font-bold text-primary">
                        {isEditMode ? 'Editar Oferta Laboral' : 'Nueva Oferta Laboral'}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-4">
                        {/* Nombre/Título */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Título de la Oferta *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Ej: Desarrollador Full Stack"
                                required
                            />
                        </div>

                        {/* Descripción */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Descripción *
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                rows="4"
                                placeholder="Describe el puesto, requisitos, responsabilidades..."
                                required
                            />
                        </div>

                        {/* Salario y Modalidad */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Salario *
                                </label>
                                <input
                                    type="text"
                                    value={formData.salary}
                                    onChange={(e) => handleInputChange('salary', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Ej: 500-800 USD"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Modalidad *
                                </label>
                                <select
                                    value={formData.modality}
                                    onChange={(e) => handleInputChange('modality', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                >
                                    <option value="onsite">Presencial</option>
                                    <option value="online">Remoto</option>
                                    <option value="hybrid">Híbrido</option>
                                </select>
                            </div>
                        </div>

                        {/* Ciudad */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Ciudad *
                            </label>
                            <input
                                type="text"
                                value={formData.city}
                                onChange={(e) => handleInputChange('city', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Ej: Caracas"
                                required
                            />
                        </div>

                        {/* Tipo de Trabajo y Nivel de Experiencia */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Tipo de Trabajo
                                </label>
                                <select
                                    value={formData.job_type}
                                    onChange={(e) => handleInputChange('job_type', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="">Sin especificar</option>
                                    <option value="full_time">Tiempo completo</option>
                                    <option value="half_time">Medio tiempo</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Nivel de Experiencia
                                </label>
                                <select
                                    value={formData.experience_level}
                                    onChange={(e) => handleInputChange('experience_level', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="">Sin especificar</option>
                                    <option value="trainee">Aprendiz</option>
                                    <option value="junior">Junior</option>
                                    <option value="semi_senior">Semi Senior</option>
                                    <option value="senior">Senior</option>
                                </select>
                            </div>
                        </div>

                        {/* Skills */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Habilidades Requeridas
                            </label>
                            <div className="border border-gray-300 rounded-md p-3 max-h-48 overflow-y-auto">
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill) => (
                                        <button
                                            key={skill.id}
                                            type="button"
                                            onClick={() => handleSkillToggle(skill.id)}
                                            className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${formData.skill_ids.includes(skill.id)
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {skill.name}
                                        </button>
                                    ))}
                                </div>
                                {skills.length === 0 && (
                                    <p className="text-sm text-gray-500">Cargando habilidades...</p>
                                )}
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    {isEditMode ? 'Guardando...' : 'Creando...'}
                                </>
                            ) : (
                                isEditMode ? 'Guardar Cambios' : 'Crear Oferta'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

