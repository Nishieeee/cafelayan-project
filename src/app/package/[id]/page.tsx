"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  BookOpen,
  Recycle,
  ArrowRight,
  MapPinned,
  Clock,
  ShoppingCart,
  ShoppingBag,
  Package,
  Cookie,
} from "lucide-react";
import { useParams } from "next/navigation";

interface Tutorial {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  duration: string;
  organization: string;
  url: string;
}

interface Organization {
  name: string;
  location: string;
  distance: string;
  hours: string;
  accepts: string;
}

interface PackageData {
  id: string
  name: string;
  brand: string;
  link: string;
  material: string;
  size: string;
  recyclability: string;
  image: string;
  description: string;
  environmentalImpact: string;
  recyclingProcess: string;
  tips: string;
  facts: string;
  donationPrep: string;
  nearbyOrganizations: Organization[];
  tutorials: Tutorial[];
}

interface Product {
  name: string;
  brand: string;
  image: string;
  link: string;
  description: string;
  category: string;
}
// Sample package data
const product: Record<string, PackageData > = {
 "cafelayan-250g-001": {
  id: "cafelayan-250g-001",
  name: "Cafelayan Lettuce Chips - Package",
  brand: "Cafelayan Lettuce Chips",
  link: "https://cafelayan.netlify.app",
  material: "PET Plastic",
  size: "250g",
  recyclability: "Highly Recyclable",
  image: "/lettuce_chips-2.jpg",
  description:
    "Reusable package made from PET plastic. This material is widely recyclable and can be turned into new packages, clothing fibers, or other products.",
  environmentalImpact:
    "Recycling this package saves enough energy to power a 60-watt light bulb for 6 hours. It also reduces the amount of plastic waste that could end up in oceans and harm marine life.",
  recyclingProcess:
    "Clean the package and place in designated PET recycling bins.",
  tips: "Rinse thoroughly and fold to save space.",
  facts:
    "It takes up to 450 years for a plastic to decompose in a landfill, but it can be recycled in just 60 days.",
  donationPrep: "Before donating, please rinse the package.",
  nearbyOrganizations: [
    {
      name: "Kids Who Farm",
      location: "Zamboanga City",
      distance: "2.3 km",
      hours: "Mon-Fri 8AM-5PM",
      accepts: "PET bottles, aluminum cans",
    },
    {
      name: "EcoHub ZC",
      location: "Zamboanga City",
      distance: "4.1 km",
      hours: "Daily 7AM-7PM",
      accepts: "All plastic containers",
    },
    {
      name: "Recycle Center BGC",
      location: "Bonifacio Global City",
      distance: "3.8 km",
      hours: "Mon-Sat 9AM-6PM",
      accepts: "Plastic bottles, paper, electronics",
    },
  ],
  tutorials: [
    {
      id: "1",
      title: "Pot for Plants",
      difficulty: "Easy",
      duration: "15 mins",
      organization: "Kids Who Farm",
      url: "https://www.youtube.com/embed/LM4InnPa3P8?si=L6QLCWGtrKXA0W25",
    },
    {
      id: "2",
      title: "Bird Feeder DIY Project",
      difficulty: "Easy",
      duration: "20 mins",
      organization: "Wildlife Conservation PH",
      url: "https://www.youtube.com/embed/00lH3LdW1iQ?si=zO9lp0CysvB8DurT",
    },
    {
      id: "3",
      title: "Plastice Bag using Plastic packages",
      difficulty: "Hard",
      duration: "1.5 hours",
      organization: "Urban Farmers Manila",
      url: "https://www.youtube.com/embed/ItL4FiZafCc?si=XGIWxYygFdDP8dvp",
    },
  ],
  },
  "cafelayan-250g-002": {
  id: "cafelayan-250g-002",
  name: "Cafelayan VBites Chips - Package",
  brand: "Cafelayan Lettuce Chips",
  link: "https://cafelayan.netlify.app",
  material: "PET Plastic",
  size: "250g",
  recyclability: "Highly Recyclable",
  image: "/lettuce_chips-2.jpg",
  description:
    "Reusable package made from PET plastic designed for dry snack preservations.",
  environmentalImpact:
    "reduces C02 emissions by minimizing the need for virgin plastic production. Saves landfill space and supports circular economy practices.",
  recyclingProcess:
    "Clean the package and place in designated PET recycling bins.",
  tips: "Rinse thoroughly and fold to save space.",
  facts:
    "Each recycled 250g PET bag saves approximately 0.5 liters of oil in production energy",
  donationPrep: "Before donating, please rinse the package.",
  nearbyOrganizations: [
    {
      name: "Kids Who Farm",
      location: "Zamboanga City",
      distance: "2.3 km",
      hours: "Mon-Fri 8AM-5PM",
      accepts: "PET bottles, aluminum cans",
    },
    {
      name: "EcoHub ZC",
      location: "Zamboanga City",
      distance: "4.1 km",
      hours: "Daily 7AM-7PM",
      accepts: "All plastic containers",
    },
    {
      name: "Recycle Center BGC",
      location: "Bonifacio Global City",
      distance: "3.8 km",
      hours: "Mon-Sat 9AM-6PM",
      accepts: "Plastic bottles, paper, electronics",
    },
  ],
  tutorials: [
    {
      id: "1",
      title: "Pot for Plants",
      difficulty: "Easy",
      duration: "15 mins",
      organization: "Kids Who Farm",
      url: "https://www.youtube.com/embed/LM4InnPa3P8?si=L6QLCWGtrKXA0W25",
    },
    {
      id: "2",
      title: "Bird Feeder DIY Project",
      difficulty: "Easy",
      duration: "20 mins",
      organization: "Wildlife Conservation PH",
      url: "https://www.youtube.com/embed/00lH3LdW1iQ?si=zO9lp0CysvB8DurT",
    },
    {
      id: "3",
      title: "Plastice Bag using Plastic packages",
      difficulty: "Hard",
      duration: "1.5 hours",
      organization: "Urban Farmers Manila",
      url: "https://www.youtube.com/embed/ItL4FiZafCc?si=XGIWxYygFdDP8dvp",
    },
  ],
  },
  "dios-500ml-001": {
  id: "dios-500ml-001",
  name: "Dio's Heavenly Refreshing Juice - Package",
  brand: "Dio's Heavenly Refreshing Juice",
  link: "https://cafelayan.netlify.app",
  material: "PET Plastic",
  size: "500ml",
  recyclability: "Highly Recyclable",
  image: "/dhrj.jpeg",
  description:
    "Clear PET package designed to retain freshness of juices. It's an eco-concious alternative to bottles and glass",
  environmentalImpact:
    "Upcycling this package reduces greenhouse gas emissions and prevents ocean plastic recycling pollution.",
  recyclingProcess:
    "Clean the package and place in designated PET recycling bins.",
  tips: "Rinse thoroughly and fold to save space.",
  facts:
    "It takes up to 450 years for a plastic to decompose in a landfill, but it can be recycled in just 60 days.",
  donationPrep: "Before donating, please rinse the package.",
  nearbyOrganizations: [
    {
      name: "Kids Who Farm",
      location: "Zamboanga City",
      distance: "2.3 km",
      hours: "Mon-Fri 8AM-5PM",
      accepts: "PET bottles, aluminum cans",
    },
    {
      name: "EcoHub ZC",
      location: "Zamboanga City",
      distance: "4.1 km",
      hours: "Daily 7AM-7PM",
      accepts: "All plastic containers",
    },
    {
      name: "Recycle Center BGC",
      location: "Bonifacio Global City",
      distance: "3.8 km",
      hours: "Mon-Sat 9AM-6PM",
      accepts: "Plastic bottles, paper, electronics",
    },
  ],
  tutorials: [
    {
      id: "1",
      title: "Pot for Plants",
      difficulty: "Easy",
      duration: "15 mins",
      organization: "Kids Who Farm",
      url: "https://www.youtube.com/embed/LM4InnPa3P8?si=L6QLCWGtrKXA0W25",
    },
    {
      id: "2",
      title: "Bird Feeder DIY Project",
      difficulty: "Easy",
      duration: "20 mins",
      organization: "Wildlife Conservation PH",
      url: "https://www.youtube.com/embed/00lH3LdW1iQ?si=zO9lp0CysvB8DurT",
    },
    {
      id: "3",
      title: "Plastice Bag using Plastic packages",
      difficulty: "Hard",
      duration: "1.5 hours",
      organization: "Urban Farmers Manila",
      url: "https://www.youtube.com/embed/ItL4FiZafCc?si=XGIWxYygFdDP8dvp",
    },
  ],
  },
}
const relatedProducts: Product[] = [
  {
    name: "Kale Chips",
    brand: "Cafelayan",
    image: "/placeholder.svg?height=150&width=200",
    link: "https://cafelayan.netlify.app/shop",
    description: "Crispy delicious kale with sweet salt.",
    category: "Food",
  },
  {
    name: "Mushroom Chips",
    brand: "RuRu Mushroom",
    image: "/placeholder.svg?height=150&width=200",
    link: "https://cafelayan.netlify.app/shop",
    description: "Baked Sweet crunchy potato perfection",
    category: "Food",
  },
];

export default function PackagePage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("donate");
  const [showBanner, setshowBanner] = useState(false)
  const [packageData, setpackageData] = useState<PackageData | null>(null);
  useEffect(() => {
    const productId = params.id as string
    const productData = product[productId]

    if(productData){ 
      setpackageData(productData)
    }
  }, [params.id])

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if(!consent) {
      setshowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setshowBanner(false)
  }
  if(!packageData) {
    return(
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Package Not Found</h1>
          <p className="text-gray-600">The package that you scanned doesn&apos;t exist.</p>
        </div>
      </div>
    )
  }
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Package Information Card */}
        <Card className="mb-3 border-gray-500/50">
          <CardHeader className="pb-3 ">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={packageData.image || "/placeholder.svg"}
                  alt={packageData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col items-center gap-2 md:flex-row justify-between w-full">
                <div className="flex-grow text-center md:text-left">
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-2">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      {packageData.material}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200"
                    >
                      {packageData.recyclability}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl mb-1">
                    {packageData.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {packageData.brand}
                  </CardDescription>
                </div>
                <div className="mx-1">
                  <Button
                    asChild
                    size="sm"
                    className="bg-green-700 text-white hover:bg-green-800 outline-2 outline-transparent hover:outline-green-300 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-green-300"
                  >
                    <a
                      href={packageData.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ShoppingCart className="mr-1 h-4 w-5" />
                      Shop Sustainable Snacks
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{packageData.description}</p>
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium flex items-center text-green-800 mb-2">
                <Recycle className="mr-2 h-5 w-5" /> Recycling Impact
              </h3>
              <p className="text-green-700 text-sm">
                {packageData.environmentalImpact}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Main Options Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="donate" className="text-base py-3">
              <MapPin className="mr-2 h-5 w-5" /> Donate Package
            </TabsTrigger>
            <TabsTrigger value="diy" className="text-base py-3">
              <BookOpen className="mr-2 h-5 w-5" /> DIY Recycling
            </TabsTrigger>
          </TabsList>

          {/* Donate Tab Content */}
          <TabsContent value="donate" className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium text-blue-800 mb-2">
                Before You Donate
              </h3>
              <p className="text-blue-700 text-sm">
                {packageData.donationPrep}
              </p>
            </div>

            <h3 className="text-lg font-medium mb-3">Nearby Organizations</h3>
            <div className="space-y-3">
              {packageData.nearbyOrganizations
                .slice(0, 3)
                .map((org: Organization, index: number) => (
                  <Card
                    key={index}
                    className="overflow-hidden border-gray-500/50"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="p-4 flex-grow">
                        <h4 className="font-medium mb-1">{org.name}</h4>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <MapPinned className="mr-1 h-4 w-4" />
                          <span>{org.location}</span>
                          <span className="mx-2">•</span>
                          <span>{org.distance}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>{org.hours}</span>
                        </div>
                      </div>
                      <div className="sm:w-32 p-4 bg-gray-50 border-gray-500/50 flex flex-row sm:flex-col items-center justify-center gap-2 border-t sm:border-t-0 sm:border-l">
                        <Button
                          size="sm"
                          className="w-full hover:text-green-700"
                        >
                          Get Directions
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full hover:bg-green-700 hover:text-white transition-colors duration-300 ease"
                        >
                          Call
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>

            <div className="text-center pt-4">
              <Button asChild>
                <Link href="/donate">
                  View All Donation Centers{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>

          {/* DIY Tab Content */}
          <TabsContent value="diy" className="space-y-4">
            <h3 className="text-lg font-medium mb-3">
              DIY Recycling Tutorials
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {packageData.tutorials
                .slice(0, 4)
                .map((tutorial: Tutorial, index: number) => (
                  <Card
                    data-aos="fade-up"
                    key={index}
                    className="overflow-hidden border-gray-500/50 hover:shadow-md transition-shadow"
                  >
                    <Link href={`/tutorials/${tutorial.id}`}>
                      <div className="aspect-video overflow-hidden">
                        {/* <img
                          src={tutorial.image || "/placeholder.svg"}
                          alt={tutorial.title}
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                        /> */}
                        <iframe width="440" height="215" src={tutorial.url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
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
                          <span className="text-xs text-gray-500">
                            {tutorial.duration}
                          </span>
                        </div>
                        <h4 className="font-medium text-sm line-clamp-2 mb-1">
                          {tutorial.title}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {tutorial.organization}
                        </p>
                      </div>
                    </Link>
                  </Card>
                ))}
            </div>

            <div className="text-center pt-4">
              <Button asChild>
                <Link href="/tutorials">
                  View All Tutorials <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <Card data-aos="fade-up" className="border-gray-500/50 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingBag className="mr-2 w-5 h-5" />
              Related Products
            </CardTitle>
            <CardDescription>
              <p className="text-gray-600">
                Find more Sustainable products and support local brands.
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedProducts.map((product, index) => (
                  <Card
                  key={index}
                    data-aos="fade-up"
                    className="h-full w-full grid grid-rows-[1fr,auto] border-gray-500/50 hover:border-green-700"
                  >
                    <CardHeader className="p-2 row-span-9 grid grid-rows-[1fr,auto] items-center text-center gap-4">
                      <div className="row-span-1 h-40 w-full">
                        <img
                          src={product.image}
                          alt="product image"
                          className="h-full w-full "
                        />
                        <Badge className="border m-1 bg-green-50 text-green-700 border-green-200">{product.category}</Badge>
                      </div>
                      <div className="row-span-1">
                        <CardTitle className="mt-2">
                          <h2 className="text-2xl">{product.name}</h2>
                        </CardTitle>
                        <p className="text-[13px] text-green-500">{product.brand}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="row-span-1 grid grid-rows-[1fr,auto] items-center text-center gap-4 min-h-[120px]">
                      <p className="text-center text-[14px]">{product.description}</p>
                      <Button
                        asChild
                        size="sm"
                        className="bg-green-700 text-white hover:bg-green-800 outline-2 outline-transparent hover:outline-green-300 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-green-300 my-2"
                      >
                        <a
                          href={packageData.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ShoppingCart className="mr-1 h-4 w-5" />
                          Go to Shop
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card data-aos="fade-up" className="border-gray-500/50 mb-5">
          <CardHeader>
            <CardTitle>Recycling Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-2">Preparation</h4>
                <p className="text-sm text-gray-600">
                  {packageData.recyclingProcess}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Best Practices</h4>
                <p className="text-sm text-gray-600">{packageData.tips}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Did You Know?</h4>
                <p className="text-sm text-gray-600">{packageData.facts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        {showBanner && (
          <div className="fixed bottom-4 right-4 z-50 bg-white shadow-lg border border-gray-500/50 p-4 rounded-xl max-w-xs text-sm leading-snug space-y-3 transition-all animate-fade-in">
            
            <h2 className="font-semibold text-gray-900 flex items-center text-md">
               <Cookie className="h-6 w-6 mr-2"/>
                Cookies
            </h2>
            <p className="text-sm text-gray-700 ">This page uses cookies for analytics. By clicking &ldquo;Accept&rdquo;, you agree to our cookie policy.</p>
            <Link href="/about" className="text-green-600 underline mb-2">Learn More</Link>
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setshowBanner(false)} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 text-sm rounded">
                Decline
            </Button>
              <Button onClick={handleAccept} className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 text-sm rounded">Accept</Button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
