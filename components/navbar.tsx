"use client"

import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Home, Users, Calendar, MessageSquare, CreditCard, Settings, MoreVertical } from "lucide-react"

interface Doctor {
  name: string
  role: string
}

interface NavbarProps {
  doctor: Doctor
}

interface NavItem {
  href: string
  label: string
  active?: boolean
  icon: React.ReactNode
}

export default function Navbar({ doctor }: NavbarProps) {
  const [navItems, setNavItems] = useState<NavItem[]>([
    { label: "Overview", href: "/overview", icon: <Home className="h-5 w-5" /> },
    { label: "Patients", href: "/patients", icon: <Users className="h-5 w-5" />, active: true },
    { label: "Schedule", href: "/schedule", icon: <Calendar className="h-5 w-5" /> },
    { label: "Message", href: "/message", icon: <MessageSquare className="h-5 w-5" /> },
    { label: "Transactions", href: "/transactions", icon: <CreditCard className="h-5 w-5" /> },
  ])

  const handleNavClick = (clickedIndex: number) => {
    setNavItems(
      navItems.map((item, index) => ({
        ...item,
        active: index === clickedIndex,
      }))
    )
  }

  return (
    <header className="w-[100%] bg-white shadow-sm text-base rounded-full">
      <div className="flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
          <img src="https://res.cloudinary.com/dtq8fh82n/image/upload/v1745594819/logo-small_xavpbh.png" alt="Profile" className="h-full w-full object-cover" />
        </Link>

        <nav className="flex flex-grow justify-center">
          <ul className="flex items-center gap-2 rounded-full">
            {navItems.map((item, index) => (
              <li key={item.label}>
                <Link href={item.href} onClick={() => handleNavClick(index)} className={cn( "flex items-center gap-2 rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors", item.active ? "bg-[#00E5BE] text-slate-900" : "text-slate-700 hover:bg-slate-100", )} >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full border">
              <img src="https://res.cloudinary.com/dtq8fh82n/image/upload/v1745594818/doctor-small_rhmn5r.png?height=40&width=40" alt="Profile" className="h-full w-full object-cover" />
            </div>
            <div className="text-right leading-tight">
              <div className="text-sm font-medium">{doctor?.name}</div>
              <div className="text-xs text-slate-500">{doctor?.role}</div>
            </div>
          </div>

          <button className="rounded-full p-2 text-slate-700 hover:bg-slate-100">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </button>
          <button className="rounded-full p-2 text-slate-700 hover:bg-slate-100">
            <MoreVertical className="h-5 w-5" />
            <span className="sr-only">More</span>
          </button>
        </div>
      </div>
    </header>
  )
}
