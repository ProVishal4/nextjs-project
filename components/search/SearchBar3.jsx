"use client";

import { useState, useEffect } from "react";
// test selected and OK. working search bar
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
     console.log("searchBar3 data is:- ",results)
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
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-100/20  cursor-pointer dark:text-white/60 text-black/80 hover:text-white/90"
            >
              {r}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


// "use client";

// import axios from "axios";
// import { useState, useEffect } from "react";

// export default function SearchBar3() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     console.log("⏳ Debounce triggered. Query:", query);

//     const timeout = setTimeout(() => {
//       if (query.trim().length > 0) {
//         console.log("🔎 Calling search() with:", query);
//         search(query);
//       } else {
//         console.log("🧹 Clearing results");
//         setResults([]);
//       }
//     }, 300);

//     return () => clearTimeout(timeout);
//   }, [query]);

//   async function search(q) {
//     try {
//       setLoading(true);
//       const res = await fetch(`/search-route?q=${encodeURIComponent(q)}`);
//       console.log("fetch response status:", res.status);

//       if (!res.ok) {
//         const text = await res.text().catch(() => null);
//         throw new Error(`Network response was not ok: ${res.status} ${text ?? ""}`);
//       }

//       const data = await res.json().catch((e) => {
//         console.error("❌ JSON PARSE ERROR:", e);
//         return null;
//       });

//       console.log("fetch parsed data:", data);
//       setResults(data?.results ?? data ?? []);
//     } catch (err) {
//       console.error("❌ SEARCH ERROR:", err);
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <input
//         type="text"
//         placeholder="Search..."
//         className="border w-full px-4 py-2 rounded"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />

//       {loading && <div className="mt-2 text-sm">Searching...</div>}

//       {results.length > 0 && (
//         <ul className="border rounded mt-2 bg-white dark:bg-zinc-600 shadow">
//           {results.map((r, i) => (
//             <li
//               key={i}
//               className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-100/20 cursor-pointer"
//             >
//               {r.title}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
