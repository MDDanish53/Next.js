const loading = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-3 overflow-hidden">
      <div className="max-w-6xl mx-auto h-full flex flex-col gap-3">
        {/* Breadcrumb Skeleton */}
        <div className="flex-shrink-0">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-12 h-4 bg-gray-700 rounded animate-pulse"></div>
            <span className="text-gray-600">/</span>
            <div className="w-24 h-4 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Header Skeleton */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-4 border border-gray-600 shadow-2xl flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-600 rounded-lg animate-pulse"></div>
              <div>
                <div className="w-48 h-6 bg-gray-600 rounded mb-2 animate-pulse"></div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-3 bg-gray-600 rounded animate-pulse"></div>
                  <div className="w-20 h-3 bg-gray-600 rounded animate-pulse"></div>
                  <div className="w-18 h-3 bg-gray-600 rounded animate-pulse"></div>
                  <div className="w-14 h-3 bg-gray-600 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-16 h-8 bg-gray-600 rounded-lg animate-pulse"></div>
              <div className="w-18 h-8 bg-gray-600 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Code Editor Skeleton */}
        <div className="flex-1 min-h-0 bg-gray-900 rounded-lg border border-gray-700 overflow-hidden flex flex-col">
          <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-600 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-gray-600 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-gray-600 animate-pulse"></div>
              </div>
              <div className="w-16 h-4 bg-gray-600 rounded ml-4 animate-pulse"></div>
            </div>
          </div>
          <div className="flex-1 p-4 space-y-2">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className={`h-4 bg-gray-700 rounded animate-pulse ${i % 3 === 0 ? 'w-3/4' : i % 2 === 0 ? 'w-full' : 'w-5/6'}`}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default loading