"use client"
import { useEffect, useState } from "react";
import {
  Home,
  Grid2x2,  Star,  Compass,  BarChart2,  FileText,  BookOpen,  RefreshCcw,  Menu,  ChevronLeft,
} from "lucide-react";
import axios from "axios";
import { articleStore } from "@/store/articleStore";
import MiniSidebar from "./MiniSidebar";




// const menuItems = [
//   { name: "Home", icon: Home },
//   { name: "Portfolio", icon: Grid2x2 },
//   { name: "Watchlist", icon: Star },
//   { name: "Explore", icon: Compass },
//   { name: "Analytics", icon: BarChart2 },
//   { name: "Reports", icon: FileText },
//   { name: "Education", icon: BookOpen },
//   { name: "Transactions", icon: RefreshCcw },
// ];

export default function Sidebar2() {
  const { articles, loading, fetchArticles } = articleStore();
  const [collapsed, setCollapsed] = useState(false);
const [flow, setFlow] = useState("")
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


//const result = articles.filter(flow === articles.title);
//console.log(articles.category)
//console.log(result)

//console.log("flow stutas data sidebar:- ", flow)
  const matchesCategory = (article, flowValue) => {
    if (!flowValue) return true; // no filter, show all
    if (!article) return false;
    const f = String(flowValue).toLowerCase();

    // article.category as string (e.g. "Tech")
    if (typeof article.category === "string") {
      if (article.category.toLowerCase() === f) return true;
    }

    // article.category as object (e.g. { _id, field })
    if (article.category && typeof article.category === "object") {
      if (article.category.field && String(article.category.field).toLowerCase() === f) return true;
      if (article.category._id && String(article.category._id).toLowerCase() === f) return true;
    }

    // article.categories as array of objects or strings
    if (Array.isArray(article.categories)) {
      if (
        article.categories.some((cat) => {
          if (!cat) return false;
          if (typeof cat === "string") return cat.toLowerCase() === f;
          if (cat.field && String(cat.field).toLowerCase() === f) return true;
          if (cat._id && String(cat._id).toLowerCase() === f) return true;
          return false;
        })
      ) {
        return true;
      }
    }

    // other possible field names
    if (article.categoryId && String(article.categoryId).toLowerCase() === f) return true;
    if (article.type && String(article.type).toLowerCase() === f) return true;

    return false;
  };

  const filteredArticles = Array.isArray(articles) ? articles.filter((a) => matchesCategory(a, flow)) : [];

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
          {categorise.map((item) => {
            return (
              <div
                key={item._id}
                onClick={() => setFlow(item.field)}
                className={`flex items-center cursor-pointer group
                mx-3 px-3 py-3 rounded-xl
                transition-all duration-300 ease-in-out
                hover:bg-gray-100 dark:hover:bg-[#3b3d3d4d]
              `}
              >
                <Home size={20} />

                {!collapsed && (
                  <span className={`ml-3 text-sm font-medium `}>
                    {item.field}
                  </span>
                )}
              </div>
            );
          })}
        </nav>
        <div className="px-4 pt-4 text-sm text-zinc-700 dark:text-zinc-300">
          {flow ? `Filter: ${flow}` : "All categories"}
        </div>
      </div>

      <div className="border border-amber-800 flex-1 p-4">
        {filteredArticles.length === 0 ? (
          <div className="text-sm text-zinc-500">No articles found.</div>
        ) : (
          filteredArticles.map((e) => (
            <div key={e._id} className="py-2">
              {e.title}
            </div>
          ))
        )}
      </div>
    </div>
  );
}


  



