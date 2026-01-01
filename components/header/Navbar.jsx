"use client"
import React,{lazy,Suspense, useState} from "react";
import  SearchBar  from "../search/SearchBar";
import Link from "next/link";
//import SearchBar2 from "../search/SearchBar2.";
//import { Link } from "next/link";
const Search =lazy(()=> import('../search/SearchBar'))


// Navbar for all devieses ✅
export default function Navbar() { 
const [load, setLoad] = useState(false)

  return (
    <nav className="w-full  px-6 py-4 flex justify-center z-4 fixed bg-transparent">
      <div
        className="
         max-w-6xl flex items-center justify-between   
        backdrop-blur-xl bg-white/10  absolute top-4 z-10  md:h-13 md:w-2/3 w-7/8
        rounded-full px-1 py-3 shadow-lg border border-zinc-300   dark:border-white/20
      "
      >
        {/* Left: Logo div */}
        <div className="flex  gap-3">
          <Link href="/">
            <div
              className="
            bg-white/20 backdrop-blur-md px-5  py-2  w-15 h-8 
            rounded-full  dark:text-white font-semibold tracking-wide
          "
            >
              Logo 
            </div>
          </Link>
        </div>
        {/* {
load? :null
        } */}
       <Suspense fallback={<h3>Loading...</h3>}> <Search /></Suspense>
      </div>
    </nav>
  );
}
