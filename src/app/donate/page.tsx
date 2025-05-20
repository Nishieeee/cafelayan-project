"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Clock, Navigation, Star } from "lucide-react"

export default function DonatePage() {
  const searchParams = useSearchParams()
  const packageId = searchParams.get("package")
  const [organizations, setOrganizations] = useState<any[]>([])
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
            />
            <Button variant="outline" className="hover:bg-green-700 hover:text-white hover:scale-103 transition-transform duration-300 ease">
              <Navigation className="mr-2 h-4 w-4 " />
              Search
            </Button>
          </div>
        </div>

        {/* Organizations List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {organizations.map((org, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-1">{org.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {org.location}
                    </CardDescription>
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
                        <Badge key={idx} variant="outline" className="text-xs hover:bg-(--foreground) hover:text-white">
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
                    <Button size="sm" className="flex-1">
                      <MapPin className="mr-2 h-4 w-4" />
                      Get Directions
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 hover:bg-green-700 hover:text-white hover:scale-103 transition-transform duration-300 ease">
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </Button>
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

function getMockOrganizations() {
  return [
    {
      name: "Kids Who Farm",
      location: "Tetuan Zamboanga City",
      rating: 4.8,
      phone: "+63 2 8123 4567",
      hours: "Mon-Fri 8AM-5PM",
      acceptedMaterials: ["PET Bottles", "Aluminum Cans", "Paper", "Cardboard"],
      description: "Community-driven recycling center focused on urban waste reduction.",
    },
    {
      name: "EcoHub Philippines",
      location: "Taguig City, Metro Manila",
      rating: 4.6,
      phone: "+63 2 8234 5678",
      hours: "Daily 7AM-7PM",
      acceptedMaterials: ["All Plastics", "Glass", "Electronics", "Textiles"],
      description: "Modern recycling facility with state-of-the-art sorting equipment.",
    },
    {
      name: "Recycle Center BGC",
      location: "Bonifacio Global City, Taguig",
      rating: 4.9,
      phone: "+63 2 8345 6789",
      hours: "Mon-Sat 9AM-6PM",
      acceptedMaterials: ["Plastic Bottles", "Paper", "Electronics", "Batteries"],
      description: "Premium recycling center serving the BGC community.",
    },
    {
      name: "Quezon City Waste Management",
      location: "Quezon City, Metro Manila",
      rating: 4.4,
      phone: "+63 2 8456 7890",
      hours: "Mon-Fri 6AM-4PM",
      acceptedMaterials: ["Mixed Recyclables", "Organic Waste", "Hazardous Materials"],
      description: "Government-operated facility handling all types of waste.",
    },
  ]
}
