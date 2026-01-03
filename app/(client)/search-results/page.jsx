import React, { Suspense } from "react";
import SearchDisplay from '../../../components/eliments/SearchDisplay';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  `http://localhost:${process.env.PORT || 3000}`;

export default async function SearchResultsPage({searchParams}) {
const {search} = await searchParams
  const res = await fetch(
    `${baseUrl}/api/search?search=${encodeURIComponent(search)}`,
    {
      cache: "no-store",
    }
  );
  const results = await res.json();
//console.log("all data in search results:- ",  results)
//console.log("search value is :- ",searchParams)
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchDisplay results={results} search={search} />
    </Suspense>
  );
}
