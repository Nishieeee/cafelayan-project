"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  //  BarChart,
  // Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  Package,
  Recycle,
  MapPin,
  TrendingUp,
  Building2,
  Download,
  Star,
  Clock,
  Truck,
} from "lucide-react";
import { PartnershipDetailsDialog } from "@/components/partnership-details-dialog";
import Link from "next/link";
import Header from "@/components/Header";

type DonationRequest = {
  type: "donation";
  donor: string;
  amount: number;
  material: string;
  city: string;
  time: string;
};

type ProcessingRequest = {
  type: "processing";
  amount: number;
  material: string;
  status: string;
  time: string;
};

type PickupRequest = {
  type: "pickup";
  donor: string;
  amount: number;
  material: string;
  city: string;
  time: string;
};

type RequestDetails = DonationRequest | ProcessingRequest | PickupRequest;

export type PartnershipRequest = {
  brandName: string;
  logo: string;
  requestDate: string;
  expectedVolume: string;
  partnershipType: string;
  contactPerson: string;
  email: string;
  phone?: string;
  message: string;
  city: string;
  productTypes?: string[];
  companySize?: string;
  sustainabilityGoals?: string;
};
interface PartnershipDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: PartnershipRequest;
}
export default function OrganizationDashboard() {
  // Mock data - would come from API
  const organizationData = {
    name: "Kids Who Farm",
    logo: "/kwf.jpg",
    totalDonations: 15847,
    totalDonors: 34,
    activeCities: 8,
    monthlyGrowth: 18,
    processingCapacity: 85,
  };

  const monthlyDonations = [
    { month: "Jan", donations: 1200, processed: 1150 },
    { month: "Feb", donations: 1450, processed: 1400 },
    { month: "Mar", donations: 1680, processed: 1620 },
    { month: "Apr", donations: 1520, processed: 1480 },
    { month: "May", donations: 1890, processed: 1850 },
    { month: "Jun", donations: 2100, processed: 2050 },
  ];

  const donationsByCity = [
    { city: "Makati City", donations: 4200, percentage: 26.5 },
    { city: "Taguig City", donations: 3800, percentage: 24.0 },
    { city: "Quezon City", donations: 2900, percentage: 18.3 },
    { city: "Pasig City", donations: 2100, percentage: 13.2 },
    { city: "Mandaluyong", donations: 1600, percentage: 10.1 },
    { city: "Others", donations: 1247, percentage: 7.9 },
  ];

  const topDonors = [
    {
      name: "Cafelayan Lettuce Chips",
      logo: "/placeholder.svg?height=40&width=40",
      donations: 3245,
      growth: 15,
      lastDonation: "2 days ago",
      partnership: "Official",
      productTypes: ["Plastic Packaging", "Organic Waste"],
    },
    {
      name: "FreshJuice Co.",
      logo: "/placeholder.svg?height=40&width=40",
      donations: 2890,
      growth: 22,
      lastDonation: "1 day ago",
      partnership: "Official",
      productTypes: ["Juice Containers", "Smoothie Bottles"],
    },
    {
      name: "EcoSnacks",
      logo: "/placeholder.svg?height=40&width=40",
      donations: 2156,
      growth: -5,
      lastDonation: "3 days ago",
      partnership: "Community",
      productTypes: ["Snack Packages", "Chip Bags"],
    },
    {
      name: "HealthyEats",
      logo: "/placeholder.svg?height=40&width=40",
      donations: 1834,
      growth: 8,
      lastDonation: "1 week ago",
      partnership: "Community",
      productTypes: ["Food Containers", "Cereal Boxes"],
    },
    {
      name: "PureDrinks",
      logo: "/placeholder.svg?height=40&width=40",
      donations: 1567,
      growth: 12,
      lastDonation: "4 days ago",
      partnership: "Official",
      productTypes: ["Beverage Bottles", "Energy Drinks"],
    },
  ];
  const materialTypes = [
    { name: "PET Plastic", value: 8500, color: "#0088FE", percentage: 53.6 },
    { name: "Cardboard", value: 3200, color: "#00C49F", percentage: 20.2 },
    { name: "Tetra Pak", value: 2800, color: "#FFBB28", percentage: 17.7 },
    { name: "PP Plastic", value: 1347, color: "#FF8042", percentage: 8.5 },
  ];

  const recentActivity = [
    {
      type: "donation",
      donor: "AquaPure",
      amount: 150,
      material: "PET Bottles",
      city: "Makati City",
      time: "2 hours ago",
    },
    {
      type: "processing",
      amount: 200,
      material: "Cardboard",
      status: "Completed",
      time: "4 hours ago",
    },
    {
      type: "donation",
      donor: "FreshJuice Co.",
      amount: 85,
      material: "Juice Containers",
      city: "Taguig City",
      time: "6 hours ago",
    },
    {
      type: "pickup",
      donor: "EcoSnacks",
      amount: 120,
      material: "Snack Packages",
      city: "Quezon City",
      time: "1 day ago",
    },
  ];
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<PartnershipRequest | null>(null);

  const handleViewDetails = (request: PartnershipRequest) => {
    setSelectedRequest(request);
    setShowDetailsDialog(true);
  };

  return (
    <>
      <div className="container py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={organizationData.logo || "/placeholder.svg"}
                  alt={organizationData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {organizationData.name}
                </h1>
                <p className="text-gray-600">Organization Dashboard</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-gray-500/50 hover:scale-103 transition-transform duration-300 ease"
              >
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
              <Link href="/browse">
                <Button className="bg-green-700 hover:bg-green-800 text-white">
                  <Truck className="mr-2 h-4 w-4" />
                  Browse donations
                </Button>
              </Link>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <Card className="border-gray-500/50 hover:bg-green-700 hover:text-white transition-color duration-300 ease">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Donations
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {organizationData.totalDonations.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  +{organizationData.monthlyGrowth}% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-500/50 hover:bg-green-700 hover:text-white transition-color duration-300 ease">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Donors
                </CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {organizationData.totalDonors}
                </div>
                <p className="text-xs text-muted-foreground">
                  +3 new this month
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-500/50 hover:bg-green-700 hover:text-white transition-color duration-300 ease">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Cities Served
                </CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {organizationData.activeCities}
                </div>
                <p className="text-xs text-muted-foreground">
                  Metro Manila area
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-500/50 hover:bg-green-700 hover:text-white transition-color duration-300 ease">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Processing Rate
                </CardTitle>
                <Recycle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {organizationData.processingCapacity}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Current capacity
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-500/50 hover:bg-green-700 hover:text-white transition-color duration-300 ease">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  This Month
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,100</div>
                <p className="text-xs text-muted-foreground">Items received</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="donors">Donors</TabsTrigger>
              <TabsTrigger value="geography">Geography</TabsTrigger>
              <TabsTrigger value="partnerships">Partnerships</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Donation Volume Over Time */}
                <Card className="border-gray-500/50">
                  <CardHeader>
                    <CardTitle>Donation Volume Over Time</CardTitle>
                    <CardDescription>
                      Monthly donations received and processed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={monthlyDonations}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="donations"
                          stackId="1"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="processed"
                          stackId="1"
                          stroke="#22c55e"
                          fill="#22c55e"
                          fillOpacity={0.8}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Material Types */}
                <Card className="border-gray-500/50">
                  <CardHeader>
                    <CardTitle>Material Types Received</CardTitle>
                    <CardDescription>
                      Breakdown by material category
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={materialTypes}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percentage }) =>
                            `${name} ${percentage}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {materialTypes.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Processing Capacity */}
              <Card className="border-gray-500/50">
                <CardHeader>
                  <CardTitle>Processing Capacity</CardTitle>
                  <CardDescription>
                    Current utilization and capacity planning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Current Utilization
                      </span>
                      <span className="text-2xl font-bold">
                        {organizationData.processingCapacity}%
                      </span>
                    </div>
                    <Progress
                      value={organizationData.processingCapacity}
                      className="h-3"
                    />
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-blue-600 font-medium">
                          Daily Capacity
                        </p>
                        <p className="text-xl font-bold">500 items</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-green-600 font-medium">
                          Currently Processing
                        </p>
                        <p className="text-xl font-bold">425 items</p>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <p className="text-orange-600 font-medium">
                          Available Capacity
                        </p>
                        <p className="text-xl font-bold">75 items</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/*Donors Tab */}
            <TabsContent value="donors" className="space-y-6">
              <Card className="border-gray-500/50">
                <CardHeader>
                  <CardTitle>Most Donated Brands</CardTitle>
                  <CardDescription>
                    Brands with the most product donated
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topDonors.map((donor, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border-gray-500/50 p-4 border rounded-lg hover:scale-103 hover:border-green-700 transition-all duration-300 ease"
                      >
                        <div className="flex items-center gap-4 ">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={donor.logo || "/placeholder.svg"}
                              alt={donor.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{donor.name}</h4>
                              <Badge
                                variant={
                                  donor.partnership === "Official"
                                    ? "default"
                                    : "outline"
                                }
                                className="text-xs"
                              >
                                {donor.partnership}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{donor.lastDonation}</span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {donor.productTypes
                                  .slice(0, 2)
                                  .map((type, idx) => (
                                    <Badge
                                      key={idx}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {type}
                                    </Badge>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">
                            {donor.donations.toLocaleString()}
                          </p>
                          <div className="flex items-center gap-1 text-sm">
                            <TrendingUp
                              className={`h-3 w-3 ${
                                donor.growth > 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            />
                            <span
                              className={
                                donor.growth > 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            >
                              {donor.growth > 0 ? "+" : ""}
                              {donor.growth}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* <Card>
              <CardHeader>
                <CardTitle>Donor Performance</CardTitle>
                <CardDescription>Donations received by donor organization</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topDonors}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="donations" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card> */}
            </TabsContent>

            {/* Geography Tab */}
            <TabsContent value="geography" className="space-y-6">
              <Card className="border-gray-500/50">
                <CardHeader>
                  <CardTitle>Donations by City</CardTitle>
                  <CardDescription>
                    Geographic distribution of received donations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {donationsByCity.map((city, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{city.city}</span>
                          <div className="text-right">
                            <span className="font-bold">
                              {city.donations.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-500 ml-2">
                              donations
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={city.percentage}
                            className="flex-1 h-2"
                          />
                          <span className="text-sm text-gray-500 w-12">
                            {city.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* <Card>
              <CardHeader>
                <CardTitle>City Performance</CardTitle>
                <CardDescription>Donation volume by city</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={donationsByCity} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="city" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="donations" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card> */}

              <Card className="border-gray-500/50">
                <CardHeader>
                  <CardTitle>Service Area Impact</CardTitle>
                  <CardDescription>
                    Environmental impact across service areas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-700">
                        3.2 tons
                      </div>
                      <div className="text-sm text-gray-600">
                        Waste processed
                      </div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-700">
                        1,200 kg
                      </div>
                      <div className="text-sm text-gray-600">
                        CO2 emissions saved
                      </div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-700">
                        18,500L
                      </div>
                      <div className="text-sm text-gray-600">Water saved</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Partnerships Tab */}
            <TabsContent value="partnerships" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pending Partnership Requests */}
                <Card className="border-gray-500/50">
                  <CardHeader>
                    <CardTitle>Pending Partnership Requests</CardTitle>
                    <CardDescription>
                      New partnership requests awaiting your review
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          brandName: "Cafelayan Lettuce Chips",
                          logo: "/placeholder.svg?height=40&width=40",
                          requestDate: "2 days ago",
                          expectedVolume: "Medium (500-2000 items)",
                          partnershipType: "Official Partnership",
                          contactPerson: "Jeffrey Sereno",
                          email: "freyy@gmail.com",
                          message:
                            "We're looking to partner with organizations in Zamboanga City for our new sustainable packaging initiative...",
                          city: "Zamboanga City",
                        },
                        {
                          brandName: "GreenPack Solutions",
                          logo: "/placeholder.svg?height=40&width=40",
                          requestDate: "5 days ago",
                          expectedVolume: "Large (2000+ items)",
                          partnershipType: "Official Partnership",
                          contactPerson: "Juan Dela Cruz",
                          email: "juan@greenpack.ph",
                          message:
                            "Our company produces eco-friendly food packaging and we'd like to establish a recycling partnership...",
                          city: "Makati City",
                        },
                        {
                          brandName: "CleanDrinks Inc.",
                          logo: "/placeholder.svg?height=40&width=40",
                          requestDate: "1 week ago",
                          expectedVolume: "Small (0-500 items)",
                          partnershipType: "Community Partnership",
                          contactPerson: "Ana Rodriguez",
                          email: "ana@cleandrinks.com",
                          message:
                            "We're a startup beverage company interested in community-level recycling partnerships...",
                          city: "Taguig City",
                        },
                      ].map((request, index) => (
                        <div
                          key={index}
                          className="p-4 border rounded-lg space-y-3  border-gray-500/50 hover:border-green-700 transition-colors duration-300 ease"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden">
                                <img
                                  src={request.logo || "/placeholder.svg"}
                                  alt={request.brandName}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium">
                                  {request.brandName}
                                </h4>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <MapPin className="h-3 w-3" />
                                  <span>{request.city}</span>
                                  <span>•</span>
                                  <span>{request.requestDate}</span>
                                </div>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {request.partnershipType}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Expected Volume</p>
                              <p className="font-medium">
                                {request.expectedVolume}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Contact Person</p>
                              <p className="font-medium">
                                {request.contactPerson}
                              </p>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 line-clamp-2">
                            {request.message}
                          </p>

                          <div className="flex gap-2 pt-2">
                            <Button
                              size="sm"
                              className="bg-green-700 hover:bg-green-800 text-white hover:scale-103 transition-transform duration-300 ease"
                            >
                              Accept Partnership
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewDetails(request)}
                              className="hover:scale-103 transition-transform duration-300 ease"
                            >
                              View Details
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white hover:scale-103 transition-all duration-300 ease"
                            >
                              Decline
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Current Partnerships */}
                <Card className="border-gray-500/50">
                  <CardHeader>
                    <CardTitle>Current Partnerships</CardTitle>
                    <CardDescription>
                      Active partnerships and their status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topDonors.slice(0, 3).map((donor, index) => (
                        <div
                          key={index}
                          className="p-4 border rounded-lg border-gray-500/50 hover:border-green-700 transition-colors duration-300 ease"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden">
                                <img
                                  src={donor.logo || "/placeholder.svg"}
                                  alt={donor.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium">{donor.name}</h4>
                                <Badge
                                  variant={
                                    donor.partnership === "Official"
                                      ? "default"
                                      : "outline"
                                  }
                                  className="text-xs"
                                >
                                  {donor.partnership}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">
                                {donor.donations.toLocaleString()}
                              </p>
                              <p className="text-xs text-gray-500">
                                total donations
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                            <div>
                              <p className="text-gray-500">Last Donation</p>
                              <p className="font-medium">
                                {donor.lastDonation}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Growth Rate</p>
                              <p
                                className={`font-medium ${
                                  donor.growth > 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {donor.growth > 0 ? "+" : ""}
                                {donor.growth}%
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              View Contract
                            </Button>
                            <Button size="sm" variant="outline">
                              Contact
                            </Button>
                            <Button size="sm" variant="outline">
                              Renew
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Partnership Analytics */}
              {/* <Card>
              <CardHeader>
                <CardTitle>Partnership Performance</CardTitle>
                <CardDescription>Analytics on partnership effectiveness and growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700">12</div>
                    <div className="text-sm text-gray-600">Official Partners</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-700">8</div>
                    <div className="text-sm text-gray-600">Community Partners</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-700">3</div>
                    <div className="text-sm text-gray-600">Pending Requests</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-700">95%</div>
                    <div className="text-sm text-gray-600">Partner Satisfaction</div>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      { month: "Jan", newPartnerships: 2, renewals: 1 },
                      { month: "Feb", newPartnerships: 1, renewals: 2 },
                      { month: "Mar", newPartnerships: 3, renewals: 1 },
                      { month: "Apr", newPartnerships: 2, renewals: 3 },
                      { month: "May", newPartnerships: 4, renewals: 2 },
                      { month: "Jun", newPartnerships: 1, renewals: 4 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="newPartnerships" fill="#3b82f6" name="New Partnerships" />
                    <Bar dataKey="renewals" fill="#22c55e" name="Renewals" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card> */}

              {/* Partnership Benefits */}
              <Card className="border-gray-500/50">
                <CardHeader>
                  <CardTitle>Partnership Benefits & Requirements</CardTitle>
                  <CardDescription>
                    What we offer and what we expect from partners
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3 text-green-700">
                        What We Offer
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <div>
                            <p className="font-medium">
                              Reliable Collection Service
                            </p>
                            <p className="text-sm text-gray-600">
                              Regular pickup schedules and emergency collection
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <div>
                            <p className="font-medium">
                              Detailed Impact Reporting
                            </p>
                            <p className="text-sm text-gray-600">
                              Monthly sustainability reports and analytics
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <div>
                            <p className="font-medium">
                              Certification & Recognition
                            </p>
                            <p className="text-sm text-gray-600">
                              Environmental impact certificates for marketing
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <div>
                            <p className="font-medium">
                              Co-marketing Opportunities
                            </p>
                            <p className="text-sm text-gray-600">
                              Joint sustainability campaigns and PR
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3 text-blue-700">
                        Partnership Requirements
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div>
                            <p className="font-medium">
                              Minimum Volume Commitment
                            </p>
                            <p className="text-sm text-gray-600">
                              Consistent monthly donation volumes
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div>
                            <p className="font-medium">Quality Standards</p>
                            <p className="text-sm text-gray-600">
                              Clean, sorted materials ready for processing
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div>
                            <p className="font-medium">
                              Communication Protocol
                            </p>
                            <p className="text-sm text-gray-600">
                              Regular updates and coordination meetings
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div>
                            <p className="font-medium">
                              Sustainability Commitment
                            </p>
                            <p className="text-sm text-gray-600">
                              Alignment with environmental goals and values
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-6">
              <Card className="border-gray-500/50">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest donations, pickups, and processing activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg "
                      >
                        <div className="p-2 rounded-full bg-white">
                          {activity.type === "donation" && (
                            <Package className="h-4 w-4 text-blue-600" />
                          )}
                          {activity.type === "processing" && (
                            <Recycle className="h-4 w-4 text-green-600" />
                          )}
                          {activity.type === "pickup" && (
                            <Truck className="h-4 w-4 text-purple-600" />
                          )}
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">
                              {activity.type === "donation" &&
                                `New donation from ${activity.donor}`}
                              {activity.type === "processing" &&
                                `Processing completed`}
                              {activity.type === "pickup" &&
                                `Pickup scheduled with ${activity.donor}`}
                            </h4>
                            {activity.type === "processing" && (
                              <Badge
                                variant="outline"
                                className="text-xs bg-green-50 text-green-700"
                              >
                                {activity.status}
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            {activity.amount} {activity.material}
                            {activity.city && ` from ${activity.city}`}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-gray-500/50">
                  <CardHeader>
                    <CardTitle>Weekly Schedule</CardTitle>
                    <CardDescription>
                      Upcoming pickups and processing
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        {
                          day: "Monday",
                          pickups: 3,
                          processing: "PET Bottles",
                        },
                        { day: "Tuesday", pickups: 2, processing: "Cardboard" },
                        {
                          day: "Wednesday",
                          pickups: 4,
                          processing: "Mixed Materials",
                        },
                        {
                          day: "Thursday",
                          pickups: 1,
                          processing: "Tetra Pak",
                        },
                        { day: "Friday", pickups: 3, processing: "PP Plastic" },
                      ].map((day, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 border rounded  border-gray-500/50 hover:border-green-700 transition-colors duration-300 ease"
                        >
                          <div>
                            <p className="font-medium">{day.day}</p>
                            <p className="text-sm text-gray-500">
                              {day.processing}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{day.pickups} pickups</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-500/50">
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>
                      Key performance indicators
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Processing Efficiency</span>
                        <span className="font-medium">94%</span>
                      </div>
                      <Progress value={94} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm">On-time Pickups</span>
                        <span className="font-medium">98%</span>
                      </div>
                      <Progress value={98} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm">Donor Satisfaction</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">4.8/5</span>
                        </div>
                      </div>
                      <Progress value={96} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          {selectedRequest && (
            <PartnershipDetailsDialog
              open={showDetailsDialog}
              onOpenChange={setShowDetailsDialog}
              request={selectedRequest}
            />
          )}
        </div>
      </div>
    </>
  );
}
