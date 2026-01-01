"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
export default function SearchDisplay({results, search}) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Search results for{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              "{search}"
            </span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {results.length} result{results.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* <Link href={"/tourist-places"}> <button className=" sm:inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition">
            Blog
          </button> </Link>  */}
          <Link href={`/`}>
            <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition">
              Home
            </button>
          </Link>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="mt-12 text-center py-12 px-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No results found
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Try different keywords or remove filters to broaden your search.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="/"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition"
            >
              Go to homepage
            </a>
            <button
              onClick={() => (window.location.href = `/search-results?search=`)}
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Clear search
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.map((item, i) => {
            // support both string results and object results
            const title =
              typeof item === "string"
                ? item
                : item.title || item.name || "Untitled";
            const description =
              typeof item === "string"
                ? null
                : item.description || "";
            const url =
              typeof item === "string" ? "#" : item.url || item.link || "#";
            const image = typeof item === "string" ? null : item.imageUrl;
            const author = typeof item === "string" ? null : item.author;
            const date = typeof item === "string" ? null : item.date;
            const keyword = typeof item === "string" ? item.tags : "keyword";

            {
              /* <Link href={`/tourist-places/${results.slug}`}></Link> */
            }
            return (
              <Link
                key={i}
                href={`/tourist-places/${item.slug}`}
                className="block bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transform hover:-translate-y-1 transition overflow-hidden"
              >
                <div className="h-44 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-end">
                  {image ? (
                    <img
                      src={results.imageUrl}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-end p-4">
                      <div className="bg-white/60 dark:bg-black/30 px-3 py-1 rounded text-xs text-gray-800 dark:text-gray-100">
                        {keyword.slice(0, 40)}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                    {title}
                  </h3>
 <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                      {description.substring(0, 100)}
                    </p>
                  {/* {results.description ? (
                   
                  ) : (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      No description available.
                    </p>
                  )} */}

                  <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>
                      {author ||
                        (typeof item === "string" ? "" : item.source) ||
                        ""}
                    </span>
                    <span>
                      {date ? new Date(date).toLocaleDateString() : ""}
                    </span>
                  </div>

                  {Array.isArray(item.tags) && item.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.tags.slice(0, 3).map((t, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-100  dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
