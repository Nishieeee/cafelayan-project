
export default function Popular() {
    
    const Items = [
        {title: "Tarpots", date: "22 August 2024"},
        {title: "No container? No Problem!", date: "22 August 2024"},
        {title: "HydroTarps", date: "22 August 2024"},
    ];

    return(
        <section className="col-span-2">
            <div className="px-4 py-2 rounded-lg flex items-center justify-center bg-(--foreground)">
                <h2 className="font-bold text-white">Most Popular</h2>
            </div>
            <div className="flex flex-col gap-4 my-3">
                {Items.map((item, index) => (
                    <div
                    key={index}
                    className="grid grid-cols-5 md:grid-cols-3 lg:grid-cols-5 shadow-md shadow-gray-400 rounded-md p-3 md:p-6">
                        <div className="col-span-2 md:col-span-1 lg:col-span-2 w-full h-full bg-gray-400 rounded-md">  </div>
                        <div className="col-span-3 md:col-span-2 lg:col-span-3 text-(--foreground) p-3">
                            <h2 className="text-black font-bold">{item.title}</h2>
                            <p className="text-gray-500 text-sm">{item.date}</p>
                        </div> 
                    </div>
                ))};
            </div>
        </section>
    );
}