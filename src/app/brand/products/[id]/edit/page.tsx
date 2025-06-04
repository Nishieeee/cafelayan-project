"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Check, Loader2, Upload, Package, ArrowLeft, Save, AlertTriangle, Eye, QrCode } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
  productName: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  materialType: z.string().min(1, {
    message: "Please select a material type.",
  }),
  materialSubtype: z.string().optional(),
  size: z.string().min(1, {
    message: "Please specify the size.",
  }),
  totalManufactured: z.string().optional(),
  recyclability: z.string().min(1, {
    message: "Please select recyclability level.",
  }),
  environmentalImpact: z.string().min(10, {
    message: "Environmental impact description must be at least 10 characters.",
  }),
  recyclingInstructions: z.string().min(10, {
    message: "Recycling instructions must be at least 10 characters.",
  }),
  donationPrep: z.string().min(10, {
    message: "Donation preparation instructions must be at least 10 characters.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  contactEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  contactPhone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  website: z.string().url().optional().or(z.literal("")),
  sustainabilityGoals: z.string().optional(),
  status: z.string().min(1, {
    message: "Please select a status.",
  }),
})

export default function EditProductPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [product, setProduct] = useState<any>(null)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      description: "",
      materialType: "",
      materialSubtype: "",
      size: "",
      totalManufactured: "",
      recyclability: "",
      environmentalImpact: "",
      recyclingInstructions: "",
      donationPrep: "",
      category: "",
      contactEmail: "",
      contactPhone: "",
      website: "",
      sustainabilityGoals: "",
      status: "",
    },
  })

  // Simulate fetching product data
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)

      // Mock product data - would come from API
      const mockProduct = {
        id: params.id,
        productName: "Cafelayan Lettuce Chips",
        brandName: "Cafelayan",
        description:
          "Reusable plastice package made from PET plastic. This material is widely recyclable and can reused or turned into clothing fibers, or other products.",
        materialType: "PET Plastic",
        materialSubtype: "Clear PET",
        size: "250g",
        totalManufactured: "2500",
        recyclability: "Highly Recyclable",
        environmentalImpact:
          "Recycling one plastic saves enough energy to power a 60-watt light bulb for 6 hours. It also reduces the amount of plastic waste that could end up in oceans and harm marine life.",
        recyclingInstructions:
          "Clean the package, remove the label if possible, and place in designated PET recycling bins. Rinse thoroughly. Keep the cap on - it's recyclable too!",
        donationPrep:
          "Before donating, please rinse the package.",
        category: "Food",
        contactEmail: "contact@cafelayan.com",
        contactPhone: "09123456789",
        website: "https://cafelayanhydroponics.com",
        sustainabilityGoals:
          "We are committed to using 100% recycled plastic in our packages by 2025 and reducing our carbon footprint by 50%.",
        status: "Active",
        registrationDate: "2025-01-15",
        totalScans: 2847,
        totalDonations: 1256,
        image: "/placeholder.svg?height=60&width=60",
      }

      // Simulate API delay
      setTimeout(() => {
        setProduct(mockProduct)

        // Populate form with existing data
        form.reset({
          productName: mockProduct.productName,
          description: mockProduct.description,
          materialType: mockProduct.materialType,
          materialSubtype: mockProduct.materialSubtype || "",
          size: mockProduct.size,
          totalManufactured: mockProduct.totalManufactured || "",
          recyclability: mockProduct.recyclability,
          environmentalImpact: mockProduct.environmentalImpact,
          recyclingInstructions: mockProduct.recyclingInstructions,
          donationPrep: mockProduct.donationPrep,
          category: mockProduct.category,
          contactEmail: mockProduct.contactEmail,
          contactPhone: mockProduct.contactPhone,
          website: mockProduct.website || "",
          sustainabilityGoals: mockProduct.sustainabilityGoals || "",
          status: mockProduct.status,
        })

        setIsLoading(false)
      }, 1000)
    }

    fetchProduct()
  }, [params.id, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Updated product:", { id: params.id, ...values })
      setIsSubmitting(false)
      setIsSubmitted(true)
      router.push("/brand/products")
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    }, 1500)
  }

  if (isLoading) {
    return (
      <div className="container py-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="bg-white rounded-lg border p-6">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="space-y-4">
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container py-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-6">
            The product you're trying to edit doesn't exist or you don't have permission to edit it.
          </p>
          <Button asChild>
            <Link href="/brand/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/brand/products" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.productName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
              <p className="text-gray-600">{product.productName}</p>
            </div>
          </div>

          {/* Product Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-700">{product.totalScans.toLocaleString()}</div>
              <div className="text-xs text-gray-600">Total Scans</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-700">{product.totalDonations.toLocaleString()}</div>
              <div className="text-xs text-gray-600">Donations</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-700">
                {((product.totalDonations / product.totalScans) * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-gray-600">Conversion</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-lg font-bold text-orange-700">{product.status}</div>
              <div className="text-xs text-gray-600">Status</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3 mb-6">
            <Button variant="outline" size="sm" asChild className="hover:bg-green-700 hover:text-white transition-colors duration-300 ease">
              <Link href={`/brand/products/${product.id}/analytics`}>
                <QrCode className="mr-2 h-4 w-4" />
                View Analytics
              </Link>
            </Button>
          </div>

          {/* Success Alert */}
          {isSubmitted && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <Check className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Product updated successfully! Changes are now live.
              </AlertDescription>
            </Alert>
          )}

          {/* Warning Alert */}
          <Alert className="mb-6 border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <strong>Important:</strong> Changes to product information will be immediately visible to consumers who
              scan the QR code. Make sure all information is accurate before saving.
            </AlertDescription>
          </Alert>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Edit Product Information
            </CardTitle>
            <CardDescription>
              Update your product information. Changes will be reflected immediately on the consumer-facing page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="material">Material</TabsTrigger>
                    <TabsTrigger value="recycling">Recycling</TabsTrigger>
                    <TabsTrigger value="contact">Contact & Status</TabsTrigger>
                  </TabsList>

                  {/* Basic Information Tab */}
                  <TabsContent value="basic" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 gap-6">
                      <FormField
                        control={form.control}
                        name="productName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., AquaPure 500ml Water Bottle" {...field} />
                            </FormControl>
                            <FormDescription>The full name of your product</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* <FormField
                        control={form.control}
                        name="brandName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Brand Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., AquaPure" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      /> */}
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your product, its use, and any special features..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This description will be shown to consumers when they scan the QR code
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white">
                                <SelectItem value="Beverages" className="hover:bg-green-300">Beverages</SelectItem>
                                <SelectItem value="Food" className="hover:bg-green-300">Food</SelectItem>
                                <SelectItem value="Personal Care" className="hover:bg-green-300">Personal Care</SelectItem>
                                <SelectItem value="Household" className="hover:bg-green-300">Household</SelectItem>
                                <SelectItem value="Electronics" className="hover:bg-green-300">Electronics</SelectItem>
                                <SelectItem value="Other" className="hover:bg-green-300">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="size"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Size/Volume</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 500ml, 250g, Large" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="totalManufactured"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Manufactured</FormLabel>
                            <FormControl>
                              <Input placeholder="999" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Photo Upload */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Product Photo
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt="Current product"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-medium">Current Photo</p>
                            <p className="text-xs text-gray-500">Upload a new photo to replace</p>
                          </div>
                        </div>
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Upload a new photo of your product</p>
                        <Button type="button" variant="outline" size="sm">
                          Choose New File
                        </Button>
                        <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 5MB</p>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Material Information Tab */}
                  <TabsContent value="material" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="materialType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Material</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select material" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white">
                                <SelectItem value="PET Plastic" className="hover:bg-green-300">PET Plastic</SelectItem>
                                <SelectItem value="HDPE Plastic" className="hover:bg-green-300">HDPE Plastic</SelectItem>
                                <SelectItem value="PP Plastic" className="hover:bg-green-300">PP Plastic</SelectItem>
                                <SelectItem value="Cardboard" className="hover:bg-green-300">Cardboard</SelectItem>
                                <SelectItem value="Paper" className="hover:bg-green-300">Paper</SelectItem>
                                <SelectItem value="Glass" className="hover:bg-green-300">Glass</SelectItem>
                                <SelectItem value="Aluminum" className="hover:bg-green-300">Aluminum</SelectItem>
                                <SelectItem value="Tetra Pak" className="hover:bg-green-300">Tetra Pak</SelectItem>
                                <SelectItem value="Mixed Materials" className="hover:bg-green-300">Mixed Materials</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="materialSubtype"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Material Subtype (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Clear PET, Colored HDPE" {...field} />
                            </FormControl>
                            <FormDescription>Specific type or grade of material</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="recyclability"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recyclability Level</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select recyclability" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white">
                              <SelectItem value="Highly Recyclable" className="hover:bg-green-300">Highly Recyclable</SelectItem>
                              <SelectItem value="Recyclable" className="hover:bg-green-300">Recyclable</SelectItem>
                              <SelectItem value="Limited Recyclability" className="hover:bg-green-300">Limited Recyclability</SelectItem>
                              <SelectItem value="Not Recyclable" className="hover:bg-green-300">Not Recyclable</SelectItem>
                              <SelectItem value="Compostable" className="hover:bg-green-300">Compostable</SelectItem>
                              <SelectItem value="Biodegradable" className="hover:bg-green-300">Biodegradable</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>How easily can this product be recycled in the Philippines?</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="environmentalImpact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Environmental Impact Statement</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the environmental benefits of recycling this product..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>This will be shown to consumers to motivate recycling</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  {/* Recycling Information Tab */}
                  <TabsContent value="recycling" className="space-y-6 mt-6">
                    <FormField
                      control={form.control}
                      name="recyclingInstructions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recycling Instructions</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Provide step-by-step instructions on how to prepare this product for recycling..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Clear instructions help consumers properly prepare items for recycling
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="donationPrep"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Donation Preparation Instructions</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Instructions for preparing this product before donating to organizations..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>How should consumers prepare this item before donating?</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sustainabilityGoals"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sustainability Goals (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Share your brand's sustainability commitments and goals..."
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This helps build trust with environmentally conscious consumers
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  {/* Contact Information & Status Tab */}
                  <TabsContent value="contact" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="contact@yourbrand.com" {...field} />
                            </FormControl>
                            <FormDescription>For partnership inquiries and support</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="09XX XXX XXXX" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website (Optional)</FormLabel>
                          <FormControl>
                            <Input type="url" placeholder="https://yourbrand.com" {...field} />
                          </FormControl>
                          <FormDescription>Your brand's website for more information</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Status</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white">
                              <SelectItem value="Active" className="hover:bg-green-300">Active</SelectItem>
                              <SelectItem value="Draft" className="hover:bg-green-300">Draft</SelectItem>
                              <SelectItem value="Inactive " className="hover:bg-green-300">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Active products are visible to consumers. Draft products are saved but not public. Inactive
                            products are hidden but QR codes still work.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Product Information</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-blue-700">Product ID:</p>
                          <p className="font-mono text-xs">{product.id}</p>
                        </div>
                        <div>
                          <p className="text-blue-700">Registration Date:</p>
                          <p>{new Date(product.registrationDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-between pt-6">
                  <Button type="button" variant="outline" asChild> 
                    <Link href="/brand/products">Cancel</Link>
                  </Button>
                  <Button type="submit" className="bg-green-700 text-white hover:bg-green-800 px-8" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving Changes...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
