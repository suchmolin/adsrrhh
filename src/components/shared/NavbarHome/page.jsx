"use client"

import Link from "next/link"
import NavbarHomeResp from "../NavbarHomeResp/page"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { FaUser } from "react-icons/fa"
import { getUserIdFromToken, getRoleFromToken, logout, hasValidSession } from "@/utils/cookies"

export default function NavbarHome() {
  const [session, setSession] = useState({ hasSession: false, profileUrl: "" })
  const [openUserMenu, setOpenUserMenu] = useState(false)
  const [openCandidateMenu, setOpenCandidateMenu] = useState(false)
  const [openCompanyMenu, setOpenCompanyMenu] = useState(false)
  const userMenuRef = useRef(null)
  const candidateMenuRef = useRef(null)
  const companyMenuRef = useRef(null)

  useEffect(() => {
    if (hasValidSession()) {
      const userId = getUserIdFromToken()
      const role = getRoleFromToken()
      
      if (userId && role) {
        if (role === 'job_seeker') {
          setSession({ hasSession: true, profileUrl: `/candidato/perfil/${userId}` })
        } else if (role === 'company') {
          setSession({ hasSession: true, profileUrl: `/empresa/perfil/${userId}` })
        } else {
          setSession({ hasSession: false, profileUrl: "" })
        }
      } else {
        setSession({ hasSession: false, profileUrl: "" })
      }
    } else {
      setSession({ hasSession: false, profileUrl: "" })
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setOpenUserMenu(false)
      }
      if (candidateMenuRef.current && !candidateMenuRef.current.contains(e.target)) {
        setOpenCandidateMenu(false)
      }
      if (companyMenuRef.current && !companyMenuRef.current.contains(e.target)) {
        setOpenCompanyMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <nav className="absolute w-full h-[80px] sm:h-[130px] flex px-5 sm:px-10 justify-between items-center z-50">
      <div className="flex gap-7 md:gap-10 h-full items-center text-azuloscuroads text-xl">
        <Link
          href="/"
          className="w-[110px] sm:w-[140px] sm:h-full aspect-square relative hover:scale-[102%] duration-300"
        >
          <Image
            src="/img/logoadsrrhh2.png"
            alt="ads recursos humanos"
            objectFit="contain"
            layout="fill"
          />
        </Link>

        {session.hasSession ? (
          <>
            <Link
              className="hidden sm:block hover:scale-105 duration-300 hover:text-azulads"
              href="/jobOffers"
            >
              Buscar Empleo
            </Link>
          </>
        ) : (
          <>
            <Link
              className="hidden sm:block hover:scale-105 duration-300 hover:text-azulads"
              href="/jobOffers"
            >
              Buscar Empleo
            </Link>

            {/* Candidato dropdown (desktop) */}
            <div className="relative hidden sm:block" ref={candidateMenuRef}>
              <button
                onClick={() => {
                  setOpenCandidateMenu(v => !v)
                  setOpenCompanyMenu(false)
                }}
                className="hover:scale-105 duration-300 hover:text-azulads"
                aria-haspopup="menu"
                aria-expanded={openCandidateMenu}
              >
                Candidato
              </button>
              {openCandidateMenu && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-2xl border border-gray-200 z-[9999]">
                  <div className="py-1">
                    <Link href="/candidato/registro" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Registrar</Link>
                    <Link href="/candidato/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Iniciar sesión</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Empresa dropdown (desktop) */}
            <div className="relative hidden sm:block" ref={companyMenuRef}>
              <button
                onClick={() => {
                  setOpenCompanyMenu(v => !v)
                  setOpenCandidateMenu(false)
                }}
                className="hover:scale-105 duration-300 hover:text-azulads"
                aria-haspopup="menu"
                aria-expanded={openCompanyMenu}
              >
                Empresa
              </button>
              {openCompanyMenu && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-2xl border border-gray-200 z-[9999]">
                  <div className="py-1">
                    <Link href="/empresa/registro" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Registrar</Link>
                    <Link href="/empresa/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Iniciar sesión</Link>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Right side: Perfil icon when session active (desktop only) and responsive menu */}
      <div className="flex items-center gap-4">
        {session.hasSession && (
          <div className="relative hidden sm:block" ref={userMenuRef}>
            <button
              onClick={() => setOpenUserMenu(v => !v)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white hover:bg-azulads transition-colors"
              aria-label="Abrir menú de usuario"
              title="Perfil"
            >
              <FaUser className="text-lg" />
            </button>
            {openUserMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-2xl border border-gray-200 z-[9999]">
                <div className="py-1">
                  <Link
                    href={session.profileUrl}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Perfil
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        <NavbarHomeResp hasSession={session.hasSession} profileUrl={session.profileUrl} />
      </div>
    </nav>
  )
}
