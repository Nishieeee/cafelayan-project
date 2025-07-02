"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Package,
  Recycle,
  MapPin,
  TrendingUp,
  Building2,
  Award,
  Plus,
  ExternalLink,
  Download,
  Trophy,
  Medal,
  User,
} from "lucide-react";
import { PartnershipRequestDialog } from "@/components/partnership-request-dialog";
import Link from "next/link";
import type { BrandDashboard, CityData } from "@/types/brand";
import { DonatorDetails } from "@/components/donator-details";
import { useAuth } from "@/context/AuthContext";

export type DonatorRequest = {
  donorName: string;
  city: string;
  image: string;
  rank: string;
  email: string;
  phone: string;
};

const donorDummy: DonatorRequest = {
  donorName: "John Doe",
  city: "Zamboanga City",
  image: "/placeholder.svg?height=40&width=40",
  rank: "Eco Guardian",
  email: "johnDoe@test.com",
  phone: "0912345678",
};

// Mock brand data - would come from API
const brandDashboardData: Record<string, BrandDashboard> = {
  cafelayan: {
    name: "Cafelayan",
    logo: "/cafelayanlogo.jpeg",
    totalProducts: 45672,
    totalDonations: 12834,
    totalScans: 28945,
    partneredOrganizations: 23,
    activeCities: 15,
    monthlyData: [
      { month: "Jan", scans: 2400, donations: 800 },
      { month: "Feb", scans: 2800, donations: 950 },
      { month: "Mar", scans: 3200, donations: 1100 },
      { month: "Apr", scans: 2900, donations: 980 },
      { month: "May", scans: 3800, donations: 1300 },
      { month: "Jun", scans: 4200, donations: 1450 },
    ],
    topOrganizations: [
      {
        name: "Kids Who Farm",
        donations: 3245,
        city: "Zamboanga City",
        partnership: "Official",
      },
      {
        name: "EcoHub Philippines",
        donations: 2890,
        city: "Taguig City",
        partnership: "Official",
      },
      {
        name: "Cebu Eco Warriors",
        donations: 2156,
        city: "Cebu City",
        partnership: "Community",
      },
      {
        name: "Davao Recycling Hub",
        donations: 1834,
        city: "Davao City",
        partnership: "Community",
      },
      {
        name: "Recycle Center BGC",
        donations: 1567,
        city: "Taguig City",
        partnership: "Official",
      },
    ],
    productTypes: [
      { name: "Cafelayan Lettuce chips", value: 8500, color: "#0088FE" },
      { name: "VBItes chips", value: 2800, color: "#00C49F" },
      { name: "Kale chips", value: 1200, color: "#FFBB28" },
      { name: "Other", value: 334, color: "#FF8042" },
    ],
  },
  dios: {
    name: "Dio's Heavenly Refreshing Juice",
    logo: "/diologo.jpg",
    totalProducts: 23450,
    totalDonations: 8920,
    totalScans: 18650,
    partneredOrganizations: 18,
    activeCities: 12,
    monthlyData: [
      { month: "Jan", scans: 1800, donations: 650 },
      { month: "Feb", scans: 2100, donations: 780 },
      { month: "Mar", scans: 2400, donations: 890 },
      { month: "Apr", scans: 2200, donations: 820 },
      { month: "May", scans: 2800, donations: 1050 },
      { month: "Jun", scans: 3200, donations: 1200 },
    ],
    topOrganizations: [
      {
        name: "Kids Who farm",
        donations: 2890,
        city: "Zamboanga City",
        partnership: "Official",
      },
      {
        name: "Davao Eco Center",
        donations: 2156,
        city: "Davao City",
        partnership: "Official",
      },
      {
        name: "Iloilo Recycling Hub",
        donations: 1834,
        city: "Iloilo City",
        partnership: "Community",
      },
      {
        name: "Baguio Environmental Group",
        donations: 1567,
        city: "Baguio City",
        partnership: "Community",
      },
      {
        name: "Palawan Green Initiative",
        donations: 1245,
        city: "Puerto Princesa",
        partnership: "Official",
      },
    ],
    productTypes: [
      { name: "Heavenly Refreshing Juice", value: 6500, color: "#0088FE" },
    ],
  },
};

export default function BrandDashboardPage() {
  const params = useParams();
  const brandId = params.id as string;
  const [showPartnershipDialog, setShowPartnershipDialog] = useState(false);
  const [brandData, setBrandData] = useState<BrandDashboard | null>(null);
  const [showDonatorDetails, setShowDonatorDetails] = useState(false);
  const { name } = useAuth();
  const [selectedRequest, setSelectedRequest] = useState<DonatorRequest | null>(
    null
  );

  const HandleViewDetails = (request: DonatorRequest) => {
    setSelectedRequest(request);
    setShowDonatorDetails(true);
  };

  const leaderboardData = [
    {
      rank: 1,
      name: "Giorno Giovanni",
      avatar: "/placeholder.svg?height=40&width=40",
      donations: 234,
      weight: 89.5,
      level: "Eco Guardian",
    },
    {
      rank: 2,
      name: "Irene Joestar",
      avatar: "/placeholder.svg?height=40&width=40",
      donations: 198,
      weight: 76.2,
      level: "Forest Friend",
    },
    {
      rank: 3,
      name: "Donquixote Donflamingo",
      avatar: "/placeholder.svg?height=40&width=40",
      donations: 167,
      weight: 62.8,
      level: "Forest Friend",
    },
    {
      rank: 4,
      name: "Jhon Clein Pagarogan",
      avatar: "/placeholder.svg?height=40&width=40",
      donations: 127,
      weight: 45.2,
      level: "Young Tree",
    },
    {
      rank: 5,
      name: "Roberto Silva",
      avatar: "/placeholder.svg?height=40&width=40",
      donations: 112,
      weight: 41.7,
      level: "Sapling",
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Eco Guardian":
        return "bg-emerald-500 text-emerald-800 border-emerald-200";
      case "Forest Friend":
        return "bg-green-400 text-green-800 border-green-200";
      case "Young Tree":
        return "bg-emerald-400 text-green-200 border-green-200";
      case "Sapling":
        return "bg-lime-100 text-lime-800 border-lime-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  useEffect(() => {
    // Simulate API call
    const data = brandDashboardData[brandId];
    if (data) {
      setBrandData(data);
    }
  }, [brandId]);

  if (!brandData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Brand Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The brand dashboard you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/search">Search Brands</Link>
          </Button>
        </div>
      </div>
    );
  }

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
  ];

  const cityData: CityData[] = [
    {
      city: "Metro Manila",
      scans: Math.floor(brandData.totalScans * 0.43),
      donations: Math.floor(brandData.totalDonations * 0.43),
      percentage: 43,
    },
    {
      city: "Cebu City",
      scans: Math.floor(brandData.totalScans * 0.2),
      donations: Math.floor(brandData.totalDonations * 0.2),
      percentage: 20,
    },
    {
      city: "Davao City",
      scans: Math.floor(brandData.totalScans * 0.15),
      donations: Math.floor(brandData.totalDonations * 0.15),
      percentage: 15,
    },
    {
      city: "Iloilo City",
      scans: Math.floor(brandData.totalScans * 0.1),
      donations: Math.floor(brandData.totalDonations * 0.1),
      percentage: 10,
    },
    {
      city: "Baguio City",
      scans: Math.floor(brandData.totalScans * 0.08),
      donations: Math.floor(brandData.totalDonations * 0.08),
      percentage: 8,
    },
    {
      city: "Others",
      scans: Math.floor(brandData.totalScans * 0.04),
      donations: Math.floor(brandData.totalDonations * 0.04),
      percentage: 4,
    },
  ];

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={brandData.logo || "/placeholder.svg"}
                alt={brandData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {brandData.name}
              </h1>
              <p className="text-gray-600">
                Recycling Impact & Partnership Analytics
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-gray-500/50 hover:bg-green-700 hover:text-white transition-colors duration-200 ease"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-gray-500/50 hover:bg-green-700 hover:text-white transition-colors duration-200 ease"
            >
              <Link href={`/brand/${name}/products`}>View All Products</Link>
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div data-aos="fade-up">
            <Card className="border-gray-500/50 hover:scale-103 hover:bg-green-700 hover:text-white transition-all duration-300 ease">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Products
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {brandData.totalProducts.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div data-aos="fade-up">
            <Card className="border-gray-500/50 hover:scale-103 hover:bg-green-700 hover:text-white transition-all duration-300 ease">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Donations
                </CardTitle>
                <Recycle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {brandData.totalDonations.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  +18% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div data-aos="fade-up">
            <Card className="border-gray-500/50 hover:scale-103 hover:bg-green-700 hover:text-white transition-all duration-300 ease">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">QR Scans</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {brandData.totalScans.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  +25% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div data-aos="fade-up">
            <Card className="border-gray-500/50 hover:scale-103 hover:bg-green-700 hover:text-white transition-all duration-300 ease">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Partner Organizations
                </CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {brandData.partneredOrganizations}
                </div>
                <p className="text-xs text-muted-foreground">
                  +3 new this month
                </p>
              </CardContent>
            </Card>
          </div>

          <div data-aos="fade-up">
            <Card className="border-gray-500/50 hover:scale-103 hover:bg-green-700 hover:text-white transition-all duration-300 ease">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Cities
                </CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {brandData.activeCities}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across Philippines
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6 ">
          <TabsList className="flex justify-between overflow-x-auto whitespace-nowrap no-scrollbar sm:px-5 px-2 bg-gray-300/20">
            <TabsTrigger value="overview" className="w-full">
              Overview
            </TabsTrigger>
            <TabsTrigger value="donors" className="w-full">
              Top Donors
            </TabsTrigger>
            <TabsTrigger value="organizations" className="w-full">
              Organizations
            </TabsTrigger>
            <TabsTrigger value="geography" className="w-full">
              Geography
            </TabsTrigger>
            <TabsTrigger value="partnerships" className="w-full">
              Partnerships
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Trends */}
              <Card data-aos="fade-up" className="border-gray-500/50">
                <CardHeader>
                  <CardTitle>Monthly Trends</CardTitle>
                  <CardDescription>
                    QR scans and donations over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={brandData.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="scans"
                        stroke="#8884d8"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="donations"
                        stroke="#82ca9d"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Product Types */}
              <Card data-aos="fade-up" className="border-gray-500/50">
                <CardHeader>
                  <CardTitle>Product Types Donated</CardTitle>
                  <CardDescription>
                    Breakdown by product category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={brandData.productTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {brandData.productTypes.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Conversion Rate */}
            <Card data-aos="fade-up" className="border-gray-500/50">
              <CardHeader>
                <CardTitle>Scan to Donation Conversion</CardTitle>
                <CardDescription>
                  How many scans result in actual donations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Conversion Rate</span>
                    <span className="text-2xl font-bold">44.3%</span>
                  </div>
                  <Progress value={44.3} className="h-2" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Total Scans</p>
                      <p className="font-medium">
                        {brandData.totalScans.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Resulted in Donations</p>
                      <p className="font-medium">
                        {brandData.totalDonations.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Organizations Tab */}
          <TabsContent value="organizations" className="space-y-6">
            <Card data-aos="fade-up" className="border-gray-500/50">
              <CardHeader>
                <CardTitle>Top Receiving Organizations</CardTitle>
                <CardDescription>
                  Organizations that received the most of your products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {brandData.topOrganizations.map((org, index) => (
                    <div key={index} data-aos="fade-up">
                      <div className="flex flex-col md:flex-row items-center justify-between p-4 border rounded-lg border-gray-500/50 hover:scale-101 hover:border-green-700 transition-all duration-300 ease">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-center md:text-start">
                              {org.name}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <MapPin className="h-3 w-3" />
                              <span>{org.city}</span>
                              <Badge
                                variant={
                                  org.partnership === "Official"
                                    ? "default"
                                    : "outline"
                                }
                                className="text-xs"
                              >
                                {org.partnership}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-lg">
                            {org.donations.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            donations received
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card data-aos="fade-up" className="border-gray-500/50">
              <CardHeader>
                <CardTitle>Organization Performance</CardTitle>
                <CardDescription>
                  Donations received by organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={brandData.topOrganizations}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="donations" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="donors">
            <Card data-aos="fade-up" className="border-gray-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Community Leaderboard
                </CardTitle>
                <CardDescription>
                  Top Donators of your product this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboardData.map((user, index) => (
                    <div key={index} data-aos="fade-up">
                      <div className="flex flex-col md:flex-row items-center justify-between p-4 rounded-lg border border-gray-500/50 hover:border-green-700 hover:scale-102 transition-all duration-300 ease">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                          <div className="w-12 h-12 flex items-center justify-center">
                            {getRankIcon(user.rank)}
                          </div>
                          <Avatar className="w-10 h-10">
                            <AvatarImage
                              src={user.avatar || "/placeholder.svg"}
                              alt={user.name}
                            />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex md:block flex-col items-center ">
                            <h4 className="font-medium flex items-center gap-2">
                              {user.name}
                            </h4>
                            <Badge
                              variant="outline"
                              className={getLevelColor(user.level)}
                            >
                              {user.level}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-center flex flex-col md:flex-row justify-center items-center">
                          <div>
                            <div className="font-bold text-lg">
                              {user.donations}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.weight} kg donated
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => HandleViewDetails(donorDummy)}
                            className="hover:bg-green-700 hover:text-white border-gray-500/50 transition-color duration-300 ease m-1"
                          >
                            <User className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {/* Geography Tab */}
          <TabsContent value="geography" className="space-y-6">
            <Card data-aos="fade-up" className="border-gray-500/50">
              <CardHeader>
                <CardTitle>Cities with Most Scans</CardTitle>
                <CardDescription>
                  Geographic distribution of QR code scans
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cityData.map((city, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{city.city}</span>
                        <div className="text-right">
                          <span className="font-bold">
                            {city.scans.toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-500 ml-2">
                            scans
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
                      <div className="text-sm text-gray-500">
                        {city.donations.toLocaleString()} donations
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card data-aos="fade-up" className="border-gray-500/50">
              <CardHeader>
                <CardTitle>Regional Impact</CardTitle>
                <CardDescription>
                  Environmental impact by region
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-700">
                      2.3 tons
                    </div>
                    <div className="text-sm text-gray-600">
                      Plastic diverted from landfills
                    </div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700">
                      15,400
                    </div>
                    <div className="text-sm text-gray-600">
                      Bottles Upcycled
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-700">
                      890 kg
                    </div>
                    <div className="text-sm text-gray-600">
                      CO2 emissions saved
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Partnerships Tab */}
          <TabsContent value="partnerships" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card data-aos="fade-up" className="border-gray-500/50">
                <CardHeader>
                  <CardTitle>Official Partners</CardTitle>
                  <CardDescription>
                    Organizations with formal partnerships
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {brandData.topOrganizations
                      .filter((org) => org.partnership === "Official")
                      .map((org, index) => (
                        <div key={index} data-aos="fade-up">
                          <div className="flex items-center justify-between p-3 border rounded-lg border-gray-500/50 hover:scale-101 hover:border-green-700 transition-all duration-300 ease">
                            <div className="flex items-center gap-3">
                              <Award className="h-5 w-5 text-yellow-500" />
                              <div>
                                <p className="font-medium">{org.name}</p>
                                <p className="text-sm text-gray-500">
                                  {org.city}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover:bg-green-700 hover:text-white border-gray-500/50 transition-color duration-300 ease"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card data-aos="fade-up" className="border-gray-500/50">
                <CardHeader>
                  <CardTitle>Partnership Benefits</CardTitle>
                  <CardDescription>
                    What you get with official partnerships
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Priority Collection</p>
                        <p className="text-sm text-gray-600">
                          Your products get collected first
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Detailed Reporting</p>
                        <p className="text-sm text-gray-600">
                          Monthly impact reports and analytics
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
                          Joint sustainability campaigns
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card data-aos="fade-up" className="border-gray-500/50">
              <CardHeader>
                <CardTitle>Request New Partnership</CardTitle>
                <CardDescription>
                  Connect with organizations in new cities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Expand Your Impact
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Partner with recycling organizations in new cities to
                    increase your environmental impact and reach more
                    communities.
                  </p>
                  <Button
                    onClick={() => setShowPartnershipDialog(true)}
                    className="bg-green-700 text-white hover:bg-green-800"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Request Partnership
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Partnership Request Dialog */}
        <PartnershipRequestDialog
          open={showPartnershipDialog}
          onOpenChange={setShowPartnershipDialog}
          brandName={brandData.name}
        />
        <DonatorDetails
          open={showDonatorDetails}
          onOpenChange={setShowDonatorDetails}
          request={selectedRequest ?? donorDummy}
        />
      </div>
    </div>
  );
}
