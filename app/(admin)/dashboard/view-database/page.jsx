"use client";

import { articleStore } from "@/store/articleStore";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function page() {
  const [deletes, setDeletes] = useState("");
   const limit = 5;
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  //const { articles, fetchArticles, loading } = articleStore();


/*

  useEffect(() => {
 const fetchArticles = async () => {
   try {
     const res = await axios.get(`/api/v1-limit?page=${page}&limit=${limit}`);

     setArticles(res.data.articles);
     setTotalPages(res.data.totalPages);
     // ❌ DO NOT setPage here
     console.log(articles);
   } catch (error) {
     console.error("Error fetching articles:", error);
   }
 };


    fetchArticles();
  }, []);
if(deletes) {
     axios.delete(`/api/blog/${deletes}`);
}
  const onDelete = () => {
 
  };*/

const [pendingDelete, setPendingDelete] = useState(null);
const [viewImage, setViewImage] = useState(null);
const [dark, setDark] = useState(false);
const [loadingDelete, setLoadingDelete] = useState(false);
const [loadingFetch, setLoadingFetch] = useState(false);

const fetchArticlesNow = async () => {
    try { 
        setLoadingFetch(true);
        const res = await axios.get(`/api/v1-limit?page=${page}&limit=${limit}`);
        setArticles(res.data.articles || []);
        setTotalPages(res.data.totalPages || 1);
    } catch (err) {
        console.error("Fetch error:", err);
    } finally {
        setLoadingFetch(false);
    }
};

const confirmDelete = async () => {
    if (!pendingDelete) return;
    try {
        setLoadingDelete(true);
        // perform delete directly (do not rely on the stray if(deletes) above)
        await axios.delete(`/api/blog/${pendingDelete}`);
        setPendingDelete(null);
        // refetch updated list
        await fetchArticlesNow();
    } catch (err) {
        console.error("Delete error:", err);
    } finally {
        setLoadingDelete(false);
    }
};

// view image popup handler
const openImage = (item) => {
    // try item.image or fallback
    const src = item.image || "/card2.jpg";
    setViewImage({ src, title: item.title });
};

// When page changes refetch articles
useEffect(() => {
    fetchArticlesNow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [page]);

return (
  // parent toggles dark class so children dark: styles work
  <div className={dark ? "dark" : ""}>
    <div className="min-h-screen p-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 ">
      <header className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Dashboard — Articles
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Manage your posts. Showing page {page} of {totalPages}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            className="px-3 py-2 rounded-md bg-zinc-700 text-white hover:bg-zinc-700/30"
            href={"/dashboard/view-database/categories"}
          >
            Categories
          </Link>
          <Link
            className="px-3 py-2 rounded-md bg-zinc-700 text-white hover:bg-zinc-700/30"
            href={"/dashboard/view-database/images"}
          >
            Images
          </Link>
          <Link
            className="px-3 py-2 rounded-md bg-zinc-700 text-white hover:bg-zinc-700/30"
            href={"/dashboard/view-database/articles"}
          >
           Articles
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setPage(1);
              fetchArticlesNow();
            }}
            className="px-3 py-2 rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
          >
            Refresh
          </button>

          <button
            onClick={() => setDark((d) => !d)}
            aria-pressed={dark}
            className="px-3 py-2 rounded-md border dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800"
          >
            {dark ? "Light" : "Dark"}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid gap-4">
        {loadingFetch ? (
          <div className="py-10 text-center text-emerald-500">
            Loading articles...
          </div>
        ) : articles.length === 0 ? (
          <div className="py-10 text-center text-zinc-500">
            No articles found.
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((item) => (
              <li
                key={item._id}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-zinc-50 dark:bg-zinc-800 border
                                 border-zinc-200 dark:border-zinc-700 rounded-lg p-4 shadow-sm"
              >
                <img
                  src={item.image || "/card2.jpg"}
                  alt={item.title}
                  className="w-full sm:w-36 h-36 rounded-md object-cover flex-shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    {item.excerpt && (
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300 line-clamp-3">
                        {item.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleString()
                        : null}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openImage(item)}
                        title="View image"
                        className="px-3 py-2 rounded-md bg-indigo-500 text-white text-sm hover:bg-indigo-600"
                      >
                        View
                      </button>

                      <Link
                        href={`/api/blog/${item._id}`}
                        className="no-underline"
                      >
                        <button className="px-3 py-2 rounded-md bg-yellow-500 text-white text-sm hover:bg-yellow-600">
                          Edit
                        </button>
                      </Link>

                      <button
                        onClick={() => setPendingDelete(item._id)}
                        className="px-3 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-transparent mt-4">
          <div className="flex items-center gap-3">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 rounded bg-gray-200 dark:bg-zinc-700 disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-sm">
              Page <b>{page}</b> of <b>{totalPages}</b>
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-4 py-2 rounded bg-gray-200 dark:bg-zinc-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>

          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            Showing {articles.length} items
          </div>
        </div>
      </main>

      {/* Confirm Delete Modal */}
      {pendingDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => !loadingDelete && setPendingDelete(null)}
          />
          <div className="relative max-w-md w-full bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <h3 className="text-lg font-semibold">Confirm delete</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Are you sure you want to delete this article? This action cannot
              be undone.
            </p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setPendingDelete(null)}
                disabled={loadingDelete}
                className="px-4 py-2 rounded bg-zinc-100 dark:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={loadingDelete}
                className="px-4 py-2 rounded bg-red-600 text-white"
              >
                {loadingDelete ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image View Modal */}
      {viewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setViewImage(null)}
          />
          <div className="relative max-w-3xl w-full bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold">{viewImage.title}</h3>
              <button
                onClick={() => setViewImage(null)}
                className="ml-auto px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800"
              >
                Close
              </button>
            </div>

            <div className="mt-3">
              <img
                src={viewImage.src}
                alt={viewImage.title}
                className="w-full max-h-[70vh] object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);
}
