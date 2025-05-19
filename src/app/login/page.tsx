"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Role } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [role, setRole] = 
  useState<"customer" | "brand" | "org">("customer");
  const [name, setName] = useState("");

  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(role, name)
    router.push("/")
  }

  return (
    <section className="p-8 space-x-4 h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center border aspect-3/4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold p-3">Login</h1>
        <form onSubmit={HandleSubmit} className="flex flex-col px-4 items-center justify-between">
            <input 
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)} 
            required 
            className="border border-gray-300 rounded-md mb-2 py-2 px-3 focus:outline-none focus:ring-(--foreground) focus:ring-2"/>

            <input type="password" name="password" id="password" placeholder="password" required className="border border-gray-300 rounded-md mb-4 py-2 px-3 focus:outline-none focus:ring-(--foreground) focus:ring-2"/>

            <select value={role} onChange={(e) => setRole(e.target.value as Role)} className="w-full border border-gray-300 rounded-md mb-4 py-2 px-3 focus:outline-none focus:ring-(--foreground) focus:ring-2">
                <option value="customer" className="hover:bg-green-300">Customer</option>
                <option value="brand">Brand</option>
                <option value="org">Organization</option>
            </select>

            <button type="submit" className="text-center bg-(--foreground) rounded-md text-white font-bold py-2 w-full hover:outline-3 outline-green-500/50 hover:scale-103 transition-all duration-200 ease-in-out">login</button>
        </form>
      </div>
    </section>
  );
}
