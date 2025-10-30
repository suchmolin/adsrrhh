"use client"

import { useState, useEffect } from "react"
import FilterSearch from "@/components/home/FilterSearch/page"
import JobOffersPool from "@/components/home/JobOffersPool/page"

export default function JobOffersSection({ initialFilters = {} }) {
    const [filters, setFilters] = useState(initialFilters)

    // Actualizar filtros cuando cambien los filtros iniciales
    useEffect(() => {
        setFilters(initialFilters)
    }, [initialFilters])

    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters)
    }

    const handleResetFilters = () => {
        const resetFilters = {
            ubication: '',
            salaryMin: '',
            salaryMax: '',
            modality: '',
            workType: '',
            experience: '',
            name: ''
        }
        setFilters(resetFilters)
    }

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filter Panel */}
                    <div className="lg:col-span-1">
                        <div className="lg:sticky lg:top-4 lg:self-start">
                            <FilterSearch
                                onFiltersChange={handleFiltersChange}
                                initialFilters={filters}
                            />
                        </div>
                    </div>

                    {/* Job Offers Pool */}
                    <div className="lg:col-span-3">
                        <JobOffersPool filters={filters} onResetFilters={handleResetFilters} />
                    </div>
                </div>
            </div>
        </section>
    )
}
