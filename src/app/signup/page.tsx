"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FaGoogle, FaFacebookF} from "react-icons/fa"
type UserType = "brand" | "org"

export default function SignUpPage() {
  const router = useRouter()

  // Basic
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [userType, setUserType] = useState<UserType>("brand")
  const [password, setPassword] = useState("")

  // Org extra
  const [orgName, setOrgName] = useState("")
  const [orgCity, setOrgCity] = useState("")
  const [orgDesc, setOrgDesc] = useState("")

  // Brand extra
  const [brandName, setBrandName] = useState("")
  const [productCategory, setProductCategory] = useState("")
  const [brandWebsite, setBrandWebsite] = useState("")

  // // Customer extra
  // const [customerCity, setCustomerCity] = useState("")
  // const [interests, setInterests] = useState<string[]>([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // // Interests options for customer
  // const interestOptions = [
  //   "Recycling",
  //   "Youth Organizations",
  //   "Animal Welfare",
  //   "Education",
  // ]

  // // Handle checkbox toggle
  // const toggleInterest = (interest: string) => {
  //   setInterests((prev) =>
  //     prev.includes(interest)
  //       ? prev.filter((i) => i !== interest)
  //       : [...prev, interest]
  //   )
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    router.push('/login')
    // Simple validation example
    if (!fullName || !email) {
      setError("Full name and email are required")
      setLoading(false)
      return
    }

    // Gather data by role
    const data: {[key: string]: string | string[] | null} = {
      fullName,
      email,
      userType,
      password: password || null,
    }

    if (userType === "org") {
      if (!orgName || !orgCity) {
        setError("Org Name and City are required")
        setLoading(false)
        return
      }
      data.orgName = orgName
      data.orgCity = orgCity
      data.orgDesc = orgDesc || null
    } else if (userType === "brand") {
      if (!brandName || !productCategory) {
        setError("Brand Name and Product Category are required")
        setLoading(false)
        return
      }
      data.brandName = brandName
      data.productCategory = productCategory
      data.brandWebsite = brandWebsite || null
    } 
    // else if (userType === "customer") {
    //   data.customerCity = customerCity || null
    //   data.interests = interests.length > 0 ? interests : null
    // }

    // Simulate API delay
    setTimeout(() => {
      try {
        // Save to localStorage for demo purposes
        localStorage.setItem("userData", JSON.stringify(data))
        // Redirect to dashboard by role
        router.push(`/${userType}/dashboard`)
      } catch {
        setError("Failed to save data")
      } finally {
        setLoading(false)
      }
    }, 1000)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 font-sans">
      <h1 className="mb-8 text-3xl font-bold">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4 rounded-md bg-white p-6 shadow-md"
      >
        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={loading}
          required
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-(--foreground) focus:outline-none"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-(--foreground) focus:outline-none"
        />

        {/* Password (optional) */}
        <input
          type="password"
          placeholder="Password (optional)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-(--foreground) focus:outline-none"
        />

        {/* User Type */}
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value as UserType)}
          disabled={loading}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-(--foreground) focus:outline-none"
        >
          {/* <option value="customer">Customer</option> */}
          <option value="brand">Brand</option>
          <option value="org">Organization</option>
        </select>

        {/* Conditional extra fields */}

        {/* Org fields */}
        {userType === "org" && (
          <>
            <input
              type="text"
              placeholder="Organization Name"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              disabled={loading}
              required
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-(--foreground) focus:outline-none"
            />
            <input
              type="text"
              placeholder="City"
              value={orgCity}
              onChange={(e) => setOrgCity(e.target.value)}
              disabled={loading}
              required
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-(--foreground) focus:outline-none"
            />
            <textarea
              placeholder="Description / Tagline"
              value={orgDesc}
              onChange={(e) => setOrgDesc(e.target.value)}
              disabled={loading}
              rows={3}
              className="resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-(--foreground) focus:outline-none"
            />
          </>
        )}

        {/* Brand fields */}
        {userType === "brand" && (
          <>
            <input
              type="text"
              placeholder="Brand Name"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              disabled={loading}
              required
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-(--foreground) focus:outline-none"
            />
            <input
              type="text"
              placeholder="Product Category"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              disabled={loading}
              required
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-(--foreground) focus:outline-none"
            />
            <input
              type="url"
              placeholder="Website URL (optional)"
              value={brandWebsite}
              onChange={(e) => setBrandWebsite(e.target.value)}
              disabled={loading}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-(--foreground) focus:outline-none"
            />
          </>
        )}

        {/* Customer fields */}
        {/* {userType === "customer" && (
          <>
            <input
              type="text"
              placeholder="City (optional)"
              value={customerCity}
              onChange={(e) => setCustomerCity(e.target.value)}
              disabled={loading}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-(--foreground)focus:outline-none"
            />
            <fieldset className="space-y-1">
              <legend className="text-sm font-semibold">Interested Causes</legend>
              {interestOptions.map((interest) => (
                <label
                  key={interest}
                  className="flex items-center space-x-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={interests.includes(interest)}
                    onChange={() => toggleInterest(interest)}
                    disabled={loading}
                    className="rounded border-gray-300 text-(--foreground) focus:ring-(--foreground)"
                  />
                  <span>{interest}</span>
                </label>
              ))}
            </fieldset>
          </>
        )} */}

        {error && (
          <p className="text-center text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="text-center bg-(--foreground) rounded-md text-white font-bold py-2 w-full hover:outline-3 outline-green-500/50 hover:scale-103 transition-all duration-200 ease-in-out"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Button variant="outline" className="hover:bg-green-700 hover:text-white transition-colors duration-300 ease">
          <FaGoogle/>
            oogle
          </Button>
          <Button variant="outline" className="hover:bg-blue-700 hover:text-white transition-colors duration-300 ease">
            <FaFacebookF/>
            Facebook
          </Button>
       </div>
        
      </form>
    </main>
  )
}
