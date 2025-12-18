"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Settings } from "lucide-react";
import { categoryStore } from "@/store/categoryStore";

const menuItems = [
  { id: "home", label: "Home", icon: <Home className="w-5 h-5" /> },
  { id: "profile", label: "Profile", icon: <User className="w-5 h-5" /> },
  { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
];

export default function NewSidebar() {
  const {category, fetchCategory} = categoryStore()
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef(null);

  // prevent background scroll when menu is open on mobile
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    fetchCategory()
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // close on Esc
  useEffect(() => {
    const onKey = (e= KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // focus first link when opened
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => firstLinkRef.current?.focus());
    }
  }, [open]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const sidebarVariants = {
    closed: { x: "200%" },
    open: { x: "60%" },
  };

  return (
    <>
      {/* Mobile menu button (visible on small screens) */}
      <button
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="fixed top-[2px] right-4 z-50 md:hidden py-2 pl-4 w-15   "
      >
        <img
          src="/icons/Menu.png"
          className="h-9 w-[2.3rem]  md:hidden  dark:invert-0 invert "
          alt="menu icon"
        />
        {/* <Menu className="w-6 h-6 text-orange-500" /> */}
      </button>

      {/* Desktop sidebar (always visible on md+) */}
      {/* <aside className="hidden md:flex md:flex-col md:sticky md:top-0 md:w-60 md:h-screen md:bg-zinc-100 md:dark:bg-zinc-900 md:border-r md:border-zinc-200 dark:md:border-zinc-800 md:shadow-sm">
        <div className="p-4 flex items-center justify-between border-b dark:border-zinc-700">
          <h2 className="text-lg font-semibold dark:text-white">Dashboard</h2>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((it, i) => (
            <a
              key={it.id}
              href={"#" + it.id}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 dark:text-white transition"
            >
              {it.icon}
              <span>{it.label}</span>
            </a>
          ))}
        </nav>
      </aside> */}

      {/* Mobile overlay + sliding sidebar */}
      <AnimatePresence>
        {open && (
          <>
            {/* <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={backdropVariants}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
              transition={{ duration: 0.18 }}
              aria-hidden="true"
            /> */}

            <motion.aside
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              transition={{ type: "tween", duration: 0.22 }}
              className="fixed -top-7 left-0 z-50 h-[105vh] w-[60vw] max-w-[80%] bg-white dark:bg-zinc-900 shadow-lg border-r border-zinc-200 dark:border-zinc-800"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between p-4 border-b dark:border-zinc-700">
                <div>
                  <h2 className="text-lg font-semibold dark:text-white">
                    Dashboard
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Quick actions
                  </p>
                </div>

                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-md bg-zinc-100/60 dark:bg-zinc-800/60"
                >
                  <X className="w-5 h-5 dark:text-white" />
                </button>
              </div>

              <nav className="p-4 space-y-2">
                {category.map((it, i) => (
                  <motion.a
                    key={it.id}
                    href={"#" + it.id}
                    ref={i === 0 ? firstLinkRef : null}
                    onClick={() => setOpen(false)}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-white transition"
                  >
                    <span className="text-zinc-600 dark:text-zinc-300">
                      {it.icon}
                    </span>
                    <span className="font-medium">{it.label}</span>
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto p-4 border-t dark:border-zinc-700">
                <button className="w-full px-3 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600">
                  New Post
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
