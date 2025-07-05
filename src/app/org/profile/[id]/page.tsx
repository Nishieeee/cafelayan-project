"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  MapPin,
  Globe,
  Mail,
  Phone,
  Calendar,
  Users,
  Recycle,
  Award,
  TrendingUp,
  Heart,
  Leaf,
  Target,
  HandHeart,
  Building2,
  CheckCircle2,
  ExternalLink,
  Clock,
  Star,
  BookOpen,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  LayoutDashboard,
} from "lucide-react";
import type { Organization } from "@/types/organization";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
// Mock data for organizations
const organizationsData: Record<string, Organization> = {
  kwf: {
    id: "kwf",
    name: "Kids Who Farm",
    type: "NGO",
    description:
      "A youth-led nonprofit in Zamboanga City that promotes sustainable agriculture through education, urban farmings, and community micro-gardens. Founded in 2019, it empowers kids and communities to grow their own food using creative, low-cost methods",
    mission:
      "To empower children, youth, and underserved communities through sustainable agriculture, food security education, and urban farming innovation.",
    avatar: "/kwf.jpg",
    coverImage: "/placeholder.svg?height=300&width=800",
    location: "Zamboanga City, Philippines",
    city: "Zamboanga City",
    website: "https://KidsWhoFarm.org",
    email: "contact@kwf.org",
    phone: "+63 2 8123 4567",
    establishedDate: "2019-03-15",
    verified: true,
    followers: 15420,
    volunteers: 342,
    totalDonationsReceived: 89650,
    totalItemsProcessed: 156780,
    totalPartnerships: 28,
    activeProgramsCount: 12,
    impactMetrics: [
      {
        label: "CO₂ Reduced",
        value: "2,450",
        unit: "tons",
        trend: 12,
        icon: "Leaf",
      },
      {
        label: "Waste Diverted",
        value: "156.8",
        unit: "tons",
        trend: 8,
        icon: "Recycle",
      },
      {
        label: "Communities Served",
        value: "45",
        unit: "areas",
        trend: 15,
        icon: "Users",
      },
      {
        label: "Waste Upcycled",
        value: "8,920",
        unit: "kg",
        trend: 22,
        icon: "Target",
      },
    ],
    programs: [
      {
        id: "1",
        name: "Gardenator",
        description:
          "A vertical gardening system made from recycled margarine barrels that integrates composting and planting-ideal for small urban reduction.",
        category: "Processing",
        status: "Active",
        startDate: "2025-01-15",
        participants: 1250,
        impact: "45 kg of waste diverted weekly",
      },
      {
        id: "2",
        name: "Tarpots",
        description:
          "Upcycle seedling and vegetable pots made from old tarpaulins ( like election posters ) promoting eco-conscious planting and reusing waste materials.",
        category: "Community",
        status: "Active",
        startDate: "2025-03-01",
        participants: 2800,
        impact: "almost 25kg of election posters upcycled.",
      },
      {
        id: "3",
        name: "Kids can compost",
        description:
          "Teaches kids and families how to turn kitchen waste into compost using simple, household-friendly systems-encouraging circular agriculture and waste reduction.",
        category: "Community",
        status: "Active",
        startDate: "2025-06-01",
        participants: 890,
        impact: "12 barangays committed",
      },
    ],
    tutorials: [
      {
        id: "1",
        title: "Tarpots",
        description:
          "Upcycled seedlingand vegetables pots made from old tarpaulins (like election posters), promoting eco-conscious planting and reusing waste materials.",
        difficulty: "Easy",
        duration: "15 mins",
        steps: 5,
        rating: 4.8,
        organization: "Kids Who Farm",
        materials: ["Tarpaulins", "seeds", "Soil"],
        image: "/tarpot.jpeg",
        url: "https://www.youtube.com/UB6y0Cy0fd8?si=oDPKcR4V4nnMHSP9",
      },
      {
        id: "2",
        title: "Gardenator",
        description:
          "A vertical garden system made from repurposed packages and barrels, combining composting and planting in one setup. Used in home gardens to grid food in small spaces",
        difficulty: "Medium",
        duration: "45 mins",
        steps: 8,
        rating: 4.6,
        organization: "Kids Who Farm",
        materials: ["Package", "Scissors", "Soil"],
        image: "/gardenator.jpeg",
        url: "https://www.youtube.com/LK3WFqiSbnI?si=7f5ZQnJS4-TE-eV3",
      },
    ],
    topVolunteers: [
      {
        id: "1",
        name: "Raaina Hinay",
        role: "Founder",
        joinDate: "2019",
        hoursContributed: 1240,
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "2",
        name: "Muneer Hinay",
        role: "Social Worker",
        joinDate: "2019",
        hoursContributed: 980,
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    partnerships: [
      {
        id: "1",
        brandName: "Cafelayan Hydrophonics Farm",
        brandLogo: "/cafelayanlogo2.jpeg",
        type: "Official",
        since: "2025-01-15",
        totalDonations: 12450,
      },
      {
        id: "2",
        brandName: "Dio's Heavenly Refreshing Juice",
        brandLogo: "/diologo.jpg",
        type: "Official",
        since: "2025-03-20",
        totalDonations: 8920,
      },
    ],
    donationStats: [
      { month: "Jan", received: 7200, processed: 6800, recycled: 6400 },
      { month: "Feb", received: 8100, processed: 7600, recycled: 7200 },
      { month: "Mar", received: 9200, processed: 8900, recycled: 8500 },
      { month: "Apr", received: 8800, processed: 8400, recycled: 8000 },
      { month: "May", received: 9800, processed: 9200, recycled: 8800 },
      { month: "Jun", received: 10500, processed: 9800, recycled: 9400 },
    ],
    socialMedia: {
      facebook: "https://facebook.com/kidswhofarm",
      twitter: "https://twitter.com/kidswhofarm_ph",
      instagram: "https://instagram.com/kidswhofarm",
      linkedin: "https://linkedin.com/company/kids-who-farm",
    },
  },
};

export default function OrganizationProfilePage() {
  const params = useParams();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const { name } = useAuth();

  useEffect(() => {
    const orgId = params.id as string;
    const orgData = organizationsData[orgId];

    if (orgData) {
      setOrganization(orgData);
    }
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-b-3xl"></div>
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-64"></div>
                <div className="h-4 bg-gray-200 rounded w-48"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Organization Not Found
          </h1>
          <p className="text-gray-600">
            The organization you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, React.ComponentType<{ className?: string }>> = {
      Leaf,
      Recycle,
      Users,
      Target,
      Building2,
      Heart,
    };
    return icons[iconName] || Target;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative">
        <div
          className="h-64 bg-gradient-to-r from-green-600 to-blue-600 rounded-b-3xl"
          style={{
            backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.8), rgba(59, 130, 246, 0.8)), url(${organization.coverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/80 to-blue-600/80 rounded-b-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 relative -mt-10">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
            <div className="relative">
              <Avatar className="h-40 w-40 lg:w-60 lg:h-60 border-4 border-white shadow-xl">
                <AvatarImage
                  src={organization.avatar || "/placeholder.svg"}
                  alt={organization.name}
                />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-green-500 to-blue-500 text-white">
                  {organization.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {organization.verified && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 text-white md:text-gray-900 md:bg-white/90 md:backdrop-blur-sm md:rounded-2xl md:p-6 md:shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{organization.name}</h1>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      {organization.type}
                    </Badge>
                  </div>
                  <p className="text-lg opacity-90 md:opacity-70 mb-4">
                    {organization.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm opacity-80 md:opacity-60">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {organization.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Est.{" "}
                      {new Date(organization.establishedDate).getFullYear()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {organization.followers.toLocaleString()} followers
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {name !== organization.id && (
                    <Button className="bg-green-600 text-white hover:bg-green-700">
                      <Heart className="h-4 w-4 mr-2" />
                      Follow Organization
                    </Button>
                  )}
                  {name === organization.id ? (
                    <Link href="/org/dashboard" className="w-full">
                      <Button
                        variant="outline"
                        className="border-white/20 md:border-gray-300 bg-transparent"
                      >
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="outline"
                      className="border-white/20 md:border-gray-300 bg-transparent"
                    >
                      <HandHeart className="h-4 w-4 mr-2" />
                      Volunteer
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {organization.impactMetrics.map((metric, index) => {
            const IconComponent = getIconComponent(metric.icon);
            return (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm border-0 shadow-lg"
              >
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="p-2 bg-green-100 rounded-full">
                      <IconComponent className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {metric.value}
                    <span className="text-sm font-normal text-gray-600 ml-1">
                      {metric.unit}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 mb-2">
                    {metric.label}
                  </div>
                  <div className="flex items-center justify-center gap-1 text-xs text-green-600">
                    <TrendingUp className="h-3 w-3" />+{metric.trend}%
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="flex justify-between overflow-x-auto whitespace-nowrap no-scrollbar sm:px-5 px-2 bg-gray-300/20">
            <TabsTrigger value="about" className="w-full">
              About
            </TabsTrigger>
            <TabsTrigger value="programs" className="w-full">
              Programs
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="w-full">
              Tutorials
            </TabsTrigger>
            <TabsTrigger value="volunteers" className="w-full">
              Members
            </TabsTrigger>
            <TabsTrigger value="partnerships" className="w-full">
              Partners
            </TabsTrigger>
            <TabsTrigger value="impact" className="w-full">
              Impact
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-green-600" />
                      Our Mission
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {organization.mission}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-green-600" />
                      Key Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          {organization.totalDonationsReceived.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          Total Donations Received
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {organization.totalItemsProcessed.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          Items Processed
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600 mb-1">
                          {organization.volunteers}
                        </div>
                        <div className="text-sm text-gray-600">
                          Active Volunteers
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-600 mb-1">
                          {organization.totalPartnerships}
                        </div>
                        <div className="text-sm text-gray-600">
                          Brand Partnerships
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <a
                        href={organization.website}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Visit Website
                        <ExternalLink className="h-3 w-3 inline ml-1" />
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <a
                        href={`mailto:${organization.email}`}
                        className="text-gray-700 text-sm"
                      >
                        {organization.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700 text-sm">
                        {organization.phone}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Follow Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-3">
                      {organization.socialMedia.facebook && (
                        <a
                          href={organization.socialMedia.facebook}
                          className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                        >
                          <Facebook className="h-4 w-4 text-blue-600" />
                        </a>
                      )}
                      {organization.socialMedia.twitter && (
                        <a
                          href={organization.socialMedia.twitter}
                          className="p-2 bg-sky-100 rounded-full hover:bg-sky-200 transition-colors"
                        >
                          <Twitter className="h-4 w-4 text-sky-600" />
                        </a>
                      )}
                      {organization.socialMedia.instagram && (
                        <a
                          href={organization.socialMedia.instagram}
                          className="p-2 bg-pink-100 rounded-full hover:bg-pink-200 transition-colors"
                        >
                          <Instagram className="h-4 w-4 text-pink-600" />
                        </a>
                      )}
                      {organization.socialMedia.linkedin && (
                        <a
                          href={organization.socialMedia.linkedin}
                          className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                        >
                          <Linkedin className="h-4 w-4 text-blue-700" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          {/* Programs tab */}
          <TabsContent value="programs" className="space-y-6">
            <div className="grid gap-6">
              {organization.programs.map((program) => (
                <Card
                  key={program.id}
                  className="bg-white/80 backdrop-blur-sm border-0 shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold">
                            {program.name}
                          </h3>
                          <Badge
                            variant={
                              program.status === "Active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {program.status}
                          </Badge>
                          <Badge variant="outline">{program.category}</Badge>
                        </div>
                        <p className="text-gray-600">{program.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {program.participants}
                        </div>
                        <div className="text-sm text-gray-600">
                          Participants
                        </div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-sm font-medium text-blue-600">
                          Started
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(program.startDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-sm font-medium text-purple-600">
                          Impact
                        </div>
                        <div className="text-sm text-gray-600">
                          {program.impact}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          {/* tutorials tab */}
          <TabsContent value="tutorials" className="space-y-6">
            <div className="grid gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {organization.tutorials.map((tutorial, index) => (
                  <Link key={index} href={`${tutorial.url}`}>
                    <Card
                      data-aos="fade"
                      data-aos-delay="100"
                      className="h-full bg-white border-gray-500/50 hover:border-green-700 overflow-hidden hover:shadow-md transition-all duration-300 ease"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={tutorial.image}
                          alt={tutorial.title}
                          className="w-100 h-50"
                        />
                      </div>
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start mb-2">
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
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs">{tutorial.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg text-black line-clamp-2">
                          {tutorial.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {tutorial.organization}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                          {tutorial.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{tutorial.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            <span>{tutorial.steps} steps</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {tutorial.materials
                            .slice(0, 2)
                            .map((material: string, idx: number) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs hover:bg-green-700 hover:text-white"
                              >
                                {material}
                              </Badge>
                            ))}
                          {tutorial.materials.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{tutorial.materials.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </TabsContent>
          {/* Volunteers tab */}
          <TabsContent value="volunteers" className="space-y-6">
            <div className="grid gap-6">
              {organization.topVolunteers.map((volunteer) => (
                <Card
                  key={volunteer.id}
                  className="bg-white/80 backdrop-blur-sm border-0 shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <Avatar className="h-20 w-20 md:w-16 md:h-16 items-center md:items-start">
                        <AvatarImage
                          src={volunteer.avatar || "/placeholder.svg"}
                          alt={volunteer.name}
                        />
                        <AvatarFallback>
                          {volunteer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col md:flex-1 items-center md:items-start">
                        <h3 className="text-lg font-semibold">
                          {volunteer.name}
                        </h3>
                        <p className="text-gray-600">{volunteer.role}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span>
                            Joined{" "}
                            {new Date(volunteer.joinDate).toLocaleDateString()}
                          </span>
                          <span>•</span>
                          <span>
                            {volunteer.hoursContributed} hours contributed
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          {volunteer.hoursContributed}
                        </div>
                        <div className="text-sm text-gray-600">Hours</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="partnerships" className="space-y-6">
            <div className="grid gap-6">
              {organization.partnerships.map((partnership) => (
                <Card
                  key={partnership.id}
                  className="bg-white/80 backdrop-blur-sm border-0 shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage
                          src={partnership.brandLogo || "/placeholder.svg"}
                          alt={partnership.brandName}
                        />
                        <AvatarFallback>
                          {partnership.brandName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">
                          {partnership.brandName}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant={
                              partnership.type === "Official"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {partnership.type} Partner
                          </Badge>
                          <span className="text-sm text-gray-500">
                            Since{" "}
                            {new Date(partnership.since).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className=" text-center md:text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {partnership.totalDonations.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          Total Donations
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Monthly Donation Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {organization.donationStats.map((stat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{stat.month}</span>
                        <span className="text-gray-600">
                          {stat.recycled}/{stat.received} items recycled
                        </span>
                      </div>
                      <div className="space-y-1">
                        <Progress
                          value={(stat.processed / stat.received) * 100}
                          className="h-2 bg-gray-200"
                        />
                        <Progress
                          value={(stat.recycled / stat.received) * 100}
                          className="h-2 bg-gray-200"
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Processed: {stat.processed}</span>
                        <span>Recycled: {stat.recycled}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
