"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { ArrowLeft, QrCode, TrendingUp, Users, MapPin, Download, Share2, Calendar, Target } from "lucide-react"
import Link from "next/link"

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProductAnalyticsPage({ params }: PageProps) {
  const [timeRange, setTimeRange] = useState("30d")

  // Mock data - would come from API
  const product = {
    id: params.id,
    name: "Cafelayan Lettuce Chips",
    brand: "Cafelayan",
    material: "PET Plastic",
    status: "Active",
    registrationDate: "2025-01-15",
    image: "/placeholder.svg?height=60&width=60",
  }

  const analyticsData = {
    totalScans: 2847,
    totalDonations: 1256,
    conversionRate: 44.1,
    donationRate: 2234,
    avgScansPerUser: 1.27,
    topCities: [
      { city: "Metro Manila", scans: 1423, donations: 628 },
      { city: "Cebu City", scans: 567, donations: 251 },
      { city: "Davao City", scans: 423, donations: 187 },
      { city: "Iloilo City", scans: 234, donations: 103 },
      { city: "Baguio City", scans: 200, donations: 87 },
    ],
    dailyScans: [
      { date: "2024-01-01", scans: 45, donations: 20 },
      { date: "2024-01-02", scans: 52, donations: 23 },
      { date: "2024-01-03", scans: 38, donations: 17 },
      { date: "2024-01-04", scans: 61, donations: 27 },
      { date: "2024-01-05", scans: 49, donations: 22 },
      { date: "2024-01-06", scans: 73, donations: 32 },
      { date: "2024-01-07", scans: 67, donations: 30 },
      { date: "2024-01-08", scans: 55, donations: 24 },
      { date: "2024-01-09", scans: 82, donations: 36 },
      { date: "2024-01-10", scans: 71, donations: 31 },
    ],
    hourlyDistribution: [
      { hour: "00", scans: 12 },
      { hour: "01", scans: 8 },
      { hour: "02", scans: 5 },
      { hour: "03", scans: 3 },
      { hour: "04", scans: 4 },
      { hour: "05", scans: 7 },
      { hour: "06", scans: 15 },
      { hour: "07", scans: 28 },
      { hour: "08", scans: 45 },
      { hour: "09", scans: 67 },
      { hour: "10", scans: 89 },
      { hour: "11", scans: 102 },
      { hour: "12", scans: 134 },
      { hour: "13", scans: 156 },
      { hour: "14", scans: 143 },
      { hour: "15", scans: 167 },
      { hour: "16", scans: 189 },
      { hour: "17", scans: 201 },
      { hour: "18", scans: 178 },
      { hour: "19", scans: 145 },
      { hour: "20", scans: 123 },
      { hour: "21", scans: 98 },
      { hour: "22", scans: 67 },
      { hour: "23", scans: 34 },
    ],
    deviceTypes: [
      { name: "Mobile", value: 2134, color: "#0088FE" },
      { name: "Desktop", value: 567, color: "#00C49F" },
      { name: "Tablet", value: 146, color: "#FFBB28" },
    ],
    userActions: [
      { action: "Viewed Donation Centers", count: 1567, percentage: 55.1 },
      { action: "Viewed DIY Tutorials", count: 1234, percentage: 43.4 },
      { action: "Downloaded Instructions", count: 892, percentage: 31.3 },
      { action: "Shared Product", count: 456, percentage: 16.0 },
      { action: "Contacted Organization", count: 234, percentage: 8.2 },
    ],
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/brand/products" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-gray-600">Product Analytics & Performance</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[140px] border-gray-500/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-500/50">
                <SelectItem value="7d" className="hover:bg-green-300">Last 7 days</SelectItem>
                <SelectItem value="30d" className="hover:bg-green-300">Last 30 days</SelectItem>
                <SelectItem value="90d" className="hover:bg-green-300">Last 90 days</SelectItem>
                <SelectItem value="1y" className="hover:bg-green-300">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-gray-500/50">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" className="border-gray-500/50">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="border-gray-500/50 hover:bg-green-700 hover:text-white transition-colors duration-300 ease">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
              <QrCode className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.totalScans.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last period</p>
            </CardContent>
          </Card>

          <Card className="border-gray-500/50 hover:bg-green-700 hover:text-white transition-colors duration-300 ease">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Donations</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.totalDonations.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+18% from last period</p>
            </CardContent>
          </Card>

          <Card className="border-gray-500/50 hover:bg-green-700 hover:text-white transition-colors duration-300 ease">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.conversionRate}%</div>
              <p className="text-xs text-muted-foreground">+2.1% from last period</p>
            </CardContent>
          </Card>

          <Card className=" border-gray-500/50 hover:bg-green-700 hover:text-white transition-colors duration-300 ease">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Donation Rate</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">56.2%</div>
              <p className="text-xs text-muted-foreground">Total manufactured: {analyticsData.donationRate.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="border-gray-500/50 hover:bg-green-700 hover:text-white transition-colors duration-300 ease">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Scans/User</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.avgScansPerUser}</div>
              <p className="text-xs text-muted-foreground">+0.15 from last period</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="geography">Geography</TabsTrigger>
            <TabsTrigger value="behavior">User Behavior</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Scans Trend */}
              <Card className="border-gray-500/50">
                <CardHeader>
                  <CardTitle>Daily Scans & Donations</CardTitle>
                  <CardDescription>Scan and donation trends over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={analyticsData.dailyScans}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                      <YAxis />
                      <Tooltip labelFormatter={(value) => new Date(value).toLocaleDateString()} />
                      <Area
                        type="monotone"
                        dataKey="scans"
                        stackId="1"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="donations"
                        stackId="1"
                        stroke="#22c55e"
                        fill="#22c55e"
                        fillOpacity={0.8}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Hourly Distribution */}
              <Card className="border-gray-500/50">
                <CardHeader>
                  <CardTitle>Hourly Scan Distribution</CardTitle>
                  <CardDescription>When users scan your QR codes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analyticsData.hourlyDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="scans" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* User Actions */}
            <Card className="border-gray-500/50">
              <CardHeader>
                <CardTitle>User Actions After Scanning</CardTitle>
                <CardDescription>What users do after scanning your QR code</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.userActions.map((action, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-grow">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{action.action}</span>
                          <span className="text-sm text-gray-500">{action.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${action.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <span className="font-bold">{action.count.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Geography Tab */}
          <TabsContent value="geography" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-gray-500/50">
                <CardHeader>
                  <CardTitle>Top Cities</CardTitle>
                  <CardDescription>Cities with the most QR code scans</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.topCities.map((city, index) => (
                      <div key={index} className="flex items-center border-gray-500/50 justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <MapPin className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{city.city}</p>
                            <p className="text-sm text-gray-500">{city.donations} donations</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{city.scans.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">scans</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-500/50">
                <CardHeader>
                  <CardTitle>Geographic Performance</CardTitle>
                  <CardDescription>Scan volume by city</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analyticsData.topCities} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="city" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="scans" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Behavior Tab */}
          <TabsContent value="behavior" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-gray-500/50">
                <CardHeader>
                  <CardTitle>Conversion Funnel</CardTitle>
                  <CardDescription>User journey from scan to donation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <span className="font-medium">QR Code Scanned</span>
                      <span className="font-bold">{analyticsData.totalScans.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <span className="font-medium">Viewed Product Page</span>
                      <span className="font-bold">{Math.round(analyticsData.totalScans * 0.85).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                      <span className="font-medium">Viewed Donation Options</span>
                      <span className="font-bold">{Math.round(analyticsData.totalScans * 0.62).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                      <span className="font-medium">Completed Donation</span>
                      <span className="font-bold">{analyticsData.totalDonations.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-500/50">
                <CardHeader>
                  <CardTitle>Time on Page</CardTitle>
                  <CardDescription>How long users spend on your product page</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">2m 34s</div>
                      <div className="text-sm text-gray-500">Average time on page</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold">68%</div>
                        <div className="text-xs text-gray-600">Bounce Rate</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold">1.8</div>
                        <div className="text-xs text-gray-600">Pages/Session</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Devices Tab */}
          <TabsContent value="devices" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-gray-500/50">
                <CardHeader>
                  <CardTitle>Device Types</CardTitle>
                  <CardDescription>Devices used to scan QR codes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={analyticsData.deviceTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {analyticsData.deviceTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-gray-500/50">
                <CardHeader>
                  <CardTitle>Device Performance</CardTitle>
                  <CardDescription>Conversion rates by device type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.deviceTypes.map((device, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{device.name}</span>
                          <div className="text-right">
                            <span className="font-bold">{device.value.toLocaleString()}</span>
                            <span className="text-sm text-gray-500 ml-2">scans</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${(device.value / analyticsData.totalScans) * 100}%`,
                              backgroundColor: device.color,
                            }}
                          ></div>
                        </div>
                        <div className="text-sm text-gray-500">Conversion: {(Math.random() * 20 + 35).toFixed(1)}%</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-gray-500/50">
                <CardHeader>
                  <CardTitle>Performance Score</CardTitle>
                  <CardDescription>Overall product performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">87</div>
                    <div className="text-sm text-gray-500">Out of 100</div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Scan Volume</span>
                        <span className="font-medium">92/100</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Conversion Rate</span>
                        <span className="font-medium">85/100</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Donation Rate</span>
                        <span className="font-medium">56/100</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>User Engagement</span>
                        <span className="font-medium">84/100</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-500/50">
                <CardHeader>
                  <CardTitle>Benchmarks</CardTitle>
                  <CardDescription>vs. industry average</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Conversion Rate</span>
                        <span className="text-green-600">+12% above avg</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Scan Volume</span>
                        <span className="text-blue-600">+8% above avg</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "72%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Donation Volume</span>
                        <span className="text-yellow-600">+7% above avg</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "56%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>User Retention</span>
                        <span className="text-orange-600">-3% below avg</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{ width: "58%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-500/50">
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                  <CardDescription>Improve your performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium text-blue-800 text-sm">Optimize QR Placement</div>
                      <div className="text-blue-700 text-xs">Consider placing QR codes in more visible locations</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-800 text-sm">Add Incentives</div>
                      <div className="text-green-700 text-xs">Offer rewards for successful donations</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-medium text-purple-800 text-sm">Improve Instructions</div>
                      <div className="text-purple-700 text-xs">Clearer recycling instructions may help</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
