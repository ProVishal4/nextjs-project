"use client";

import { useState, useEffect } from "react";

export default function SearchBar3() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounce logic
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim().length > 0) {
        search(query);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  async function search(q) {
    setLoading(true);
    const res = await fetch(`/search-route?q=${q}`);
    const data = await res.json();
    setResults(data.results);
    setLoading(false);
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search..."
        className="border w-full px-4 py-2 rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <div className="mt-2 text-sm">Searching...</div>}

      {results.length > 0 && (
        <ul className="border rounded mt-2 bg-white dark:bg-zinc-600 shadow">
          {results.map((r, i) => (
            <li
              key={i}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-100/20  cursor-pointer"
            >
              {r}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
