import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SearchLoading() {
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Search Bar Skeleton */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Skeleton className="h-10 flex-grow" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-[140px]" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-10 w-full" />

          {/* Results Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Skeleton className="w-12 h-12 rounded-lg" />
                    <div className="flex-grow space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-20" />
                      <div className="flex gap-1">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-20" />
                      </div>
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
