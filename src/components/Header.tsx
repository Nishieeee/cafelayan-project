"use client";


import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext"
import Link from "next/link";

export default function Header() {
  const { isLoggedIn, role, name, logout } = useAuth()

  const pathname = usePathname();
  const inDashboard = role ? pathname === `/${ role }/dashboard` : false

  return (
    <header className="bg-(--foreground) text-white py-4 px-6 md:px-8 lg:px-10 xl:px-12 flex items-center justify-between">
      <div>
        { inDashboard &&
        isLoggedIn ? (
          <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
            Welcome back, { name }!
          </h1>
        ) : (
          <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
            Cafelayan
          </h1>
        )}
      </div>
      {!inDashboard &&
        (isLoggedIn ? (
          <nav>
            <ul className="flex items-center justify-between gap-4 text-white text-lg">
              {/* <li>
                <Link
                  href="/"
                  className=" p-3 border-b-2 border-transparent hover:border-white transition-color duration-400 ease"
                >
                  Home
                </Link>
              </li> */}
              <li>
                <Link
                  href={`/${ role }/dashboard`}
                  className="p-3 border-b-2 border-transparent hover:border-white transition-color duration-400 ease"
                >
                  Dashboard
                </Link>
              </li>
              <li
                className="border-2 px-6 py-2 rounded-md hover:bg-white hover:text-(--foreground) transition-colors duration-300 ease"
                onClick={logout}
              >
                LogOut
              </li>
            </ul>
          </nav>
        ) : (
          <nav>
            <ul className="flex items-center justify-between gap-2">
              <li>
                <Link
                  href="/login"
                  className="border-2 px-4 lg:px-6 py-3  rounded-md hover:bg-white hover:text-(--foreground) transition-colors duration-300 ease"
                >
                  Log in
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="bg-white text-(--foreground) px-4 lg:px-6 py-3 rounded-md hover:bg-(--foreground) hover:text-white border-2 border-white transition-colors duration-300 ease"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        ))}
    </header>
  );
}
