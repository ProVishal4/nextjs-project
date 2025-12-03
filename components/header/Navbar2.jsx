"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar2() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    router.push(`/search-places?search=${encodeURIComponent(search)}`);
  };

  return (
    <nav className="p-4 border-b bg-gray-100 dark:bg-black dark:text-white flex justify-center">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Search places..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border  px-4 py-2 rounded w-64"
        />

        <button className="bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded">
          Search
        </button>
      </form>
    </nav>
  );
}
