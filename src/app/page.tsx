import Header from "@/components/Header";
import LandingPage from "@/app/landing/page";
export default function Home() {
  return (
    <>
      <Header />
      <main className="grid grid-cols-1 lg:grid-cols-6 lg:gap-3 py-3 px-4 md:px-6 lg:px-8 xl:px-10">
        <LandingPage />
      </main>
    </>
  );
}
