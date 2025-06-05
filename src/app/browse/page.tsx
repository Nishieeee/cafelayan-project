"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Calendar, Filter } from "lucide-react"

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("all")
  const [distance, setDistance] = useState([10])
  const [sortBy, setSortBy] = useState("recent")

  // Filter donations based on search term and filters
  const filteredDonations = donations.filter((donation) => {
    const matchesSearch =
      donation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = category === "all" || donation.category === category

    return matchesSearch && matchesCategory
  })

  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Browse Donations</h1>
          <p className="text-gray-600 mt-1">Find farm and eco-friendly items available across the Philippines</p>
        </div>
        <Button asChild className="text-white bg-green-700 hover:bg-green-800">
          <Link href="/donate">Donate an Item</Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-500/50 p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6 ">
          <div className="relative flex-grow ">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search donations..."
              className="pl-10 border-gray-500/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full sm:w-[180px] border-gray-500/50">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="border-gray-500/50 bg-white">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Tools">Farm Tools</SelectItem>
                <SelectItem value="Seeds">Seeds & Plants</SelectItem>
                <SelectItem value="Equipment">Equipment</SelectItem>
                <SelectItem value="Eco-Friendly">Eco-Friendly</SelectItem>
                <SelectItem value="Irrigation">Irrigation</SelectItem>
                <SelectItem value="Books">Agricultural Books</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px] border-gray-500/50">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="border-gray-500/50 bg-white">
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="az">A-Z</SelectItem>
                <SelectItem value="za">Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium">Distance:</span>
          </div>
          <div className="flex-grow flex items-center gap-1">
            <div className="w-5 max-w-xs">
              <Slider defaultValue={[10]} max={50} step={1} value={distance} onValueChange={setDistance} />
            </div>
            <span className="text-sm font-medium min-w-[60px]">{distance[0]}km</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600">{filteredDonations.length} items found</p>
      </div>

      {filteredDonations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDonations.map((donation) => (
            <Link key={donation.id} href={`/donations/${donation.id}`}>
              <Card className="h-full border-gray-500/50 overflow-hidden hover:shadow-md hover:border-green-700 transition-all duration-300 ease">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={donation.image || "/placeholder.svg"}
                    alt={donation.title}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg line-clamp-1">{donation.title}</h3>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {donation.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 pb-2">
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">{donation.description}</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{donation.location}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-2 flex justify-between items-center text-xs text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{donation.postedDate}</span>
                  </div>
                  <span>{donation.condition}</span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No donations found</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            We couldn't find any donations matching your search criteria. Try adjusting your filters or search term.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setCategory("all")
              setDistance([10])
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}

// Sample data for donations
const donations = [
  {
    id: "1",
    title: "Organic Rice Seeds",
    description: "High-quality organic rice seeds suitable for lowland farming. Approximately 5kg of seeds available.",
    category: "Seeds",
    condition: "Good condition",
    location: "Laguna Province",
    postedDate: "2 days ago",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "2",
    title: "Garden Tiller",
    description:
      "Manual garden tiller in good working condition. Perfect for small to medium-sized plots. Sturdy metal construction.",
    category: "Tools",
    condition: "Used but functional",
    location: "Quezon City",
    postedDate: "1 day ago",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "3",
    title: "Bamboo Plant Holders",
    description:
      "Set of 10 handcrafted bamboo plant holders. Eco-friendly alternative to plastic pots. Various sizes available.",
    category: "Eco-Friendly",
    condition: "New",
    location: "Cebu City",
    postedDate: "3 days ago",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "4",
    title: "Vermicompost Starter Kit",
    description:
      "Complete vermicompost starter kit with worms, bedding material, and instructions. Great for organic gardening.",
    category: "Eco-Friendly",
    condition: "New",
    location: "Davao City",
    postedDate: "5 days ago",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "5",
    title: "Agricultural Books Collection",
    description:
      "Collection of 8 books on sustainable farming practices in the Philippines. Covers crop rotation, pest management, and more.",
    category: "Books",
    condition: "Excellent",
    location: "Iloilo City",
    postedDate: "1 week ago",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "6",
    title: "Solar Water Pump",
    description:
      "Small solar-powered water pump for irrigation. Perfect for areas without reliable electricity. Includes solar panel.",
    category: "Irrigation",
    condition: "Like new",
    location: "Batangas Province",
    postedDate: "4 days ago",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "7",
    title: "Coconut Husk Planters",
    description:
      "Set of 20 coconut husk planters. Biodegradable and perfect for seedlings. Locally made from recycled materials.",
    category: "Eco-Friendly",
    condition: "New",
    location: "Bohol Province",
    postedDate: "2 weeks ago",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "8",
    title: "Bamboo Trellis Set",
    description: "Set of 5 bamboo trellises for climbing plants. Sustainable alternative to plastic or metal options.",
    category: "Tools",
    condition: "Good condition",
    location: "Pampanga Province",
    postedDate: "1 week ago",
    image: "/placeholder.svg?height=300&width=300",
  },
]
