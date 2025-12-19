"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Settings } from "lucide-react";
import { categoryStore } from "@/store/categoryStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
const menuItems = [
  { id: 1, label: "Waterfall", link: "/tourist-places/url3-test-slug" },
  { id: 2, label: "Mountain", link: "" },
  { id: 3, label: "Temple", link: "" },
  { id: 4, label: "Rivers", link: "" },
  {
    id: 5,
    label: "Archaeologicle Places",
  link: ""
  },
  { id: 6, label: "Histrorical", link: "/tourist-places/test-img" },
];

export default function NewSidebar() {
    const router = useRouter();
  const { category, fetchCategory } = categoryStore();
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef(null);
const [saveCategory, setSaveCategory] = useState("")
  // prevent background scroll when menu is open on mobile
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
  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(
      `/api/v1-limit?page=1&limit=5&category=${encodeURIComponent(
        saveCategory
      )}`
    );
    setIncreas(false);
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
                  <motion.div
                    key={it._id}
                    // href={it._id}
                    ref={i === 0 ? firstLinkRef : null}
                    onClick={() => {
                      setOpen(false);
                      setSaveCategory(it.field)
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-white transition"
                  >
                    {/* <span className="text-zinc-600 dark:text-zinc-300">
                      {it.icon}
                    </span> */}
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
