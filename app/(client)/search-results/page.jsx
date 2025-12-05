import SearchResultsList from "@/components/search/SearchResultsList";
export default function SearchResultsPage({ searchParams }) {
  const query = searchParams.q || "";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Results for: <span className="text-blue-600">{query}</span>
      </h1>

      <SearchResultsList query={query} />
    </div>
  );
}
