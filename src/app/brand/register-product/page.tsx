"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Loader2, Upload, QrCode, Download, Eye, Package, Recycle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { QRCodeSVG } from "qrcode.react"

const formSchema = z.object({
  productName: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  brandName: z.string().min(2, {
    message: "Brand name must be at least 2 characters.",
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
  totalManufactured: z.string().min(1, {
    message: "Please Specify amount manufactured.",
  }),
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
  agreeToTerms: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms and conditions.",
  }),
})

export default function RegisterProductPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Define the type for generated product
  type GeneratedProduct = z.infer<typeof formSchema> & {
    id: string
    url: string
    registrationDate: string
  }

  const [generatedProduct, setGeneratedProduct] = useState<GeneratedProduct | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      brandName: "Cafelayan",
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
      agreeToTerms: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call and QR code generation
    setTimeout(() => {
      const productId = `${values.brandName.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`
      const productUrl = `${window.location.origin}/package/${productId}`

      const product: GeneratedProduct = {
        ...values,
        id: productId,
        url: productUrl,
        registrationDate: new Date().toLocaleDateString(),
      }

      setGeneratedProduct(product)
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  const downloadQRCode = () => {
    if (!generatedProduct) return

    const svg = document.getElementById("qr-code-svg")
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
        downloadLink.download = `${generatedProduct.id}-qr-code.png`
        downloadLink.href = pngFile
        downloadLink.click()
      }

      img.src = "data:image/svg+xml;base64," + btoa(svgData)
    }
  }

  if (isSubmitted && generatedProduct) {
    return (
      <div className="container py-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/brand/dashboard" className="inline-flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Link>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Registered Successfully!</h1>
            <p className="text-gray-600">Your product has been registered and QR code generated.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Information */}
            <Card className="border-gray-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Product Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg">{generatedProduct.productName}</h3>
                  <p className="text-gray-600">{generatedProduct.brandName}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {generatedProduct.materialType}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {generatedProduct.recyclability}
                  </Badge>
                  <Badge variant="outline">{generatedProduct.category}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Size</p>
                    <p className="font-medium">{generatedProduct.size}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Product ID</p>
                    <p className="font-medium font-mono text-xs">{generatedProduct.id}</p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Description</p>
                  <p className="text-sm">{generatedProduct.description}</p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-1">Environmental Impact</h4>
                  <p className="text-green-700 text-sm">{generatedProduct.environmentalImpact}</p>
                </div>
              </CardContent>
            </Card>

            {/* QR Code */}
            <Card className="border-gray-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Generated QR Code
                </CardTitle>
                <CardDescription>This QR code links to your product&apos;s recycling information page</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center">
                  <div className="p-4 bg-white border-2 border-gray-200 rounded-lg">
                    <QRCodeSVG
                      id="qr-code-svg"
                      value={generatedProduct.url}
                      size={200}
                      level="M"
                      includeMargin={true}
                    />
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Scan this QR code to view the product&apos;s recycling information
                  </p>
                  <div className="space-y-2">
                    <Button onClick={downloadQRCode} className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download QR Code
                    </Button>
                    <Button variant="outline" className="w-full border-gray-500/50" asChild>
                      <Link href={generatedProduct.url} target="_blank">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview Landing Page
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-1">Next Steps</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Print the QR code on your product packaging</li>
                    <li>• Test the QR code before mass production</li>
                    <li>• Monitor scans through your dashboard</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8 space-y-4">
            <Button
              onClick={() => {
                setIsSubmitted(false)
                setGeneratedProduct(null)
                form.reset()
              }}
              variant="outline"
              className="mr-4"
            >
              Register Another Product
            </Button>
            <Button asChild>
              <Link href="/brand/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/brand/dashboard" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Register New Product</h1>
          <p className="text-gray-600">
            Register your product to generate a QR code that helps consumers find recycling information and donation
            centers.
          </p>
        </div>

        <Card className="border-gray-500/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Product Registration Form
            </CardTitle>
            <CardDescription>
              Fill out the information below to register your product and generate a QR code
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
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                  </TabsList>

                  {/* Basic Information Tab */}
                  <TabsContent value="basic" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="productName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., AquaPure 500ml Water Bottle" className="border-gray-500/50" {...field} />
                            </FormControl>
                            <FormDescription>The full name of your product</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="brandName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-900">Brand Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Your Brand Name" {...field} className="border-gray-500/50" />
                            </FormControl>
                            <FormDescription className="text-gray-900">Your company or brand name</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
                              className="min-h-[100px] border-gray-500/50"
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
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-gray-500/50">
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
                              <Input placeholder="e.g., 500ml, 250g, Large" className="border-gray-500/50" {...field} />
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
                              <Input placeholder="e.g. 999, 50000" className="border-gray-500/50" {...field} />
                            </FormControl>
                            <FormDescription>
                              Total Units Manufactured
                            </FormDescription>
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
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-sm text-gray-600 mb-2">Upload a photo of your product</p>
                        <Button type="button" variant="outline" size="sm" className="border-gray-500/50">
                          Choose File
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
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-gray-500/50">
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
                              <Input placeholder="e.g., Clear PET, Colored HDPE" className="border-gray-500/50" {...field} />
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
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-gray-500/50">
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
                              className="min-h-[100px] border-gray-500/50"
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
                              className="min-h-[100px] border-gray-500/50"
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
                              className="min-h-[100px] border-gray-500/50"
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
                              className="min-h-[80px] border-gray-500/50"
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

                  {/* Contact Information Tab */}
                  <TabsContent value="contact" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="contact@yourbrand.com" className="border-gray-500/50" {...field} />
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
                              <Input placeholder="09XX XXX XXXX" className="border-gray-500/50" {...field} />
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
                            <Input type="url" placeholder="https://yourbrand.com" className="border-gray-500/50" {...field} />
                          </FormControl>
                          <FormDescription>Your brand&apos;s website for more information</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="agreeToTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-normal">
                              I agree to the terms and conditions and confirm that all information provided is accurate.
                              I understand that this product information will be publicly accessible through the QR
                              code.
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                        <Recycle className="h-4 w-4" />
                        What happens next?
                      </h4>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Your product will be registered in our system</li>
                        <li>• A unique QR code will be generated</li>
                        <li>• Consumers can scan the code to find recycling information</li>
                        <li>• You can track scans and donations through your dashboard</li>
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end pt-6">
                  <Button type="submit" className="bg-green-700 text-white outline-transparent outline-3 hover:bg-green-800 hover:outline-green-400 transition-all duration-300 ease px-8" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Registering Product...
                      </>
                    ) : (
                      <>
                        <QrCode className="mr-2 h-4 w-4" />
                        Register Product
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
