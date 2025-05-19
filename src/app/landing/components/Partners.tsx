import Image from "next/image";
const partners = [
    {name: "kids Who Farm", logo: "/kwf.jpg", link: "/"},
    {name: "kids Who Farm", logo: "/kwf.jpg", link: "/"},
];

export default function Categories() {
    return(
        <section className="col-span-2">
            <div className="px-4 py-2 rounded-lg flex items-center justify-center bg-(--foreground)">
                <h2 className="font-bold text-white text-lg lg:text-xl xl:text-2xl">Partners</h2>
            </div>
            <section className="grid grid-cols-2 p-3 gap-3">
                {partners.map((partner, index) => (
                    <div
                    key={index}
                    className="col-span-1 flex flex-col items-center rounded-lg shadow-md p-3 shadow-gray-500 hover:scale-103 transition-transform duration-300 ease-in-out">
                        <Image
                        src={partner.logo}
                        alt="`${partner.name}` Logo"
                        height={100}
                        width={100}
                        />
                        <div>
                            <h1 className="text-black font-bold text-lg">{partner.name}</h1>
                        </div>
                    </div>
                ))};
            </section>
        </section>
    );
}