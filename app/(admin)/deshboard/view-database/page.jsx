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
 
  };

  return (
    <div className="w-full">
      <h1>
        Deshboard:- <span className="text-red-500"> {deletes}</span>
      </h1>
      {/* {loading ? <div className='text-emerald-400'>Loading ...</div>: null}
  
        <div ></div>
  */}
      <nav></nav>
      <main className="w-[65%] mt-10 h-screen border mx-auto">
        {articles.map((item) => (
          <div
            key={item._id}
            className="border mt-2 text-white flex justify-between items-center rounded-2xl border-zinc-600/40 h-20 py-2 px-2 w-full"
          >
            <img
              className="h-full md:w-[20%] lg:w-[10%] via-gray-400 rounded-lg"
              src="/card2.jpg"
              alt=""
            />

            <div>
              <h2>{item.title}</h2>
            </div>
            <div className="w-[30%] flex rounded-2xl justify-evenly items-center h-full bg-[#2b3022]">
              <Link href={`/tourist-places`}>
                {/* /api/blog/${id} */}
                <button className="rounded-md bg-zinc-500 px-3 py-2">
                  View
                </button>
              </Link>
              <Link href={`/api/blog/${item._id}`}>
                <button className="rounded-md bg-zinc-500 px-3 py-2">
                  Edit
                </button>
              </Link>

              <button
                onClick={() => {
                  setDeletes(item._id);
                }}
                className="rounded-md bg-zinc-500 px-3 py-2"
              >
                Delete
              </button>
            </div>

            {/* Pagination */}
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
        ))}
      </main>
    </div>
  );
}
