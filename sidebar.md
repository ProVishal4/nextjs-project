frist working code:- 
"use client";
import { useEffect, useState } from "react";
import {
  Home
} from "lucide-react";
import axios from "axios";
import { articleStore } from "@/store/articleStore";



export default function Sidebar4() {
  const { articles, loading, fetchArticles } = articleStore();
  const [collapsed, setCollapsed] = useState(false);
  const [flow, setFlow] = useState("");
  const [categorise, setCategorise] = useState([]);

  useEffect(() => {
    axios
      .get("/api/category")
      .then((res) => {
        setCategorise(res.data);
      })
      .catch((err) => {
        console.log("Error in fetching categorise", err);
      });
    fetchArticles();

  }, []);
  //console.log(categorise)


  let filteredItem = articles.filter((item)=> {
    return item.category === flow

  })
  console.log(filteredItem)
  let resultArray = filteredItem.map(item =>{
    return item.category
  })
  console.log(resultArray)
  return (
    <div className="sticky top-0 flex ">
      <div
        className={`h-screen transition-all duration-300 ease-in-out
      bg-white dark:bg-[#0f0b27] text-zinc-500 dark:text-white/80 shadow-xl backdrop-blur-xl hidden border-r
        md:flex flex-col py-6
        ${collapsed ? "w-20" : "w-64"}
        rounded-r-3xl`}
      >
        {/* Header */}
        <div className="px-4 flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-semibold flex items-center gap-2">
              <span className="font-bold">△</span> Laplace
            </h1>
          )}
        </div>

        {/* Menu */}
        <nav className="mt-8 flex flex-col gap-1 border border-purple-400">
          {categorise.map((item, i) => {
            //const Icon = item.icon;
            //console.log(Icon)
            return (
              <div
                key={item._id}
                onClick={() => setCollapsed(!collapsed)}
                className={`flex items-center cursor-pointer group
                mx-3 px-3 py-3 rounded-xl
                transition-all duration-300 ease-in-out
                hover:bg-gray-100 dark:hover:bg-[#3b3d3d4d]
              `}
              >
                <Home size={20} />

                {!collapsed && (
                  <span
                    onClick={() => setFlow(item._id)}
                    className={`ml-3 text-sm font-medium `}
                  >
                    {item.field}
                  </span>
                )}
              </div>
            );
          })}
        </nav>
        <div>{flow}</div>
      </div>
      <div className=" border border-amber-800">
        {filteredItem.map((e) => (
          <div key={e._id}>{e.title} </div>
        ))}
      </div>
    </div>
  );
}
----------------------------
"use client";

import { useEffect, useState } from "react";
import { Home } from "lucide-react";
import axios from "axios";
import { articleStore } from "@/store/articleStore";

export default function Sidebar4() {
  const { articles, loading, fetchArticles } = articleStore();

  const [collapsed, setCollapsed] = useState(false);
  const [flow, setFlow] = useState(""); // selected category ID
  const [categories, setCategories] = useState([]);

  // Fetch categories + articles
  useEffect(() => {
    axios
      .get("/api/category")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log("Error fetching categories", err);
      });

    fetchArticles();
  }, []);

  // Filter articles by category ID (flow)
  const filteredArticles = articles.filter(
    (article) => article.category === flow
  );

  return (
    <div className="flex w-full">
      {/* ---------- LEFT SIDEBAR ---------- */}
      <div
        className={`h-screen transition-all duration-300 ease-in-out
        bg-white dark:bg-[#0f0b27] text-zinc-500 dark:text-white/80 shadow-xl
        border-r md:flex flex-col py-6 hidden
        ${collapsed ? "w-20" : "w-64"}
        rounded-r-3xl`}
      >
        {/* Header */}
        <div className="px-4 flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-semibold flex items-center gap-2">
              <span className="font-bold">△</span> Laplace
            </h1>
          )}
        </div>

        {/* Menu */}
        <nav className="mt-8 flex flex-col gap-1">
          {categories.map((item) => (
            <div
              key={item._id}
              className={`flex items-center cursor-pointer mx-3 px-3 py-3 rounded-xl 
              transition-all duration-300
              hover:bg-gray-200 dark:hover:bg-[#3b3d3d4d]
              ${flow === item._id ? "bg-gray-300 dark:bg-[#5757574d]" : ""}`}
            >
              <Home size={20} />

              {!collapsed && (
                <span
                  onClick={() => setFlow(item._id)}
                  className="ml-3 text-sm font-medium"
                >
                  {item.field}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* ---------- RIGHT CONTENT AREA ---------- */}
      <div className="flex-1 p-6">
        <h2 className="text-xl font-semibold mb-4">
          {flow ? "Articles in selected category:" : "Select a category"}
        </h2>

        {loading && <div>Loading articles...</div>}

        {!loading && filteredArticles.length === 0 && flow && (
          <p className="text-gray-500">No articles found for this category.</p>
        )}

        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <div
              key={article._id}
              className="p-4 border rounded-lg shadow bg-white dark:bg-gray-900"
            >
              <h3 className="font-semibold text-lg">{article.title}</h3>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                {article.blog?.slice(0, 120)}...
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
______________________________________________________________
 AI working code:- match categories to article category and display :- 
 // "use client";
// import { useEffect, useState } from "react";
// import {
//   Home
// } from "lucide-react";
// import axios from "axios";
// import { articleStore } from "@/store/articleStore";



// export default function Sidebar4() {
//   const { articles, loading, fetchArticles } = articleStore();
//   const [collapsed, setCollapsed] = useState(false);
//   const [flow, setFlow] = useState("");
//   const [categorise, setCategorise] = useState([]);

//   useEffect(() => {
//     axios
//       .get("/api/category")
//       .then((res) => {
//         setCategorise(res.data);
//       })
//       .catch((err) => {
//         console.log("Error in fetching categorise", err);
//       });
//     fetchArticles();

//   }, []);
//   //console.log(categorise)


//   let filteredItem = articles.filter((item)=> {
//     return item.category === flow

//   })
//   console.log(filteredItem)
//   let resultArray = filteredItem.map(item =>{
//     return item.category
//   })
//   console.log(resultArray)
//   return (
//     <div className="sticky top-0 flex ">
//       <div
//         className={`h-screen transition-all duration-300 ease-in-out
//       bg-white dark:bg-[#0f0b27] text-zinc-500 dark:text-white/80 shadow-xl backdrop-blur-xl hidden border-r
//         md:flex flex-col py-6
//         ${collapsed ? "w-20" : "w-64"}
//         rounded-r-3xl`}
//       >
//         {/* Header */}
//         <div className="px-4 flex items-center justify-between">
//           {!collapsed && (
//             <h1 className="text-xl font-semibold flex items-center gap-2">
//               <span className="font-bold">△</span> Laplace
//             </h1>
//           )}
//         </div>

//         {/* Menu */}
//         <nav className="mt-8 flex flex-col gap-1 border border-purple-400">
//           {categorise.map((item, i) => {
//             //const Icon = item.icon;
//             //console.log(Icon)
//             return (
//               <div
//                 key={item._id}
//                 onClick={() => setCollapsed(!collapsed)}
//                 className={`flex items-center cursor-pointer group
//                 mx-3 px-3 py-3 rounded-xl
//                 transition-all duration-300 ease-in-out
//                 hover:bg-gray-100 dark:hover:bg-[#3b3d3d4d]
//               `}
//               >
//                 <Home size={20} />

//                 {!collapsed && (
//                   <span
//                     onClick={() => setFlow(item._id)}
//                     className={`ml-3 text-sm font-medium `}
//                   >
//                     {item.field}
//                   </span>
//                 )}
//               </div>
//             );
//           })}
//         </nav>
//         <div>{flow}</div>
//       </div>
//       <div className=" border border-amber-800">
//         {filteredItem.map((e) => (
//           <div key={e._id}>{e.title} </div>
//         ))}
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { Home } from "lucide-react";
import axios from "axios";
import { articleStore } from "@/store/articleStore";

export default function Sidebar4() {
  const { articles, fetchArticles } = articleStore();
  const [collapsed, setCollapsed] = useState(false);
  const [flow, setFlow] = useState(""); // clicked category ID
  const [categorise, setCategorise] = useState([]);

  // Fetch categories + articles
  useEffect(() => {
    axios
      .get("/api/category")
      .then((res) => setCategorise(res.data))
      .catch((err) => console.log("Error fetching categories:", err));

    fetchArticles();
  }, []);

  // Filter articles by clicked category ID
  const filteredArticles = articles.filter((item) => item.category === flow);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`h-screen transition-all duration-300
        bg-white dark:bg-[#0f0b27] text-zinc-500 dark:text-white/80 shadow-xl hidden border-r
        md:flex flex-col py-6
        ${collapsed ? "w-20" : "w-64"}
        rounded-r-3xl`}
      >
        {/* Header */}
        <div className="px-4 flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-semibold flex items-center gap-2">
              <span className="font-bold">△</span> Laplace
            </h1>
          )}
        </div>

        {/* Category Menu */}
        <nav className="mt-8 flex flex-col gap-1 border border-purple-400">
          {categorise.map((cat) => (
            <div
              key={cat._id}
              onClick={() => {
                setFlow(cat._id); // set clicked category ID
                setCollapsed(false); // optional: keep sidebar open
              }}
              className="flex items-center cursor-pointer group
              mx-3 px-3 py-3 rounded-xl
              transition-all duration-300 ease-in-out
              hover:bg-gray-100 dark:hover:bg-[#3b3d3d4d]"
            >
              <Home size={20} />

              {!collapsed && (
                <span className="ml-3 text-sm font-medium">{cat.field}</span>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div className="p-6 w-full">
        <h2 className="text-xl font-semibold mb-4">
          {flow ? "Articles in this category" : "Select a category"}
        </h2>

        {filteredArticles.length === 0 && flow && (
          <p>No articles found for this category.</p>
        )}

        <ul className="space-y-2">
          {filteredArticles.map((article) => (
            <li
              key={article._id}
              className="p-3 rounded-md border bg-gray-50 dark:bg-gray-800"
            >
              {article.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
