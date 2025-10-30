"use client"

import { useState } from "react"
import Image from "next/image"
import ConfirmationModal from "../ConfirmationModal/page"

export default function JobOfferModal({ offer, companyData, isOpen, onClose, onEdit, onDelete, showEditButtons = false }) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    if (!isOpen || !offer) return null

    // Format modality text
    const formatModality = (modality) => {
        const modalityMap = {
            'presencial': 'Presencial',
            'remoto': 'Remoto',
            'hibrido': 'Híbrido',
            'remote': 'Remoto',
            'on-site': 'Presencial',
            'hybrid': 'Híbrido'
        }
        return modalityMap[modality?.toLowerCase()] || modality || 'No especificado'
    }

    // Format experience level
    const formatExperienceLevel = (level) => {
        if (!level) return 'Sin especificar'
        const experienceMap = {
            'trainee': 'Aprendiz',
            'junior': 'Junior',
            'semi_senior': 'Semi Senior',
            'senior': 'Senior'
        }
        return experienceMap[level?.toLowerCase()] || level
    }

    // Format job type
    const formatJobType = (type) => {
        if (!type) return 'Sin especificar'
        const jobTypeMap = {
            'full_time': 'Tiempo completo',
            'half_time': 'Medio tiempo'
        }
        return jobTypeMap[type?.toLowerCase()] || type
    }

    // Calculate days since posting
    const calculateDaysActive = (date) => {
        if (!date) return '0 días activa'
        const postDate = new Date(date)
        const today = new Date()
        const diffTime = Math.abs(today - postDate)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return `${diffDays} ${diffDays === 1 ? 'día' : 'días'} activa`
    }

    // Format salary
    const formatSalary = (salary) => {
        if (!salary) return 'No especificado'
        return new Intl.NumberFormat('es-VE', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(salary)
    }

    // Sanitize HTML - basic cleanup for safe rendering
    const sanitizeHtml = (html) => {
        if (!html) return ''
        // Remove potentially dangerous tags/attributes but keep basic formatting
        return html
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
            .replace(/on\w+="[^"]*"/gi, '') // Remove event handlers
            .replace(/on\w+='[^']*'/gi, '') // Remove event handlers (single quotes)
            .trim()
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Detalles de la Oferta
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Company and Job Info */}
                        <div className="flex items-start gap-4">
                            {/* Company Logo */}
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden relative">
                                    {(companyData?.image_1920 || offer.company_logo) ? (
                                        <Image
                                            src={companyData?.image_1920
                                                ? `data:image/jpeg;base64,${companyData.image_1920}`
                                                : `data:image/jpeg;base64,${offer.company_logo || offer.company_image}`}
                                            alt={companyData?.name || offer.company_name || 'Logo'}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div className="text-primary font-bold text-lg text-center p-2">
                                            {(companyData?.name || offer.company_name)?.substring(0, 3).toUpperCase() || 'EMP'}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Job Details */}
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-blue-900 mb-2">
                                    {offer.name || offer.job_title || 'Título no especificado'}
                                </h3>
                                <p className="text-lg text-gray-600 mb-2">
                                    {offer.company_name || 'Empresa'}
                                </p>
                                <p className="text-sm text-gray-500">
                                    • {calculateDaysActive(offer.create_date)}
                                </p>
                            </div>
                        </div>

                        {/* Key Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Salary */}
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                    <span className="font-semibold text-blue-900">Salario</span>
                                </div>
                                <p className="text-lg font-bold text-blue-800">
                                    {formatSalary(offer.salary)}
                                </p>
                            </div>

                            {/* Modality */}
                            <div className="bg-green-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="font-semibold text-green-900">Modalidad</span>
                                </div>
                                <p className="text-lg font-bold text-green-800">
                                    {formatModality(offer.modality)}
                                </p>
                            </div>

                            {/* Location */}
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="font-semibold text-purple-900">Ubicación</span>
                                </div>
                                <p className="text-lg font-bold text-purple-800">
                                    {offer.ubication || 'No especificada'}
                                </p>
                            </div>

                            {/* Job Type */}
                            <div className="bg-orange-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="font-semibold text-orange-900">Tipo de Jornada</span>
                                </div>
                                <p className="text-lg font-bold text-orange-800">
                                    {formatJobType(offer.job_type || offer.type_of_workday)}
                                </p>
                            </div>

                            {/* Experience Level */}
                            <div className="bg-indigo-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                    <span className="font-semibold text-indigo-900">Nivel de Experiencia</span>
                                </div>
                                <p className="text-lg font-bold text-indigo-800">
                                    {formatExperienceLevel(offer.experience_level || offer.experience)}
                                </p>
                            </div>
                        </div>

                        {/* Skills */}
                        {offer.skill_ids && offer.skill_ids.length > 0 && (
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-3">Habilidades Requeridas</h4>
                                <div className="flex flex-wrap gap-2">
                                    {offer.skill_ids.map((skill, index) => (
                                        <span
                                            key={skill.id || index}
                                            className="px-3 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-lg border border-blue-200"
                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        {offer.description && (
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-3">Descripción del Puesto</h4>
                                <div
                                    className="prose max-w-none text-gray-700 leading-relaxed [&_p]:mb-3 [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:mb-1 [&_strong]:font-semibold [&_em]:italic [&_a]:text-blue-600 [&_a]:underline"
                                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(offer.description) }}
                                />
                            </div>
                        )}

                        {/* Additional Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {offer.applications_count && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h5 className="font-semibold text-gray-900 mb-1">Solicitudes</h5>
                                    <p className="text-gray-700">{offer.applications_count} personas han aplicado</p>
                                </div>
                            )}

                            {offer.create_date && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h5 className="font-semibold text-gray-900 mb-1">Fecha de Publicación</h5>
                                    <p className="text-gray-700">
                                        {new Date(offer.create_date).toLocaleDateString('es-VE', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cerrar
                        </button>

                        {showEditButtons ? (
                            <>
                                <button
                                    onClick={() => {
                                        onEdit && onEdit(offer)
                                        onClose()
                                    }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                                >
                                    <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Editar
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                                >
                                    <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Eliminar
                                </button>
                            </>
                        ) : (
                            <button className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold">
                                Aplicar Ahora
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={() => {
                    onDelete && onDelete(offer)
                    onClose()
                }}
                title="Eliminar Oferta Laboral"
                message="¿Estás seguro de que quieres eliminar esta oferta laboral? Esta acción no se puede deshacer."
                confirmText="Eliminar"
                cancelText="Cancelar"
                type="danger"
            />
        </div>
    )
}
