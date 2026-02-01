import database from "@/models/database";
import { connectDB } from "@/lib/mongodb";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { HomeIcon } from "lucide-react";
import parser from "html-react-parser";
import Image from "next/image"
import BlogSchema from "./BlogSchema";



export async function generateMetadata({params}){
  const {slug} = await params;

  const article = await database.findOne({slug});
  // if (!article) {
  //   return {
  //     title: "Article Not Found",
  //     description: "The requested article does not exist.",
  //   };
  // }
  return {
    robots: {
      index: true,
      follow: true,
    },
    title: article.title,
    description: article.metaDescription || "Error in description Load",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/tourist-places/${slug}`,
    },
    openGraph: {
      title: `${article.title}`,
      description: article.metaDescription || "Error in description Load",
      images: [
        {
          url: article.imageUrl,
          width: 1200,
          height: 630,
          alt: article.imageAlt,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.metaDescription || "Error in twitter description Load",
      images: [article.image],
    },
  };
}
 
//parser(String()).slice(0, 160)"test for meta Description"
export default async function FieldPage(context) {
  connectDB();
  const { slug } = await context.params;
  const article = await database.findOne({ slug });
  if (!article) {
    notFound();
  }

  const {description} = article

  
  return (
  <>
<BlogSchema post={article} />
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      {/* Hero Section */}
      <div className="relative w-full mx-auto lg:w-[65vw] h-64 md:h-96 lg:h-[500px] overflow-hidden bg-gray-200 dark:bg-slate-800">
        <Image
          src={article.imageUrl || "/card1.jpeg"}
          alt={article.imageAtl || "image content"}
          width={1200}
          height={630}
          loading="eager"
          priority
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <article className="lg:w-[65vw]  mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-600 dark:text-[#e8f8d5e0] mb-4">
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
        <div className="flex gap-2">
        <Link href="/tourist-places">
          <button className="py-3 px-6 w-28  rounded-lg bg-amber-400 text-black active:scale-90 gap-2 hover:bg-amber-600 flex  justify-center items-center text-center">
            <ArrowLeft size={20} /> <p>Back</p>
          </button>
        </Link>
        <Link href="/">
          <button className="py-3 px-6 w-28  rounded-lg bg-amber-400 text-black active:scale-90 gap-2 hover:bg-amber-600 flex  justify-center items-center text-center">
            <HomeIcon size={20} className="text-2xl" /> <p>Home</p>
          </button>
        </Link></div>
        <div className="border-b mb-6 mt-4 border-slate-200 dark:border-slate-700 w-full"></div>

        <article className="dark:text-zinc-300/90 indent-5 text-zinc-600/90 font-bold">{parser(String(description))}</article>
    
      </article>
    </div> </>
  );
}
