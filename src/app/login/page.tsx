import Link from "next/link";



export default function Login() {
    return(
        <>
            <section className="flex items-center justify-center h-screen">
                <form action="" className="flex flex-col items-center aspect-3/4 p-3 shadow-sm shadow-black">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl p-3">Log in</h2>
                    <div className="flex flex-col items-start justify-center p-3">
                        <label htmlFor="username">Username or Email</label>
                        <input type="text" placeholder="example@gmail.com" className="border border-gray-300 rounded-md mb-2 py-1 px-3 focus:outline-none focus:ring-blue-500/50 focus:ring-2"/>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="password" className="border border-gray-300 rounded-md mb-2 py-1 px-3 focus:outline-none focus:ring-blue-500/50 focus:ring-2"/>
                    </div>
                    <Link href="/dashboard" type="submit" className="text-center bg-blue-600 rounded-md text-white font-bold py-2 w-full hover:outline-3 outline-blue-500/50 hover:scale-102 transition-all duration-250 ease-in-out">Log in</Link>

                    <div>
                        <Link href="/signup">Forgot Password</Link>
                    </div>
                </form>
            </section>
        </>
    );
}