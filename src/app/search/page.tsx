"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Package,
  Building2,
  Users,
  User,
  MapPin,
  Calendar,
  Star,
  Recycle,
  Filter,
  X,
  TrendingUp,
  Globe,
  Mail,
} from "lucide-react"
import Link from "next/link"

// Types for search results
interface Product {
  id: string
  name: string
  brand: string
  brandId: string
  category: string
  material: string
  recyclability: string
  image: string
  description: string
  registrationDate: string
  totalScans: number
  totalDonations: number
}

interface Brand {
  id: string
  name: string
  logo: string
  description: string
  category: string
  location: string
  verified: boolean
  totalProducts: number
  totalDonations: number
  sustainabilityScore: number
  joinDate: string
  website?: string
}

interface Organization {
  id: string
  name: string
  logo: string
  description: string
  type: string
  location: string
  verified: boolean
  totalCollected: number
  partnersCount: number
  rating: number
  establishedYear: string
  contactEmail: string
}

interface UserProfile {
  id: string
  name: string
  avatar: string
  location: string
  level: string
  totalDonations: number
  totalWeight: number
  joinDate: string
  badges: string[]
  isPublic: boolean
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  // const [filterCategory, setFilterCategory] = useState("all")
  // const [filterLocation, setFilterLocation] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  // Mock data - would come from API
  const mockProducts: Product[] = [
    {
      id: "cafelayan-250g-001",
      name: "Cafelayan Lettuce Chips",
      brand: "Cafelayan",
      brandId: "cafelayan",
      category: "Food",
      material: "PET Plastic",
      recyclability: "Highly Recyclable",
      image: "/placeholder.svg?height=60&width=60",
      description: "Organic chips in upcyclable packaging",
      registrationDate: "2026-01-15",
      totalScans: 2847,
      totalDonations: 1256,
    },
    {
      id: "ecosnacks-chips-002",
      name: "EcoSnacks Organic Chips",
      brand: "EcoSnacks",
      brandId: "ecosnacks",
      category: "Food",
      material: "Cardboard",
      recyclability: "Recyclable",
      image: "/placeholder.svg?height=60&width=60",
      description: "Organic chips in eco-friendly cardboard packaging",
      registrationDate: "2025-02-01",
      totalScans: 1523,
      totalDonations: 892,
    },
    {
      id: "greenjuice-smoothie-003",
      name: "GreenJuice Smoothie Bottle",
      brand: "GreenJuice Co.",
      brandId: "greenjuice",
      category: "Beverages",
      material: "Glass",
      recyclability: "Highly Recyclable",
      image: "/placeholder.svg?height=60&width=60",
      description: "Premium glass bottle for fresh smoothies",
      registrationDate: "2025-01-20",
      totalScans: 1834,
      totalDonations: 967,
    },
  ]

  const mockBrands: Brand[] = [
    {
      id: "cafelayan",
      name: "Cafelayan",
      logo: "/placeholder.svg?height=60&width=60",
      description: "Leading the way in sustainable packaging and environmental responsibility. Join us in creating a cleaner, greener Philippines through innovative recycling solutions.",
      category: "Food",
      location: "Zamboanga City, Philippines",
      verified: true,
      totalProducts: 3,
      totalDonations: 15847,
      sustainabilityScore: 92,
      joinDate: "2025-06-15",
      website: "https://cafelayan.netlify.app",
    },
    {
      id: "ecosnacks",
      name: "EcoSnacks",
      logo: "/placeholder.svg?height=60&width=60",
      description: "Organic snack company focused on sustainable packaging and healthy eating",
      category: "Food",
      location: "Quezon City, Metro Manila",
      verified: true,
      totalProducts: 8,
      totalDonations: 8934,
      sustainabilityScore: 88,
      joinDate: "2025-08-20",
      website: "https://ecosnacks.ph",
    },
    {
      id: "greenjuice",
      name: "GreenJuice Co.",
      logo: "/placeholder.svg?height=60&width=60",
      description: "Fresh juice company promoting healthy living and environmental sustainability",
      category: "Beverages",
      location: "Cebu City, Cebu",
      verified: false,
      totalProducts: 6,
      totalDonations: 4521,
      sustainabilityScore: 85,
      joinDate: "2025-11-10",
    },
  ]

  const mockOrganizations: Organization[] = [
    {
      id: "green-manila",
      name: "Green Manila Initiative",
      logo: "/placeholder.svg?height=60&width=60",
      description: "Leading recycling organization in Metro Manila focused on plastic waste reduction",
      type: "Recycling Center",
      location: "Makati City, Metro Manila",
      verified: true,
      totalCollected: 45200,
      partnersCount: 34,
      rating: 4.8,
      establishedYear: "2018",
      contactEmail: "info@greenmanila.org",
    },
    {
      id: "ecohub-ph",
      name: "EcoHub Philippines",
      logo: "/placeholder.svg?height=60&width=60",
      description: "Community-driven recycling hub serving multiple cities across the Philippines",
      type: "Community Center",
      location: "Quezon City, Metro Manila",
      verified: true,
      totalCollected: 32800,
      partnersCount: 28,
      rating: 4.6,
      establishedYear: "2020",
      contactEmail: "contact@ecohub.ph",
    },
    {
      id: "recycle-bgc",
      name: "Recycle Center BGC",
      logo: "/placeholder.svg?height=60&width=60",
      description: "Modern recycling facility specializing in corporate waste management",
      type: "Processing Facility",
      location: "Taguig City, Metro Manila",
      verified: true,
      totalCollected: 28500,
      partnersCount: 19,
      rating: 4.7,
      establishedYear: "2019",
      contactEmail: "hello@recyclebgc.com",
    },
  ]

  const mockUsers: UserProfile[] = [
    {
      id: "maria-santos",
      name: "Maria Santos",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Makati City, Metro Manila",
      level: "Eco Champion",
      totalDonations: 127,
      totalWeight: 45.2,
      joinDate: "2025-06-15",
      badges: ["First Donation", "Week Warrior", "Plastic Hero"],
      isPublic: true,
    },
    {
      id: "juan-cruz",
      name: "Juan Dela Cruz",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Quezon City, Metro Manila",
      level: "Green Guardian",
      totalDonations: 234,
      totalWeight: 89.5,
      joinDate: "2025-03-20",
      badges: ["Community Leader", "Streak Master", "Eco Master"],
      isPublic: true,
    },
    {
      id: "ana-rodriguez",
      name: "Ana Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Cebu City, Cebu",
      level: "Eco Champion",
      totalDonations: 198,
      totalWeight: 76.2,
      joinDate: "2025-05-10",
      badges: ["Monthly Champion", "Green Warrior", "Sustainability Star"],
      isPublic: true,
    },
  ]

  // Search logic
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return {
        products: mockProducts,
        brands: mockBrands,
        organizations: mockOrganizations,
        users: mockUsers,
      }
    }

    const query = searchQuery.toLowerCase()

    const products = mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.material.toLowerCase().includes(query),
    )

    const brands = mockBrands.filter(
      (brand) =>
        brand.name.toLowerCase().includes(query) ||
        brand.description.toLowerCase().includes(query) ||
        brand.category.toLowerCase().includes(query) ||
        brand.location.toLowerCase().includes(query),
    )

    const organizations = mockOrganizations.filter(
      (org) =>
        org.name.toLowerCase().includes(query) ||
        org.description.toLowerCase().includes(query) ||
        org.type.toLowerCase().includes(query) ||
        org.location.toLowerCase().includes(query),
    )

    const users = mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.location.toLowerCase().includes(query) ||
        user.level.toLowerCase().includes(query),
    )

    return { products, brands, organizations, users }
  }, [searchQuery])

  // Get total results count
  const totalResults =
    filteredResults.products.length +
    filteredResults.brands.length +
    filteredResults.organizations.length +
    filteredResults.users.length

  // Simulate loading
  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true)
      const timer = setTimeout(() => setIsLoading(false), 500)
      return () => clearTimeout(timer)
    }
  }, [searchQuery])

  const clearSearch = () => {
    setSearchQuery("")
    setActiveTab("all")
    setSortBy("relevance")
    // setFilterCategory("all")
    // setFilterLocation("all")
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search</h1>
          <p className="text-gray-600">Find products, brands, organizations, and users in the LoopLinkEco community</p>
        </div>

        {/* Search Bar */}
        <Card className="mb-6 border-gray-500/50">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search for products, brands, organizations, or users..."
                  className="pl-10 pr-10 border-gray-500/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 border-gray-500/50"
                    onClick={clearSearch}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px] border-gray-500/50">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="relevance" className="hover:bg-green-300">Relevance</SelectItem>
                    <SelectItem value="newest" className="hover:bg-green-300">Newest</SelectItem>
                    <SelectItem value="popular" className="hover:bg-green-300">Most Popular</SelectItem>
                    <SelectItem value="rating" className="hover:bg-green-300">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" className="border-gray-500/50">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-gray-600">
              {isLoading ? (
                "Searching..."
              ) : (
                <>
                  Found <span className="font-medium">{totalResults}</span> results for &ldquo;
                  <span className="font-medium">{searchQuery}</span>&rdquo;
                </>
              )}
            </p>
          </div>
        )}

        {/* Results Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="flex justify-between overflow-x-auto whitespace-nowrap no-scrollbar sm:px-5 px-2 bg-gray-300/20">
            <TabsTrigger value="all" className="w-full">All ({totalResults})</TabsTrigger>
            <TabsTrigger value="products" className="w-full">
              <Package className="mr-2 h-4 w-4" />
              Products ({filteredResults.products.length})
            </TabsTrigger>
            <TabsTrigger value="brands" className="w-full">
              <Building2 className="mr-2 h-4 w-4" />
              Brands ({filteredResults.brands.length})
            </TabsTrigger>
            <TabsTrigger value="organizations" className="w-full">
              <Users className="mr-2 h-4 w-4" />
              Organizations ({filteredResults.organizations.length})
            </TabsTrigger>
            <TabsTrigger value="users" className="w-full">
              <User className="mr-2 h-4 w-4" />
              Users ({filteredResults.users.length})
            </TabsTrigger>
          </TabsList>

          {/* All Results Tab */}
          <TabsContent value="all" className="space-y-6">
            {/* Products Section */}
            {filteredResults.products.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Products ({filteredResults.products.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {filteredResults.products.slice(0, 6).map((product) => (
                    <Card key={product.id} className="hover:shadow-md transition-shadow border-gray-500/50">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow min-w-0">
                            <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
                            <p className="text-xs text-gray-600 mb-2">by {product.brand}</p>
                            <div className="flex flex-wrap gap-1 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {product.material}
                              </Badge>
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                                {product.recyclability}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>{product.totalScans} scans</span>
                              <span>•</span>
                              <span>{product.totalDonations} donations</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {filteredResults.products.length > 6 && (
                  <Button variant="outline" onClick={() => setActiveTab("products")}>
                    View all {filteredResults.products.length} products
                  </Button>
                )}
              </div>
            )}

            {/* Brands Section */}
            {filteredResults.brands.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Brands ({filteredResults.brands.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {filteredResults.brands.slice(0, 4).map((brand) => (
                    <Card key={brand.id} className="hover:shadow-md transition-shadow border-gray-500/50" >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={brand.logo || "/placeholder.svg"}
                              alt={brand.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{brand.name}</h3>
                              {brand.verified && (
                                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{brand.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{brand.location}</span>
                              </div>
                              <span>{brand.totalProducts} products</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {filteredResults.brands.length > 4 && (
                  <Button variant="outline" onClick={() => setActiveTab("brands")} className="border-gray-500/50">
                    View all {filteredResults.brands.length} brands
                  </Button>
                )}
              </div>
            )}

            {/* Organizations Section */}
            {filteredResults.organizations.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Organizations ({filteredResults.organizations.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {filteredResults.organizations.slice(0, 4).map((org) => (
                    <Card key={org.id} className="hover:shadow-md transition-shadow border-gray-500/50">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={org.logo || "/placeholder.svg"}
                              alt={org.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{org.name}</h3>
                              {org.verified && (
                                <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{org.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span>{org.rating}</span>
                              </div>
                              <span>{org.totalCollected.toLocaleString()} items collected</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {filteredResults.organizations.length > 4 && (
                  <Button variant="outline" onClick={() => setActiveTab("organizations")} className="border-gray-500/50">
                    View all {filteredResults.organizations.length} organizations
                  </Button>
                )}
              </div>
            )}

            {/* Users Section */}
            {filteredResults.users.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Users ({filteredResults.users.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {filteredResults.users.slice(0, 6).map((user) => (
                    <Card key={user.id} className="hover:shadow-md transition-shadow border-gray-500/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-grow">
                            <h3 className="font-medium text-sm">{user.name}</h3>
                            <Badge variant="outline" className="text-xs mb-1">
                              {user.level}
                            </Badge>
                            <div className="text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{user.location}</span>
                              </div>
                              <div>
                                {user.totalDonations} donations • {user.totalWeight} kg
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {filteredResults.users.length > 6 && (
                  <Button variant="outline" onClick={() => setActiveTab("users")} className="border-gray-500/50">
                    View all {filteredResults.users.length} users
                  </Button>
                )}
              </div>
            )}

            {/* No Results */}
            {totalResults === 0 && searchQuery && !isLoading && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn&apos;t find anything matching &quo;{searchQuery}&quo;. Try adjusting your search terms.
                </p>
                <Button variant="outline" onClick={clearSearch} className="border-gray-500/50">
                  Clear Search
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResults.products.map((product) => (
                <Card key={product.id} className="hover:shadow-md transition-shadow border-gray-500/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="font-medium line-clamp-1 mb-1">{product.name}</h3>
                        <Link href={`/brand/${product.brandId}`} className="text-sm text-blue-600 hover:underline">
                          {product.brand}
                        </Link>
                        <p className="text-sm text-gray-600 line-clamp-2 mt-2 mb-3">{product.description}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          <Badge variant="outline" className="text-xs">
                            {product.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {product.material}
                          </Badge>
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                            {product.recyclability}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            <span>{product.totalScans} scans</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Recycle className="h-3 w-3" />
                            <span>{product.totalDonations} donations</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredResults.products.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try searching with different keywords or browse all products.</p>
              </div>
            )}
          </TabsContent>

          {/* Brands Tab */}
          <TabsContent value="brands" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResults.brands.map((brand) => (
                <Card key={brand.id} className="hover:shadow-md transition-shadow border-gray-500/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={brand.logo || "/placeholder.svg"}
                          alt={brand.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{brand.name}</h3>
                          {brand.verified && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3 line-clamp-2">{brand.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline">{brand.category}</Badge>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            {brand.sustainabilityScore}% Sustainability Score
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                          <div>
                            <p className="text-gray-500">Products</p>
                            <p className="font-medium">{brand.totalProducts}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Total Donations</p>
                            <p className="font-medium">{brand.totalDonations.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{brand.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Since {new Date(brand.joinDate).getFullYear()}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" asChild>
                            <Link href={`/brand/${brand.id}`}>View Profile</Link>
                          </Button>
                          {brand.website && (
                            <Button size="sm" variant="outline" asChild>
                              <a href={brand.website} target="_blank" rel="noopener noreferrer">
                                <Globe className="mr-2 h-4 w-4" />
                                Website
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredResults.brands.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No brands found</h3>
                <p className="text-gray-600">Try searching with different keywords or browse all brands.</p>
              </div>
            )}
          </TabsContent>

          {/* Organizations Tab */}
          <TabsContent value="organizations" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResults.organizations.map((org) => (
                <Card key={org.id} className="hover:shadow-md transition-shadow border-gray-500/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={org.logo || "/placeholder.svg"}
                          alt={org.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{org.name}</h3>
                          {org.verified && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3 line-clamp-2">{org.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline">{org.type}</Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{org.rating}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                          <div>
                            <p className="text-gray-500">Items Collected</p>
                            <p className="font-medium">{org.totalCollected.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Partners</p>
                            <p className="font-medium">{org.partnersCount}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{org.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Est. {org.establishedYear}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" asChild>
                            <Link href={`/organization/${org.id}`}>View Profile</Link>
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <a href={`mailto:${org.contactEmail}`}>
                              <Mail className="mr-2 h-4 w-4" />
                              Contact
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredResults.organizations.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No organizations found</h3>
                <p className="text-gray-600">Try searching with different keywords or browse all organizations.</p>
              </div>
            )}
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResults.users.map((user) => (
                <Card key={user.id} className="hover:shadow-md transition-shadow border-gray-500/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <h3 className="font-medium">{user.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPin className="h-3 w-3" />
                          <span>{user.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {user.level}
                      </Badge>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-gray-500">Donations</p>
                          <p className="font-medium">{user.totalDonations}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Weight</p>
                          <p className="font-medium">{user.totalWeight} kg</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {user.badges.slice(0, 3).map((badge, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                      {user.badges.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{user.badges.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <Button size="sm" variant="outline" className="w-full" asChild>
                      <Link href={`/user/${user.id}`}>View Profile</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredResults.users.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                <p className="text-gray-600">Try searching with different keywords.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
