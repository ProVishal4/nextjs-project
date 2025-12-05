"use client";

import { useEffect } from "react";
import { articleStore } from "@/store/articleStore";
import SearchInput from "@/components/search/SearchInput";
import SearchBar4 from "@/components/search/SearchBar4";

export default function Home() {
  // const { articles, loading, fetchArticles } = articleStore();

  // useEffect(() => {
  //   fetchArticles();
  // }, []);

  // if (loading) return <p>Loading...</p>;

  // return (
  //   <div>
  //     {articles.map((p) => (
  //       <p key={p._id}>{p.title}</p>
  //     ))}
  //   </div>
  // );

  return (
    <div className="pt-30">
{/* <SearchInput /> */}
<SearchBar4 />
    </div>
  )
}