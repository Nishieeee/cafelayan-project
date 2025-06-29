"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  Package,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  QrCode,
  BarChart3,
  Trash2,
  Download,
  Eye,
  ArrowLeft,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { QRCodeSVG } from "qrcode.react"

type Product = {
  id: string
  name: string
  brand: string
  material: string
  category: string
  status: string
  registrationDate: string
  totalScans: number
  totalDonations: number
  conversionRate: number
  donationRate: number
  lastScan: string
  image: string
  recyclability: string
}


export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [materialFilter, setMaterialFilter] = useState("all")
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showQRDialog, setShowQRDialog] = useState(false)

  // Mock data - would come from API
  const products = [
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
      donationRate: 56.2,
      lastScan: "2 hours ago",
      image: "/lettuce_chips-2.jpg",
      recyclability: "Highly Recyclable",
    },
    {
      id: "vbites-250g-002",
      name: "VBites Chips",
      brand: "Cafelayan",
      material: "PET Plastic",
      category: "Food",
      status: "Active",
      registrationDate: "2025-01-20",
      totalScans: 1923,
      totalDonations: 834,
      conversionRate: 43.4,
      donationRate: 65.42,
      lastScan: "1 day ago",
      image: "/placeholder.svg?height=60&width=60",
      recyclability: "Highly Recyclable",
    },
    // {
    //   id: "aquapure-sports-003",
    //   name: "AquaPure Sports Drink 750ml",
    //   brand: "AquaPure",
    //   material: "PET Plastic",
    //   category: "Sports Drinks",
    //   status: "Active",
    //   registrationDate: "2024-02-01",
    //   totalScans: 1456,
    //   totalDonations: 623,
    //   conversionRate: 42.8,
    //   lastScan: "3 hours ago",
    //   image: "/placeholder.svg?height=60&width=60",
    //   recyclability: "Highly Recyclable",
    // },
    // {
    //   id: "aquapure-juice-004",
    //   name: "AquaPure Orange Juice 500ml",
    //   brand: "AquaPure",
    //   material: "Tetra Pak",
    //   category: "Juices",
    //   status: "Draft",
    //   registrationDate: "2024-02-10",
    //   totalScans: 0,
    //   totalDonations: 0,
    //   conversionRate: 0,
    //   lastScan: "Never",
    //   image: "/placeholder.svg?height=60&width=60",
    //   recyclability: "Recyclable",
    // },
    // {
    //   id: "aquapure-glass-005",
    //   name: "AquaPure Glass Bottle 330ml",
    //   brand: "AquaPure",
    //   material: "Glass",
    //   category: "Premium",
    //   status: "Inactive",
    //   registrationDate: "2024-01-05",
    //   totalScans: 892,
    //   totalDonations: 445,
    //   conversionRate: 49.9,
    //   lastScan: "2 weeks ago",
    //   image: "/placeholder.svg?height=60&width=60",
    //   recyclability: "Highly Recyclable",
    // },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || product.status.toLowerCase() === statusFilter
    const matchesMaterial = materialFilter === "all" || product.material === materialFilter

    return matchesSearch && matchesStatus && matchesMaterial
  })

  const handleDeleteProduct = (productId: string) => {
    // Simulate API call
    console.log("Deleting product:", productId)
    setDeleteProductId(null)
  }

  const downloadQRCode = (product: Product) => {
  const svg = document.getElementById(`qr-code-${product.id}`)
  if (svg) {
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)

      const pngFile = canvas.toDataURL("image/png")
      const downloadLink = document.createElement("a")
      downloadLink.download = `${product.id}-qr-code.png`
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = "data:image/svg+xml;base64," + btoa(svgData)
  }
}


  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-700 border-green-200"
      case "Draft":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "Inactive":
        return "bg-gray-50 text-gray-700 border-gray-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="container py-8 px-4 bg-gray-100 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/brand/dashboard" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
            <p className="text-gray-600">Manage your registered products and track their performance</p>
          </div>
          <Button asChild className="bg-green-700 text-white hover:bg-green-800 hover:scale-103 transition-transform duration-300 ease">
            <Link href="/brand/register-product">
              <Plus className="mr-2 h-4 w-4" />
              Register New Product
            </Link>
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div data-aos="fade-up">
            <Card className="border-gray-500/50 bg-white hover:bg-green-700 hover:text-white transition-colors duration-300 ease">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">
                {products.filter((p) => p.status === "Active").length} active
              </p>
            </CardContent>
          </Card>
          </div>

          <div data-aos="fade-up">
            <Card className="border-gray-500/50 bg-white hover:bg-green-700 hover:text-white transition-colors duration-300 ease">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
              <QrCode className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {products.reduce((sum, p) => sum + p.totalScans, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          </div>

          <div data-aos="fade-up">
            <Card className="border-gray-500/50 bg-white hover:bg-green-700 hover:text-white transition-colors duration-300 ease">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {products.reduce((sum, p) => sum + p.totalDonations, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>
          </div>

          <div data-aos="fade-up">
            <Card className="border-gray-500/50 bg-white hover:bg-green-700 hover:text-white transition-colors duration-300 ease">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Conversion</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(
                  products.filter((p) => p.totalScans > 0).reduce((sum, p) => sum + p.conversionRate, 0) /
                  products.filter((p) => p.totalScans > 0).length
                ).toFixed(1)}
                %
              </div>
              <p className="text-xs text-muted-foreground">Scan to donation rate</p>
            </CardContent>
          </Card>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6 border-gray-500/50">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 border-gray-500/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px] border-gray-500/50">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all" className="hover:bg-green-300">All Status</SelectItem>
                    <SelectItem value="active" className="hover:bg-green-300">Active</SelectItem>
                    <SelectItem value="draft" className="hover:bg-green-300">Draft</SelectItem>
                    <SelectItem value="inactive" className="hover:bg-green-300">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={materialFilter} onValueChange={setMaterialFilter}>
                  <SelectTrigger className="w-[140px] border-gray-500/50">
                    <SelectValue placeholder="Material" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all" className="hover:bg-green-300">All Materials</SelectItem>
                    <SelectItem value="PET Plastic" className="hover:bg-green-300">PET Plastic</SelectItem>
                    <SelectItem value="Glass" className="hover:bg-green-300">Glass</SelectItem>
                    <SelectItem value="Tetra Pak" className="hover:bg-green-300">Tetra Pak</SelectItem>
                    <SelectItem value="Cardboard" className="hover:bg-green-300">Cardboard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products List */}
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} data-aos="fade-up" className="overflow-hidden hover:border-green-700 border-gray-500/50">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Product Info */}
                  <div className="flex items-start gap-4 flex-grow">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{product.name}</h3>
                          <p className="text-gray-600">{product.brand}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white">
                            <DropdownMenuItem asChild className="hover:bg-green-300">
                              <Link href={`/brand/products/${product.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Product
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedProduct(product)
                                setShowQRDialog(true)
                              }}
                              className="hover:bg-green-300"
                            >
                              <QrCode className="mr-2 h-4 w-4" />
                              View QR Code
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="hover:bg-green-300">
                              <Link href={`/brand/products/${product.id}/analytics`}>
                                <BarChart3 className="mr-2 h-4 w-4" />
                                View Analytics
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="hover:bg-green-300">
                              <Link href={`/package/${product.id}`} target="_blank">
                                <Eye className="mr-2 h-4 w-4" />
                                Preview Page
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setDeleteProductId(product.id)} className="text-red-600 hover:bg-green-300">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Product
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline" className={getStatusColor(product.status)}>
                          {product.status}
                        </Badge>
                        <Badge variant="outline">{product.material}</Badge>
                        <Badge variant="outline">{product.category}</Badge>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {product.recyclability}
                        </Badge>
                      </div>

                      <div className="text-sm text-gray-500">
                        Registered on {new Date(product.registrationDate).toLocaleDateString()} • Last scan:{" "}
                        {product.lastScan}
                      </div>
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:w-90">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-700">{product.totalScans.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">Total Scans</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-700">{product.totalDonations.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">Donations</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-700">{product.conversionRate}%</div>
                      <div className="text-xs text-gray-600">Conversion</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-700">{product.donationRate}%</div>
                      <div className="text-xs text-gray-600">Donation rate</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-lg font-bold text-orange-700">
                        {product.status === "Active" ? "Live" : product.status}
                      </div>
                      <div className="text-xs text-gray-600">Status</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || statusFilter !== "all" || materialFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Get started by registering your first product"}
              </p>
              <Button asChild>
                <Link href="/brand/register-product">
                  <Plus className="mr-2 h-4 w-4" />
                  Register Product
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteProductId} onOpenChange={() => setDeleteProductId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Product</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this product? This action cannot be undone and will deactivate all
                associated QR codes.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteProductId && handleDeleteProduct(deleteProductId)}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Delete Product
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* QR Code Dialog */}
        {selectedProduct && (
          <AlertDialog open={showQRDialog} onOpenChange={setShowQRDialog} >
            <AlertDialogContent className="max-w-md bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  QR Code - {selectedProduct.name}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Download or share this QR code for your product packaging
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-white border-2 border-gray-200 rounded-lg">
                  <QRCodeSVG
                    id={`qr-code-${selectedProduct.id}`}
                    value={`${window.location.origin}/scan/cafelayan`}
                    size={200}
                    level="M"
                    includeMargin={true}
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Product ID: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{selectedProduct.id}</code>
                  </p>
                </div>
              </div>
              <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                <Button onClick={() => downloadQRCode(selectedProduct)} className="w-full sm:w-auto">
                  <Download className="mr-2 h-4 w-4" />
                  Download PNG
                </Button>
                <AlertDialogCancel className="w-full sm:w-auto">Close</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  )
}
