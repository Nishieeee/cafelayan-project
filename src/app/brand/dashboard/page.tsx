"use client";

import Header from "@/components/Header";
import Side from "@/components/sidenav";

export default function Dashboard() {

  return (
    <>
      <Header />
      <main className="grid grid-cols-1 lg:grid-cols-6 gap-0 h-screen">
        <Side />
        <section className="col-span-5"></section>
      </main>
    </>
  );
}