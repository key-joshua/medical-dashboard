export default function DataNotFound() {
    return (
        <div className="flex flex-col items-center justify-center flex-1 px-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">No Patient Data Found</h2>
                <p className="text-gray-600 mb-6">
                We couldn't find any patient records in the system. This could be due to a connection issue or because no
                patients have been added yet.
                </p>
                <div className="flex flex-col space-y-3">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    onClick={() => window.location.reload()}
                >
                    Refresh Page
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                    Contact Support
                </button>
                </div>
            </div>
        </div>
    )
}
