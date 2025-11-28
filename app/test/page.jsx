"use client";

import { useEffect } from "react";
import { articleStore } from "@/store/articleStore";

export default function Home() {
  const { articles, loading, fetchArticles } = articleStore();

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {articles.map((p) => (
        <p key={p._id}>{p.title}</p>
      ))}
    </div>
  );
}