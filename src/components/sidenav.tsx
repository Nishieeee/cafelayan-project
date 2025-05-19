import Link from "next/link";
import { useAuth } from "@/context/AuthContext"



export default function Sidebar() {

  const { role , logout } = useAuth()

  const Navlist = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: `/${ role }/dashboard` },
  { name: "Profile", href: "/profile" },
  { name: "Activities", href: "/activities" },
  { name: "Settings", href: "/settings" },
];

  return (
    <aside className="col-span-1 h-full bg-(--foreground) text-white">
      <nav className="text-md mt-3 h-screen">
        <ul className="flex flex-col items-start h-1/4 justify-between">
          {Navlist.map((nav, index) => (
            <li
              key={index}
              className=" w-full h-full px-2 py-3 lg:px-3 lg:py-4 hover:bg-green-900 transition-colors duration-200 ease-in"
            >
              <Link
                href={nav.href}
                className="ps-2 md:ps-3 lg:ps-6 text-md md:text-xl lg:text-2xl"
              >
                {nav.name}
              </Link>
            </li>
          ))}
          <li className=" w-full h-full px-2 py-3 lg:px-3 lg:py-4 hover:bg-green-900 transition-colors duration-200 ease-in">
            <Link
              href="/"
              className="ps-2 w-full md:ps-3 lg:ps-6 text-md md:text-xl lg:text-2xl"
              onClick={logout}
            >
              Log Out
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
