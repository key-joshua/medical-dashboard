"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Triangle } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface BloodPressureChartProps {
  diagnosisHistory?: {
    month: string
    year: number
    blood_pressure?: {
      systolic?: {
        value: number
        levels: string
      }
      diastolic?: {
        value: number
        levels: string
      }
    }
  }[]
  latestDiagnosis?: {
    blood_pressure?: {
      systolic?: {
        value: number
        levels: string
      }
      diastolic?: {
        value: number
        levels: string
      }
    }
  }
}

const timeRanges = ["Last 6 months", "Last 3 months", "Last month", "Last week"]

export default function BloodPressureChart({ diagnosisHistory = [], latestDiagnosis = { blood_pressure: { systolic: { value: 0, levels: "Normal" }, diastolic: { value: 0, levels: "Normal" } }, }, }: BloodPressureChartProps) {
  const [selectedRange, setSelectedRange] = useState("Last 6 months")

  const filteredData = useMemo(() => {
    if (!diagnosisHistory || diagnosisHistory.length === 0) {
      return []
    }

    const sortedHistory = [...diagnosisHistory].sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ]
      return months.indexOf(b.month) - months.indexOf(a.month)
    })

    // Format the data for the chart
    const formattedData = sortedHistory.map((record) => ({
      month: `${record.month.slice(0, 3)}, ${record.year}`,
      systolic: record.blood_pressure?.systolic?.value || 0,
      diastolic: record.blood_pressure?.diastolic?.value || 0,
    }))

    // Filter based on selected time range
    let dataToShow = formattedData
    if (selectedRange === "Last 3 months") {
      dataToShow = formattedData.slice(0, 3)
    } else if (selectedRange === "Last month") {
      dataToShow = formattedData.slice(0, 1)
    } else if (selectedRange === "Last week") {
      dataToShow = formattedData.slice(0, 1) // Just show the most recent reading for "Last week"
    } else {
      // Last 6 months (default)
      dataToShow = formattedData.slice(0, 6)
    }

    // Reverse to show oldest first on the chart
    return dataToShow.reverse()
  }, [diagnosisHistory, selectedRange])

  return (
    <div className="rounded-xl bg-[#f5f3ff] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1e293b]">Blood Pressure</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white">
              {selectedRange}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {timeRanges.map((range) => (
              <DropdownMenuItem key={range} onClick={() => setSelectedRange(range)} className="cursor-pointer"> {range} </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="col-span-3">
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 0" horizontal={true} vertical={false} stroke="#d1d5db" strokeWidth={1} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#64748b" }} dy={10} />
                <YAxis domain={[60, 180]} axisLine={false} tickLine={false} tick={{ fill: "#64748b" }} ticks={[60, 80, 100, 120, 140, 160, 180]} dx={-10} />
                <Line type="monotone" dataKey="systolic" stroke="#ec4899" strokeWidth={3} dot={{ fill: "#ec4899", r: 6 }} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="diastolic" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: "#8b5cf6", r: 6 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-6">
          <div>
            <div className="mb-2 flex items-center">
              <div className="mr-2 h-4 w-4 rounded-full bg-[#ec4899]"></div>
              <span className="text-lg font-medium">Systolic</span>
            </div>
            <div className="mb-1 text-2xl font-semibold">{latestDiagnosis?.blood_pressure?.systolic?.value || 0}</div>
            <div className="flex items-center text-sm font-medium text-gray-700"> <Triangle className={`mr-1 h-4 w-4 ${ latestDiagnosis?.blood_pressure?.systolic?.levels === "Higher than Average" ? "rotate-180" : "" } fill-current`} /> {latestDiagnosis?.blood_pressure?.systolic?.levels || "Normal"} </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="mb-2 flex items-center">
              <div className="mr-2 h-4 w-4 rounded-full bg-[#8b5cf6]"></div>
              <span className="text-lg font-medium">Diastolic</span>
            </div>
            <div className="mb-1 text-2xl font-semibold">{latestDiagnosis?.blood_pressure?.diastolic?.value || 0}</div>
            <div className="flex items-center text-sm font-medium text-gray-700">
              <Triangle className={`mr-1 h-4 w-4 ${ latestDiagnosis?.blood_pressure?.diastolic?.levels === "Higher than Average" ? "rotate-180" : "" } fill-current`} />
              {latestDiagnosis?.blood_pressure?.diastolic?.levels || "Normal"}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
