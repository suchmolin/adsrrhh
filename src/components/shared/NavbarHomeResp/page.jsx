"use client"
import { useState } from "react"
import { MdOutlineMenu } from "react-icons/md"
import DrawerMenuHome from "../DrawerMenuHome/page"

export default function NavbarHomeResp({ hasSession = false, profileUrl = "" }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex sm:hidden h-full items-center">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-sm CShadow2 bg-primary text-white"
      >
        <MdOutlineMenu className="text-2xl " />
      </button>
      <DrawerMenuHome isOpen={isOpen} setIsOpen={setIsOpen} hasSession={hasSession} profileUrl={profileUrl} />
    </div>
  )
}
