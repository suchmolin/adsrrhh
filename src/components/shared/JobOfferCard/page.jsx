"use client"

import Image from "next/image"
import { useState } from "react"
import JobOfferModal from "../JobOfferModal/page"

export default function JobOfferCard({ offer, companyData, onEdit, onDelete, showEditButtons = false }) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    if (!companyData) {
        companyData = { image_1920: offer.company_image }
    } else if (!companyData.image_1920 && offer.company_image) {
        companyData.image_1920 = offer.company_image
    }

    // Strip HTML tags and truncate description
    const truncateDescription = (html, maxLength = 140) => {
        if (!html) return ''
        // Remove HTML tags
        const text = html.replace(/<[^>]*>/g, '').trim()
        if (text.length <= maxLength) return text
        return text.substring(0, maxLength) + '...'
    }

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
        if (!level) return null
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
        if (!type) return null
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

    return (
        <div className="bg-white rounded-lg p-5 shadow-md flex flex-col h-full">
            {/* Header Section */}
            <div className="flex items-start gap-4 mb-3">
                {/* Company Logo */}
                <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden relative">
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
                            <div className="text-primary font-bold text-xs text-center p-2">
                                {(companyData?.name || offer.company_name)?.substring(0, 3).toUpperCase() || 'EMP'}
                            </div>
                        )}
                    </div>
                </div>

                {/* Job Title and Company Info */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-blue-900 mb-1">
                        {offer.name || offer.job_title || 'Título no especificado'}
                    </h3>
                    <div className="flex flex-col gap-1">
                        <p className="text-sm text-gray-600">
                            {offer.company_name || 'Empresa'}
                        </p>
                        <p className="text-xs text-gray-500">
                            • {calculateDaysActive(offer.create_date)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Offer Details */}
            <div className="mb-3">
                <div className="text-base text-gray-600 mb-1">
                    Ingreso: {offer.salary || offer.income || 'No especificado'}
                </div>
                {offer.applications_count && (
                    <div className="text-sm text-gray-600 mb-2">
                        {offer.applications_count} Solicitudes
                    </div>
                )}
                {offer.has_applied && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-md border border-green-200 mb-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Ya has aplicado a esta oferta
                    </div>
                )}
            </div>

            {/* Modality and Location */}
            <div className="flex flex-wrap items-center gap-4 mb-3">
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-gray-700">
                        {formatModality(offer.modality)}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm text-gray-700">
                        {offer.ubication || 'Ciudad no especificada'}
                    </span>
                </div>
                {(formatJobType(offer.job_type || offer.type_of_workday)) && (
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-gray-700">
                            {formatJobType(offer.job_type || offer.type_of_workday)}
                        </span>
                    </div>
                )}
                {(formatExperienceLevel(offer.experience_level || offer.experience)) && (
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        <span className="text-sm text-gray-700">
                            {formatExperienceLevel(offer.experience_level || offer.experience)}
                        </span>
                    </div>
                )}
            </div>

            {/* Description */}
            <div className="mb-3">
                <p className="text-sm text-gray-700">
                    {truncateDescription(offer.description)}
                </p>
            </div>

            {/* Skills */}
            {offer.skill_ids && offer.skill_ids.length > 0 && (
                <div className="mb-3">
                    <div className="flex flex-wrap gap-2">
                        {offer.skill_ids.slice(0, 4).map((skill, index) => (
                            <span
                                key={skill.id || index}
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-md border border-blue-200"
                            >
                                {skill.name}
                            </span>
                        ))}
                        {offer.skill_ids.length > 4 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                                +{offer.skill_ids.length - 4} más
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Ver más link */}
            <div className="flex justify-end mt-auto pt-3">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-blue-900 text-sm font-bold italic hover:underline"
                >
                    Ver más
                </button>
            </div>

            {/* Modal */}
            <JobOfferModal
                offer={offer}
                companyData={companyData}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onEdit={onEdit}
                onDelete={onDelete}
                showEditButtons={showEditButtons}
            />
        </div>
    )
}

