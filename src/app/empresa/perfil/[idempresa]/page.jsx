"use client"

import CardPerfilEmpresa from "@/components/empresa/CardPerfilEmpresa/page"
import NavbarPerfilEmpresa from "@/components/empresa/NavbarPerfilEmpresa/page"
import JobOfferCard from "@/components/shared/JobOfferCard/page"
import ModalCreateJobOffer from "@/components/empresa/ModalCreateJobOffer/page"
import NotificationModal from "@/components/shared/NotificationModal/page"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, use } from "react"
import getCompany from "@/functions/get/getCompany"
import getJobOffers from "@/functions/get/getJobOffers"
import dynamic from "next/dynamic"
import NoSSR from "@/components/shared/NoSSR"
import { useRouter } from "next/navigation"
import { hasValidEmpresaSession, getUserIdFromToken, getSessionToken } from "@/utils/cookies"

// Create a client-only wrapper to prevent hydration issues
const ClientOnly = ({ children, fallback = null }) => {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, [])

    if (!hasMounted) {
        return fallback
    }

    return children
}


export default function PerfilEmpresa({ params }) {
    const [idempresa, setIdempresa] = useState(null)
    const [companyData, setCompanyData] = useState(null)
    const [jobOffers, setJobOffers] = useState([])
    const [loadingJobOffers, setLoadingJobOffers] = useState(true)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [sessionChecked, setSessionChecked] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedOffer, setSelectedOffer] = useState(null)
    const [notification, setNotification] = useState({ isOpen: false, type: 'info', title: '', message: '' })
    const router = useRouter()

    // Unwrap params using React.use() as recommended for Next.js 15
    const resolvedParams = use(params)

    const checkSession = () => {
        // First, verify that session_token cookie exists
        const sessionToken = getSessionToken()
        if (!sessionToken) {
            console.log('No session_token cookie found')
            router.push('/empresa/login')
            return false
        }

        // Then verify it's a valid company session
        if (!hasValidEmpresaSession()) {
            console.log('Invalid company session')
            router.push('/empresa/login')
            return false
        }

        // Verify that the user_id from token matches the company ID in the URL
        const userId = getUserIdFromToken()
        if (userId && resolvedParams.idempresa && userId.toString() !== resolvedParams.idempresa.toString()) {
            console.log('User ID mismatch:', userId, 'vs', resolvedParams.idempresa)
            router.push('/empresa/login')
            return false
        }

        return true
    }

    const fetchData = async () => {
        try {
            setIdempresa(resolvedParams.idempresa)

            const data = await getCompany(resolvedParams.idempresa)
            setCompanyData(data)
        } catch (err) {
            setError(err.message)
            console.error("Error fetching company data:", err)
        } finally {
            setLoading(false)
        }
    }

    const fetchJobOffers = async () => {
        try {
            setLoadingJobOffers(true)
            const data = await getJobOffers(resolvedParams.idempresa, 1, 8)
            // The API might return data in different formats, adjust based on actual response
            if (data.job_offers || Array.isArray(data.job_offers)) {
                setJobOffers(Array.isArray(data.job_offers) ? data.job_offers : data.job_offers)
            } else {
                setJobOffers([])
            }
        } catch (err) {
            console.error("Error fetching job offers:", err)
            setJobOffers([])
        } finally {
            setLoadingJobOffers(false)
        }
    }

    useEffect(() => {
        const initializePage = async () => {
            // First check session
            if (!checkSession()) {
                return
            }

            setSessionChecked(true)

            // Then fetch data
            await fetchData()
            await fetchJobOffers()
        }

        initializePage()
    }, [resolvedParams])

    // Function to refresh data after updating company info (optional, not used in current implementation)
    const handleDataRefresh = async () => {
        try {
            setLoading(true)
            const data = await getCompany(idempresa)
            setCompanyData(data)
        } catch (err) {
            console.error("Error refreshing company data:", err)
        } finally {
            setLoading(false)
        }
    }

    // Function to show notifications
    const showNotification = (type, title, message) => {
        setNotification({ isOpen: true, type, title, message })
    }

    // Function to handle job offer creation success
    const handleJobOfferCreated = async (isEdit = false) => {
        await fetchJobOffers()
        if (isEdit) {
            showNotification('success', 'Éxito', 'Oferta laboral actualizada exitosamente')
        }
    }

    // Function to handle job offer deletion
    const handleDeleteJobOffer = async (offer) => {
        try {
            const response = await fetch(`/api/jobOffers?id=${offer.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error(`Error al eliminar la oferta: ${response.status}`)
            }

            // Show success message
            showNotification('success', 'Éxito', 'Oferta laboral eliminada exitosamente')

            // Refresh the job offers list
            await fetchJobOffers()
        } catch (error) {
            console.error('Error deleting job offer:', error)
            showNotification('error', 'Error', `Error al eliminar la oferta: ${error.message}`)
        }
    }
    return (
        <NoSSR>
            <NavbarPerfilEmpresa />

            <ClientOnly fallback={
                <div className="w-full flex justify-center items-center py-20 bg-gray-50" suppressHydrationWarning>
                    <div className="text-center" suppressHydrationWarning>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" suppressHydrationWarning></div>
                        <h2 className="text-primary text-2xl font-bold mb-4">Cargando perfil...</h2>
                        <p className="text-gray-600">Por favor espera mientras cargamos la información</p>
                    </div>
                </div>
            }>
                {!sessionChecked ? (
                    <div className="w-full flex justify-center items-center py-20 bg-gray-50" suppressHydrationWarning>
                        <div className="text-center" suppressHydrationWarning>
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" suppressHydrationWarning></div>
                            <h2 className="text-primary text-2xl font-bold mb-4">Verificando sesión...</h2>
                            <p className="text-gray-600">Por favor espera mientras verificamos tu sesión</p>
                        </div>
                    </div>
                ) : loading ? (
                    <div className="w-full flex justify-center items-center py-20 bg-gray-50" suppressHydrationWarning>
                        <div className="text-center" suppressHydrationWarning>
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" suppressHydrationWarning></div>
                            <h2 className="text-primary text-2xl font-bold mb-4">Cargando perfil...</h2>
                            <p className="text-gray-600">Por favor espera mientras cargamos la información</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="w-full flex justify-center items-center py-20 bg-gray-50" suppressHydrationWarning>
                        <div className="text-center" suppressHydrationWarning>
                            <h2 className="text-red-600 text-2xl font-bold mb-4">Error al cargar el perfil</h2>
                            <p className="text-gray-600 mb-4">{error}</p>
                            <Link
                                href="/"
                                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                                suppressHydrationWarning
                            >
                                Volver al inicio
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="w-full flex justify-center items-center py-10 bg-gray-50 relative overflow-hidden" suppressHydrationWarning>
                        <div className="absolute bottom-0 left-20" suppressHydrationWarning>
                            <div className="w-[400px] aspect-video relative" suppressHydrationWarning>
                                <Image
                                    src="/img/imagenfondocandidato.png"
                                    fill
                                    style={{ objectFit: "contain" }}
                                    alt="foto de fondo empresas"
                                    suppressHydrationWarning
                                />
                            </div>
                        </div>
                        <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex flex-wrap justify-center" suppressHydrationWarning>
                            <h1 className="text-primary text-3xl text-center md:text-left md:text-5xl font-[monserrat-black] pb-5">
                                ¡Tu empresa merece el mejor talento!
                            </h1>
                            <div className="w-11/12 sm:w-10/12 md:w-5/12 flex justify-center sm:px-8 pb-10 sm:pb-20 md:pb-52" suppressHydrationWarning>
                                <CardPerfilEmpresa companyData={companyData} empresaId={idempresa} />
                            </div>
                            <div className="w-11/12 sm:w-10/12 md:w-7/12 flex flex-col gap-5 sm:px-7" suppressHydrationWarning>
                                <div className="w-full flex items-center justify-between mb-4">
                                    <h2 className="text-2xl md:text-3xl font-bold text-primary text-center flex-1">
                                        Ofertas de Trabajo Activas
                                    </h2>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="bg-primary text-white rounded-full p-3 hover:bg-primary/90 transition-colors shadow-md ml-4"
                                        title="Crear nueva oferta laboral"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </button>
                                </div>
                                {loadingJobOffers ? (
                                    <div className="flex justify-center items-center py-10">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                    </div>
                                ) : jobOffers.length === 0 ? (
                                    <div className="text-center py-10 text-gray-600">
                                        <p>No hay ofertas de trabajo activas</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {jobOffers.map((offer, index) => (
                                            <JobOfferCard
                                                key={offer.id || index}
                                                offer={offer}
                                                companyData={companyData}
                                                showEditButtons={true}
                                                onEdit={(offer) => {
                                                    setSelectedOffer(offer)
                                                    setIsEditModalOpen(true)
                                                }}
                                                onDelete={handleDeleteJobOffer}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </ClientOnly>

            {/* Modal for creating job offer */}
            <ModalCreateJobOffer
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreateSuccess={handleJobOfferCreated}
                companyId={idempresa}
            />

            {/* Modal for editing job offer */}
            <ModalCreateJobOffer
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false)
                    setSelectedOffer(null)
                }}
                onCreateSuccess={() => handleJobOfferCreated(true)}
                companyId={idempresa}
                existingOffer={selectedOffer}
            />

            {/* Notification Modal */}
            <NotificationModal
                isOpen={notification.isOpen}
                onClose={() => setNotification({ ...notification, isOpen: false })}
                type={notification.type}
                title={notification.title}
                message={notification.message}
            />
        </NoSSR>
    )
}
