"use client";

import {createContext, useContext, useState, useEffect, ReactNode} from "react";
// @ts-expect-error: AOS types are missing for this dynamic import
import AOS from 'aos'
import 'aos/dist/aos.css';

export type Role = "user" | "brand" | "org"

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

    useEffect(() => {
        AOS.init({duration: 700, once: true});
    }, [])
    
    return (
        <AuthContext.Provider value={{ role, name, login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext)

