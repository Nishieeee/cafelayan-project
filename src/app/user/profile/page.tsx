"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  User,
  Award,
  TrendingUp,
  Calendar,
  MapPin,
  Recycle,
  Trophy,
  Medal,
  MoreHorizontal,
  Check,
  X,
  Building2,
  Mail,
  Phone,
  Clock,
  Target,
  Leaf,
  Gift,
  Edit,
  Settings,
} from "lucide-react"
import Link from "next/link"

export default function UserProfilePage() {
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)

  // Mock user data
  const userData = {
    id: "user-001",
    name: "Jhon Clein Pagarogan",
    email: "angpanday@email.com",
    avatar: "/placeholder.svg?height=80&width=80",
    joinDate: "2023-06-15",
    location: "Zamboanga City",
    totalDonations: 127,
    totalWeight: 45.2, // kg
    co2Saved: 89.4, // kg
    waterSaved: 2340, // liters
    currentStreak: 12,
    longestStreak: 28,
    level: "Young Tree",
    nextLevel: "Forest Friend",
    levelProgress: 75,
    badges: [
      { name: "First Donation", icon: "🎯", earned: "2023-06-20" },
      { name: "Week Warrior", icon: "⚡", earned: "2023-07-01" },
      { name: "Plastic Hero", icon: "♻️", earned: "2023-08-15" },
      { name: "Community Leader", icon: "👥", earned: "2023-09-10" },
      { name: "Streak Master", icon: "🔥", earned: "2023-10-05" },
    ],
    recentDonations: [
      {
        id: "don-001",
        item: "Plastic Water Bottles",
        quantity: 15,
        organization: "Green Manila Initiative",
        date: "2024-01-15",
        weight: 0.8,
        status: "Completed",
      },
      {
        id: "don-002",
        item: "Cardboard Boxes",
        quantity: 8,
        organization: "EcoHub Philippines",
        date: "2024-01-12",
        weight: 2.1,
        status: "Completed",
      },
      {
        id: "don-003",
        item: "Glass Jars",
        quantity: 6,
        organization: "Recycle Center BGC",
        date: "2024-01-10",
        weight: 1.2,
        status: "Completed",
      },
    ],
  }

  // Mock leaderboard data
  const leaderboardData = [
    {
      rank: 1,
      name: "Giorno Giovanni",
      avatar: "/placeholder.svg?height=40&width=40",
      donations: 234,
      weight: 89.5,
      level: "Eco Guardian",
      isCurrentUser: false,
    },
    {
      rank: 2,
      name: "Irene Joestar",
      avatar: "/placeholder.svg?height=40&width=40",
      donations: 198,
      weight: 76.2,
      level: "Forest Friend",
      isCurrentUser: false,
    },
    {
      rank: 3,
      name: "Donquixote Donflamingo",
      avatar: "/placeholder.svg?height=40&width=40",
      donations: 167,
      weight: 62.8,
      level: "Forest Friend",
      isCurrentUser: false,
    },
    {
      rank: 4,
      name: "Jhon Clein Pagarogan",
      avatar: "/placeholder.svg?height=40&width=40",
      donations: 127,
      weight: 45.2,
      level: "Young Tree",
      isCurrentUser: true,
    },
    {
      rank: 5,
      name: "Roberto Silva",
      avatar: "/placeholder.svg?height=40&width=40",
      donations: 112,
      weight: 41.7,
      level: "Sapling",
      isCurrentUser: false,
    },
  ]

  // Mock organization requests
  const organizationRequests = [
    {
      id: "req-001",
      organizationName: "Green Future Foundation",
      contactPerson: "Dr. Elena Reyes",
      email: "elena@greenfuture.org",
      phone: "+63 2 8234 5678",
      location: "Quezon City, Metro Manila",
      requestDate: "2024-01-10",
      requestType: "Partnership",
      expectedVolume: "Large (2000+ items/month)",
      description:
        "We are a non-profit organization focused on environmental education and waste management. We would like to partner with RecyclePH to expand our recycling programs in Quezon City and nearby areas.",
      materials: ["PET Plastic", "Cardboard", "Paper", "Glass"],
      certifications: ["DOE Accredited", "DENR Registered"],
      website: "https://greenfuture.org",
      status: "Pending",
    },
    {
      id: "req-002",
      organizationName: "Cebu Eco Warriors",
      contactPerson: "Mark Gonzales",
      email: "mark@cebueco.com",
      phone: "+63 32 234 5678",
      location: "Cebu City, Cebu",
      requestDate: "2024-01-08",
      requestType: "Community Partnership",
      expectedVolume: "Medium (500-2000 items/month)",
      description:
        "Community-based recycling initiative serving Cebu City. We have been operating for 3 years and want to join the RecyclePH network to better serve our community.",
      materials: ["All Plastics", "Aluminum", "Electronics"],
      certifications: ["LGU Registered", "Community Certified"],
      website: "https://cebueco.com",
      status: "Pending",
    },
    {
      id: "req-003",
      organizationName: "Davao Recycling Hub",
      contactPerson: "Sarah Lim",
      email: "sarah@davaorecycling.ph",
      phone: "+63 82 234 5678",
      location: "Davao City, Davao del Sur",
      requestDate: "2024-01-05",
      requestType: "Official Partnership",
      expectedVolume: "Large (2000+ items/month)",
      description:
        "Established recycling facility with state-of-the-art equipment. We process various materials and have partnerships with local manufacturers for upcycling initiatives.",
      materials: ["PET Plastic", "HDPE", "PP Plastic", "Cardboard", "Paper"],
      certifications: ["ISO 14001", "DENR Licensed", "DOE Accredited"],
      website: "https://davaorecycling.ph",
      status: "Pending",
    },
  ]

  const handleApproveRequest = (request: any) => {
    setSelectedRequest(request)
    setShowApproveDialog(true)
  }

  const handleRejectRequest = (request: any) => {
    setSelectedRequest(request)
    setShowRejectDialog(true)
  }

  const confirmApprove = () => {
    console.log("Approved request:", selectedRequest.id)
    setShowApproveDialog(false)
    setSelectedRequest(null)
  }

  const confirmReject = () => {
    console.log("Rejected request:", selectedRequest.id)
    setShowRejectDialog(false)
    setSelectedRequest(null)
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Eco Guardian":
        return "bg-emerald-500 text-emerald-800 border-emerald-200"
      case "Forest Friend":
        return "bg-green-400 text-green-800 border-green-200"
      case "Young Tree":
        return "bg-emerald-400 text-green-200 border-green-200"
      case "Sapling":
        return "bg-lime-100 text-lime-800 border-lime-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>
    }
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
              <AvatarFallback>
                {userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{userData.name}</h1>
              <div className="flex items-center gap-4 text-gray-600 mt-1">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{userData.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(userData.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="requests">Organization Requests</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-gray-500/50 hover:bg-green-700 hover:text-white transition-colors duration-300 ease">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
                  <Recycle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userData.totalDonations}</div>
                  <p className="text-xs text-muted-foreground">+12 this month</p>
                </CardContent>
              </Card>

              <Card className="border-gray-500/50 hover:bg-green-700 hover:text-white transition-colors duration-300 ease">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Weight Donated</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userData.totalWeight} kg</div>
                  <p className="text-xs text-muted-foreground">+4.2 kg this month</p>
                </CardContent>
              </Card>

              <Card className="border-gray-500/50 hover:bg-green-700 hover:text-white transition-colors duration-300 ease">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">CO₂ Saved</CardTitle>
                  <Leaf className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userData.co2Saved} kg</div>
                  <p className="text-xs text-muted-foreground">Environmental impact</p>
                </CardContent>
              </Card>

              <Card className="border-gray-500/50 hover:bg-green-700 hover:text-white transition-colors duration-300 ease">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userData.currentStreak} days</div>
                  <p className="text-xs text-muted-foreground">Longest: {userData.longestStreak} days</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Level Progress */}
              <Card className="border-gray-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Level Progress
                  </CardTitle>
                  <CardDescription>Your journey to becoming a recycling champion</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={getLevelColor(userData.level)}>
                      {userData.level}
                    </Badge>
                    <span className="text-sm text-gray-500">Next: {userData.nextLevel}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress to next level</span>
                      <span>{userData.levelProgress}%</span>
                    </div>
                    <Progress value={userData.levelProgress} className="h-2" />
                  </div>
                  <div className="text-sm text-gray-600">
                    {100 - userData.levelProgress}% more to reach {userData.nextLevel}
                  </div>
                </CardContent>
              </Card>

              {/* Environmental Impact */}
              <Card className="border-gray-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5" />
                    Environmental Impact
                  </CardTitle>
                  <CardDescription>Your contribution to a greener planet</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-700">{userData.co2Saved} kg</div>
                      <div className="text-xs text-gray-600">CO₂ Emissions Saved</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-700">{userData.waterSaved}L</div>
                      <div className="text-xs text-gray-600">Water Saved</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Your recycling efforts have saved enough energy to power a home for{" "}
                    <span className="font-medium">3.2 days</span>!
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Donations */}
            <Card className="border-gray-500/50">
              <CardHeader>
                <CardTitle>Recent Donations</CardTitle>
                <CardDescription>Your latest recycling contributions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.recentDonations.map((donation, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-500/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Recycle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{donation.item}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{donation.quantity} items</span>
                            <span>{donation.weight} kg</span>
                            <span>{donation.organization}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {donation.status}
                        </Badge>
                        <p className="text-sm text-gray-500 mt-1">{new Date(donation.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-6 border-gray-500/50">
                  <Button variant="outline" asChild className="border-gray-500/50 hover:bg-green-700 hover:text-white transition-colors duration-300 ease">
                    <Link href="/user/my-donations">View All Donations</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="border-gray-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Community Leaderboard
                </CardTitle>
                <CardDescription>Top recyclers in your area this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboardData.map((user, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg border border-gray-500/50 ${
                        user.isCurrentUser ? "bg-blue-50 border-blue-200" : "bg-white" 
                      } hover:scale-102 hover:border-green-700 transition-all duration-300 ease`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 flex items-center justify-center">{getRankIcon(user.rank)}</div>
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium flex items-center gap-2">
                            {user.name}
                            {user.isCurrentUser && <Badge variant="outline">You</Badge>}
                          </h4>
                          <Badge variant="outline" className={getLevelColor(user.level)}>
                            {user.level}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{user.donations}</div>
                        <div className="text-sm text-gray-500">{user.weight} kg donated</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Monthly Challenge */}
            <Card className="border-gray-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Monthly Challenge
                </CardTitle>
                <CardDescription>Recycle 50 items this month to earn a special badge</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Progress</span>
                    <span className="text-sm text-gray-500">32/50 items</span>
                  </div>
                  <Progress value={64} className="h-3" />
                  <div className="text-sm text-gray-600">You&apos;re 64% of the way there! Keep up the great work.</div>
                  <div className="flex items-center gap-2 text-sm">
                    <Gift className="h-4 w-4 text-purple-600" />
                    <span>Reward: &quo;Monthly Champion&quo; badge + 500 points</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Organization Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <Card className="border-gray-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Organization Partnership Requests
                </CardTitle>
                <CardDescription>
                  Review and approve organizations wanting to join the RecyclePH network
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {organizationRequests.map((request, index) => (
                    <div key={index} className="border rounded-lg p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{request.organizationName}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{request.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>Requested {new Date(request.requestDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleApproveRequest(request)}>
                              <Check className="mr-2 h-4 w-4 text-green-600" />
                              Approve Request
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRejectRequest(request)}>
                              <X className="mr-2 h-4 w-4 text-red-600" />
                              Reject Request
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Contact Organization
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Contact Information</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <User className="h-3 w-3 text-gray-400" />
                              <span>{request.contactPerson}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-3 w-3 text-gray-400" />
                              <span>{request.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3 text-gray-400" />
                              <span>{request.phone}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Partnership Details</h4>
                          <div className="space-y-2">
                            <Badge variant="outline">{request.requestType}</Badge>
                            <div className="text-sm">
                              <span className="text-gray-500">Expected Volume:</span>
                              <span className="ml-2">{request.expectedVolume}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Description</h4>
                        <p className="text-sm text-gray-600">{request.description}</p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Accepted Materials</h4>
                        <div className="flex flex-wrap gap-2">
                          {request.materials.map((material, idx) => (
                            <Badge key={idx} variant="outline">
                              {material}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Certifications</h4>
                        <div className="flex flex-wrap gap-2">
                          {request.certifications.map((cert, idx) => (
                            <Badge key={idx} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={() => handleApproveRequest(request)}
                          className="bg-green-700 hover:bg-green-800"
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                        <Button variant="outline" onClick={() => handleRejectRequest(request)}>
                          <X className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                        <Button variant="outline" asChild>
                          <a href={request.website} target="_blank" rel="noopener noreferrer">
                            Visit Website
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userData.badges.map((badge, index) => (
                <Card key={index} className="border-gray-500/50 hover:scale-102 hover:bg-green-400 hover:text-white transition-all duration-300 ease">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{badge.icon}</div>
                    <h3 className="font-semibold mb-2">{badge.name}</h3>
                    <p className="text-sm text-gray-600">Earned on {new Date(badge.earned).toLocaleDateString()}</p>
                  </CardContent>
                </Card>
              ))}

              {/* Locked Achievements */}
              <Card className="opacity-60 border-gray-500/50">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">🔒</div>
                  <h3 className="font-semibold mb-2">Eco Master</h3>
                  <p className="text-sm text-gray-600">Donate 500 items to unlock</p>
                </CardContent>
              </Card>

              <Card className="opacity-60 border-gray-500/50">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">🔒</div>
                  <h3 className="font-semibold mb-2">Community Builder</h3>
                  <p className="text-sm text-gray-600">Refer 10 friends to unlock</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Approval Dialog */}
        <AlertDialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Approve Organization Request</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to approve the partnership request from{" "}
                <strong>{selectedRequest?.organizationName}</strong>? This will add them to the RecyclePH network and
                allow them to receive donations.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmApprove} className="bg-green-700 hover:bg-green-800">
                Approve Request
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Rejection Dialog */}
        <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reject Organization Request</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to reject the partnership request from{" "}
                <strong>{selectedRequest?.organizationName}</strong>? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmReject} className="bg-red-600 hover:bg-red-700">
                Reject Request
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
