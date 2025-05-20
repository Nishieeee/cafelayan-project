import Link from "next/link"
import { Button } from "@/components/ui/button"
import { QrCode, Recycle, MapPin } from "lucide-react"

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-green-50 to-emerald-50 py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="inline-block p-2 bg-green-100 rounded-full mb-4">
              <QrCode className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-green-800">
              Scan. Recycle. Impact.
            </h1>
            <p className="max-w-[700px] text-lg text-gray-600 md:text-xl">
              Scan QR codes on packages to discover recycling options. Donate to
              local organizations or learn DIY techniques to give your waste a
              second life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                asChild
                size="lg"
                className="bg-green-700 hover:bg-green-800 text-white hover:scale-103 transition-transform duration-300 ease"
              >
                <Link href="/donate">
                  <QrCode className="mr-2 h-5 w-5" />
                  Donate
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="hover:scale-103 transition-transform duration-300 ease"
              >
                <Link href="/tutorials">Browse Tutorials</Link>
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
            <p className="mt-4 text-lg text-gray-600">
              Three simple steps to make a difference
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-green-50 rounded-lg">
              <div className="p-3 bg-green-100 rounded-full mb-4">
                <QrCode className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Scan QR Code</h3>
              <p className="text-gray-600">
                Use your phone to scan the QR code on any recyclable package,
                bottle, or container.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-green-50 rounded-lg">
              <div className="p-3 bg-green-100 rounded-full mb-4">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Choose Your Action</h3>
              <p className="text-gray-600">
                Decide to donate the package to nearby organizations or learn
                how to recycle it yourself.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-green-50 rounded-lg">
              <div className="p-3 bg-green-100 rounded-full mb-4">
                <Recycle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Make Impact</h3>
              <p className="text-gray-600">
                Either drop off your items or create something new with
                step-by-step tutorials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Try Our Demo</h2>
            <p className="text-gray-600 mb-8">
              See how the platform works by trying our demo with a sample plastic bottle package.
            </p>
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=128&width=128"
                    alt="Demo plastic bottle"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-xl font-bold mb-2">AquaPure 500ml Plastic Bottle</h3>
                  <p className="text-gray-600 mb-4">
                    Experience how users will see recycling options after scanning a QR code on this plastic bottle.
                  </p>
                  <Button asChild className="bg-green-700 hover:bg-green-800">
                    <Link href="/package/demo-bottle-001">View Demo Package</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Impact Section */}
      <section className="py-20 bg-green-700 text-white">
        <div className="container px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">
              Our Environmental Impact
            </h2>
            <p className="text-lg mb-12 max-w-2xl mx-auto">
              Together, we&apos;re reducing waste and promoting circular economy
              practices across the Philippines.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold">15,000+</p>
                <p className="text-sm mt-2">Packages Recycled</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold">120+</p>
                <p className="text-sm mt-2">Partner Organizations</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold">50+</p>
                <p className="text-sm mt-2">Cities Covered</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold">8 tons</p>
                <p className="text-sm mt-2">Waste Diverted</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
