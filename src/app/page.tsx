import Header from "@/components/Header";
import LandingPage from "@/app/landing/page";
export default function Home() {
  return (
    <>
      <Header />
      <main className="grid grid-cols-1 md:grid-cols-6 px-6 md:px-8 lg:px-10 xl:px-12">
        <LandingPage />
      </main>
    </>
  );
}
