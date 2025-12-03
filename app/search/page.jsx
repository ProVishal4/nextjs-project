

import axios from "axios";
import { articleStore } from "@/store/articleStore";
//import { useEffect } from "react";

// //import Sidebar2 from "@/components/ui/Sidebar2";
// import axios from "axios";
// import React, { useEffect, useState } from "react";

// export default function SearchCard({searchParams}) {

//   let {title, description,image} = article
//   //console.log(title)
//   // const [cards, setCards] = useState([]);

//   // useEffect(() => {
//   //   axios
//   //     .get("/api/search")
//   //     .then((res) => {
//   //       setCards(res.data);
//   //     })
//   //     .catch((err) => {
//   //       console.log("Error in fetching articles Cards", err);
//   //     });
//   // }, []);
//   // console.log(cards)
//   return (
//     <>
     
       
//           <ul
           
//             className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-all h-[50vh] md:h-auto duration-300 overflow-hidden hover:-translate-y-1"
//           >
//             {}
//             <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
//               <img
//                 src={image}
//                 alt={title}
//                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//               />
//             </div>
//             <div className="p-6">
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
//                 {title}
//               </h2>
//               <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
//                 {description}
//               </p>
//               {/* <p className="text-gray-400 dark:text-gray-500 text-xs font-medium">
//                 {new Date(item.createdAt).toLocaleDateString()}
//               </p> */}
//             </div>
//          </ul>
//     </>
//   );
// }


//export default async function SearchPage({ searchParams }) {
  //  const { articles, fetchArticles } = articleStore();
  // useEffect(() => {
  //   fetchArticles(), fetchCategory();
  // }, []);
  
//  const query = searchParams.search || "";
//console.log(searchParams)
  // Example API data 
  // ,{
  //   cache: "no-store",
  // }
  //const res = await fetch("http://localhost:3000/api/blog");
//
  //const {title} = await res.json();

//   const filtered = articles.filter((item) =>
//     item.articles.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl">Results for: {query}</h1>

//       {filtered.length === 0 && (
//         <p className="mt-4 text-gray-500">No results found.</p>
//       )}

//       <ul className="mt-5 space-y-2">
//         {filtered.map((p) => (
//           <li key={p._id} className="border p-2 rounded">
//             {p.title}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }