export default function MainArticle() {
  return (
    <section
      id="hero-page"
      className="col-span-1 md:col-span-4 w-full flex flex-col justify-end rounded-lg bg-cover bg-center text-black hover:scale-101 transition-transform duration-300 ease-in-out"
      style={{ backgroundImage: "url('/recycling.jpeg')" }}
    >
      <div className="p-4 bg-gradient-to-b from-slate-50/8 via-neutral-100/12 to-stone-100/16">
        <p className="text-(--foreground)">Recycling</p>
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl xl:text-4xl">
          What to do with your lettuce chips wrappers
        </h1>
        <p className="text-sm">
          <span className="font-bold">By</span> Jeffrey Sereno
        </p>
      </div>
    </section>
  );
}
