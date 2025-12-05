"use client";

import { useEffect, useState } from "react";

export default function SearchResultsList({ query }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/search-route?q=${query}`);
        const data = await res.json();
        setResults(data.results);
        console.log("this is fetch data:_ ",results)
      } catch (err) {
        console.error("❌ Error loading results:", err);
      }
      setLoading(false);
    }
    load();
  }, [query]);

  if (loading) return <p>Loading...</p>;

  if (results.length === 0)
    return <p className="text-gray-500">No results found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {results.map((item, i) => (
        <div
          key={i}
          className="border rounded p-4 shadow bg-white dark:bg-zinc-700"
        >
          <h2 className="text-lg font-bold mb-2">{item.title}</h2>

          <p className="text-sm text-gray-600">
            Description about <strong>{item.title || "not text load"}</strong> goes here.
          </p>
        </div>
      ))}
    </div>
  );
}
