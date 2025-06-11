"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MapPin,
  Calendar,
  Recycle,
  Search,
  ArrowLeft,
  Check,
  X,
  MoreHorizontal,
  Mail,
  Phone,
  Building2,
  MessageSquare,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"
import Link from "next/link"

interface DonationRequest {
  id: string;
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  message: string;
  requestDate: string;
  status: string;
  logo: string;
  approvedDate?: string;
  rejectedDate?: string;
}

interface Donation {
  id: string;
  title: string;
  description: string;
  category: string;
  quantity: string;
  weight: number;
  location: string;
  postedDate: string;
  image: string;
  status: string;
  requests: DonationRequest[];
}




export default function MyDonationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<DonationRequest | null>(null);
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("active")

  // Mock data for user's posted donations
  const myDonations = [
    {
      id: "don-101",
      title: "Plastic Bottles (PET)",
      description: "Collection of clean PET plastic bottles. Perfect for recycling or upcycling projects.",
      category: "Plastic",
      quantity: "20 bottles",
      weight: 0.8,
      location: "Zamboanga City",
      postedDate: "2024-01-15",
      image: "/placeholder.svg?height=100&width=100",
      status: "Active",
      requests: [
        {
          id: "req-101-1",
          organizationName: "Green Manila Initiative",
          contactPerson: "Juan Dela Cruz",
          email: "juan@greenmanila.org",
          phone: "+63 2 8234 5678",
          message:
            "We would like to collect these bottles for our recycling program. We can pick them up anytime this week.",
          requestDate: "2024-01-16",
          status: "Pending",
          logo: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "req-101-2",
          organizationName: "EcoHub Philippines",
          contactPerson: "Maria Santos",
          email: "maria@ecohub.ph",
          phone: "+63 2 8765 4321",
          message:
            "Our organization is interested in your PET bottles. We can use them for our upcycling workshop next month.",
          requestDate: "2024-01-17",
          status: "Pending",
          logo: "/placeholder.svg?height=40&width=40",
        },
      ],
    },
    {
      id: "don-102",
      title: "Cardboard Boxes (Various Sizes)",
      description: "Assorted cardboard boxes in good condition. Can be used for storage, crafts, or recycled.",
      category: "Paper",
      quantity: "15 boxes",
      weight: 2.1,
      location: "Zamboanga City",
      postedDate: "2024-01-12",
      image: "/placeholder.svg?height=100&width=100",
      status: "Active",
      requests: [
        {
          id: "req-102-1",
          organizationName: "Paper Recyclers Inc.",
          contactPerson: "Roberto Silva",
          email: "roberto@paperrecyclers.com",
          phone: "+63 2 8111 2222",
          message:
            "We are collecting cardboard boxes for our recycling facility. We can offer a small incentive for your donation.",
          requestDate: "2024-01-13",
          status: "Pending",
          logo: "/placeholder.svg?height=40&width=40",
        },
      ],
    },
    {
      id: "don-103",
      title: "Glass Jars",
      description: "Clean glass jars with lids. Perfect for storage or crafts.",
      category: "Glass",
      quantity: "10 jars",
      weight: 1.5,
      location: "Zamboanga City",
      postedDate: "2024-01-10",
      image: "/placeholder.svg?height=100&width=100",
      status: "Completed",
      requests: [
        {
          id: "req-103-1",
          organizationName: "Craft Reuse Center",
          contactPerson: "Ana Rodriguez",
          email: "ana@craftreuse.org",
          phone: "+63 2 8333 4444",
          message: "We would love to use these jars for our upcoming craft workshop with children.",
          requestDate: "2024-01-11",
          status: "Approved",
          approvedDate: "2024-01-12",
          logo: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "req-103-2",
          organizationName: "Glass Recycling Co.",
          contactPerson: "Carlos Mendoza",
          email: "carlos@glassrecycling.com",
          phone: "+63 2 8555 6666",
          message: "We can recycle these jars at our facility. We offer pickup services.",
          requestDate: "2024-01-11",
          status: "Rejected",
          rejectedDate: "2024-01-12",
          logo: "/placeholder.svg?height=40&width=40",
        },
      ],
    },
    {
      id: "don-104",
      title: "Aluminum Cans",
      description: "Clean aluminum beverage cans.",
      category: "Metal",
      quantity: "30 cans",
      weight: 0.6,
      location: "Zamboanga City",
      postedDate: "2024-01-05",
      image: "/placeholder.svg?height=100&width=100",
      status: "Completed",
      requests: [
        {
          id: "req-104-1",
          organizationName: "Metal Recyclers Association",
          contactPerson: "Miguel Reyes",
          email: "miguel@metalrecyclers.org",
          phone: "+63 2 8777 8888",
          message: "We are collecting aluminum cans for our recycling program. We can pick them up tomorrow.",
          requestDate: "2024-01-06",
          status: "Approved",
          approvedDate: "2024-01-07",
          logo: "/placeholder.svg?height=40&width=40",
        },
      ],
    },
  ]

  const filteredDonations = myDonations.filter((donation) => {
    const matchesSearch = donation.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === "all" || donation.status.toLowerCase() === activeTab.toLowerCase()
    return matchesSearch && matchesTab
  })

  const handleApproveRequest = (donation: any, request: any) => {
    setSelectedDonation(donation)
    setSelectedRequest(request)
    setShowApproveDialog(true)
  }

  const handleRejectRequest = (donation: any, request: any) => {
    setSelectedDonation(donation)
    setSelectedRequest(request)
    setShowRejectDialog(true)
  }

  const handleDeleteDonation = (donation: any) => {
    setSelectedDonation(donation)
    setShowDeleteDialog(true)
  }

  const confirmApprove = () => {
  if (selectedRequest && selectedDonation) {
    console.log("Approved request:", selectedRequest.id, "for donation:", selectedDonation.id);
  }
  setShowApproveDialog(false);
  setSelectedDonation(null);
  setSelectedRequest(null);
};

const confirmReject = () => {
  if (selectedRequest && selectedDonation) {
    console.log("Rejected request:", selectedRequest.id, "for donation:", selectedDonation.id);
  }
  setShowRejectDialog(false);
  setSelectedDonation(null);
  setSelectedRequest(null);
};

const confirmDelete = () => {
  if (selectedDonation) {
    console.log("Deleted donation:", selectedDonation.id);
  }
  setShowDeleteDialog(false);
  setSelectedDonation(null);
};


  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-700 border-green-200"
      case "Completed":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "Pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "Approved":
        return "bg-green-50 text-green-700 border-green-200"
      case "Rejected":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getPendingRequestsCount = () => {
    return myDonations.reduce((count, donation) => {
      return count + donation.requests.filter((req) => req.status === "Pending").length
    }, 0)
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/user/profile" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Profile
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Posted Donations</h1>
            <p className="text-gray-600">Manage your donations and organization requests</p>
          </div>
          <Button asChild className="bg-green-700 text-white outline-3 outline-transparent hover:outline-green-500/50 transition-all duration-300 ease ">
            <Link href="/donate">
              <Recycle className="mr-2 h-4 w-4 "  />
              Post New Donation
            </Link>
          </Button>
        </div>

        {/* Search and Tabs */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search donations..."
              className="pl-10 border-gray-500/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="active">
                Active
                <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                  {myDonations.filter((d) => d.status === "Active").length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed
                <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                  {myDonations.filter((d) => d.status === "Completed").length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Pending Requests Summary */}
        {getPendingRequestsCount() > 0 && (
          <Card className="mb-6 bg-yellow-50 border-yellow-200">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-yellow-600" />
                <span className="font-medium">
                  You have {getPendingRequestsCount()} pending request{getPendingRequestsCount() !== 1 ? "s" : ""} from
                  organizations
                </span>
              </div>
              <Button size="sm" variant="outline" className="bg-white border-gray-500/50" onClick={() => window.scrollTo(0, 0)}>
                Review Requests
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Donations List */}
        <div className="space-y-8">
          {filteredDonations.map((donation) => (
            <Card key={donation.id} className="overflow-hidden border-gray-500/50">
              <CardHeader className="pb-0">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-md overflow-hidden">
                      <img
                        src={donation.image || "/placeholder.svg"}
                        alt={donation.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{donation.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline">{donation.category}</Badge>
                        <Badge variant="outline" className={getStatusColor(donation.status)}>
                          {donation.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{donation.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Posted {new Date(donation.postedDate).toLocaleDateString()}</span>
                        </div>
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
                      <DropdownMenuItem asChild>
                        <Link href={`/donations/${donation.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Donation
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/donate/edit/${donation.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Donation
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDeleteDonation(donation)} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Donation
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{donation.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-6">
                  <div>
                    <p className="text-gray-500">Quantity</p>
                    <p className="font-medium">{donation.quantity}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Weight</p>
                    <p className="font-medium">{donation.weight} kg</p>
                  </div>
                </div>

                {/* Organization Requests Section */}
                <div className="mt-6">
                  <h3 className="font-medium text-lg mb-4">
                    Organization Requests{" "}
                    <Badge variant="outline" className="ml-2">
                      {donation.requests.length}
                    </Badge>
                  </h3>

                  {donation.requests.length > 0 ? (
                    <div className="space-y-4">
                      {donation.requests.map((request) => (
                        <div
                          key={request.id}
                          className={`border rounded-lg p-4 ${
                            request.status === "Pending" ? "bg-yellow-50 border-yellow-200" : ""
                          }`}
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={request.logo || "/placeholder.svg"} alt={request.organizationName} />
                                <AvatarFallback>
                                  {request.organizationName
                                    .split(" ")
                                    .map((n: string) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">{request.organizationName}</h4>
                                <p className="text-sm text-gray-500">
                                  Requested on {new Date(request.requestDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <Badge variant="outline" className={getStatusColor(request.status)}>
                              {request.status}
                            </Badge>
                          </div>

                          <div className="mt-3 p-3 bg-gray-50 rounded-md text-sm text-gray-700">
                            <p>&quo;{request.message}&quo;</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Building2 className="h-3 w-3 text-gray-400" />
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

                          {request.status === "Pending" && (
                            <div className="flex gap-3 mt-4">
                              <Button
                                onClick={() => handleApproveRequest(donation, request)}
                                className="bg-green-700 hover:bg-green-800 text-white outline-2 outline-transparent hover:outline-green-500/50 transition-colors duration-300 ease"
                              >
                                <Check className="mr-2 h-4 w-4" />
                                Approve Request
                              </Button>
                              <Button variant="outline" onClick={() => handleRejectRequest(donation, request)} className=" border-gray-500/50 hover:bg-red-600 hover:text-white transition-colors duration-300 ease">
                                <X className="mr-2 h-4 w-4" />
                                Reject Request
                              </Button>
                            </div>
                          )}
                          {request.status === "Approved" && (
                            <div className="mt-4 text-sm text-green-700 flex items-center gap-2">
                              <Check className="h-4 w-4" />
                              <span>
                                The organization has been notified.
                              </span>
                            </div>
                          )}

                          {request.status === "Rejected" && (
                            <div className="mt-4 text-sm text-red-700 flex items-center gap-2">
                              <X className="h-4 w-4" />
                              <span>
                                The organization has been notified.
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 border rounded-lg">
                      <p className="text-gray-500">No requests yet for this donation.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDonations.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Recycle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No donations found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || activeTab !== "all"
                  ? "Try adjusting your search or filters"
                  : "You haven't posted any donations yet"}
              </p>
              <Button asChild>
                <Link href="/donate">Post Your First Donation</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Approve Dialog */}
        <AlertDialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Approve Organization Request</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to approve the request from <strong>{selectedRequest?.organizationName}</strong>{" "}
                for your donation &quo;<strong>{selectedDonation?.title}</strong>&quo;?
                <br />
                <br />
                By approving, you agree to donate the items to this organization. They will be notified and will contact
                you to arrange pickup or delivery.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-gray-500/50">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmApprove} className="bg-green-700 hover:bg-green-800 text-white border-gray-500/50">
                Approve Request
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Reject Dialog */}
        <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reject Organization Request</AlertDialogTitle>
              <AlertDialogDescription >
                Are you sure you want to reject the request from <strong>{selectedRequest?.organizationName}</strong>{" "}
                for your donation &quo;<strong>{selectedDonation?.title}</strong>&quo;?
                <br />
                <br />
                The organization will be notified that their request was not accepted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-gray-500/50">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmReject} className="bg-red-600 hover:bg-red-700 text-white border-gray-500/50">
                Reject Request
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Donation</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete your donation &quo;<strong>{selectedDonation?.title}</strong>&quo;?
                <br />
                <br />
                This action cannot be undone. All associated requests will also be deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                Delete Donation
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
