"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, BookOpen, Recycle, Info, ArrowRight, MapPinned, Clock } from "lucide-react"

interface Tutorial {
  id: string
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  duration: string
  organization: string
  image: string
}

interface Organization {
  name: string
  location: string
  distance: string
  hours: string
  accepts: string
}

interface PackageData {
  name: string
  brand: string
  material: string
  size: string
  recyclability: string
  image: string
  description: string
  environmentalImpact: string
  recyclingProcess: string
  tips: string
  facts: string
  donationPrep: string
  nearbyOrganizations: Organization[]
  tutorials: Tutorial[]
}

export default function PackagePage({ params }: { params: { id: string } }) {
  const packageId = params.id
  const [packageData, setPackageData] = useState<PackageData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching package data based on QR code
    const fetchPackageData = async () => {
      setLoading(true)
      // In real implementation, this would fetch from your API
      const mockData = getPackageData(packageId)
      setPackageData(mockData)
      setLoading(false)
    }

    fetchPackageData()
  }, [packageId])

  if (loading) {
    return (
      <div className="container py-12 px-4 md:px-6 flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="inline-block p-3 bg-green-100 rounded-full mb-4 animate-pulse">
            <Recycle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-xl font-medium">Loading package information...</h2>
        </div>
      </div>
    )
  }

  if (!packageData) {
    return (
      <div className="container py-12 px-4 md:px-6">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
            <Info className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Package Not Found</h1>
          <p className="text-gray-600 mb-6">
            We could not find information about this package. The QR code may be invalid or not registered in our system.
          </p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Package Information Card */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={packageData.image || "/placeholder.svg"}
                  alt={packageData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow text-center md:text-left">
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {packageData.material}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {packageData.recyclability}
                  </Badge>
                </div>
                <CardTitle className="text-2xl mb-1">{packageData.name}</CardTitle>
                <CardDescription className="text-base">{packageData.brand}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{packageData.description}</p>

            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium flex items-center text-green-800 mb-2">
                <Recycle className="mr-2 h-5 w-5" /> Recycling Impact
              </h3>
              <p className="text-green-700 text-sm">{packageData.environmentalImpact}</p>
            </div>
          </CardContent>
        </Card>

        {/* Main Options Tabs */}
        <Tabs defaultValue="donate" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="donate" className="text-base py-3">
              <MapPin className="mr-2 h-5 w-5" /> Donate Package
            </TabsTrigger>
            <TabsTrigger value="diy" className="text-base py-3">
              <BookOpen className="mr-2 h-5 w-5" /> DIY Recycling
            </TabsTrigger>
          </TabsList>

          {/* Donate Tab Content */}
          <TabsContent value="donate" className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium text-blue-800 mb-2">Before You Donate</h3>
              <p className="text-blue-700 text-sm">{packageData.donationPrep}</p>
            </div>

            <h3 className="text-lg font-medium mb-3">Nearby Organizations</h3>
            <div className="space-y-3">
              {packageData.nearbyOrganizations.slice(0, 3).map((org: Organization, index: number) => (
                <Card key={index} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="p-4 flex-grow">
                      <h4 className="font-medium mb-1">{org.name}</h4>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <MapPinned className="mr-1 h-4 w-4" />
                        <span>{org.location}</span>
                        <span className="mx-2">•</span>
                        <span>{org.distance}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>{org.hours}</span>
                      </div>
                    </div>
                    <div className="sm:w-32 p-4 bg-gray-50 flex flex-row sm:flex-col items-center justify-center gap-2 border-t sm:border-t-0 sm:border-l">
                      <Button size="sm" className="w-full hover:text-green-700">
                        Get Directions
                      </Button>
                      <Button size="sm" variant="outline" className="w-full hover:bg-green-700 hover:text-white transition-colors duration-300 ease">
                        Call
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center pt-4">
              <Button asChild>
                <Link href={`/donate?package=${packageId}`}>
                  View All Donation Centers <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>

          {/* DIY Tab Content */}
          <TabsContent value="diy" className="space-y-4">
            <h3 className="text-lg font-medium mb-3">DIY Recycling Tutorials</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {packageData.tutorials.slice(0, 4).map((tutorial: Tutorial, index: number) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                  <Link href={`/tutorials/${tutorial.id}`}>
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={tutorial.image || "/placeholder.svg"}
                        alt={tutorial.title}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            tutorial.difficulty === "Easy"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : tutorial.difficulty === "Medium"
                                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                : "bg-red-50 text-red-700 border-red-200"
                          }`}
                        >
                          {tutorial.difficulty}
                        </Badge>
                        <span className="text-xs text-gray-500">{tutorial.duration}</span>
                      </div>
                      <h4 className="font-medium text-sm line-clamp-2 mb-1">{tutorial.title}</h4>
                      <p className="text-xs text-gray-500">{tutorial.organization}</p>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>

            <div className="text-center pt-4">
              <Button asChild>
                <Link href={`/tutorials?package=${packageId}`}>
                  View All Tutorials <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Recycling Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-2">Preparation</h4>
                <p className="text-sm text-gray-600">{packageData.recyclingProcess}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Best Practices</h4>
                <p className="text-sm text-gray-600">{packageData.tips}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Did You Know?</h4>
                <p className="text-sm text-gray-600">{packageData.facts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Mock function to get package data (would be replaced with API call)
function getPackageData(packageId: string): PackageData | null {
  const packages: { [key: string]: any } = {
    "demo-plastic-001": {
      name: "Cafelayan Lettuce Chips - Package",
      brand: "Cafelayan Lettuce Chips",
      material: "PET Plastic",
      size: "250g",
      recyclability: "Highly Recyclable",
      image: "/placeholder.svg?height=200&width=200",
      description:
        "Reusable package made from PET plastic. This material is widely recyclable and can be turned into new packages, clothing fibers, or other products.",
      environmentalImpact:
        "Recycling this package saves enough energy to power a 60-watt light bulb for 6 hours. It also reduces the amount of plastic waste that could end up in oceans and harm marine life.",
      recyclingProcess: "Clean the package and place in designated PET recycling bins.",
      tips: "Rinse thoroughly and fold to save space.",
      facts:
        "It takes up to 450 years for a plastic to decompose in a landfill, but it can be recycled in just 60 days.",
      donationPrep:
        "Before donating, please rinse the package.",
      nearbyOrganizations: [
        {
          name: "Kids Who Farm",
          location: "Zamboanga City",
          distance: "2.3 km",
          hours: "Mon-Fri 8AM-5PM",
          accepts: "PET bottles, aluminum cans",
        },
        {
          name: "EcoHub ZC",
          location: "Zamboanga City",
          distance: "4.1 km",
          hours: "Daily 7AM-7PM",
          accepts: "All plastic containers",
        },
        {
          name: "Recycle Center BGC",
          location: "Bonifacio Global City",
          distance: "3.8 km",
          hours: "Mon-Sat 9AM-6PM",
          accepts: "Plastic bottles, paper, electronics",
        },
      ],
      tutorials: [
        {
          id: "1",
          title: "Pot for Plants",
          difficulty: "Easy",
          duration: "15 mins",
          organization: "Kids Who Farm",
          image: "/placeholder.svg?height=150&width=200",
        },
        {
          id: "2",
          title: "Bird Feeder DIY Project",
          difficulty: "Easy",
          duration: "20 mins",
          organization: "Wildlife Conservation PH",
          image: "/placeholder.svg?height=150&width=200",
        },
        {
          id: "3",
          title: "Plastic Broom",
          difficulty: "Medium",
          duration: "45 mins",
          organization: "Cebu Eco Warriors",
          image: "/placeholder.svg?height=150&width=200",
        },
        {
          id: "4",
          title: "Plastice Bag using Plastic packages",
          difficulty: "Hard",
          duration: "1.5 hours",
          organization: "Urban Farmers Manila",
          image: "/placeholder.svg?height=150&width=200",
        },
      ],
    },
    "cardboard-box-001": {
      name: "Cardboard Box",
      brand: "PackWell Medium",
      material: "Corrugated Cardboard",
      size: "30cm x 25cm x 15cm",
      recyclability: "Highly Recyclable",
      image: "/placeholder.svg?height=200&width=200",
      description:
        "Standard corrugated cardboard box used for packaging. Made from recycled paper materials and designed for single use.",
      environmentalImpact:
        "Recycling one ton of cardboard saves 17 trees, 7,000 gallons of water, and 463 gallons of oil. Cardboard is one of the most recycled materials in the Philippines.",
      recyclingProcess: "Flatten the box, remove any tape or labels, and keep it dry before recycling.",
      tips: "Cardboard can be recycled 5-7 times before the fibers become too short to be useful.",
      facts:
        "Cardboard decomposes in about 2 months in a landfill, but recycling it saves valuable resources and energy.",
      donationPrep: "Please flatten the box and remove any non-cardboard materials like plastic, tape, or styrofoam.",
      nearbyOrganizations: [
        {
          name: "Paper Recyclers Inc.",
          location: "Quezon City",
          distance: "5.7 km",
          hours: "Mon-Sat 8AM-6PM",
          accepts: "Cardboard, paper, cartons",
        },
        {
          name: "EcoHub Philippines",
          location: "Taguig City",
          distance: "4.1 km",
          hours: "Daily 7AM-7PM",
          accepts: "All paper products",
        },
        {
          name: "Recycle Center BGC",
          location: "Bonifacio Global City",
          distance: "3.8 km",
          hours: "Mon-Sat 9AM-6PM",
          accepts: "Cardboard, paper, electronics",
        },
      ],
      tutorials: [
        {
          id: "5",
          title: "Cardboard Storage Organizers",
          difficulty: "Medium",
          duration: "45 mins",
          organization: "Cebu Eco Warriors",
          image: "/placeholder.svg?height=150&width=200",
        },
        {
          id: "6",
          title: "Cardboard Cat House",
          difficulty: "Easy",
          duration: "30 mins",
          organization: "Pet Lovers Manila",
          image: "/placeholder.svg?height=150&width=200",
        },
        {
          id: "7",
          title: "Cardboard Wall Art",
          difficulty: "Medium",
          duration: "1 hour",
          organization: "Art for Earth PH",
          image: "/placeholder.svg?height=150&width=200",
        },
        {
          id: "8",
          title: "Cardboard Furniture",
          difficulty: "Hard",
          duration: "3 hours",
          organization: "Sustainable Design PH",
          image: "/placeholder.svg?height=150&width=200",
        },
      ],
    },
  }

  return packages[packageId] || null
}
