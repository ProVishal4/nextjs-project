import React, { Suspense } from "react";
import SearchDisplay from '../../../components/eliments/SearchDisplay';

export default async function SearchResultsPage({ searchParams }) {
  const search = (searchParams && searchParams.search) || "";
  const res = await fetch(`/api/search?search=${encodeURIComponent(search)}`, { cache: "no-store" });
  const results = await res.json();

  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchDisplay results={results} search={search} />
    </Suspense>
  );
}
