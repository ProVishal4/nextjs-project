// export default async function SearchPlacesPage({ searchParams }) {
//   const query = searchParams.search || "";

//   // Example API (replace with your MongoDB/API later)
//   const res = await fetch("http://localhost:3000/tourist-places");
//   const { title } = await res.json();
// console.log(title)
//   const filteredResults = title.filter((item) =>
//     item.title.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl mb-4">
//         Results for: <span className="font-semibold">{query}</span>
//       </h1>

//       {filteredResults.length === 0 && (
//         <p className="text-gray-500">No results found.</p>
//       )}

//       <ul className="space-y-3 mt-4">
//         {filteredResults.map((product) => (
//           <li key={product.id} className="p-3 border rounded">
//             {product.title}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
import SearchBar3 from "@/components/search/SearchBar3";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Search Example</h1>
      <SearchBar3 />
    </main>
  );
}
