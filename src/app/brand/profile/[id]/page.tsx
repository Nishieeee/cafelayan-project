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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  Globe,
  Calendar,
  Package,
  Recycle,
  Award,
  Heart,
  MessageCircle,
  Share,
  LayoutDashboard,
  ExternalLink,
  Leaf,
  CheckCircle,
  Star,
  TrendingUp,
  TrendingDown,
  Instagram,
  Twitter,
  Facebook,
  ShoppingBag,
  Wind,
} from "lucide-react";
import Link from "next/link";
import type { Brand } from "@/types/brand";
import { useAuth } from "@/context/AuthContext";
// Mock brand data - would come from API
const brandData: Record<string, Brand> = {
  cafelayan: {
    id: "cafelayan",
    name: "Cafelayan",
    username: "@cafelayan_ph",
    description:
      "Leading sustainable manufacturer in the Philippines. Committed to reducing plastic waste through innovative upcycling programs and eco-friendly packaging solutions.",
    avatar: "/cafelayanlogo2.jpeg",
    coverImage: "/placeholder.svg?height=200&width=400",
    location: "Zamboanga City, Philippines",
    website: "https://cafelayan.netlify.app",
    joinDate: "July 2025",
    verified: true,
    followers: 15420,
    following: 234,
    totalProducts: 45672,
    totalDonations: 12834,
    totalScans: 28945,
    partneredOrganizations: 23,
    activeCities: 15,
    sustainabilityScore: 92,
    co2Saved: "2.3 tons",
    waterSaved: "15,400kg",
    itemsRecycled: 28945,
    wasteReduced: "890 kg",
    products: [
      {
        id: "cafelayan-250g-001",
        name: "Cafelayan Lettuce Chips",
        brand: "Cafelayan",
        material: "PET Plastic",
        category: "Food",
        status: "Active",
        registrationDate: "2025-01-15",
        totalScans: 2847,
        totalDonations: 1256,
        conversionRate: 44.1,
        lastScan: "2 hours ago",
        image: "/lettuce_chips-2.jpg",
        recyclability: "Highly Recyclable",
      },
      {
        id: "cafelayan-250g-002",
        name: "Cafelayan VBites Chips",
        brand: "Cafelayan",
        material: "PET Plastic",
        category: "Food",
        status: "Active",
        registrationDate: "2025-01-20",
        totalScans: 1923,
        totalDonations: 834,
        conversionRate: 43.4,
        lastScan: "1 day ago",
        image: "/placeholder.svg?height=120&width=120",
        recyclability: "Highly Recyclable",
      },
      {
        id: "cafelayan-250g-003",
        name: "Cafelayan Kale Chips",
        brand: "Cafelayan",
        material: "PET Plastic",
        category: "Food",
        status: "Active",
        registrationDate: "2025-02-01",
        totalScans: 1456,
        totalDonations: 623,
        conversionRate: 42.8,
        lastScan: "3 hours ago",
        image: "/placeholder.svg?height=120&width=120",
        recyclability: "Highly Recyclable",
      },
    ],
    achievements: [
      {
        name: "Eco Pioneer",
        description: "First 1000 products upcycled",
        icon: "🌱",
        earned: true,
      },
      {
        name: "Green Leader",
        description: "Top recycling brand",
        icon: "🏆",
        earned: true,
      },
      {
        name: "Community Champion",
        description: "50+ organization partnerships",
        icon: "🤝",
        earned: false,
      },
    ],
    socialMedia: {
      instagram: "@cafelayan.ph",
      twitter: "@cafelayan",
      facebook: "Cafelayan Hdroponic Farm",
      shop: "Cafelayan",
    },
  },
  dios: {
    id: "dios",
    name: "Dio's Heavenly Refreshing Juice",
    username: "@dio's_ph",
    description:
      "Heavenly refreshing Juice made 100% from Blue Ternate, Lemon Grass & Calamansi Extract.",
    avatar: "/diologo.jpg",
    coverImage: "/placeholder.svg?height=200&width=400",
    location: "Zamboanga City, Philippines",
    website: "https://dio.com.ph",
    joinDate: "July 2025",
    verified: true,
    followers: 8750,
    following: 156,
    totalProducts: 23450,
    totalDonations: 8920,
    totalScans: 18650,
    partneredOrganizations: 18,
    activeCities: 12,
    sustainabilityScore: 96,
    co2Saved: "3.1 tons",
    waterSaved: "22,100kg",
    itemsRecycled: 18650,
    wasteReduced: "1.2 tons",
    products: [
      {
        id: "dio-500ml-001",
        name: "Heavenly Refreshing Juice 500ml",
        brand: "Dio's Heavenly Refreshing Juice",
        material: "PET Plastic",
        category: "Beverages",
        status: "Active",
        registrationDate: "2025-03-01",
        totalScans: 3420,
        totalDonations: 1890,
        conversionRate: 55.3,
        lastScan: "1 hour ago",
        image: "/dhrj.jpeg",
        recyclability: "Biodegradable",
      },
      // {
      //   id: "ecobottle-glass-330",
      //   name: "EcoBottle Glass 330ml",
      //   brand: "EcoBottle Co",
      //   material: "Recycled Glass",
      //   category: "Premium",
      //   status: "Active",
      //   registrationDate: "2025-03-05",
      //   totalScans: 2156,
      //   totalDonations: 1234,
      //   conversionRate: 57.2,
      //   lastScan: "30 minutes ago",
      //   image: "/placeholder.svg?height=120&width=120",
      //   recyclability: "Highly Recyclable",
      // },
      // {
      //   id: "ecobottle-bamboo-750",
      //   name: "EcoBottle Bamboo Fiber 750ml",
      //   brand: "EcoBottle Co",
      //   material: "Bamboo Fiber",
      //   category: "Sports",
      //   status: "Active",
      //   registrationDate: "2025-03-10",
      //   totalScans: 1876,
      //   totalDonations: 945,
      //   conversionRate: 50.4,
      //   lastScan: "2 hours ago",
      //   image: "/placeholder.svg?height=120&width=120",
      //   recyclability: "Compostable",
      // },
      // {
      //   id: "ecobottle-paper-250",
      //   name: "EcoBottle Paper Carton 250ml",
      //   brand: "EcoBottle Co",
      //   material: "Recycled Paper",
      //   category: "Kids",
      //   status: "Active",
      //   registrationDate: "2025-03-15",
      //   totalScans: 2890,
      //   totalDonations: 1567,
      //   conversionRate: 54.2,
      //   lastScan: "45 minutes ago",
      //   image: "/placeholder.svg?height=120&width=120",
      //   recyclability: "Recyclable",
      // },
      // {
      //   id: "ecobottle-corn-1l",
      //   name: "EcoBottle Corn-based 1L",
      //   brand: "EcoBottle Co",
      //   material: "Corn Starch",
      //   category: "Family",
      //   status: "Active",
      //   registrationDate: "2025-03-20",
      //   totalScans: 1654,
      //   totalDonations: 823,
      //   conversionRate: 49.8,
      //   lastScan: "4 hours ago",
      //   image: "/placeholder.svg?height=120&width=120",
      //   recyclability: "Biodegradable",
      // },
      // {
      //   id: "ecobottle-hemp-600",
      //   name: "EcoBottle Hemp Composite 600ml",
      //   brand: "EcoBottle Co",
      //   material: "Hemp Fiber",
      //   category: "Premium",
      //   status: "Draft",
      //   registrationDate: "2025-03-25",
      //   totalScans: 987,
      //   totalDonations: 456,
      //   conversionRate: 46.2,
      //   lastScan: "1 week ago",
      //   image: "/placeholder.svg?height=120&width=120",
      //   recyclability: "Compostable",
      // },
    ],
    achievements: [
      {
        name: "Innovation Leader",
        description: "First biodegradable bottles",
        icon: "💡",
        earned: true,
      },
      {
        name: "Sustainability Master",
        description: "95%+ sustainability score",
        icon: "🌍",
        earned: true,
      },
      {
        name: "Zero Waste Champion",
        description: "100% recyclable products",
        icon: "♻️",
        earned: true,
      },
      {
        name: "Community Builder",
        description: "25+ partnerships",
        icon: "🏘️",
        earned: true,
      },
    ],
    socialMedia: {
      instagram: "@dio.ph",
      twitter: "@dio'sjuice",
      facebook: "Dio's Heavenly Refreshing Juice",
      shop: "Dio's Shop",
    },
  },
};

export default function BrandProfilePage() {
  const params = useParams();
  const brandId = params.id as string;
  const [isFollowing, setIsFollowing] = useState(false);
  const [brand, setBrand] = useState<Brand | null>(null);
  const { role, name } = useAuth();
  const [isBrand, setisBrand] = useState(false);
  useEffect(() => {
    if (role === "brand") setisBrand(true);
  });

  useEffect(() => {
    // Simulate API call
    const brandInfo = brandData[brandId];
    if (brandInfo) {
      setBrand(brandInfo);
    }
  }, [brandId]);

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Brand Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The brand profile you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button asChild>
            <Link href="/search">Search Brands</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-green-600">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 text-white">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <Link href="/">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Profile</h1>
          <div>
            {name === brand.id && (
              <Link href={`/brand/${brand.id}/dashboard`}>
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs"
                >
                  <LayoutDashboard className="h-1 w-1 mr-1" />
                  Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Profile Card */}
        <div className="mx-4 mb-6">
          <Card className="overflow-hidden border-gray-500/50">
            <div className="relative h-32 bg-gradient-to-r from-green-100 to-green-200">
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarImage
                    src={brand.avatar || "/placeholder.svg"}
                    alt={brand.name}
                  />
                  <AvatarFallback className="text-2xl font-bold  text-green-700">
                    {brand.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <CardContent className="pt-16 pb-6 text-center bg-white">
              <div className="flex items-center justify-center gap-2 mb-2">
                <h2 className="text-xl font-bold text-gray-900">
                  {brand.name}
                </h2>
                {brand.verified && (
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                )}
              </div>
              <p className="text-gray-600 text-sm mb-1">{brand.username}</p>
              <p className="text-gray-700 text-sm mb-4">{brand.description}</p>

              {name !== brand.id && (
                <div className="flex gap-3 justify-center mb-6">
                  <Button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`px-8 ${
                      isFollowing
                        ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button variant="outline" className="px-8 bg-transparent">
                    Message
                  </Button>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 text-center mb-4">
                <div>
                  <div className="text-lg font-bold text-gray-900">
                    {brand.totalProducts.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">PRODUCTS</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">
                    {brand.followers.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">FOLLOWERS</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">
                    {brand.partneredOrganizations}
                  </div>
                  <div className="text-xs text-gray-600">PARTNERS</div>
                </div>
              </div>
              <Button
                data-aos="fade-up"
                className="w-full h-full text-white bg-green-600 hover:bg-green-700 mb-4"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Sustainable Snacks
              </Button>
              {/* Environmental Impact */}
              <Card className="mb-6 bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Leaf className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold text-green-800">
                      Environmental Impact
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="flex flex-col items-center jusitfy-center">
                      <Wind className="h-5 w-5 text-green-700" />
                      <div className="text-lg font-bold text-green-700">
                        {brand.co2Saved}
                      </div>
                      <div className="text-xs text-green-600">CO₂ Saved</div>
                    </div>
                    <div className="flex flex-col items-center jusitfy-center">
                      <Recycle className="h-5 w-5 text-green-700" />
                      <div className="text-lg font-bold text-green-700">
                        {brand.itemsRecycled.toLocaleString()}
                      </div>
                      <div className="text-xs text-green-600">
                        Items upcycled
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Products */}
              <div className="text-left">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Products</h3>
                  <Link
                    href={`/brand/${brand.id}/products`}
                    className="text-green-600 text-sm hover:underline"
                  >
                    View all
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {brand.products.slice(0, 4).map((product) => (
                    <Link key={product.id} href={`/package/${product.id}`}>
                      <Card className="overflow-hidden hover:shadow-md transition-shadow border-gray-500/50">
                        <div className="aspect-square bg-gray-100 relative">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          {product.recyclability && (
                            <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                              <Recycle className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                        <CardContent className="p-3">
                          <h4 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">
                            {product.name}
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            {product.category}
                          </Badge>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="text-left mt-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Achievements
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {brand.achievements.map((achievement, index) => (
                    <Card
                      key={index}
                      className={`p-3 ${
                        achievement.earned
                          ? "bg-green-50 border-green-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">{achievement.icon}</div>
                        <div
                          className={`font-medium text-sm ${
                            achievement.earned
                              ? "text-green-800"
                              : "text-gray-500"
                          }`}
                        >
                          {achievement.name}
                        </div>
                        <div
                          className={`text-xs ${
                            achievement.earned
                              ? "text-green-600"
                              : "text-gray-400"
                          }`}
                        >
                          {achievement.description}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="text-left mt-6 space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{brand.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Globe className="h-4 w-4" />
                  <a
                    href={brand.website}
                    className="text-sm text-green-600 hover:underline"
                  >
                    {brand.website.replace("https://", "")}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Joined {brand.joinDate}</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-6">
                <div data-aos="fade-up" className="flex flex-col items-center">
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">
                    Connect With Us
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href="#"
                      className="flex items-center gap-2 text-pink-600"
                    >
                      <Instagram className="h-4 w-4" />
                      <span className="text-xs">
                        {brand.socialMedia.instagram}
                      </span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-blue-500"
                    >
                      <Twitter className="h-4 w-4" />
                      <span className="text-xs">
                        {brand.socialMedia.twitter}
                      </span>
                    </a>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <a
                      href="#"
                      className="flex items-start gap-2 text-blue-600"
                    >
                      <Facebook className="h-4 w-4" />
                      <span className="text-xs">
                        {brand.socialMedia.facebook}
                      </span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-blue-700"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span className="text-xs">{brand.socialMedia.shop}</span>
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Action Bar */}
        {!isBrand && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
            <div className="flex justify-around">
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center gap-1"
              >
                <Heart className="h-5 w-5" />
                <span className="text-xs">Like</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center gap-1"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="text-xs">Message</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center gap-1"
              >
                <Share className="h-5 w-5" />
                <span className="text-xs">Share</span>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-6 py-8 max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 text-white">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              <Link href="/" className="flex items-center gap-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Home
              </Link>
            </Button>
            <div className="flex gap-3">
              {name === brand.id && (
                <Link href={`/brand/${brand.id}/dashboard`}>
                  <Button
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Left Sidebar */}
            <div className="col-span-4">
              <div className="sticky top-8 space-y-6">
                {/* Profile Card */}
                <Card
                  data-aos="fade-up"
                  className="overflow-hidden border-gray-500/50"
                >
                  <div className="relative h-32 bg-gradient-to-r from-green-100 to-green-200">
                    <div className="absolute -bottom-16 left-6">
                      <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                        <AvatarImage
                          src={brand.avatar || "/placeholder.svg"}
                          alt={brand.name}
                        />
                        <AvatarFallback className="text-3xl font-bold bg-green-100 text-green-700">
                          {brand.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  <CardContent className="pt-20 pb-6 bg-white">
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-2xl font-bold text-gray-900">
                        {brand.name}
                      </h1>
                      {brand.verified && (
                        <CheckCircle className="h-6 w-6 text-blue-500" />
                      )}
                    </div>
                    <p className="text-gray-600 mb-1">{brand.username}</p>
                    <p className="text-gray-700 mb-6">{brand.description}</p>

                    {name !== brand.id && (
                      <div className="flex gap-3 mb-6">
                        <Button
                          onClick={() => setIsFollowing(!isFollowing)}
                          className={`flex-1 ${
                            isFollowing
                              ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              : "bg-green-600 text-white hover:bg-green-700"
                          }`}
                        >
                          {isFollowing ? "Following" : "Follow"}
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 bg-transparent border-gray-500/50"
                        >
                          Message
                        </Button>
                      </div>
                    )}

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-xl font-bold text-gray-900">
                          {brand.totalProducts.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600">PRODUCTS</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-gray-900">
                          {brand.followers.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600">FOLLOWERS</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-gray-900">
                          {brand.partneredOrganizations}
                        </div>
                        <div className="text-xs text-gray-600">PARTNERS</div>
                      </div>
                    </div>
                    <Button
                      data-aos="fade-up"
                      className="w-full h-full text-white bg-green-600 hover:bg-green-700 mt-5"
                    >
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Shop Sustainable Snacks
                    </Button>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card
                  data-aos="fade-up"
                  className="bg-white border-gray-500/50"
                >
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin className="h-5 w-5" />
                      <span>{brand.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Globe className="h-5 w-5" />
                      <a
                        href={brand.website}
                        className="text-green-600 hover:underline"
                      >
                        {brand.website.replace("https://", "")}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Calendar className="h-5 w-5" />
                      <span>Joined {brand.joinDate}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Star className="h-5 w-5" />
                      <span>
                        Sustainability Score: {brand.sustainabilityScore}%
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card
                  data-aos="fade-up"
                  className="bg-white border-gray-500/50"
                >
                  <CardHeader>
                    <CardTitle className="text-lg">Social Media</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <a
                        href="#"
                        className="flex items-center gap-2 text-pink-600"
                      >
                        <Instagram className="h-4 w-4" />
                        <span className="text-xs">
                          {brand.socialMedia.instagram}
                        </span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-2 text-blue-500"
                      >
                        <Twitter className="h-4 w-4" />
                        <span className="text-xs">
                          {brand.socialMedia.twitter}
                        </span>
                      </a>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <a
                        href="#"
                        className="flex items-start gap-2 text-blue-600"
                      >
                        <Facebook className="h-4 w-4" />
                        <span className="text-xs">
                          {brand.socialMedia.facebook}
                        </span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-2 text-blue-700"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        <span className="text-xs">
                          {brand.socialMedia.shop}
                        </span>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Content */}
            <div className="col-span-8 space-y-6">
              {/* Environmental Impact */}
              <Card data-aos="fade-up" className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <Leaf className="h-6 w-6" />
                    Environmental Impact
                  </CardTitle>
                  <CardDescription className="text-green-700">
                    Making a positive difference for our planet
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-6">
                    <div className="text-center flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                      <Wind className="h-7 w-7 text-blue-700" />
                      <div className="text-2xl font-bold text-blue-700">
                        {brand.co2Saved}
                      </div>
                      <div className="text-sm text-blue-600">CO₂ Saved</div>
                    </div>
                    <div className="text-center flex flex-col items-center p-4 bg-cyan-50 rounded-lg">
                      <Package className="h-7 w-7 text-cyan-700" />
                      <div className="text-2xl font-bold text-cyan-700">
                        {brand.waterSaved}
                      </div>
                      <div className="text-sm text-cyan-600">
                        Plastics Saved
                      </div>
                    </div>
                    <div className="text-center flex flex-col items-center p-4 bg-green-50 rounded-lg">
                      <Recycle className="h-7 w-7 text-green-700" />
                      <div className="text-2xl font-bold text-green-700">
                        {brand.itemsRecycled.toLocaleString()}
                      </div>
                      <div className="text-sm text-green-600">
                        Items Upcycled
                      </div>
                    </div>
                    <div className="text-center flex flex-col items-center p-4 bg-purple-50 rounded-lg">
                      <TrendingDown className="h-7 w-7 text-purple-600" />
                      <div className="text-2xl font-bold text-purple-700">
                        {brand.wasteReduced}
                      </div>
                      <div className="text-sm text-purple-600">
                        Waste Reduced
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Products */}
              <Card data-aos="fade-up" className="bg-white border-gray-500/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-6 w-6" />
                      Products
                    </CardTitle>
                    <Link href={`/brand/${brand.id}/products`}>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View All Products
                      </Button>
                    </Link>
                  </div>
                  <CardDescription>
                    Sustainable products making a difference
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {brand.products.slice(0, 6).map((product) => (
                      <div key={product.id} data-aos="fade-up">
                        <Link href={`/package/${product.id}`}>
                          <Card className="overflow-hidden border-gray-500/50 hover:shadow-lg transition-all hover:scale-105">
                            <div className="aspect-square bg-gray-100 relative">
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                              {product.recyclability && (
                                <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                                  <Recycle className="h-4 w-4 text-white" />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                                <div className="opacity-0 hover:opacity-100 transition-opacity text-white text-center">
                                  <TrendingUp className="h-6 w-6 mx-auto mb-1" />
                                  <div className="text-sm font-medium">
                                    {product.totalScans} scans
                                  </div>
                                </div>
                              </div>
                            </div>
                            <CardContent className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                                {product.name}
                              </h4>
                              <div className="flex items-center justify-between">
                                <Badge variant="outline" className="text-xs">
                                  {product.category}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-green-50 text-green-700"
                                >
                                  {product.material}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card data-aos="fade-up" className="bg-white border-gray-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-6 w-6" />
                    Achievements
                  </CardTitle>
                  <CardDescription>
                    Recognition for sustainability efforts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {brand.achievements.map((achievement, index) => (
                      <Card
                        key={index}
                        className={`p-4 ${
                          achievement.earned
                            ? "bg-green-50 border-green-200"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-3xl">{achievement.icon}</div>
                          <div>
                            <h4
                              className={`font-medium ${
                                achievement.earned
                                  ? "text-green-800"
                                  : "text-gray-500"
                              }`}
                            >
                              {achievement.name}
                            </h4>
                            <p
                              className={`text-sm ${
                                achievement.earned
                                  ? "text-green-600"
                                  : "text-gray-400"
                              }`}
                            >
                              {achievement.description}
                            </p>
                            {achievement.earned && (
                              <Badge className="mt-2 bg-green-100 text-green-800 text-xs">
                                Earned
                              </Badge>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
