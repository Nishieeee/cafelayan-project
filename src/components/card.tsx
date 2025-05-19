// import Image from "next/image";
// import ImageSample from "@/assets/recycling.jpeg";

export default function Card({
  title,
  author,
  category,
  description,
  date,
}: {
  title: string;
  author: string;
  category: string;
  description: string;
  date: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-lg shadow-md shadow-gray-600 hover:scale-103 transition-transform duration-300 ease-in-out">
      <div className="w-full h-50 rounded-md bg-gray-400">     
      </div>
      <div className="px-3 py-4">
        <a href="#">{category}</a>
        <div className="pb-4">
          <h2 className="text-black font-bold text-xl">{title}</h2>
          <h4 className="text-black text-sm">
            <span className="font-bold">By</span> {author}
          </h4>
        </div>
        <p className="text-black lg:text-sm">{description}</p>
        <p className="py-4">{date}</p>
      </div>
    </div>
  );
}
