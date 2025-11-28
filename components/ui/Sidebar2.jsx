"use client"
import { useState } from "react";
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

const menuItems = [
  { name: "Home", icon: Home },
  { name: "Portfolio", icon: Grid2x2 },
  { name: "Watchlist", icon: Star },
  { name: "Explore", icon: Compass },
  { name: "Analytics", icon: BarChart2 },
  { name: "Reports", icon: FileText },
  { name: "Education", icon: BookOpen },
  { name: "Transactions", icon: RefreshCcw },
];

export default function Sidebar2() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`h-screen transition-all duration-300
      bg-white dark:bg-[#0f0b27] text-zinc-500 dark:text-white/80 shadow-xl backdrop-blur-xl hidden border-r
        md:flex flex-col py-6
        ${collapsed ? "w-18" : "w-64"}
        rounded-r-3xl`}
    >
      {/* Header */}
      <div className="px-4 flex items-center justify-between">
        {!collapsed && (
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <span className="font-bold">△</span> Laplace
          </h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-[#3b3d3d4d] transition"
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu */}
      <nav
       
        className="mt-8 flex flex-col gap-1"
      >
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <>
              <div
                key={i}
                onClick={() => setCollapsed(!false)}
                className={`flex items-center cursor-pointer group
                mx-3 px-3 py-3 rounded-xl
                transition-all duration-300
                hover:bg-gray-100 dark:hover:bg-[#3b3d3d4d]
              `}
              >
                <Icon onClick={() => setCollapsed(!true)} size={20} />
                {!collapsed && (
                  <span
                    className={`ml-3 text-sm font-medium ${
                      collapsed ? "block" : "hidden"
                    } border`}
                  >
                    {item.name}
                  </span>
                )}
              </div>
            </>
          );
        })}
      </nav>
    </div>
  );
}
