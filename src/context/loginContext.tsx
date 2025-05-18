"use client";

import {createContext, useContext, useState, ReactNode} from "react";

type LoginContextType = {
    isLoggedIn : boolean;
    setisLoggedIn : (value : boolean) => void;
};

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export function LoginProvider({ children } : {children : ReactNode}) {
    const [isLoggedIn, setisLoggedIn] = useState(false);

    return (
        <LoginContext.Provider value={{isLoggedIn, setisLoggedIn}}>
            {children}
        </LoginContext.Provider>
    );
 }

 export function useLogin() {
    const context = useContext(LoginContext);
    if(!context) throw new Error("useLogin must be used within LoginProvider");

    return context;
 }