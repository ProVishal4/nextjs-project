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
  ChevronDown,
  Menu,
  ChevronLeft,
} from "lucide-react";

const menuItems = [
  { name: "Home", icon: Home, active: true },
  { name: "Portfolio", icon: Grid2x2 },
  { name: "Watchlist", icon: Star },
  { name: "Explore", icon: Compass },
  { name: "Analytics", icon: BarChart2 },
  { name: "Reports", icon: FileText },
  { name: "Education", icon: BookOpen },
  { name: "Transactions", icon: RefreshCcw },
];

export default function Sidebar3() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen bg-white dark:bg-[#0f0b27] text-zinc-500 dark:text-white/80 shadow-xl border-r 
      backdrop-blur-xl transition-all duration-300
      flex flex-col py-6 rounded-r-[40px]
      ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* Header */}
      <div className="px-4 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2 text-xl font-semibold">
            <span className="font-bold text-black">△</span> Laplace
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-xl hover:bg-gray-100"
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-8 flex flex-col gap-2">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;

          return (
            <div
              key={idx}
              className={`group flex items-center justify-between mx-3 px-3 py-3 
              rounded-xl cursor-pointer transition-all duration-200
              ${item.active ? "bg-black text-white" : "hover:bg-gray-100"}
            `}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} />
                {!collapsed && (
                  <span className={`text-sm font-medium`}>{item.name}</span>
                )}
              </div>

              {/* Dropdown arrow only when expanded */}
              {!collapsed && (
                <ChevronDown size={18} className="text-gray-500" />
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
