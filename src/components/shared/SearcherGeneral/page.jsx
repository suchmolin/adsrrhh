"use client"

import { FaSearch } from "react-icons/fa"
import SelectEstados from "../SelectEstados/page"
import Link from "next/link"
import { PiSuitcaseSimpleBold } from "react-icons/pi"
import { GrLocation } from "react-icons/gr"
import { useState, useEffect } from "react"

export default function SearcherGeneral({ bgSearcher = "bg-grisads", initialFilters = {} }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [isClient, setIsClient] = useState(false)

  // Actualizar valores cuando cambien los filtros iniciales
  useEffect(() => {
    setIsClient(true)
    setSearchTerm(initialFilters.name || "")
    setSelectedCity(initialFilters.ubication || "")
  }, [initialFilters])

  const handleSearch = () => {
    // Construir parámetros de URL
    const params = new URLSearchParams()

    if (searchTerm.trim()) {
      params.append('name', searchTerm.trim())
    }

    if (selectedCity.trim()) {
      params.append('ubication', selectedCity.trim())
    }

    // Redirigir a /jobOffers con los parámetros
    const queryString = params.toString()
    const url = queryString ? `/jobOffers?${queryString}` : '/jobOffers'
    window.location.assign(url)
  }

  return (
    <div className={"absolute bottom-7 md:bottom-20 w-11/12 md:h-[100px] rounded-xl flex gap-4 items-center px-10 py-5 sm:py-10 flex-col md:flex-row " + bgSearcher}>
      <div className="w-full md:w-6/12 flex flex-col justify-center-center">
        <label
          className={`${bgSearcher === "bg-primary" ? "text-white" : "text-primary"} font-[monserrat-bold] flex gap-1 items-center mb-3`}
          htmlFor="search"
        >
          <PiSuitcaseSimpleBold /> Buscar ofertas de:
        </label>
        <div className="flex w-full">
          <input
            id="search"
            className="w-full rounded-md text-gray-600 ring-0 border outline-none focus:ring-primary focus:ring-1 placeholder:text-gray-400 pr-10 border-gray-300"
            type="text"
            placeholder="Puesto, oferta o palabra clave"
            value={isClient ? searchTerm : ""}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
      </div>
      <div className="w-full md:w-4/12  flex flex-col">
        <span className={`${bgSearcher === "bg-primary" ? "text-white" : "text-primary"} font-[monserrat-bold] flex gap-1 items-center mb-3`}>
          <GrLocation />
          Ciudad:
        </span>
        <SelectEstados onCityChange={setSelectedCity} />
      </div>
      <div className="w-full md:w-2/12 flex items-end mt-8">
        <button
          onClick={handleSearch}
          className="w-full rounded-lg bg-secondary text-white font-[monserrat-bold] py-2 text-center hover:bg-secondary/90 transition-colors"
        >
          Buscar
        </button>
      </div>
    </div>
  )
}