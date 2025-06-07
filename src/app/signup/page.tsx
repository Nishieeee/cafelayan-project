"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { QrCode, Facebook, Mail, Loader2 } from "lucide-react"
import Link from "next/link"
type UserType = "user" | "brand" | "org"

export default function SignUpPage() {
  const router = useRouter()

  // Basic fields
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [userType, setUserType] = useState<UserType>("user")
  const [password, setPassword] = useState("")

  // Org extra fields
  const [orgName, setOrgName] = useState("")
  const [orgCity, setOrgCity] = useState("")
  const [orgDesc, setOrgDesc] = useState("")

  // Brand extra fields
  const [brandName, setBrandName] = useState("")
  const [productCategory, setProductCategory] = useState("")
  const [brandWebsite, setBrandWebsite] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Basic validation
    if (!fullName || !email) {
      setError("Full name and email are required")
      setLoading(false)
      return
    }

    // Gather data by role
    const data: { [key: string]: string | string[] | null } = {
      fullName,
      email,
      userType,
      password: password || null,
    }

    if (userType === "org") {
      if (!orgName || !orgCity) {
        setError("Organization name and city are required")
        setLoading(false)
        return
      }
      data.orgName = orgName
      data.orgCity = orgCity
      data.orgDesc = orgDesc || null
    } else if (userType === "brand") {
      if (!brandName || !productCategory) {
        setError("Brand name and product category are required")
        setLoading(false)
        return
      }
      data.brandName = brandName
      data.productCategory = productCategory
      data.brandWebsite = brandWebsite || null
    }

    // Simulate API delay
    setTimeout(() => {
      try {
        // Save to localStorage for demo purposes
        localStorage.setItem("userData", JSON.stringify(data))
        // Redirect to login page
        router.push("/login")
      } catch {
        setError("Failed to save data")
      } finally {
        setLoading(false)
      }
    }, 1000)
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-emerald-50 p-4">
      <Card className="w-full max-w-lg shadow-lg border-green-100">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center">
            <div className="inline-block p-2 bg-green-100 rounded-full mb-2">
              <QrCode className="h-8 w-8 text-green-700" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">Create your account</CardTitle>
          <CardDescription>Join our recycling community today</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={loading}
                  required
                  className="border-green-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                  className="border-green-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="border-green-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="userType">Account Type</Label>
                <Select value={userType} onValueChange={(value) => setUserType(value as UserType)}>
                  <SelectTrigger className="border-green-200 focus:ring-green-500">
                    <SelectValue placeholder="Select your account type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="user" className="hover:bg-green-300">User</SelectItem>
                    <SelectItem value="brand" className="hover:bg-green-300">Brand</SelectItem>
                    <SelectItem value="org" className="hover:bg-green-300">Organization</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Conditional Fields */}
            {userType === "org" && (
              <div className="space-y-4 pt-4 border-t border-green-100">
                <h3 className="text-sm font-semibold text-green-800">Organization Details</h3>

                <div className="space-y-2">
                  <Label htmlFor="orgName">Organization Name</Label>
                  <Input
                    id="orgName"
                    type="text"
                    placeholder="Enter organization name"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    disabled={loading}
                    required
                    className="border-green-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orgCity">City</Label>
                  <Input
                    id="orgCity"
                    type="text"
                    placeholder="Enter your city"
                    value={orgCity}
                    onChange={(e) => setOrgCity(e.target.value)}
                    disabled={loading}
                    required
                    className="border-green-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orgDesc">Description</Label>
                  <Textarea
                    id="orgDesc"
                    placeholder="Tell us about your organization"
                    value={orgDesc}
                    onChange={(e) => setOrgDesc(e.target.value)}
                    disabled={loading}
                    rows={3}
                    className="border-green-200 focus:border-green-500 focus:ring-green-500 resize-none"
                  />
                </div>
              </div>
            )}

            {userType === "brand" && (
              <div className="space-y-4 pt-4 border-t border-green-100">
                <h3 className="text-sm font-semibold text-green-800">Brand Details</h3>

                <div className="space-y-2">
                  <Label htmlFor="brandName">Brand Name</Label>
                  <Input
                    id="brandName"
                    type="text"
                    placeholder="Enter brand name"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    disabled={loading}
                    required
                    className="border-green-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productCategory">Product Category</Label>
                  <Input
                    id="productCategory"
                    type="text"
                    placeholder="e.g., Food & Beverage, Electronics"
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    disabled={loading}
                    required
                    className="border-green-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brandWebsite">Website (Optional)</Label>
                  <Input
                    id="brandWebsite"
                    type="url"
                    placeholder="https://your-website.com"
                    value={brandWebsite}
                    onChange={(e) => setBrandWebsite(e.target.value)}
                    disabled={loading}
                    className="border-green-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>
            )}
            {userType == "user" && (
              <div className="space-y-4 pt-4 border-t border-green-100">
                <h3 className="text-sm font-semibold text-green-800">User Details</h3>

                <div className="space-y-2">
                  <Label htmlFor="orgCity">City</Label>
                  <Input
                    id="orgCity"
                    type="text"
                    placeholder="Enter your city"
                    value={orgCity}
                    onChange={(e) => setOrgCity(e.target.value)}
                    disabled={loading}
                    required
                    className="border-green-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orgDesc">Description</Label>
                  <Textarea
                    id="orgDesc"
                    placeholder="Tell us about yourself"
                    value={orgDesc}
                    onChange={(e) => setOrgDesc(e.target.value)}
                    disabled={loading}
                    rows={3}
                    className="border-green-200 focus:border-green-500 focus:ring-green-500 resize-none"
                  />
                </div>
              </div>
            )}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-800 text-white hover:scale-[1.03] transition-transform duration-300 ease"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or sign up with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              disabled={loading}
              className="w-full hover:bg-green-700 hover:text-white transition-colors duration-300 ease"
            >
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button
              variant="outline"
              disabled={loading}
              className="w-full hover:bg-blue-700 hover:text-white transition-colors duration-300 ease"
            >
              <Facebook className="mr-2 h-4 w-4" />
              Facebook
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <div className="text-sm text-gray-500">
            Already have an account?{" "}
            <Button variant="link" className="p-0 text-green-700 hover:text-green-800">
              <Link href="/login">
                sign in
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </section>
  )
}
