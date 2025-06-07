import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function MyDonationsLoading() {
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-10 w-40" />
        </div>

        {/* Search and Tabs */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
          <Skeleton className="h-10 w-full md:w-80" />
          <div className="w-full md:w-auto flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        {/* Donations List */}
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-0">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <Skeleton className="w-20 h-20 rounded-md" />
                    <div>
                      <Skeleton className="h-6 w-48 mb-2" />
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                  </div>
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-4" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <Skeleton className="h-4 w-16 mb-1" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-16 mb-1" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                </div>

                <div className="mt-6">
                  <Skeleton className="h-6 w-48 mb-4" />
                  <div className="space-y-4">
                    {[1, 2].map((j) => (
                      <div key={j} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div>
                              <Skeleton className="h-5 w-40 mb-1" />
                              <Skeleton className="h-4 w-32" />
                            </div>
                          </div>
                          <Skeleton className="h-5 w-20" />
                        </div>
                        <Skeleton className="h-16 w-full mt-3 rounded-md" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                        <div className="flex gap-3 mt-4">
                          <Skeleton className="h-10 w-32" />
                          <Skeleton className="h-10 w-32" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
