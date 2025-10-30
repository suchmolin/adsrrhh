"use client"

import { useState, useEffect, useRef } from "react"
import JobOfferCard from "@/components/shared/JobOfferCard/page"
import getAllJobOffers from "@/functions/get/getAllJobOffers"

export default function JobOffersPool({ filters = {}, onResetFilters }) {
    const [jobOffers, setJobOffers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [groupedOffers, setGroupedOffers] = useState({})
    const [isDebouncing, setIsDebouncing] = useState(false)
    const debounceTimeoutRef = useRef(null)

    // Group job offers by category/sector
    const groupOffersByCategory = (offers) => {
        const groups = {}

        offers.forEach(offer => {
            // Determine category based on job title or skills
            let category = 'General'

            if (offer.name) {
                const title = offer.name.toLowerCase()
                if (title.includes('profesor') || title.includes('teacher') || title.includes('educación') || title.includes('enseñanza')) {
                    category = 'Educación'
                } else if (title.includes('vendedor') || title.includes('cajero') || title.includes('atención') || title.includes('cliente')) {
                    category = 'Atención al Cliente'
                } else if (title.includes('diseñador') || title.includes('designer') || title.includes('ux') || title.includes('ui')) {
                    category = 'Diseño'
                } else if (title.includes('programador') || title.includes('developer') || title.includes('desarrollador')) {
                    category = 'Tecnología'
                } else if (title.includes('contador') || title.includes('finanzas') || title.includes('administrativo')) {
                    category = 'Administración'
                }
            }

            if (!groups[category]) {
                groups[category] = []
            }
            groups[category].push(offer)
        })

        return groups
    }

    const fetchJobOffers = async () => {
        try {
            setLoading(true)
            setError(null)

            const data = await getAllJobOffers(filters)

            // Handle different response formats
            let offers = []
            if (data.job_offers && Array.isArray(data.job_offers)) {
                offers = data.job_offers
            } else if (Array.isArray(data)) {
                offers = data
            } else if (data.data && Array.isArray(data.data)) {
                offers = data.data
            }

            setJobOffers(offers)
            setGroupedOffers(groupOffersByCategory(offers))
        } catch (err) {
            setError(err.message)
            setJobOffers([])
            setGroupedOffers({})
        } finally {
            setLoading(false)
        }
    }

    // Debounced effect for filters
    useEffect(() => {
        // Clear previous timeout
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current)
        }

        // Set debouncing state
        setIsDebouncing(true)

        // Set new timeout
        debounceTimeoutRef.current = setTimeout(() => {
            setIsDebouncing(false)
            fetchJobOffers()
        }, 2000) // 2 seconds delay

        // Cleanup function
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current)
            }
        }
    }, [filters])

    // Initial load without debounce
    useEffect(() => {
        fetchJobOffers()
    }, []) // Empty dependency array for initial load only

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
            </div>
        )
    }

    // Show debouncing indicator
    if (isDebouncing && !loading) {
        return (
            <div className="flex flex-col justify-center items-center h-64 space-y-4">
                <div className="flex items-center space-x-2 text-gray-600">
                    <div className="animate-pulse w-2 h-2 bg-blue-900 rounded-full"></div>
                    <div className="animate-pulse w-2 h-2 bg-blue-900 rounded-full" style={{ animationDelay: '0.2s' }}></div>
                    <div className="animate-pulse w-2 h-2 bg-blue-900 rounded-full" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <p className="text-gray-500 text-sm">Buscando ofertas...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center text-red-600 py-8">
                <p>Error al cargar las ofertas laborales: {error}</p>
                <button
                    onClick={fetchJobOffers}
                    className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
                >
                    Reintentar
                </button>
            </div>
        )
    }

    if (jobOffers.length === 0) {
        return (
            <div className="text-center text-gray-600 py-8">
                <div className="mb-6">
                    <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No se encontraron ofertas laborales</h3>
                    <p className="text-gray-500 mb-6">Intenta ajustar los filtros de búsqueda para encontrar más resultados</p>
                </div>

                {onResetFilters && (
                    <button
                        onClick={onResetFilters}
                        className="inline-flex items-center px-4 py-2 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Reiniciar Filtros
                    </button>
                )}
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {Object.entries(groupedOffers).map(([category, offers]) => (
                <div key={category} className="space-y-4">
                    {/* Category Header */}
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-gray-900">{category}</h3>
                        <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Job Offers Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
                        {offers.slice(0, 6).map((offer, index) => (
                            <JobOfferCard
                                key={offer.id || index}
                                offer={offer}
                                companyData={offer.company_data || {}}
                            />
                        ))}
                    </div>

                    {/* Show more button if there are more offers */}
                    {offers.length > 6 && (
                        <div className="text-center">
                            <button className="text-blue-900 font-semibold hover:underline">
                                Ver más ofertas de {category}
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
