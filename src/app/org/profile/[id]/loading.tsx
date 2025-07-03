export default function OrganizationProfileLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="animate-pulse">
        {/* Hero Section Skeleton */}
        <div className="h-64 bg-gradient-to-r from-green-200 to-blue-200 rounded-b-3xl"></div>

        <div className="max-w-6xl mx-auto px-4 relative -mt-16">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
            <div className="w-32 h-32 bg-gray-300 rounded-full border-4 border-white shadow-xl"></div>

            <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-64"></div>
                <div className="h-4 bg-gray-200 rounded w-96"></div>
                <div className="flex gap-4">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-4 bg-gray-200 rounded w-28"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Metrics Skeleton */}
        <div className="max-w-6xl mx-auto px-4 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="text-center space-y-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mx-auto"></div>
                  <div className="h-6 bg-gray-200 rounded w-16 mx-auto"></div>
                  <div className="h-3 bg-gray-200 rounded w-20 mx-auto"></div>
                  <div className="h-3 bg-gray-200 rounded w-12 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="max-w-6xl mx-auto px-4 pb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-48"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
