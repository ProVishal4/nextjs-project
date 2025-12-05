"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar4() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return;

    router.push(`/search-resultes?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex gap-2 w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search..."
        className="border w-full px-4 py-2 rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Search
      </button>
    </div>
  );
}
