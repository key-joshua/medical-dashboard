"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Search, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Patient {
  age: number
  name: string
  gender: string
  profile_picture: string
}

interface SidebarProps {
  patients: Patient[]
  selectedPatientId: string
  onSelectPatient: (patient: Patient) => void
}

export default function Sidebar({ patients, selectedPatientId, onSelectPatient }: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPatients = patients.filter((patient) => patient.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="flex h-full rounded-xl flex-col border-r bg-white">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-xl font-semibold text-slate-900">Patients</h2>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search patients</span>
        </Button>
      </div>

      <div className="flex-1 overflow-auto hide-scrollbar">
        {filteredPatients.map((patient) => (
          <div key={patient.name} className={`flex items-center justify-between p-3 cursor-pointer transition-colors ${patient.name === selectedPatientId ? "bg-[#d8fcf7]" : "hover:bg-[#d8fcf7]" }`} onClick={() => onSelectPatient(patient)} >
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={patient.profile_picture || "/placeholder.svg"} />
                <AvatarFallback> {patient.name.split(" ").map((n) => n[0]).join("")} </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-slate-900">{patient.name}</p>
                <p className="text-sm text-slate-500"> {patient.gender}, {patient.age} </p>
              </div>
            </div>
            <PatientActions />
          </div>
        ))}
      </div>

      <style jsx global>
        {styles}
      </style>
    </div>
  )
}

function PatientActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>View profile</DropdownMenuItem>
        <DropdownMenuItem>Edit details</DropdownMenuItem>
        <DropdownMenuItem>Medical history</DropdownMenuItem>
        <DropdownMenuItem>Schedule appointment</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const styles = `
  .hide-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  
  .hide-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .hide-scrollbar::-webkit-scrollbar-thumb {
    background-color: #000000;
    border-radius: 20px;
  }
  
  .hide-scrollbar::-webkit-scrollbar-button {
    display: none;
  }
`