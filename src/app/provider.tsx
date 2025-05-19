import { ReactNode } from "react";
import { LoginProvider } from "../context/AuthContext";

export default function provider({ children }: { children: ReactNode }) {
  return <LoginProvider>{children}</LoginProvider>;
}
