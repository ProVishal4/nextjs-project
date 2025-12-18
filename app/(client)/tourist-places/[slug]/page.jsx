import database from "@/models/database";
import { connectDB } from "@/lib/mongodb";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Description from "./description";
import { HomeIcon } from "lucide-react";

export default async function FieldPage(context) {
  connectDB();
  const { slug } = await context.params;
  const article = await database.findOne({ slug });
  if (!article) {
    notFound();
  }

  const {description} = article

  
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      {/* Hero Section */}
      <div className="relative w-full mx-auto lg:w-[65vw] h-64 md:h-96 lg:h-[500px] overflow-hidden bg-gray-200 dark:bg-slate-800">
        <img
          src={article.imageUrl || "/card1.jpeg"}
          alt={article.slugImage}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <article className="lg:w-[65vw] border border-lime-600 mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          {article.title}
        </h1>

        {/* Metadata */}
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 mb-8 pb-3 ">
          <time dateTime={article.createdAt}>
            {new Date(article.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        <div className="flex">
        <Link href="/tourist-places">
          <button className="py-3 px-6 w-28 border border-red-500 rounded-lg bg-amber-400 text-black active:scale-90 gap-2 hover:bg-amber-600 flex  justify-center items-center text-center">
            <ArrowLeft size={20} /> <p>Back</p>
          </button>
        </Link>
        <Link href="/">
          <button className="py-3 px-6 w-28 border border-red-500 rounded-lg bg-amber-400 text-black active:scale-90 gap-2 hover:bg-amber-600 flex  justify-center items-center text-center">
            <HomeIcon size={20} className="text-2xl" /> <p>Home</p>
          </button>
        </Link></div>
        <div className="border-b mb-6 mt-4 border-slate-200 dark:border-slate-700 w-full"></div>

        {/* <div className="text-lime-400 font-bold">{description}</div> */}
        <Description description={description} />
      </article>
    </div>
  );
}
