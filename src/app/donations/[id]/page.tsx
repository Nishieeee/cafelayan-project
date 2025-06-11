import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, User, MessageCircle, Share2, Flag, ArrowLeft } from "lucide-react"
import { RequestDonationForm } from "@/components/request-donation-form"

// Sample data for a single donation
const donations = [
  {
    id: "1",
    title: "Cafelayan Lettuce Chips - Package",
    description:
      "reusable food package",
    category: "food",
    condition: "Good condition",
    location: "Zamboanga City",
    postedDate: "2 days ago",
    image: "/placeholder.svg?height=500&width=800",
    donor: "Jhon Clein",
    age: "2 days",
    brand: "Cafelayan",
    dimensions: "Approximately 250g",
    weight: "0.5kg",
    pickupLocation: "Zamboanga City",
    pickupAvailability: "Weekdays 8am-5pm, weekends by appointment",
    pickupNotes:
      "Please bring your own containers for the packages.",
  },
]

// Sample data for similar donations
const similarDonations = [
  {
    id: "7",
    title: "Plastic bottles",
    category: "Beverage",
    location: "Batangas Province",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "8",
    title: "Cardboard Boxes",
    category: "Eco-Friendly",
    location: "Manila",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "9",
    title: "Glass Bottles",
    category: "Seeds",
    location: "Cavite Province",
    image: "/placeholder.svg?height=64&width=64",
  },
]

// This would normally come from a database
// const getDonation = (id: string) => {
//   return donations.find((donation) => donation.id === id) || null
// }

export default function Page() {
  // Just use the first donation for demo
  const donation = donations[0]

  if (!donation) {
    return (
      <div className="container py-12 px-4 md:px-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Donation Not Found</h1>
        <p className="mb-6">The donation you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Button asChild>
          <Link href="/browse">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Browse
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="mb-6">
        <Link href="/browse" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Browse
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images */}
        <div className="lg:col-span-2">
          <div className=" bg-white rounded-lg overflow-hidden shadow-sm border border-gray-500/50">
            <div className="aspect-video overflow-hidden">
              <img
                src={donation.image || "/placeholder.svg"}
                alt={donation.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {donation.category}
                </Badge>
                <Badge variant="outline" className="bg-gray-50">
                  {donation.condition}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{donation.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{donation.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Posted {donation.postedDate}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>By {donation.donor}</span>
                </div>
              </div>

              <Tabs defaultValue="description">
                <TabsList className="mb-4">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="pickup">Pickup Info</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="text-gray-700">
                  <p className="mb-4">{donation.description}</p>
                  <p>This item is being donated as-is. Please review all details and photos before requesting.</p>
                </TabsContent>
                <TabsContent value="details">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border-b pb-2">
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-medium">{donation.category}</p>
                    </div>
                    <div className="border-b pb-2">
                      <p className="text-sm text-gray-500">Condition</p>
                      <p className="font-medium">{donation.condition}</p>
                    </div>
                    <div className="border-b pb-2">
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="font-medium">{donation.age}</p>
                    </div>
                    <div className="border-b pb-2">
                      <p className="text-sm text-gray-500">Brand/Origin</p>
                      <p className="font-medium">{donation.brand}</p>
                    </div>
                    <div className="border-b pb-2">
                      <p className="text-sm text-gray-500">Dimensions/Quantity</p>
                      <p className="font-medium">{donation.dimensions}</p>
                    </div>
                    <div className="border-b pb-2">
                      <p className="text-sm text-gray-500">Weight</p>
                      <p className="font-medium">{donation.weight}</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="pickup">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">Pickup Location</h3>
                      <p className="text-gray-700">{donation.pickupLocation}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Availability</h3>
                      <p className="text-gray-700">{donation.pickupAvailability}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Notes</h3>
                      <p className="text-gray-700">{donation.pickupNotes}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button variant="outline" className="flex-1 border-gray-500/50 hover:bg-green-700 hover:text-white transition-colors duration-300 ease" size="sm">
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
            <Button variant="outline" className="flex-1 border-gray-500/50 hover:bg-green-700 hover:text-white transition-colors duration-300 ease" size="sm">
              <Flag className="mr-2 h-4 w-4" /> Report
            </Button>
          </div>
        </div>

        {/* Right Column - Request Form */}
        <div>
          <Card className="border-gray-500/50">
            <CardHeader>
              <CardTitle>Request This Donation</CardTitle>
              <CardDescription>Fill out this form to express your interest in this item</CardDescription>
            </CardHeader>
            <CardContent>
              <RequestDonationForm donationId={donation.id} />
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <p className="text-sm text-gray-500 mb-4">
                By requesting this item, you agree to our community guidelines and terms of service.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MessageCircle className="h-4 w-4" />
                <span>Typical response time: 24-48 hours</span>
              </div>
            </CardFooter>
          </Card>

          <Card className="mt-6 border-gray-500/50">
            <CardHeader>
              <CardTitle>About the Donor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=48&width=48"
                    alt={donation.donor}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{donation.donor}</p>
                  <p className="text-sm text-gray-500">Member since 2022</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Donations</span>
                  <span className="font-medium">12 items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Response Rate</span>
                  <span className="font-medium">95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Average Response Time</span>
                  <span className="font-medium">8 hours</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 border-gray-500/50">
            <CardHeader>
              <CardTitle>Similar Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {similarDonations.map((item) => (
                  <Link
                    key={item.id}
                    href={`/donations/${item.id}`}
                    className="flex gap-3 hover:bg-gray-50 p-2 rounded-md -mx-2 border border-gray-500/50 hover:border-green-700 transition-colors duration-300 ease"
                  >
                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="font-medium text-sm line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-gray-500 line-clamp-1">{item.location}</p>
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="text-xs px-1 py-0 h-5">
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}