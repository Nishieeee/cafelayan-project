"use client";

import {createContext, useContext, useState, ReactNode} from "react";

export type Role = "customer" | "brand" | "org"

interface AuthContextType {
    role: Role | null
    name: string | null
    login: (role : Role, name: string) => void
    logout: () => void
    isLoggedIn: boolean
}

const AuthContext = createContext<AuthContextType>({
    role:null,
    name: null,
    login: () => {},
    logout: () => {},
    isLoggedIn: false,
})

export const AuthProvider = ({ children }:{ children:ReactNode}) => {
    const [role, setRole] = useState<Role | null>(() => {
        if(typeof window !== "undefined") {
            return localStorage.getItem("role") as Role | null
        }
        return null
    })

    const [name, setName] = useState<string | null >(() => {
        if(typeof window !== "undefined") {
            return localStorage.getItem("name")
        }
        return null
    })

    const login = (newRole: Role, newName: string) => {
        setRole(newRole)
        setName(newName)
        localStorage.setItem("role", newRole)
        localStorage.setItem("name", newName)
    }

    const logout = () => {
        setRole(null)
        setName(null)
        localStorage.removeItem("role")
        localStorage.removeItem("name")
    }

    const isLoggedIn = role !== null
    return (
        <AuthContext.Provider value={{ role, name, login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext)

