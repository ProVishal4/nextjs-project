"use client";
import React, { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
// /app/search-results/page.jsx

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/search?search=${search}`, { cache: "no-store" });
      const data = await res.json();
      setResults(data); // filtered
      console.log(results);
    }
    load();
  }, [search]);

  return (
  
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {results.map((item, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-all h-[50vh] md:h-auto duration-300 overflow-hidden hover:-translate-y-1"
        >
          <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden"></div>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
              {item}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
              description
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
