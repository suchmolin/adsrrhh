"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function CandidatesModal({ isOpen, onClose, candidates = [] }) {
    const router = useRouter()

    // Debug: Log when modal state changes
    useEffect(() => {
        console.log('CandidatesModal - isOpen:', isOpen, 'candidates:', candidates.length)
    }, [isOpen, candidates.length])

    if (!isOpen) {
        console.log('CandidatesModal - Not rendering because isOpen is false')
        return null
    }

    console.log('CandidatesModal - Rendering modal')

    // Format gender
    const formatGender = (gender) => {
        if (!gender) return 'No especificado'
        const genderMap = {
            'M': 'Masculino',
            'F': 'Femenino',
            'male': 'Masculino',
            'female': 'Femenino'
        }
        return genderMap[gender?.toUpperCase()] || gender || 'No especificado'
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

    // Get candidate ID - handle different possible field names
    const getCandidateId = (candidate) => {
        return candidate.job_seeker_id || candidate.id || candidate.user_id || candidate.applicant_id || candidate.candidate_id || null
    }

    // Get candidate name
    const getCandidateName = (candidate) => {
        return candidate.candidate_name || 'Nombre no disponible'
    }

    // Get candidate email
    const getCandidateEmail = (candidate) => {
        return candidate.email_from || 'Email no disponible'
    }

    // Get expected salary
    const getExpectedSalary = (candidate) => {
        return candidate.salary_expected || null
    }

    const handleViewProfile = (candidate) => {
        const candidateId = getCandidateId(candidate)
        if (candidateId) {
            window.open(`/empresa/candidato/${candidateId}`, '_blank')
            onClose()
        }
    }

    return (
        <div className="fixed inset-0 z-[60] overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Candidatos que han aplicado
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
                    <div className="p-6">
                        {candidates.length === 0 ? (
                            <div className="text-center py-10 text-gray-500">
                                <p>No hay candidatos que hayan aplicado a esta oferta</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {candidates.map((candidate, index) => {
                                    const candidateId = getCandidateId(candidate)
                                    const candidateName = getCandidateName(candidate)
                                    const candidateEmail = getCandidateEmail(candidate)
                                    const candidateGender = formatGender(candidate.gender)
                                    const expectedSalary = getExpectedSalary(candidate)

                                    return (
                                        <div
                                            key={candidateId || index}
                                            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1 space-y-2">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 text-lg">
                                                            {candidateName}
                                                        </h3>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                                                        <div className="flex items-center gap-2">
                                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                            </svg>
                                                            <span>{candidateEmail}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                            <span>{candidateGender}</span>
                                                        </div>
                                                        {expectedSalary && (
                                                            <div className="flex items-center gap-2">
                                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                                </svg>
                                                                <span className="font-medium">{formatSalary(expectedSalary)}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                {candidateId && (
                                                    <button
                                                        onClick={() => handleViewProfile(candidate)}
                                                        className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm font-semibold whitespace-nowrap"
                                                    >
                                                        Ver Perfil
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

