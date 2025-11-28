"use client";

import { motion } from "framer-motion";
import { useState } from "react";
//import { useTheme } from "./useTheme";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  // const { theme, setTheme } = useTheme();

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b dark:border-zinc-700">
        <h1 className="text-xl font-semibold dark:text-white">My App</h1>
        <button onClick={() => setOpen(true)}>
          <Menu className="w-6 h-6 dark:text-white" />
        </button>
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -260 }}
        animate={{ x: open ? 0 : -260 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 h-screen w-60 bg-zinc-100 
                   dark:bg-zinc-900 shadow-lg z-50 md:translate-x-0 md:static md:block"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-zinc-700">
          <h1 className="text-xl font-semibold dark:text-white">Dashboard</h1>

          {/* Close button for mobile */}
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <X className="w-6 h-6 dark:text-white" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-3">
          <a className="block px-3 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 dark:text-white">
            Home
          </a>
          <a className="block px-3 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 dark:text-white">
            Profile
          </a>
          <a className="block px-3 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 dark:text-white">
            Settings
          </a>
        </nav>

      </motion.aside>
    </>
  );
}
