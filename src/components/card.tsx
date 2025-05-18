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
    <div className="flex flex-col items-center rounded-lg shadow-md shadow-gray-600">
      <div className="w-full h-60 rounded-lg bg-gray-200">
        <h1>There should be an image here</h1>
      </div>
      <div className="px-3 py-4">
        <a href="#">{category}</a>
        <div className="pb-4">
          <h2 className="text-black font-bold text-2xl">{title}</h2>
          <h4 className="text-black">
            <span className="font-bold">By</span> {author}
          </h4>
        </div>
        <p className="text-black">{description}</p>
        <p className="py-4">{date}</p>
      </div>
    </div>
  );
}
