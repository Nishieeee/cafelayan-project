"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Recycle, Menu, Search, LogOut, Home } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
// import { usePathname } from "next/navigation";

export default function Header() {
  const { isLoggedIn, role, logout } = useAuth();

  // const pathname = usePathname();
  // const inDashboard = role ? pathname === `/${role}/dashboard` : false;
  return (
    <>
      <nav className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Recycle className="h-6 w-6 text-green-600 mr-2" />
                <span className="font-bold text-xl text-gray-900">
                  Cafelayan Prototype
                </span>
              </Link>
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-4">
                  <Link
                    href="/"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex justify-center"
                  >
                    <Home className="h-5 w-5 mr-1 flex items-center justify-center" />
                    Home
                  </Link>                
                 {isLoggedIn && (
                    <Link href={`/${ role }/dashboard`}
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                      Dashboard
                    </Link>
                  )}
                  <Link
                    href="/tutorials"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Tutorials
                  </Link>
                  <Link
                    href="/donate"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Donation Centers
                  </Link>
                  
                  <Link
                    href="/about"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About
                  </Link>
                  
                </div>
              </div>
            </div>
                
            {isLoggedIn ? (
              <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-gray-300 " onClick={logout}>
                  <Link href="/">
                    <LogOut className="h-10 w-10 text-red-600 " />
                  </Link>
                </Button>
              </div>
            </div>
            ) : (
              <nav>
            <ul className="flex items-center justify-between gap-2">
              <li>
                <Button asChild variant="outline" size="lg" className="hover:bg-green-700 hover:text-white hover:scale-103 transition-all duration-300 ease">
                    <Link href="/login">
                      Log In
                    </Link>
                </Button>
              </li>
              <li>
                <Button asChild size="lg" className="bg-green-700 text-white border-green-700 hover:bg-white hover:text-green-700 border hover:border-green-700 hover:scale-103 transition-all duration-300 ease">
                <Link href="/signup">
                  Sign up
                </Link>

                </Button>
              </li>
            </ul>
          </nav>
            )}

            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
