export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600">
      <div className="animate-pulse">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="w-6 h-6 bg-white/20 rounded"></div>
          <div className="w-16 h-6 bg-white/20 rounded"></div>
          <div className="w-6 h-6 bg-white/20 rounded"></div>
        </div>

        {/* Profile Card */}
        <div className="px-4 pb-6">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="h-24 bg-gray-200"></div>
            <div className="pt-16 px-6 pb-6">
              <div className="absolute -mt-28 left-1/2 transform -translate-x-1/2">
                <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-white"></div>
              </div>

              <div className="text-center space-y-4">
                <div className="h-6 bg-gray-200 rounded w-32 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
                <div className="h-16 bg-gray-200 rounded"></div>

                <div className="flex gap-3 justify-center">
                  <div className="h-10 bg-gray-200 rounded-full w-20"></div>
                  <div className="h-10 bg-gray-200 rounded-full w-20"></div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="text-center">
                      <div className="h-6 bg-gray-200 rounded w-8 mx-auto mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-12 mx-auto"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
