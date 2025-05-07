import Image from "next/image"
import { Calendar, User, Phone } from "lucide-react"

interface Patient {
  name: string
  profile_picture: string
  date_of_birth: string
  gender: string
  phone_number: string
  emergency_contact: string
  insurance_type: string
}

interface PatientProfileProps {
  patient: Patient
}

export default function PatientProfile({ patient }: PatientProfileProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6 flex flex-col items-center">
      <div className="w-full rounded-full overflow-hidden mb-4">
        <Image
          width={128}
          height={128}
          alt={patient.name}
          className="h-full w-full object-cover"
          src={patient.profile_picture || "/placeholder.svg"}
        />
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">{patient.name}</h2>

      <div className="w-full space-y-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1"> <Calendar className="h-5 w-5 text-gray-500" /> </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Date Of Birth</p>
            <p className="text-sm text-gray-800">{patient.date_of_birth}</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1"> <User className="h-5 w-5 text-gray-500" /> </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Gender</p>
            <p className="text-sm text-gray-800">{patient.gender}</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1"> <Phone className="h-5 w-5 text-gray-500" /> </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Contact Info</p>
            <p className="text-sm text-gray-800">{patient.phone_number}</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1"> <Phone className="h-5 w-5 text-gray-500" /> </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Emergency Contacts</p>
            <p className="text-sm text-gray-800">{patient.emergency_contact}</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1"> <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /> </svg> </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Insurance Provider</p>
            <p className="text-sm text-gray-800">{patient.insurance_type}</p>
          </div>
        </div>
      </div>

      <button className="mt-6 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-md transition duration-200"> Show All Information </button>
    </div>
  )
}
