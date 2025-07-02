"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface Brand {
  id: string
  name: string;
  handle: string;
  title: string;
  bio: string;
  avatar: string;
  coverImage: string;
  location: string;
  // joinDate: string;
  // website: string;
  // email: string;
  // phone: string;
}

export default function SearchPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ isFollowing, setIsFollowing] =useState(false)

  useEffect(() => {
    //fetch all brand data
    const fetchBrands = async () => {
      const mockBrandData = getBrands;
      setBrands(mockBrandData);
    };
    fetchBrands();
  });

  const filteredBrands = brands.filter((brand) => {
    const matchesSearch =
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.location.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Brands</h1>
          <p className="text-gray-600">Discover our parner brands and follow them for latest updates to your favourite products</p>
        </div>
        <div className="bg-white border-gray-500/50 rounded-lg shadow-sm border p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search brands..."
                className="pl-10 border-gray-500/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 border rounded-xl border-gray-500/50">
          {filteredBrands.map((brand, index) => (
            <Card
              key={index}
              data-aos="fade-up"
              className="border-gray-500/50 bg-green-50/50"
            >
              <CardHeader>
                <div className="flex flex-col items-center">
                  <img
                    src={brand.avatar}
                    className="rounded-full border-2 border-gray-500/50 h-25 w-25"
                  />
                  <CardTitle className="">{brand.name}</CardTitle>
                  <p className="text-xs text-gray-600 mb-1">{brand.handle}</p>
                  <p className="mb-2 text-xs text-gray-600">{brand.location}</p>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`px-4 py-2 rounded-xl font-medium ${
                      isFollowing
                        ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button
                    variant="outline"
                    className="px-5 py-2 rounded-xl border-gray-300"
                  >
                    Profile
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex items-center text-center">
                <p className="text-xs">{brand.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function getBrands(): Brand[] {
  const brandData: Brand[] = [
    {
      id: "cafelayan",
      name: "Cafelayan",
      handle: "@cafelayan_ph",
      title: "Leading sustainable brand",
      bio: "Leading the way in sustainable packaging and environmental responsibility. Join us in creating a cleaner, greener Philippines through innovative recycling solutions.",
      avatar: "/cafelayanlogo2.jpeg",
      coverImage: "/Cafelayan-3.jpg",
      location: "Zamboanga City, Philippines",
      // joinDate: "2025",
      // website: "https://cafelayan.netlify.app",
      // email: "cafelayanhydroponicsfarm@gmail.com",
      // phone: "+63 2 8234 5678",
    },
    {
      id: "dios",
      name: "Dio's Heavenly Refreshing Juice",
      handle: "@dios_ph",
      title: "Community Builder",
      bio: "Heavenly refreshing Juice made 100% from Blue Ternate, Lemon Grass & Calamansi Extract.",
      avatar: "/placeholder.svg?height=300&width=300",
      coverImage: "/Cafelayan-3.jpg",
      location: "Baguio City, Philippines",
      // joinDate: "2025",
      // website: "https://cafelayan.netlify.app",
      // email: "cafelayanhydroponicsfarm@gmail.com",
      // phone: "+63 2 8234 5678",
    },
    // {
    //   id: "ruru",
    //   name: "Ruru's Mushroom",
    //   handle: "@rurushrooms",
    //   title: "Leading sustainable brand",
    //   bio: "Leading the way in sustainable packaging and environmental responsibility. Join us in creating a cleaner, greener Philippines through innovative recycling solutions.",
    //   avatar: "/placeholder.svg?height=300&width=300",
    //   coverImage: "/Cafelayan-3.jpg",
    //   location: "Cavite City, Philippines",
    //   // joinDate: "2025",
    //   // website: "https://cafelayan.netlify.app",
    //   // email: "cafelayanhydroponicsfarm@gmail.com",
    //   // phone: "+63 2 8234 5678",
    // },
  ];

  return brandData;
}
