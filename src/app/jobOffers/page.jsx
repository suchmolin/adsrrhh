"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import HeaderHome from "@/components/home/HeaderHome/page";
import FooterHome from "@/components/shared/FooterHome/page";
import NavbarHome from "@/components/shared/NavbarHome/page";

// Importar JobOffersSection dinámicamente sin SSR
const JobOffersSection = dynamic(
    () => import("@/components/home/JobOffersSection/page"),
    {
        ssr: false,
        loading: () => (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
            </div>
        )
    }
)

export default function JobOffersPage() {
    const searchParams = useSearchParams()
    const [initialFilters, setInitialFilters] = useState({})
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)

        // Leer parámetros de URL
        const nameParam = searchParams.get('name')
        const ubicationParam = searchParams.get('ubication')

        // Construir filtros iniciales basados en parámetros de URL
        const filters = {}
        if (nameParam) {
            filters.name = nameParam
        }
        if (ubicationParam) {
            filters.ubication = ubicationParam
        }

        setInitialFilters(filters)
    }, [searchParams])

    return (
        <>
            <NavbarHome />
            <HeaderHome imgHeader="/img/headerHome3.png" bgSearcher="bg-primary" initialFilters={initialFilters} />

            {/* Indicador de filtros aplicados */}
            {isClient && (initialFilters.name || initialFilters.ubication) && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mx-4 mt-4 rounded">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-blue-700">
                                <strong>Filtros aplicados:</strong>
                                {initialFilters.name && ` "${initialFilters.name}"`}
                                {initialFilters.name && initialFilters.ubication && ' en '}
                                {initialFilters.ubication && ` ${initialFilters.ubication}`}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <JobOffersSection initialFilters={initialFilters} />
            <FooterHome />
        </>
    )
}