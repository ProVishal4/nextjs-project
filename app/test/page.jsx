"use client";


//import SidebarSimple from "@/components/sidebar-menu/SidebarSimple";
// import { useEffect } from "react";
// import { articleStore } from "@/store/articleStore";
// import SearchInput from "@/components/search/SearchInput";
// import SearchBar4 from "@/components/search/SearchBar4";

// export default function Home() {
// const { articles, loading, fetchArticles } = articleStore();

// useEffect(() => {
//   fetchArticles();
// }, []);

// if (loading) return <p>Loading...</p>;

// return (
//   <div>
//     {articles.map((p) => (
//       <p key={p._id}>{p.title}</p>
//     ))}
//   </div>
// );

//   return (
//     <div className="pt-30">
// {/* <SearchInput /> */}
// <SearchBar4 />
//     </div>
//   )
// }

// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function ArticlesPage() {
//   const [articles, setArticles] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const limit = 5;

//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         const res = await axios.get(`/api/v1-limit?page=${page}&limit=${limit}`);

//         setArticles(res.data.articles);
//         setTotalPages(res.data.totalPages);
//         // ❌ DO NOT setPage here
//         console.log(articles);
//       } catch (error) {
//         console.error("Error fetching articles:", error);
//       }
//     };

//     fetchArticles();
//   }, [page]);

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <h1 className="text-3xl font-bold mb-8">Articles</h1>

//       {/* Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {articles.map((item) => (
//           <div
//             key={item._id}
//             className="bg-white dark:bg-zinc-700 border rounded-xl shadow-sm p-5"
//           >
//             <h2 className="text-xl text-gray-600 dark:text-gray-100/80 font-semibold mb-2 line-clamp-2">
//               {item.title}
//             </h2>

//             <p className="text-gray-600 dark:text-gray-200/80 text-sm line-clamp-3">
//               {item.metaContent}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center items-center gap-4 mt-10">
//         <button
//           disabled={page === 1}
//           onClick={() => setPage((p) => p - 1)}
//           className="px-4 py-2 dark:bg-zinc-700 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Prev
//         </button>

//         <span>
//           Page <b>{page}</b> of <b>{totalPages}</b>
//         </span>

//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage((p) => p + 1)}
//           className="px-4 py-2 bg-gray-200 dark:bg-zinc-700 rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }
import React from "react";

export default function page() {
  return (
    <>
      <div>
        {/* <SidebarSimple /> */}
      </div>
    </>
  );
}
