"use client";
import NewSidebar from "@/components/sidebar-menu/NewSidebar";
import Sidebar2 from "@/components/sidebar-menu/Sidebar2";
import Sidebar3 from "@/components/sidebar-menu/Sidebar3";
import Sidebar4 from "@/components/sidebar-menu/Sidebar4";
import Sidebar5 from "@/components/sidebar-menu/Sidebar5.";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function FieldPage() {
  const [cards, setCards] = useState([]);
  const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5
  useEffect(() => {
    axios
      .get(`/api/v1-limit?page=${page}&limit=${limit}`)
      .then((res) => {
        setArticles(res.data.articles);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.log("Error in fetching articles Cards", err);
      });
      //  fetchArticles();
  }, [page]);
//const datas =   new DOMParser().parseFromString(cards, "text/html");

function htmlToText(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}


  //console.log(cards.slug)
  return (
    <>
      <div className="flex w-screen justidfy-between">
        <div className="lg:w-[20%] md:w-[30%] ">
          <Sidebar5 />
        </div>
        <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 md:w-[70%] lg:w-[80%]">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Tourist Places
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((item) => (
                <Link href={`/tourist-places/${item.slug} `}>
                  <div
                    key={item._id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-all h-[50vh] md:h-auto duration-300 overflow-hidden hover:-translate-y-1"
                  >
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                        {item.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                        {htmlToText(item.description)}
                      </p>
                      <p className="text-gray-400 dark:text-gray-500 text-xs font-medium">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                      {/* <p>{item._id}</p> */}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

{/* pagination btn:-  */}

            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-4 py-2 dark:bg-zinc-700 bg-gray-200 rounded disabled:opacity-50"
              >
                Prev
              </button>

              <span>
                Page <b>{page}</b> of <b>{totalPages}</b>
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 bg-gray-200 dark:bg-zinc-700 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
