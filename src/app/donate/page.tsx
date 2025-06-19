"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Clock, Navigation, Star } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DonateItemForm } from "@/components/donate-item-form"

interface Organizations {
      name: string
      location: string
      rating: number
      phone: string
      hours: string
      acceptedMaterials: string[],
      description: string
}
export default function DonatePage() {
  const searchParams = useSearchParams()
  const packageId = searchParams.get("package")
  const [organizations, setOrganizations] = useState<Organizations[]>([])
  const [searchLocation, setSearchLocation] = useState("")

  useEffect(() => {
    // Fetch organizations that accept this package type
    const fetchOrganizations = async () => {
      const mockOrgs = getMockOrganizations()
      setOrganizations(mockOrgs)
    }

    fetchOrganizations()
  }, [packageId])

  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Donation Centers</h1>
          <p className="text-gray-600">Organizations across the Philippines that accept recyclable materials</p>

          {/* Search */}
          <div className="flex gap-4 max-w-md mt-6">
            <Input
              placeholder="Enter your location..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="border-gray-500/50"
            />
            <Button variant="outline" className="border-gray-500/50 hover:bg-green-700 hover:text-white transition-colors duration-300 ease">
              <Navigation className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>

        <Tabs defaultValue="centers" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-200">
            <TabsTrigger value="centers">Find Centers</TabsTrigger>
            <TabsTrigger value="donate">Donate Item</TabsTrigger>
          </TabsList>
          <TabsContent value="centers">
            {/* Organizations List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {organizations.map((org, index) => (
                <Card key={index} data-aos="fade" data-aos-delay="100" data-aos-duration="800" className="border-gray-500/50 hover:border-green-700 hover:shadow-md transition-all duration-300 ease">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-1">{org.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {org.location}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{org.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Accepted Materials */}
                      <div>
                        <h4 className="font-medium mb-2">Accepts:</h4>
                        <div className="flex flex-wrap gap-1">
                          {org.acceptedMaterials.map((material: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {material}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span>{org.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{org.hours}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600">{org.description}</p>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1 bg-gray-900 text-white font-semibold">
                          <MapPin className="mr-2 h-4 w-4" />
                          Get Directions
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 border-gray-500/50 hover:bg-green-700 hover:text-white transition-all duration-300 ease">
                          <Phone className="mr-2 h-4 w-4" />
                          Call
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="donate" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <h3 className="font-medium text-green-800 mb-2">Share Your Recyclables</h3>
                <p className="text-green-700 text-sm">
                  Have recyclable items to share? List them here so others in your community can find and reuse them.
                </p>
              </div>

              <Card className="border-gray-500/50">
                <CardHeader>
                  <CardTitle>Donate an Item</CardTitle>
                  <CardDescription>Fill out this form to list your recyclable item for others to claim</CardDescription>
                </CardHeader>
                <CardContent>
                  <DonateItemForm />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function getMockOrganizations() {
  return [
    {
      name: "Kids Who Farm",
      location: "Zamboanga City",
      rating: 4.8,
      phone: "+63 2 8123 4567",
      hours: "Mon-Fri 8AM-5PM",
      acceptedMaterials: ["PET Bottles", "Aluminum Cans", "Paper", "Cardboard"],
      description: "Community-driven recycling center focused on urban waste reduction.",
    },
    {
      name: "EcoHub Philippines",
      location: "Taguig City",
      rating: 4.6,
      phone: "+63 2 8234 5678",
      hours: "Daily 7AM-7PM",
      acceptedMaterials: ["All Plastics", "Glass", "Electronics", "Textiles"],
      description: "Modern recycling facility with state-of-the-art sorting equipment.",
    },
    {
      name: "Recycle Center BGC",
      location: "Bonifacio Global City",
      rating: 4.9,
      phone: "+63 2 8345 6789",
      hours: "Mon-Sat 9AM-6PM",
      acceptedMaterials: ["Plastic Bottles", "Paper", "Electronics", "Batteries"],
      description: "Premium recycling center serving the BGC community.",
    },
    {
      name: "Quezon City Waste Management",
      location: "Quezon City",
      rating: 4.4,
      phone: "+63 2 8456 7890",
      hours: "Mon-Fri 6AM-4PM",
      acceptedMaterials: ["Mixed Recyclables", "Organic Waste", "Hazardous Materials"],
      description: "Government-operated facility handling all types of waste.",
    },
  ]
}
