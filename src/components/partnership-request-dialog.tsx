"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Check, Loader2, Building2 } from "lucide-react"

const formSchema = z.object({
  organizationName: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
  city: z.string().min(1, {
    message: "Please select a city.",
  }),
  contactPerson: z.string().min(2, {
    message: "Contact person name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  partnershipType: z.string().min(1, {
    message: "Please select a partnership type.",
  }),
  expectedVolume: z.string().min(1, {
    message: "Please select expected volume.",
  }),
  message: z.string().min(20, {
    message: "Message must be at least 20 characters.",
  }),
  agreeToTerms: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms and conditions.",
  }),
})

interface PartnershipRequestDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  brandName: string
}

export function PartnershipRequestDialog({ open, onOpenChange, brandName }: PartnershipRequestDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organizationName: "",
      city: "",
      contactPerson: "",
      email: "",
      phone: "",
      partnershipType: "",
      expectedVolume: "",
      message: "",
      agreeToTerms: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log({ brandName, ...values })
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  const handleClose = () => {
    onOpenChange(false)
    if (isSubmitted) {
      setIsSubmitted(false)
      form.reset()
    }
  }

  if (isSubmitted) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Partnership Request Sent!</h3>
            <p className="text-gray-600 mb-6">
              Your partnership request has been submitted. Our team will review it and contact you within 3-5 business
              days.
            </p>
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Request Partnership
          </DialogTitle>
          <DialogDescription>
            Connect {brandName} with recycling organizations to expand your environmental impact.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Organization Details */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Organization Details</h4>

              <FormField
                control={form.control}
                name="organizationName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Green City Recycling Center" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City/Location</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        <SelectItem value="manila" className="hover:bg-green-200">Metro Manila</SelectItem>
                        <SelectItem value="cebu" className="hover:bg-green-200">Cebu City</SelectItem>
                        <SelectItem value="davao" className="hover:bg-green-200">Davao City</SelectItem>
                        <SelectItem value="iloilo" className="hover:bg-green-200">Iloilo City</SelectItem>
                        <SelectItem value="baguio" className="hover:bg-green-200">Baguio City</SelectItem>
                        <SelectItem value="cagayan" className="hover:bg-green-200">Cagayan de Oro</SelectItem>
                        <SelectItem value="bacolod" className="hover:bg-green-200">Zamboanga City</SelectItem>
                        <SelectItem value="other" className="hover:bg-green-200">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Contact Information</h4>

              <FormField
                control={form.control}
                name="contactPerson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Person</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="contact@organization.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="09XX XXX XXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Partnership Details */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Partnership Details</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="partnershipType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Partnership Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white">
                          <SelectItem value="official" className="hover:bg-green-200">Official Partnership</SelectItem>
                          <SelectItem value="community" className="hover:bg-green-200">Community Partnership</SelectItem>
                          <SelectItem value="pilot" className="hover:bg-green-200">Pilot Program</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expectedVolume"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Monthly Volume</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select volume" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white">
                          <SelectItem value="small" className="hover:bg-green-200">Small (0-500 items)</SelectItem>
                          <SelectItem value="medium" className="hover:bg-green-200">Medium (500-2000 items)</SelectItem>
                          <SelectItem value="large" className="hover:bg-green-200">Large (2000+ items)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your organization, recycling capabilities, and why you'd like to partner with us..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Include details about your recycling processes, capacity, and sustainability goals.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Terms */}
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
                      I agree to the partnership terms and conditions and understand that this is a request that will be
                      reviewed by the RecyclePH team.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-green-700 text-white hover:bg-green-800" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Request"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
