import Header from "@/components/Header";
import Side from "@/components/sidenav";
export default function Home() {
  return (
    <>
      <Header />
      <main className="grid grid-cols-4">
        <Side />
      </main>
    </>
  );
}
