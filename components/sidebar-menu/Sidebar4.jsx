"use client";
import { useEffect, useState } from "react";
import {
  Home,
  Grid2x2,
  Star,
  Compass,
  BarChart2,
  FileText,
  BookOpen,
  RefreshCcw,
  Menu,
  ChevronLeft,
} from "lucide-react";
import axios from "axios";
import { articleStore } from "@/store/articleStore";

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
  return (
    // <div>
    //   {categorise.map((e)=>(
    //     <div>{e.field}</div>
    //   ))}</div>
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
          {/* onClick={() => setCollapsed(!collapsed)} */}
          {/* <button
         
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-[#3b3d3d4d] transition"
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button> */}
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
                    onClick={(e) => setFlow(item.field)}
                    className={`ml-3 text-sm font-medium `}
                  >
                    {item.field}
                  </span>
                )}
                {/* <span
                  className={`ml-3 text-sm   transition-all duration-300  font-medium ${
                    collapsed ? "hidden" : "block"
                  } border`}
                >
                  {item.name}
                </span> */}
              </div>
            );
          })}
        </nav>
        <div>{flow}</div>
      </div>
      <div className=" border border-amber-800">
        {articles.map((e) => (
          <div key={e._id}>{e.title} </div>
        ))}
      </div>
    </div>
  );
}
