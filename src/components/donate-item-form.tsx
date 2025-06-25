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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Check, Loader2, Upload } from "lucide-react"

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  material: z.string().min(1, {
    message: "Please specify the material.",
  }),
  condition: z.string().min(1, {
    message: "Please select the condition.",
  }),
  quantity: z.string().min(1, {
    message: "Please specify the quantity.",
  }),
  location: z.string().min(5, {
    message: "Please provide your location.",
  }),
  contactName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  contactEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  contactPhone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  pickupNotes: z.string().optional(),
  agreeToTerms: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms and conditions.",
  }),
})

export function DonateItemForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      material: "",
      condition: "",
      quantity: "",
      location: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      agreeToTerms: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">Item Listed Successfully!</h3>
        <p className="text-gray-600 mb-6">
          Your recyclable item has been added to our platform. Interested users will be able to contact you directly.
        </p>
        <div className="space-y-3">
          <Button onClick={() => setIsSubmitted(false)} className="w-full hover:text-green-700">
            List Another Item
          </Button>
          <Button variant="outline" className="w-full border-gray-500/50 hover:bg-green-700 hover:text-white transition-colors duration-300 ease">
            View My Listings
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Item Details */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Item Details</h4>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Clean Plastic Bottles (PET)" {...field} className="border-gray-500/50"/>
                </FormControl>
                <FormDescription>Give your item a clear, descriptive title</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the item, its condition, and any special notes..."
                    className="min-h-[100px] border-gray-500/50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <SelectContent className="border-gray-500/50 bg-white">
                      <SelectItem value="Plastic" className="hover:bg-green-300">Plastic</SelectItem>
                      <SelectItem value="Paper" className="hover:bg-green-300">Paper</SelectItem>
                      <SelectItem value="Glass" className="hover:bg-green-300">Glass</SelectItem>
                      <SelectItem value="Metal" className="hover:bg-green-300">Metal</SelectItem>
                      <SelectItem value="Electronics" className="hover:bg-green-300">Electronics</SelectItem>
                      <SelectItem value="Textiles" className="hover:bg-green-300">Textiles</SelectItem>
                      <SelectItem value="Other" className="hover:bg-green-300">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="material"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material Type</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., PET, Cardboard, Aluminum" className="border-gray-500/50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condition</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-gray-500/50">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border-gray-500/50 bg-white" >
                      <SelectItem value="New" className="hover:bg-green-300">New</SelectItem>
                      <SelectItem value="Like New" className="hover:bg-green-300">Like New</SelectItem>
                      <SelectItem value="Good" className="hover:bg-green-300">Good</SelectItem>
                      <SelectItem value="Fair" className="hover:bg-green-300">Fair</SelectItem>
                      <SelectItem value="Clean" className="hover:bg-green-300">Clean</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 10 bottles, 1 box" className="border-gray-500/50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Location & Contact */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Location & Contact</h4>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="City, Province (e.g., Makati City, Metro Manila)" className="border-gray-500/50" {...field} />
                </FormControl>
                <FormDescription>General area where the item can be picked up</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name" className="border-gray-500/50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" className="border-gray-500/50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="09XX XXX XXXX" className="border-gray-500/50" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="pickupNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any special instructions for pickup, availability, etc."
                    className="min-h-[80px] border-gray-500/50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>

        {/* Photo Upload */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Photos</h4>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-sm text-gray-600 mb-2">Upload photos of your item</p>
            <Button type="button" variant="outline" size="sm" className="border-gray-500/50 hover:bg-green-700 hover:text-white transition-colors duration-300 ease">
              Choose Files
            </Button>
            <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 5MB each</p>
          </div>
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
                  I agree to the terms and conditions and understand that my contact information will be shared with
                  interested users.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full text-white bg-green-700 hover:scale-102 transition-transform duration-300 ease" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Listing Item...
            </>
          ) : (
            "List Item for Donation"
          )}
        </Button>
      </form>
    </Form>
  )
}
