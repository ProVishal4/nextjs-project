"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { categoryStore } from "@/store/categoryStore";
import { ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";
import SearchMobile from "@/components/search/SearchMobile";
import Image from "next/image";
import menuStatusStore from "@/store/menuStatusStore";



export default function FieldPage() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeCategory, setActiveCategory] = useState("All");
  //const { category, fetchCategory } = categoryStore();
  const [category, setCategory] = useState([])
  const router = useRouter();
const [filter, setFilter] = useState(false)
const status = menuStatusStore((s) => s.status)

  const [flow, setFlow] = useState(""); 
  const limit = 5;

  //console.log("zustand value is status:- ", status)

// setCounter(counter + 1)
// console.log(counter)
  useEffect(() => {
    const categoryQuery =
      activeCategory !== "All"
        ? `&category=${activeCategory}` 
        : `&category=${status}`;

    //
    axios
      .get(`/api/v1-limit?page=${page}&limit=${limit}${categoryQuery}`, {
        cache: "no-store", // default${categoryQuery}cache: "force-cache",
      })
      .then((res) => {
        setArticles(res.data.articles);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.log("Error in fetching articles Cards", err);
      });

      axios.get("/api/category")
        .then((res) => {
          setCategory(res.data);
        })
        .catch((err) => {
          console.log("Error in fetching categories", err);
        });

    //  fetchArticles();activeCategory,
   // fetchCategory();
  }, [page, status, activeCategory ]);

  const handleCategoryClick = (cat) => {
   
    setActiveCategory(cat);
    setPage(1); 
    //console.log("This is cat data: - " , cat)
  };

const reloads = () =>{
setActiveCategory("All");
setFlow("")
}

  function htmlToText(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

const fillterMenu = () =>{
setFilter(!filter)
  return 
}

  // window.addEventListener("online", () => console.log("Became online"));
  // window.addEventListener("offline", () => console.log("Became offline local host running"));
  return (
    <>
      <div className="flex w-full justify-evenly ">
        <aside className="lg:w-[20%] md:w-[30%] hidden md:block border-r border-gray-300 dark:border-gray-700 p-6 bg-white dark:bg-gray-800 h-auto">
          <ul className="space-y-2">
            <li
              className={`cursor-pointer px-3 py-2 rounded text-sm ${
                flow ? "" : "bg-zinc-300/10 text-white"
              }`}
              onClick={() => reloads()}
            >
              All Category
            </li>
            {category.map((cat) => (
              <li
                key={cat._id}
                onClick={() => {
                  handleCategoryClick(cat._id);
                  setFlow(cat.field);
                }}
                className={`cursor-pointer px-3 py-2 rounded text-sm
                    ${
                      flow === cat.field
                        ? "bg-zinc-300/10 text-white"
                        : "hover:bg-gray-100/20"
                    }`}
              >
                {cat.field}
              </li>
            ))}
          </ul>
        </aside>
        <div className="  w-full bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 md:w-[70%] lg:w-[80%]">
          <div className="max-w-6xl mx-auto h-full   relative">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white/90 md:mb-6 my-12   text-center">
              {flow ? flow : "Tourist Places"}
            </h1>
            <div className="my-5   h-auto md:hidden ">
              <SearchMobile />
            </div>
            <div
              className={`md:hidden w-full border border-zinc-500/20 rounded-md h-10 flex flex-col mb-6   ${
                filter
                  ? "bg-[#d1cccc] dark:bg-zinc-700/60"
                  : "bg-blue-200/10 dark:bg-zinc-600/30"
              }`}
              onClick={() => fillterMenu()}
            >
              <div
                className={`flex px-5 py-3 items-center justify-between  w-full h-10 `}
              >
                <h4 className="text-zinc-600 dark:text-zinc-100/90">
                  {flow ? flow : "Filter Category"}
                </h4>
                {filter ? <ChevronUp /> : <ChevronDown />}
              </div>
              {filter && (
                <ul className="space-y-2  md:hidden z-10  bg-zinc-200 dark:bg-zinc-600 rounded-md text-zinc-600 dark:text-zinc-100/90">
                  <li
                    className={`cursor-pointer px-3 py-2 active:bg-gray-100/20  rounded text-sm ${
                      flow ? "" : "bg-zinc-300/10 text-white"
                    }`}
                    onClick={() => reloads()}
                  >
                    All Category
                  </li>
                  {category.map((cat) => (
                    <li
                      key={cat._id}
                      onClick={() => {
                        handleCategoryClick(cat._id);
                        setFlow(cat.field);
                      }}
                      className={`cursor-pointer active:bg-gray-100/20 px-3 py-2  text-sm 
                    ${
                      flow === cat.field
                        ? "bg-[#d4d2d296] dark:bg-[#d4d2d22a] text-white/60 rounded-md"
                        : "active:bg-gray-100/20"
                    }`}
                    >
                      {cat.field}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-8 ">
              {articles.length != 0 ? (
                articles.map((item) => (
                  <Link
                    key={item._id}
                    href={`/tourist-places/${item.slug} `}
                    //   onClick={(e) => handlePush(e)}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-all h-[50vh] md:h-[23rem] duration-300 overflow-hidden hover:-translate-y-1">
                      <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        <Image
                          src={item.imageUrl || "/card2.jpg" }
                          alt={item.imageAtl || "image content"}
                          width={1200}
                          height={630}
                    
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
                        <time className="text-gray-400 dark:text-gray-500 text-xs font-medium">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </time>
                      
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="flex md:ml-[20vw] h-40 items-center justify-center rounded-lg border w-full border-dashed text-gray-400 mb-[50vh]">
                  No Article available
                </div>
              )}
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
                disabled={page === totalPages || totalPages == 0}
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
