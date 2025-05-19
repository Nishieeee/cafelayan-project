

export default function MainArticle() {
    return(
        <section id="hero-page" className="col-span-1 md:col-span-4 p-3 my-3 lg:m-0 lg:p-5 w-full flex flex-col justify-end rounded-lg bg-cover bg-center text-black" style={{ backgroundImage:"url('/recycling.jpeg')" }}>
            <p >Recycling</p>
            <h1 className="font-bold text-lg md:text-xl lg:text-2xl xl:text-4xl">What to do with your lettuce chips wrappers</h1>
            <p className="text-black text-sm">
            <span className="font-bold">By</span> Jeffrey Sereno
          </p>
        </section>
    );
}