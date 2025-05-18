"use client";

import { useLogin } from "@/context/loginContext";
import Link from "next/link";

export default function Header() {
  const { isLoggedIn, setisLoggedIn } = useLogin();
  return (
    <header className="bg-green-600 text-white p-3 md:px-8 lg:px-10 xl:px-12 flex items-center justify-between">
      <div>
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
          Cafelayan
        </h1>
      </div>
      {isLoggedIn ? (
        <nav>
          <ul className="flex items-center justify-between gap-3 text-white">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li onClick={() => setisLoggedIn(false)}>LogOut</li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul className="flex items-center justify-between gap-3">
            <li>
              <Link
                href="/login"
                className=" px-2 py-1 border-b-1 border-white"
              >
                Log in
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="bg-white text-green-500 px-2 py-1 rounded-md "
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
