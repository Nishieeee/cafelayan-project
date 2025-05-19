"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Sprout, Users } from "lucide-react"

import { useEffect} from "react";
import { useParams } from "next/navigation";

export default function ScanPage() {
  const { orgId } = useParams()
  // const [city, setCity ] = useState("")
  
  useEffect(() => {
    fetch('https://ipapi.com/json').then(res => res.json()).then(data => {

      fetch('api/scan', {
        method: "POST",
        body: JSON.stringify({orgId, city: data.city, userId: "guest"})
      })
    })
  }, [orgId])
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-green-50 to-emerald-50 py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="inline-block p-2 bg-green-100 rounded-full mb-4">
              <Sprout className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-green-800">Share Farm Resources</h1>
            <p className="max-w-[700px] text-lg text-gray-600 md:text-xl">
              Connect with farmers and environmental advocates across the Philippines. Donate seeds, tools, and
              eco-friendly items to those who need them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button asChild size="lg" className="bg-green-700 hover:bg-green-800">
                <Link href="/donate">
                  Donate an Item <Leaf className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/browse">
                  Browse Donations <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">Our platform connects farmers and environmental advocates</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-green-50 rounded-lg">
              <div className="p-3 bg-green-100 rounded-full mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">List Your Donation</h3>
              <p className="text-gray-600">
                Take a photo and describe the farm tools, seeds, or eco-friendly items you want to donate.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-green-50 rounded-lg">
              <div className="p-3 bg-green-100 rounded-full mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Connect</h3>
              <p className="text-gray-600">
                Farmers and environmental advocates can browse and request items they need.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-green-50 rounded-lg">
              <div className="p-3 bg-green-100 rounded-full mb-4">
                <Sprout className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Grow Together</h3>
              <p className="text-gray-600">
                Arrange pickup or delivery and help support sustainable farming in the Philippines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Donations */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Donations</h2>
            <p className="mt-4 text-lg text-gray-600">Check out some of the items currently available</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDonations.map((donation, index) => (
              <Link
                key={index}
                href={`/donations/${donation.id}`}
                className="group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={donation.image || "/placeholder.svg"}
                    alt={donation.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{donation.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{donation.location}</p>
                  <div className="mt-3 flex items-center text-sm">
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      {donation.category}
                    </span>
                    <span className="ml-auto text-gray-500">{donation.postedDate}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/browse">
                View All Donations <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-green-700 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Environmental Impact</h2>
              <p className="text-lg mb-6">
                Together, we`&apos`re supporting sustainable farming practices and reducing waste across the Philippines. Join
                our growing community of donors and recipients making a difference.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center">
                  <p className="text-4xl font-bold">1,200+</p>
                  <p className="text-sm mt-2">Items Donated</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold">850+</p>
                  <p className="text-sm mt-2">Farmers Supported</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold">25+</p>
                  <p className="text-sm mt-2">Provinces Reached</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold">5 tons</p>
                  <p className="text-sm mt-2">Waste Diverted</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Environmental impact"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Farm Resource Sharing</h3>
              <p className="text-sm">
                Connecting farmers and environmental advocates across the Philippines since 2023.
              </p>
            </div>
            <div>
              <h4 className="text-white text-md font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/donate" className="hover:text-white transition-colors">
                    Donate an Item
                  </Link>
                </li>
                <li>
                  <Link href="/browse" className="hover:text-white transition-colors">
                    Browse Donations
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-md font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/guidelines" className="hover:text-white transition-colors">
                    Donation Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="/stories" className="hover:text-white transition-colors">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-md font-medium mb-4">Stay Connected</h4>
              <p className="text-sm mb-4">Join our newsletter to stay updated on new donations and community events.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 text-gray-900 bg-white rounded-l-md w-full text-sm"
                />
                <Button type="submit" className="rounded-l-none bg-green-700 hover:bg-green-800">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-6 text-sm text-center">
            <p>© 2023 Farm Resource Sharing. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Sample data for featured donations
const featuredDonations = [
  {
    id: "1",
    title: "Organic Rice Seeds",
    category: "Seeds",
    location: "Laguna Province",
    postedDate: "2 days ago",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "Garden Tiller",
    category: "Tools",
    location: "Quezon City",
    postedDate: "1 day ago",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "Bamboo Plant Holders",
    category: "Eco-Friendly",
    location: "Cebu City",
    postedDate: "3 days ago",
    image: "/placeholder.svg?height=200&width=300",
  },
]

