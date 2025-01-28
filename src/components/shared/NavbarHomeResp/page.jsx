"use client"
import { useState } from "react"
import { MdOutlineMenu } from "react-icons/md"
import DrawerMenuHome from "../DrawerMenuHome/page"

export default function NavbarHomeResp() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex sm:hidden h-full items-center">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-sm CShadow2 bg-azulads text-white"
      >
        <MdOutlineMenu className="text-3xl " />
      </button>
      <DrawerMenuHome isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}
