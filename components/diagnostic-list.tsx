interface Diagnosis {
  name: string
  description: string
  status: string
}

interface DiagnosticListProps {
  diagnoses: Diagnosis[]
}

export default function DiagnosticList({ diagnoses }: DiagnosticListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Problem/Diagnosis
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {diagnoses.map((diagnosis, index) => (
            <tr key={index}>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{diagnosis.name}</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{diagnosis.description}</td>
              <td className="px-4 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    diagnosis.status === "Under Observation"
                      ? "bg-yellow-100 text-yellow-800"
                      : diagnosis.status === "Cured"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {diagnosis.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
