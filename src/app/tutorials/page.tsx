"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Clock, Star, Search } from "lucide-react"
import Link from "next/link"

export default function TutorialsPage() {
  const searchParams = useSearchParams()
  const packageId = searchParams.get("package")
  const [tutorials, setTutorials] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [difficulty, setDifficulty] = useState("all")
  const [material, setMaterial] = useState("all")

  useEffect(() => {
    // Fetch tutorials, filtered by package type if specified
    const fetchTutorials = async () => {
      const mockTutorials = getMockTutorials(packageId)
      setTutorials(mockTutorials)
    }

    fetchTutorials()
  }, [packageId])

  // Filter tutorials based on search and filters
  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesSearch =
      tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = difficulty === "all" || tutorial.difficulty === difficulty
    const matchesMaterial = material === "all" || tutorial.materials.includes(material)

    return matchesSearch && matchesDifficulty && matchesMaterial
  })

  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">DIY Recycling Tutorials</h1>
          <p className="text-gray-600">
            {packageId
              ? "Learn creative ways to upcycle your scanned package"
              : "Discover creative ways to give your recyclables a second life"}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search tutorials..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all" className="hover:bg-green-200">All Levels</SelectItem>
                  <SelectItem value="Easy" className="hover:bg-green-200">Easy</SelectItem>
                  <SelectItem value="Medium" className="hover:bg-green-200">Medium</SelectItem>
                  <SelectItem value="Hard" className="hover:bg-green-200">Hard</SelectItem>
                </SelectContent>
              </Select>
              <Select value={material} onValueChange={setMaterial}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Material" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all" className="hover:bg-green-200">All Materials</SelectItem>
                  <SelectItem value="Plastic Bottles" className="hover:bg-green-200">Plastic Bottles</SelectItem>
                  <SelectItem value="Cardboard" className="hover:bg-green-200">Cardboard</SelectItem>
                  <SelectItem value="Glass Jars" className="hover:bg-green-200">Glass Jars</SelectItem>
                  <SelectItem value="Aluminum Cans" className="hover:bg-green-200">Aluminum Cans</SelectItem>
                  <SelectItem value="Paper" className="hover:bg-green-200">Paper</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">{filteredTutorials.length} tutorials found</p>
        </div>

        {/* Tutorials Grid */}
        {filteredTutorials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map((tutorial, index) => (
              <Link key={index} href={`${tutorial.id}`}>
                <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <iframe width="366" height="215" src={tutorial.url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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
                    <CardTitle className="text-lg line-clamp-2">{tutorial.title}</CardTitle>
                    <CardDescription className="text-sm">{tutorial.organization}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">{tutorial.description}</p>
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
                      {tutorial.materials.slice(0, 2).map((material: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="text-xs hover:bg-green-700 hover:text-white">
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
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tutorials found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              We could not find any tutorials matching your search criteria. Try adjusting your filters or search term.
            </p>
            <Button
              variant="outline"
              className="hover:scale-103 hover:bg-green-700 hover:text-white transition-all duration-300 ease"
              onClick={() => {
                setSearchTerm("")
                setDifficulty("all")
                setMaterial("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Back to Scan */}
        <div className="text-center mt-8">
          <Button asChild variant="outline" className="hover:scale-103 hover:bg-green-700 hover:text-white transition-all duration-300 ease">
            <Link href="/scan">Scan Another Package</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

// Mock function to get tutorials (would be replaced with API call)
function getMockTutorials(packageId: string | null) {
  const allTutorials = [
    {
      id: "https://youtu.be/UB6y0Cy0fd8?si=hGu8H8J_ukNIRkO0",
      title: "Self-Watering Planter from Plastic Bottle",
      description:
        "Transform a plastic bottle into an ingenious self-watering system for your plants. Perfect for herbs and small vegetables.",
      difficulty: "Easy",
      duration: "15 mins",
      steps: 5,
      rating: 4.8,
      organization: "Green Manila Initiative",
      materials: ["Plastic Bottles", "String", "Soil"],
      image: "/placeholder.svg?height=200&width=300",
      url: "https://www.youtube.com/embed/UB6y0Cy0fd8?si=oDPKcR4V4nnMHSP9"
    },
    {
      id: "2",
      title: "Cardboard Box Storage Organizer",
      description:
        "Create a multi-compartment storage organizer using cardboard boxes. Great for organizing office supplies or craft materials.",
      difficulty: "Medium",
      duration: "45 mins",
      steps: 8,
      rating: 4.6,
      organization: "Cebu Eco Warriors",
      materials: ["Cardboard", "Fabric", "Glue"],
      image: "/placeholder.svg?height=200&width=300",
      url: "https://www.youtube.com/embed/LK3WFqiSbnI?si=7f5ZQnJS4-TE-eV3"
    },
    {
      id: "https://youtu.be/vI1I7HMIQXE?si=WyYJNYRilQJO9S8F",
      title: "Glass Jar Herb Garden",
      description:
        "Turn glass jars into a beautiful hanging herb garden. Perfect for small spaces and adds greenery to your kitchen.",
      difficulty: "Easy",
      duration: "20 mins",
      steps: 4,
      rating: 4.9,
      organization: "Davao Recycling Hub",
      materials: ["Glass Jars", "Wire", "Seeds"],
      image: "/placeholder.svg?height=200&width=300",
      url: "https://www.youtube.com/embed/vI1I7HMIQXE?si=kzxVDgR_C9K8vhO7",
    },
    {
      id: "4",
      title: "Aluminum Can Wind Chimes",
      description:
        "Create beautiful wind chimes using aluminum cans. A great project for kids and adds musical ambiance to your garden.",
      difficulty: "Medium",
      duration: "30 mins",
      steps: 6,
      rating: 4.5,
      organization: "Green Manila Initiative",
      materials: ["Aluminum Cans", "String", "Paint"],
      image: "/placeholder.svg?height=200&width=300",
      url: "https://www.youtube.com/embed/r_J76L6e1S0?si=_wzw7LWXdwAMeLSy"
    },
    {
      id: "https://youtu.be/ItL4FiZafCc?si=akBtSXtz0KPsfAD1",
      title: "Paper Bag Gift Wrapping",
      description:
        "Transform paper bags into beautiful gift wrapping. Eco-friendly alternative to traditional wrapping paper.",
      difficulty: "Easy",
      duration: "10 mins",
      steps: 3,
      rating: 4.7,
      organization: "EcoHub Philippines",
      materials: ["Paper", "Ribbon", "Stamps"],
      image: "/placeholder.svg?height=200&width=300",
      url: "https://www.youtube.com/embed/ItL4FiZafCc?si=XGIWxYygFdDP8dvp",
    },
    {
      id: "https://youtu.be/00lH3LdW1iQ?si=ZoJ-WrzaAvkoPw70",
      title: "Plastic Bottle Bird Feeder",
      description:
        "Create a bird feeder that will attract local birds to your garden. Easy project that kids will love.",
      difficulty: "Easy",
      duration: "25 mins",
      steps: 6,
      rating: 4.8,
      organization: "Wildlife Conservation PH",
      materials: ["Plastic Bottles", "Wooden Spoons", "Bird Seed"],
      image: "/placeholder.svg?height=200&width=300",
      url: "https://www.youtube.com/embed/00lH3LdW1iQ?si=zO9lp0CysvB8DurT",
    },
    {
      id: "7",
      title: "Cardboard Castle Playhouse",
      description:
        "Build an amazing castle playhouse for kids using large cardboard boxes. Hours of creative fun guaranteed.",
      difficulty: "Hard",
      duration: "2 hours",
      steps: 12,
      rating: 4.9,
      organization: "Kids Craft Corner",
      materials: ["Cardboard", "Paint", "Tape"],
      image: "/placeholder.svg?height=200&width=300",
      url : "https://www.youtube.com/embed/qgrrDGOpbh0?si=paSV1GWTPxIbNGgW"
    },
    {
      id: "8",
      title: "Glass Jar Lanterns",
      description:
        "Create magical lanterns using glass jars and LED lights. Perfect for outdoor parties or romantic dinners.",
      difficulty: "Medium",
      duration: "35 mins",
      steps: 7,
      rating: 4.6,
      organization: "Craft Masters",
      materials: ["Glass Jars", "LED Lights", "Wire"],
      image: "/placeholder.svg?height=200&width=300",
      url: "https://www.youtube.com/embed/3mx2mRIgBzg?si=6amOtr0UOC3Vo56F"
    },
  ]

  // If packageId is specified, filter tutorials relevant to that package type
  if (packageId === "demo-bottle-001") {
    return allTutorials.filter((tutorial) => tutorial.materials.includes("Plastic Bottles"))
  }

  return allTutorials
}
