import Header from "@/components/Header";
import Side from "@/components/sidenav";
import Scan from "@/app/scan/[orgId]/page";
export default function Dashboard() {
    return(
        <>
            <Header />
            <main className="grid grid-cols-4 gap-0 h-screen">
                <Side />
                <section className="w-full border col-span-3">
                    <Scan />
                </section>
            </main>
        </>
    );
} 