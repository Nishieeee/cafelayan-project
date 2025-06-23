export default function Loading() {
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
            <div>
              <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-64"></div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
