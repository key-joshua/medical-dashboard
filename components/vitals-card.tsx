import type { ReactNode } from "react"

interface VitalsCardProps {
  title: string
  value: string
  status: string
  icon: ReactNode
  bgColor?: string
  statusColor?: string
}

export default function VitalsCard({
  title,
  value,
  status,
  icon,
  bgColor = "bg-blue-50",
  statusColor = "text-gray-500",
}: VitalsCardProps) {
  return (
    <div className={`flex flex-col items-center text-center rounded-lg p-4 ${bgColor}`}>
      <div className="mb-2">{icon}</div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-black mb-1">{value}</p>
      <p className="text-sm text-gray-600">{status}</p>
    </div>
  )
}
