"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Settings } from "lucide-react";
import { categoryStore } from "@/store/categoryStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import menuStatusStore from "@/store/menuStatusStore";

export default function NewSidebar() {
  const router = useRouter();
  const { category, fetchCategory } = categoryStore();
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef(null);
  const [saveCategory, setSaveCategory] = useState("");
  const [clickCategory, setClickCategory] = useState("");
const setStatus = menuStatusStore((s) => s.setStatus);
  //useEffect(() => {}, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    fetchCategory();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // close on Esc
  useEffect(() => {
    const onKey = (e = KeyboardEvent) => {
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

  const sendCategory = () => {
    router.push(
      // if (!clickCategory.trim()) return;
      `/api/v1-limit?page=1&limit=5&category=${encodeURIComponent(
        clickCategory
      )}`
    );
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const sidebarVariants = {
    closed: { x: "200%" },
    open: { x: "60%" },
  };

  //router.push(`/search-results?search=${encodeURIComponent(query)}`);
  //`/api/v1-limit?page=${page}&limit=${limit}&category=${categoryQuery}`
  const handleSearch =(id) => {
    //if (!query.trim()) return;
    router.push(
      `/api/v1-limit?page=1&limit=5&category=${encodeURIComponent(id)}`
    );
    // setIncreas(false);
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

      {/* Mobile overlay + sliding sidebar */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={backdropVariants}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
              transition={{ duration: 0.18 }}
              aria-hidden="true"
            />

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
                    Menu
                  </h2>
                  {/* <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Quick actions
                  </p> */}
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
                  <motion.div
                    key={it._id}
                    // href={it._id}
                    ref={i === 0 ? firstLinkRef : null}
                    onClick={() => {
                      setOpen(false);
                      //setSaveCategory(it.field);
                      //handleSearch(it._id);
                      setStatus(it._id)
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-white transition"
                  >
                    <Link href={`/tourist-places`}>
                      <span className="font-medium">{it.field}</span>
                    </Link>
                  </motion.div>
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
