"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Recycle, Search, Download, ArrowLeft, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function UserDonationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  // Mock donations data
  const donations = [
    {
      id: "don-001",
      item: "Plastic Water Bottles",
      quantity: 15,
      weight: 0.8,
      organization: "Green Manila Initiative",
      location: "Makati City",
      date: "2024-01-15",
      status: "Completed",
      impact: "Saved 2.4 kg CO₂",
      qrCode: "QR-001",
    },
    {
      id: "don-002",
      item: "Cardboard Boxes",
      quantity: 8,
      weight: 2.1,
      organization: "EcoHub Philippines",
      location: "Taguig City",
      date: "2024-01-12",
      status: "Completed",
      impact: "Saved 4.2 kg CO₂",
      qrCode: "QR-002",
    },
    {
      id: "don-003",
      item: "Glass Jars",
      quantity: 6,
      weight: 1.2,
      organization: "Recycle Center BGC",
      location: "Bonifacio Global City",
      date: "2024-01-10",
      status: "Completed",
      impact: "Saved 1.8 kg CO₂",
      qrCode: "QR-003",
    },
    {
      id: "don-004",
      item: "Aluminum Cans",
      quantity: 12,
      weight: 0.6,
      organization: "Green Manila Initiative",
      location: "Makati City",
      date: "2024-01-08",
      status: "Processing",
      impact: "Will save 3.6 kg CO₂",
      qrCode: "QR-004",
    },
    {
      id: "don-005",
      item: "Paper Documents",
      quantity: 25,
      weight: 1.5,
      organization: "Paper Recyclers Inc.",
      location: "Quezon City",
      date: "2024-01-05",
      status: "Completed",
      impact: "Saved 2.8 kg CO₂",
      qrCode: "QR-005",
    },
  ]

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch =
      donation.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.organization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || donation.status.toLowerCase() === statusFilter
    const matchesDate = dateFilter === "all" // Add date filtering logic here

    return matchesSearch && matchesStatus && matchesDate
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-50 text-green-700 border-green-200"
      case "Processing":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "Pending":
        return "bg-blue-50 text-blue-700 border-blue-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const totalStats = {
    totalDonations: donations.length,
    totalWeight: donations.reduce((sum, d) => sum + d.weight, 0),
    totalItems: donations.reduce((sum, d) => sum + d.quantity, 0),
    totalImpact: donations.reduce((sum, d) => sum + Number.parseFloat(d.impact.match(/[\d.]+/)?.[0] || "0"), 0),
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/user/profile" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Profile
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Donations</h1>
            <p className="text-gray-600">Track all your recycling contributions and environmental impact</p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <Recycle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStats.totalDonations}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Items Donated</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStats.totalItems}</div>
              <p className="text-xs text-muted-foreground">Individual items</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weight Donated</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStats.totalWeight.toFixed(1)} kg</div>
              <p className="text-xs text-muted-foreground">Total weight</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CO₂ Saved</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStats.totalImpact.toFixed(1)} kg</div>
              <p className="text-xs text-muted-foreground">Environmental impact</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search donations..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Donations List */}
        <div className="space-y-4">
          {filteredDonations.map((donation) => (
            <Card key={donation.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex items-start gap-4 flex-grow">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Recycle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{donation.item}</h3>
                          <p className="text-gray-600">{donation.organization}</p>
                        </div>
                        <Badge variant="outline" className={getStatusColor(donation.status)}>
                          {donation.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <p className="text-gray-500">Quantity</p>
                          <p className="font-medium">{donation.quantity} items</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Weight</p>
                          <p className="font-medium">{donation.weight} kg</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Date</p>
                          <p className="font-medium">{new Date(donation.date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">QR Code</p>
                          <p className="font-medium font-mono text-xs">{donation.qrCode}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{donation.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          <span>{donation.impact}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDonations.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Recycle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No donations found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || statusFilter !== "all" || dateFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Start recycling to see your donations here"}
              </p>
              <Button asChild>
                <Link href="/browse">Find Items to Donate</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
