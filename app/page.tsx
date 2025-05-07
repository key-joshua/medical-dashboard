"use client"

import { APIsRequest } from "@/lib/apis"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import { useEffect, useState } from "react"
import VitalsCard from "@/components/vitals-card"
import LabResults from "@/components/lab-results"
import DiagnosticList from "@/components/diagnostic-list"
import PatientProfile from "@/components/patient-profile"
import BloodPressureChart from "@/components/blood-pressure-chart"
import { TreesIcon as Lungs, Thermometer, Heart } from "lucide-react"
import DataNotFound from "@/components/data-not-found"

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [patients, setPatients] = useState<any[]>([])
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
				const response = await APIsRequest.getPatients();
        if (!response.ok) {
          console.error('ERROR FETCHING DATA FROM TRY:', response);
          setLoading(false);
          setPatients([]);
          return;
        }

        const data = await response.json();
        const jessicaTaylor = data.find((patient: any) => patient.name === "Jessica Taylor");

        if (!jessicaTaylor && data.length > 0) setSelectedPatient(data[0]);
        if (jessicaTaylor) setSelectedPatient(jessicaTaylor);
        setPatients(data);
        setLoading(false);
			} catch (error: any) {
        console.error('ERROR FETCHING DATA FROM CATCH:', error);
        setLoading(false);
        setPatients([]);
			}
    }

    fetchData();
  }, []);

  const getLatestDiagnosis = () => {
    if (!selectedPatient || !selectedPatient.diagnosis_history.length) return null

    const sortedHistory = [...selectedPatient.diagnosis_history].sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year
      const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ]
      return months.indexOf(b.month) - months.indexOf(a.month)
    })

    return sortedHistory[0]
  };

  const latestDiagnosis = getLatestDiagnosis();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  };

  if (!loading && patients.length === 0) {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        <Navbar doctor={{ name: "Dr. Jose Simmons", role: "General Practitioner" }} />
        <DataNotFound />
      </div>
    )
  };

  return (
    <div>
      <div className="w-[100%]">
        <Navbar doctor={{ name: "Dr. Jose Simmons", role: "General Practitioner" }} />
      </div>

      <div className="flex mt-6 h-screen">
      <div className="w-[20%] h-full overflow-y-auto">
          <Sidebar patients={patients} selectedPatientId={selectedPatient?.name || "Unknown"} onSelectPatient={(patient: any) => setSelectedPatient(patient)}/>
        </div>

        <div className="mr-[1.5%] ml-[1.5%] w-[77%]">
            <div>
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Diagnosis History</h2>
                <BloodPressureChart diagnosisHistory={selectedPatient?.diagnosis_history || []} latestDiagnosis={selectedPatient?.diagnosis_history?.[0] || {}} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <VitalsCard title="Respiratory Rate" value={`${latestDiagnosis.respiratory_rate.value} bpm`} status={latestDiagnosis.respiratory_rate.levels} icon={<Lungs className="h-10 w-10 text-blue-500" />} bgColor="bg-[#e0f3fa]" />
                <VitalsCard title="Temperature" value={`${latestDiagnosis.temperature.value}°F`} status={latestDiagnosis.temperature.levels} icon={<Thermometer className="h-10 w-10 text-red-500" />} bgColor="bg-[#ffe6e9]" />
                <VitalsCard title="Heart Rate" value={`${latestDiagnosis.heart_rate.value} bpm`} status={latestDiagnosis.heart_rate.levels} icon={<Heart className="h-10 w-10 text-red-500" />} bgColor="bg-[#ffe6f1]" statusColor="text-blue-500" />
              </div>

              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="text-lg font-medium mb-4">Diagnostic List</h3>
                <DiagnosticList diagnoses={selectedPatient.diagnostic_list} />
              </div>
            </div>
        </div>
        
        <div className="w-[20%]">
          <PatientProfile patient={selectedPatient} />
          <LabResults labResults={selectedPatient.lab_results} />
        </div>
      </div>
    </div>
  )
}
