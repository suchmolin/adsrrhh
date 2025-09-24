"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginCandidato() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/hr/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error en el login")
      }

      if (data.id) {
        // Create session cookie
        document.cookie = `candidato_session=${data.id}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`

        // Redirect to candidate profile
        router.push(`/candidato/perfil/${data.id}`)
      } else {
        throw new Error("Usuario o Contraseña incorrectos")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError(err.message || "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-[290px] xs:w-[370px] sm:w-[630px] md:w-[760px] lg:w-[1030px] xl:w-[1250px] flex flex-col">
      <h1 className="text-azulads text-3xl font-[monserrat-bold]">
        Acceso a candidato
      </h1>
      <h2 className="text-azuloscuroads text-lg font-[monserrat-bold]">
        El primer paso hacia tu proximo gran empleo
      </h2>
      <form onSubmit={handleSubmit} className="rounded-xl bg-azulclaroads p-4 my-4">
        <h3 className="text-azuloscuroads text-lg mb-4">Ingresa ahora</h3>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <div className="w-full flex flex-wrap sm:flex-nowrap gap-4">
          <div className="w-full sm:w-5/12 pr-5">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Correo Electrónico"
              className="ring-0 border-none outline-none w-full px-2 bg-white rounded-lg focus:ring-azulads"
              required
            />
          </div>
          <div className="w-full sm:w-5/12 pr-5">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Contraseña"
              className="ring-0 border-none outline-none w-full px-2 bg-white rounded-lg focus:ring-azulads"
              required
            />
          </div>
          <div className="w-full sm:w-2/12 pr-5">
            <button
              type="submit"
              disabled={loading}
              className="bg-azulads text-white p-2 rounded-md w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
