import Card from "@/components/card";
import Link from "next/link";

const Articles = [
  {
    title: "Article 1",
    author: "cafelayan",
    category: "farming techniques",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium officia reprehenderit eum inventore, pariatur ",
  },
  {
    title: "Article 2",
    author: "cafelayan",
    category: "Recycling",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium officia reprehenderit eum inventore, pariatur ",
  },
  {
    title: "Article 3",
    author: "cafelayan",
    category: "Recycling",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium officia reprehenderit eum inventore, pariatur ",
  },
  {
    title: "Article 3",
    author: "cafelayan",
    category: "News",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium officia reprehenderit eum inventore, pariatur ",
  },
];
export default function articlesSection() {
  return (
    <section className="col-span-1 md:col-span-4">
      <div className="px-4 py-2 rounded-md flex items-center justify-between bg-(--foreground)">
        <h2 className="text-white text-md md:text-xl lg:text-2xl">Articles</h2>
        <Link href="/seemore" className="text-white">
          See More
        </Link>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 py-8">
        {Articles.map((article, index) => (
            <Card key={index}
            title={article.title}
            author={article.author}
            category={article.category}
            description={article.description}
            date="1 august 2024"
            />
        ))};
      </section>
    </section>
  );
}
