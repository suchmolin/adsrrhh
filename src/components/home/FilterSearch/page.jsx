"use client"

import { useState, useEffect } from "react"

export default function FilterSearch({ onFiltersChange, initialFilters = {} }) {
    const [filters, setFilters] = useState({
        ubication: '',
        salaryMin: '',
        salaryMax: '',
        modality: '',
        workType: '',
        experience: '',
        name: ''
    })

    // Aplicar filtros iniciales cuando el componente se monta o cambian
    useEffect(() => {
        setFilters(prevFilters => ({
            ...prevFilters,
            ...initialFilters
        }))
    }, [initialFilters])

    const handleInputChange = (field, value) => {
        const newFilters = {
            ...filters,
            [field]: value
        }
        setFilters(newFilters)
        if (onFiltersChange) {
            onFiltersChange(newFilters)
        }
    }

    return (
        <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h2 className="text-xl font-bold text-blue-900">Filtrar Búsqueda</h2>
            </div>

            {/* Filter Fields */}
            <div className="space-y-4">
                {/* Nombre/Puesto */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre/Puesto
                    </label>
                    <input
                        type="text"
                        placeholder="Ej. Desarrollador"
                        value={filters.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Ubicación */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Ubicación
                    </label>
                    <input
                        type="text"
                        placeholder="Ej. Barquisimeto"
                        value={filters.ubication}
                        onChange={(e) => handleInputChange('ubication', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Rango Salarial */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Rango Salarial
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="Min"
                            value={filters.salaryMin}
                            onChange={(e) => handleInputChange('salaryMin', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-5/12"
                        />
                        <input
                            type="number"
                            placeholder="Max"
                            value={filters.salaryMax}
                            onChange={(e) => handleInputChange('salaryMax', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-5/12"
                        />
                    </div>
                </div>

                {/* Modalidad */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Modalidad
                    </label>
                    <select
                        value={filters.modality}
                        onChange={(e) => handleInputChange('modality', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Seleccionar modalidad</option>
                        <option value="onsite">Presencial</option>
                        <option value="online">Remoto</option>
                        <option value="hybrid">Híbrido</option>
                    </select>
                </div>

                {/* Tipo de Jornada */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tipo de Jornada
                    </label>
                    <select
                        value={filters.workType}
                        onChange={(e) => handleInputChange('workType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Sin especificar</option>
                        <option value="full_time">Tiempo completo</option>
                        <option value="half_time">Medio tiempo</option>
                    </select>
                </div>

                {/* Experiencia Laboral */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Experiencia Laboral
                    </label>
                    <select
                        value={filters.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Sin especificar</option>
                        <option value="trainee">Aprendiz</option>
                        <option value="junior">Junior</option>
                        <option value="semi_senior">Semi Senior</option>
                        <option value="senior">Senior</option>
                    </select>
                </div>
            </div>
        </div>
    )
}
