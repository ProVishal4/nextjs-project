import database from "@/models/database";
import { connectDB } from "@/lib/mongodb";
import { notFound } from "next/navigation";
//import React, { useEffect, useState } from 'react'

export default async function FieldPage({ params }) {
  //const [cards, setCards] = useState([])
  connectDB();
  const { slug } = params;
  // useEffect(()=>{
  //     axios.get('/api/blog')
  //     .then((res)=>{
  //         setCards(res.data);
  //     })
  //     .catch((err)=>{
  //         console.log("Error in fetching articles Cards", err)
  //     })
  // },[])
  //  const res = await fetch(`/api/find-one/${id}`, { cache: 'no-store' });
  //       const data = await res.json();
  //   let filteredItem = articles.filter((item) => {
  //     return item.category === flow;
  //   });
  //   console.log(filteredItem)
  //   let resultArray = filteredItem.map(item =>{
  //     return item.category
  //   })
  //   console.log(resultArray)
  //  console.log("res.data :- ",data)
  const article = await database.findOne({ slug });
  if (!article) {
    notFound();
  }
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      {/* Hero Section */}
      <div className="relative w-full mx-auto lg:w-[65vw] h-64 md:h-96 lg:h-[500px] overflow-hidden bg-gray-200 dark:bg-slate-800">
        <img
          src={article.image}
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
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
          <time dateTime={article.createdAt}>
            {new Date(article.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>

        {/* Description */}
        <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
            {article.description}
          </p>
        </div>
      </article>
    </div>
  );
}
