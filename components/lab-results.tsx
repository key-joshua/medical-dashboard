import { Download } from "lucide-react"

interface LabResultsProps {
  labResults: string[]
}

export default function LabResults({ labResults }: LabResultsProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium mb-4">Lab Results</h3>
      <div className="space-y-3">
        {labResults.map((result, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-800">{result}</span>
            <button className="text-gray-500 hover:text-gray-700">
              <Download className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
