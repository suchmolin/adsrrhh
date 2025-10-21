"use client"

import Image from "next/image"
import Link from "next/link"
import { FaBuilding, FaSignOutAlt } from "react-icons/fa"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { deleteCookie } from "@/utils/cookies"

export default function NavbarPerfilEmpresa() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)
    const router = useRouter()

    // Cerrar dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleLogout = () => {
        // Eliminar cookie de sesión
        deleteCookie('empresa_session')
        // Redirigir al login
        router.push('/empresa/login')
    }

    return (
        <div className="w-full px-10 py-1 flex justify-between bg-grisads relative" suppressHydrationWarning>
            {/* Logo a la izquierda */}
            <Link className="relative w-[120px] aspect-video" href="/" suppressHydrationWarning>
                <Image
                    src="/img/logoadsrrhh2.png"
                    fill
                    style={{ objectFit: "contain" }}
                    alt="Ads Recursos Humanos Logo"
                    suppressHydrationWarning
                />
            </Link>

            {/* Botones a la derecha: Buscar Talento y Perfil */}
            <div className="flex items-center gap-4">
                <Link
                    href="/"
                    className="hover:scale-105 duration-300 px-4 py-2 bg-secondary text-white rounded-md"
                    suppressHydrationWarning
                >
                    Buscar Talento
                </Link>

                {/* Botón de perfil con dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 px-3 py-2 text-primary hover:bg-gray-100 rounded-md transition-colors duration-200"
                        suppressHydrationWarning
                    >
                        <FaBuilding className="text-lg" />
                    </button>

                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                        <div className="fixed right-4 mt-2 w-48 bg-white rounded-md shadow-2xl border border-gray-200 z-[99999] backdrop-blur-sm" style={{ top: '60px' }} suppressHydrationWarning>
                            <div className="py-1">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                    suppressHydrationWarning
                                >
                                    <FaSignOutAlt className="text-red-500" />
                                    Cerrar Sesión
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
