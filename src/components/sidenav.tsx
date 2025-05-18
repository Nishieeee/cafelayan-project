import Link from "next/link";

const Navlist = [
    {name: "Dashboard", href: "/Dasboard"},
    {name: "Activities", href: "/activities"},
    {name: "Settings", href: "/settings"},
    {name: "Log out", href: "/"},
];

export default function Sidebar() {
    return(
        <aside className="col-span-1 border h-full">
            <div className="">
                <h1>Cafelayan</h1>
            </div>
            <nav>
                <ul>
                    {Navlist.map((nav, index) => (
                        <li key={index}>
                            <Link href={nav.href}>
                                {nav.name}
                            </Link>
                        </li>
                    ))};
                </ul>
            </nav>
        </aside>
    );
}