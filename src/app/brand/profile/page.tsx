"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MessageCircle,
  Heart,
  Share2,
  MapPin,
  Calendar,
  Globe,
  Instagram,
  Twitter,
  Facebook,
  Package,
  Recycle,
  Award,
  Leaf,
  Mail,
  Phone,
  LayoutDashboard,
  ShoppingBag,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext";

export default function BrandProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false)
  const { role } = useAuth();
  const [isBrand, setisBrand] = useState(false);

  // Mock brand data
  const brandData = {
    name: "Cafelayan",
    handle: "@cafelayan_ph",
    title: "Sustainable Water Solutions",
    bio: "Leading the way in sustainable packaging and environmental responsibility. Join us in creating a cleaner, greener Philippines through innovative recycling solutions.",
    avatar: "/cafelayanlogo.jpg",
    coverImage: "/Cafelayan-3.jpg",
    location: "Zamboanga City, Philippines",
    joinDate: "2025",
    website: "https://cafelayan.netlify.app",
    email: "cafelayanhydroponicsfarm@gmail.com",
    phone: "+63 2 8234 5678",
    verified: true,
    stats: {
      products: 45,
      followers: 12500,
      partnerships: 23,
    },
    socialMedia: {
      instagram: "@cafelayan_ph",
      twitter: "@cafelayanph",
      facebook: "Cafelayan Hydroponics",
      ecommerce: "https://cafelayan.netlify.app",
    },
    products: [
      {
        id: 1,
        name: "Lettuce Chips",
        image: "/lettuce_chips-2.jpg",
        category: "Food",
        recyclable: true,
      },
      {
        id: 2,
        name: "VBites Chips",
        image: "/placeholder.svg?height=120&width=120",
        category: "Food",
        recyclable: true,
      },
      {
        id: 3,
        name: "Kale Chips",
        image: "/placeholder.svg?height=120&width=120",
        category: "Food",
        recyclable: true,
      },
      // {
      //   id: 4,
      //   name: "Premium Water 1L",
      //   image: "/placeholder.svg?height=120&width=120",
      //   category: "Beverages",
      //   recyclable: true,
      // },
      // {
      //   id: 5,
      //   name: "Sparkling Water 500ml",
      //   image: "/placeholder.svg?height=120&width=120",
      //   category: "Beverages",
      //   recyclable: true,
      // },
      // {
      //   id: 6,
      //   name: "Energy Drink 250ml",
      //   image: "/placeholder.svg?height=120&width=120",
      //   category: "Energy",
      //   recyclable: true,
      // },
    ],
    achievements: [
      { name: "Eco Pioneer", icon: "🌱", description: "First 1000 products recycled" },
      { name: "Green Leader", icon: "🏆", description: "Top sustainability brand 2025" },
      { name: "Community Champion", icon: "👥", description: "25+ organization partnerships" },
      { name: "Innovation Award", icon: "💡", description: "Best sustainable packaging 2025" },
    ],
    impactStats: {
      totalRecycled: "15,400",
      co2Saved: "2.3 tons",
      waterSaved: "450 kg",
      partneredOrgs: 23,
    },
  }

  useEffect(() => {
    if(role === 'brand') setisBrand(true); else setisBrand(false);
  })
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600">
      {/* Header */}
      <div className="flex items-center justify-between p-4 lg:px-8 text-white">
        {/* <Link href="/">
          <ArrowLeft className="h-6 w-6" />
        </Link> */}
        <h1 className="text-lg lg:text-xl font-semibold">Brand Profile</h1>
        {/* <MoreHorizontal className="h-6 w-6" /> */}
        {isBrand && (
        <Link href="/brand/dashboard">
          <h2 className="text-md lg:text-lg font-semibold flex items-center justify-between">
            <LayoutDashboard className="h-5 w-5 mr-1"/>
            Go to Dashboard
          </h2>
        </Link>
      )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block px-8 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-12 gap-4">
            {/* Left Sidebar - Profile Info */}
            <div className="col-span-4">
              <Card className="bg-white border-gray-500/50 rounded-3xl shadow-xl overflow-hidden sticky top-8">
                <CardContent className="p-0">
                  {/* Cover Image */}
                  <div className="h-38 bg-gradient-to-r from-green-100 to-green-200 relative">
                    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                      <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                        <AvatarImage src={brandData.avatar || "/placeholder.svg"} alt={brandData.name} />
                        <AvatarFallback className="bg-green-100 text-green-700 text-2xl font-bold">
                          {brandData.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="pt-20 px-6 pb-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">{brandData.name}</h2>
                      {brandData.verified && <Award className="h-6 w-6 text-green-500" />}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{brandData.handle}</p>
                    <p className="text-gray-700 font-medium mb-4">{brandData.title}</p>

                    <p className="text-gray-600 text-sm leading-relaxed mb-6">{brandData.bio}</p>

                    {/* Action Buttons */}
                    {!isBrand && (
                      <div className="flex gap-3 justify-center mb-6">
                        <Button
                          onClick={() => setIsFollowing(!isFollowing)}
                          className={`px-8 py-2 rounded-full font-medium ${
                            isFollowing
                              ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              : "bg-green-600 text-white hover:bg-green-700"
                          }`}
                        >
                          {isFollowing ? "Following" : "Follow"}
                        </Button>
                        <Button variant="outline" className="px-6 py-2 rounded-full border-gray-300">
                          Message
                        </Button>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{brandData.stats.products}</div>
                        <div className="text-xs text-gray-600 uppercase tracking-wide">Products</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {brandData.stats.followers.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600 uppercase tracking-wide">Followers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{brandData.stats.partnerships}</div>
                        <div className="text-xs text-gray-600 uppercase tracking-wide">Partners</div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{brandData.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Since {brandData.joinDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4 text-gray-400" />
                        <a href={brandData.website} className="text-green-600 hover:underline">
                          {brandData.website.replace("https://", "")}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{brandData.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{brandData.phone}</span>
                      </div>
                    </div>

                    {/* Social Media */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800 mb-3">Connect With Us</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <a href="#" className="flex items-center gap-2 text-pink-600 hover:bg-pink-50 p-2 rounded-lg">
                          <Instagram className="h-4 w-4" />
                          <span className="text-xs truncate">{brandData.socialMedia.instagram}</span>
                        </a>
                        <a href="#" className="flex items-center gap-2 text-blue-500 hover:bg-blue-50 p-2 rounded-lg">
                          <Twitter className="h-4 w-4" />
                          <span className="text-xs truncate">{brandData.socialMedia.twitter}</span>
                        </a>
                        <a href="#" className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 p-2 rounded-lg">
                          <Facebook className="h-4 w-4" />
                          <span className="text-xs truncate">{brandData.socialMedia.facebook}</span>
                        </a>
                        <a href="#" className="flex items-center gap-2 text-blue-700 hover:bg-blue-50 p-2 rounded-lg">
                          <ShoppingBag className="h-4 w-4" />
                          <span className="text-xs truncate">{brandData.socialMedia.ecommerce}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Content Area */}
            <div className="col-span-8 space-y-6">
              {/* Environmental Impact */}
              <Card className="bg-white border-gray-500/50 rounded-2xl shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                    <Leaf className="h-5 w-5" />
                    Environmental Impact
                  </h3>
                  <div className="grid grid-cols-4 gap-6 text-center">
                    <div className="bg-green-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-green-700">{brandData.impactStats.totalRecycled}</div>
                      <div className="text-sm text-green-600">Products Recycled</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-blue-700">{brandData.impactStats.co2Saved}</div>
                      <div className="text-sm text-blue-600">CO₂ Saved</div>
                    </div>
                    <div className="bg-cyan-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-cyan-700">{brandData.impactStats.waterSaved}</div>
                      <div className="text-sm text-cyan-600">Plastics Saved</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-purple-700">{brandData.impactStats.partneredOrgs}</div>
                      <div className="text-sm text-purple-600">Partner Orgs</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Products Section */}
              <Card className="bg-white border-gray-500/50 rounded-2xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      {isBrand ? "My" : "Our"} Products
                    </h3>
                    <Link href="/brand/products" className="text-sm text-green-600 font-medium hover:underline">
                      View all products →
                    </Link>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {brandData.products.map((product) => (
                      <div key={product.id} className="relative group cursor-pointer">
                        <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 rounded-xl" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="bg-white/90 backdrop-blur-sm text-gray-900 text-sm px-3 py-2 rounded-lg">
                            <div className="font-medium truncate">{product.name}</div>
                            <div className="text-xs text-gray-600">{product.category}</div>
                          </div>
                        </div>
                        {product.recyclable && (
                          <div className="absolute top-3 right-3">
                            <div className="bg-green-500 text-white p-2 rounded-full shadow-lg">
                              <Recycle className="h-4 w-4" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="bg-white border-gray-500/50 rounded-2xl shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Achievements & Recognition
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {brandData.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-yellow-50 rounded-xl">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">
                          {achievement.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{achievement.name}</div>
                          <div className="text-sm text-gray-600">{achievement.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden px-4 pb-20">
        <Card className="bg-white border-gray-500/50 rounded-3xl shadow-xl overflow-hidden">
          <CardContent className="p-0">
            {/* Cover Image */}
            <div className="h-28 bg-gradient-to-r from-green-100 to-green-200 relative">
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarImage src={brandData.avatar || "/placeholder.svg"} alt={brandData.name} />
                  <AvatarFallback className="bg-green-100 text-green-700 text-xl font-bold">
                    {brandData.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* Profile Info */}
            <div className="pt-16 px-6 pb-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-gray-900">{brandData.name}</h2>
                {brandData.verified && <Award className="h-5 w-5 text-green-500" />}
              </div>
              <p className="text-gray-600 text-sm mb-1">{brandData.handle}</p>
              <p className="text-gray-700 font-medium mb-3">{brandData.title}</p>

              <p className="text-gray-600 text-sm leading-relaxed mb-4 px-2">{brandData.bio}</p>

              {/* Action Buttons */}
              {!isBrand && (
                <div className="flex gap-3 justify-center mb-6">
                  <Button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`px-8 py-2 rounded-full font-medium ${
                      isFollowing
                        ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button variant="outline" className="px-6 py-2 rounded-full border-gray-300">
                    Message
                  </Button>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{brandData.stats.products}</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wide">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{brandData.stats.followers.toLocaleString()}</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wide">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{brandData.stats.partnerships}</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wide">Partners</div>
                </div>
              </div>

              {/* Environmental Impact */}
              <div className="bg-green-50 rounded-2xl p-4 mb-6">
                <h3 className="text-sm font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <Leaf className="h-4 w-4" />
                  Environmental Impact
                </h3>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div>
                    <div className="text-lg font-bold text-green-700">{brandData.impactStats.totalRecycled}</div>
                    <div className="text-xs text-green-600">Items Recycled</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-700">{brandData.impactStats.co2Saved}</div>
                    <div className="text-xs text-green-600">CO₂ Saved</div>
                  </div>
                </div>
              </div>

              {/* Products Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    <Package className="h-4 w-4" />
                     {isBrand ? 'My' : 'Our'} Products
                  </h3>
                  <Link href="/brand/products" className="text-xs text-green-600 font-medium">
                    View all
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {brandData.products.slice(0, 4).map((product) => (
                    <div key={product.id} className="relative">
                      <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="bg-black/70 text-white text-xs px-2 py-1 rounded-lg">
                          <div className="font-medium truncate">{product.name}</div>
                          <div className="text-xs opacity-80">{product.category}</div>
                        </div>
                      </div>
                      {product.recyclable && (
                        <div className="absolute top-2 right-2">
                          <div className="bg-green-500 text-white p-1 rounded-full">
                            <Recycle className="h-3 w-3" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Achievements
                </h3>
                <div className="flex gap-2 justify-center">
                  {brandData.achievements.slice(0, 3).map((achievement, index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-xl mb-1">
                        {achievement.icon}
                      </div>
                      <div className="text-xs text-gray-600 max-w-16">{achievement.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="mb-6">
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{brandData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Since {brandData.joinDate}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1 text-sm">
                  <Globe className="h-3 w-3 text-gray-400" />
                  <a href={brandData.website} className="text-green-600 hover:underline">
                    {brandData.website.replace("https://", "")}
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Connect With Us</h3>
                <div className="flex justify-center gap-4">
                  <a href="#" className="flex items-center gap-2 text-pink-600">
                    <Instagram className="h-4 w-4" />
                    <span className="text-xs">{brandData.socialMedia.instagram}</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 text-blue-500">
                    <Twitter className="h-4 w-4" />
                    <span className="text-xs">{brandData.socialMedia.twitter}</span>
                  </a>
                </div>
                <div className="flex justify-center gap-4 mt-2">
                  <a href="#" className="flex items-center gap-2 text-blue-600">
                    <Facebook className="h-4 w-4" />
                    <span className="text-xs">{brandData.socialMedia.facebook}</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 text-blue-700">
                    <ShoppingBag className="h-4 w-4" />
                    <span className="text-xs">{brandData.socialMedia.ecommerce}</span>
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Action Bar - Mobile Only */}
      {!isBrand && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
          <div className="flex items-center justify-around">
            <button className="flex flex-col items-center gap-1">
              <Heart className="h-5 w-5 text-gray-600" />
              <span className="text-xs text-gray-600">Like</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <MessageCircle className="h-5 w-5 text-gray-600" />
              <span className="text-xs text-gray-600">Message</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <Share2 className="h-5 w-5 text-gray-600" />
              <span className="text-xs text-gray-600">Share</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
