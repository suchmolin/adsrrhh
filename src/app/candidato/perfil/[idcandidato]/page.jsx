"use client"

import CardPerfilCandidato from "@/components/candidato/CardPerfilCandidato/page"
import CardPerfilEducacion from "@/components/candidato/CardPerfilEducacion/page"
import NavbarPerfilCandidato from "@/components/candidato/NavbarPerfilCandidato/page"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, use } from "react"
import getJobSeeker from "@/functions/get/getJobSeeker"
import dynamic from "next/dynamic"
import NoSSR from "@/components/shared/NoSSR"
import { useRouter } from "next/navigation"
import { hasValidSession, getCookie } from "@/utils/cookies"

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


export default function PerfilCandidato({ params }) {
  const [idcandidato, setIdcandidato] = useState(null)
  const [jobSeekerData, setJobSeekerData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sessionChecked, setSessionChecked] = useState(false)
  const router = useRouter()

  // Unwrap params using React.use() as recommended for Next.js 15
  const resolvedParams = use(params)

  const checkSession = () => {
    if (!hasValidSession()) {
      router.push('/candidato/login')
      return false
    }

    // Verify that the session ID matches the candidate ID in the URL
    const sessionId = getCookie('candidato_session')
    if (sessionId && resolvedParams.idcandidato && sessionId !== resolvedParams.idcandidato) {
      router.push('/candidato/login')
      return false
    }

    return true
  }

  const fetchData = async () => {
    try {
      setIdcandidato(resolvedParams.idcandidato)

      const data = await getJobSeeker(resolvedParams.idcandidato)
      setJobSeekerData(data)
    } catch (err) {
      setError(err.message)
      console.error("Error fetching job seeker data:", err)
    } finally {
      setLoading(false)
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
    }

    initializePage()
  }, [resolvedParams])

  // Function to refresh data after adding education or experience (optional, not used in current implementation)
  const handleDataRefresh = async () => {
    try {
      setLoading(true)
      const data = await getJobSeeker(idcandidato)
      setJobSeekerData(data)
    } catch (err) {
      console.error("Error refreshing job seeker data:", err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <NoSSR>
      <NavbarPerfilCandidato />

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
                  alt="foto de fondo candidatos"
                  suppressHydrationWarning
                />
              </div>
            </div>
            <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex flex-wrap justify-center" suppressHydrationWarning>
              <h1 className="text-primary text-3xl text-center md:text-left md:text-5xl font-[monserrat-black] pb-5">
                ¡Tu futuro comienza con un perfil completo!
              </h1>
              <div className="w-11/12 sm:w-10/12 md:w-5/12 flex justify-center sm:px-8 pb-10 sm:pb-20 md:pb-52" suppressHydrationWarning>
                <CardPerfilCandidato jobSeekerData={jobSeekerData} candidatoId={idcandidato} />
              </div>
              <div className="w-11/12 sm:w-10/12 md:w-7/12 flex justify-center sm:px-7" suppressHydrationWarning>
                <CardPerfilEducacion jobSeekerData={jobSeekerData} candidatoId={idcandidato} onDataRefresh={handleDataRefresh} />
              </div>
            </div>
          </div>
        )}
      </ClientOnly>
    </NoSSR>
  )
}
