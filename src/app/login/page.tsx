"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import type { Role } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { QrCode, Facebook, Mail, AlertCircle  } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [role, setRole] = useState<"user" | "brand" | "org">("user")
  const [name, setName] = useState("")
  const [showAlert, setshowAlert] = useState(false)
  const validUsers = ['cafelayan', 'dios', 'kwf', 'Jeffrey Sereno'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(validUsers.includes(name.trim())) {
      login(role, name)
      router.push("/")
    } else {
      setshowAlert(true)
    }
    
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-emerald-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-green-100">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center">
            <div className="inline-block p-2 bg-green-100 rounded-full mb-2">
              <QrCode className="h-8 w-8 text-green-700" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">Welcome back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Username</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-green-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="border-green-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Account Type</Label>
              <Select value={role} onValueChange={(value) => setRole(value as Role)}>
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

            <Button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white hover:scale-[1.03] transition-transform duration-300 ease"
            >
              Sign In
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="w-full hover:bg-green-700 hover:text-white transition-colors duration-300 ease"
            >
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button
              variant="outline"
              className="w-full hover:bg-blue-700 hover:text-white transition-colors duration-300 ease"
            >
              <Facebook className="mr-2 h-4 w-4" />
              Facebook
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <Button variant="link" className="text-green-700 hover:text-green-800">
            Forgot your password?
          </Button>
          <div className="mt-2 text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup">
              <Button variant="link" className="p-0 text-green-700 hover:text-green-800">
                Sign up
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
      <AlertDialog open={showAlert} onOpenChange={setshowAlert} >
          <AlertDialogContent className="max-w-sm rounded-xl shadow-lg border bg-white">
            <AlertDialogHeader className="flex items-start space-x-3">
              <AlertCircle className="h-8 w-8 mr-2 mt-1 text-red-600"/>
              <AlertDialogTitle className="text-lg font-semibold text-gray-800">Login failed</AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-gray-600 mt-1 ">
                Incorrect username or password. Please try again.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
              <AlertDialogAction
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Try Again
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    </section>
    
  )
}
