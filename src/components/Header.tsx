"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Recycle, Menu,  LogOut, Home, BookOpen, MapPin, Info, LayoutDashboard, Search, User, Trophy } from "lucide-react"

import { useAuth } from "@/context/AuthContext"

export default function Header() {
  const { isLoggedIn, role, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isUser, setisUser] = useState(false)


  const handleLogout = () => {
    logout()
    setMobileMenuOpen(false)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    if(role === 'brand') setisUser(true); else setisUser(false)
  })


  return (
    <>
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Recycle className="h-6 w-6 text-green-600 mr-2" />
                <span className="font-bold text-xl text-gray-900">LoopLinkEco</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-4">
                  <Link
                    href="/"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <Home className="h-4 w-4 mr-1" />
                    Home
                  </Link>
                  {isLoggedIn && (
                    isUser ? (
                      <Link
                      href={`/${role}/profile`}
                      className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      <User className="h-4 w-4 mr-1" />
                      Profile
                    </Link>
                    ) : (
                    <Link
                      href={`/${role}/dashboard`}
                      className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      <LayoutDashboard className="h-4 w-4 mr-1" />
                      Dashboard
                    </Link>
                    )
                  )}
                  <Link
                    href="/tutorials"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <BookOpen className="h-4 w-4 mr-1" />
                    Tutorials
                  </Link>
                  <Link
                    href="/donate"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <MapPin className="h-4 w-4 mr-1" />
                    Donation Centers
                  </Link>
                  <Link
                    href="/leaderboards"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <Trophy className="h-4 w-4 mr-1" />
                    Top Recyclers
                  </Link>
                  <Link
                    href="/about"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <Info className="h-4 w-4 mr-1" />
                    About
                  </Link>
                </div>
              </div>
            </div>

            {/* Desktop Auth Section */}
            {isLoggedIn ? (
              <div className="hidden md:block">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="icon">
                    <Search className="h-5 w-5" />
                  </Button>
                  <Link href="/">
                    <Button variant="ghost" size="icon" className="hover:bg-red-50 hover:text-red-600" onClick={logout}>
                    <LogOut className="h-5 w-5" />
                  </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden md:block">
                <div className="flex items-center space-x-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-gray-500/50 hover:bg-green-700 hover:text-white hover:scale-[1.03] transition-all duration-300 ease"
                  >
                    <Link href="/login">Log In</Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="bg-green-700 text-white hover:bg-green-800 hover:scale-[1.03] transition-all duration-300 ease"
                  >
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              </div>
            )}

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle className="flex items-center text-left">
                      <Recycle className="h-5 w-5 text-green-600 mr-2" />
                      LoopLinkEco
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col space-y-4 mt-6">
                    {/* Navigation Links */}
                    <Link
                      href="/"
                      onClick={closeMobileMenu}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors"
                    >
                      <Home className="h-5 w-5 mr-3" />
                      Home
                    </Link>

                    {isLoggedIn && (
                    isUser ? (
                      <Link
                      href="/user/profile"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors"
                    >
                      <User className="h-4 w-4 mr-1" />
                      Profile
                    </Link>
                    ) : (
                    <Link
                      href={`/${role}/dashboard`}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4 mr-1" />
                      Dashboard
                    </Link>
                    )
                  )}

                    <Link
                      href="/tutorials"
                      onClick={closeMobileMenu}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors"
                    >
                      <BookOpen className="h-5 w-5 mr-3" />
                      Tutorials
                    </Link>

                    <Link
                      href="/donate"
                      onClick={closeMobileMenu}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors"
                    >
                      <MapPin className="h-5 w-5 mr-3" />
                      Donation Centers
                    </Link>
                    <Link
                      href="/leaderboards"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors"
                    >
                      <Trophy className="h-4 w-4 mr-1" />
                      Top Recyclers
                    </Link>
                    <Link
                      href="/about"
                      onClick={closeMobileMenu}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors"
                    >
                      <Info className="h-5 w-5 mr-3" />
                      About
                    </Link>

                    <Separator className="my-4" />

                    {/* Auth Section */}
                    {isLoggedIn ? (
                      <div className="space-y-3">
                        <Button variant="ghost" className="w-full justify-start px-4 py-3 h-auto hover:bg-gray-50">
                          <Search className="h-5 w-5 mr-3" />
                          Search
                        </Button>
                        <Link href="/">
                          <Button
                          variant="ghost"
                          onClick={handleLogout}
                          className="w-full justify-start px-4 py-3 h-auto text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          <LogOut className="h-5 w-5 mr-3" />
                          Log Out
                        </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Button
                          asChild
                          variant="outline"
                          className="w-full hover:bg-green-700 hover:text-white transition-colors"
                          onClick={closeMobileMenu}
                        >
                          <Link href="/login">Log In</Link>
                        </Button>
                        <Button
                          asChild
                          className="w-full bg-green-700 text-white hover:bg-green-800 transition-colors"
                          onClick={closeMobileMenu}
                        >
                          <Link href="/signup">Sign Up</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
