"use client";
import Link from "next/link";
import { searchStore } from "@/store/globalStatu";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function SearchBar2() {
  const { searchData , setSearchData} = searchStore()
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  //const [searchs, setSearch] = useState(searchParams.get("search") || "");
setSearchData(searchParams.get("search") || "not working")
console.log(searchData)
  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);
    if (searchData) {
      params.set("search", searchData);
    } else {
      params.delete("search");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Search…"
        value={searchData}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 rounded"
      />
 <Link href={"/search"}>
      <button type="submit" className="bg-black text-white px-4 py-2 rounded">Search</button></Link>
    </form>
  );
}
