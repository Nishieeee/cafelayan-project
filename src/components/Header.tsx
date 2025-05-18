import Link from "next/link";

export default function Header() {

    return(
        <header className="bg-green-600 text-white p-3 flex items-center justify-between">
            <div>
                <h1>Cafelayan</h1>
            </div>
            <nav>
                <ul className="flex items-center justify-between gap-3">
                    <li><Link href="/login" className=" px-2 py-1 border-b-1 border-white">Log in</Link></li>
                    <li><Link href="/signup" className="bg-white text-green-500 px-2 py-1 rounded-md ">Sign Up</Link></li>
                </ul>
            </nav>
        </header>
    );
}