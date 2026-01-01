"use client"
import React,{lazy,Suspense, useState} from "react";
import  SearchBar  from "../search/SearchBar";
import Link from "next/link";
//import SearchBar2 from "../search/SearchBar2.";
//import { Link } from "next/link";
import Image from "next/image"
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
        <div className="flex justify-between items-center  lg:w-[20%] md:w-[40%] w-[55%] gap-3">
          <Link
            className="w-full flex justify-between px-2 md:px-1 items-center"
            href="/"
          >
            <Image
              className="
            bg-white/20 backdrop-blur-md   content-center w-10 lg:w-12 md:w-1/4 h-10 
            rounded-full  dark:text-white font-semibold tracking-wide
          "
              src={"/favicon.ico"}
              width={50}
              height={50}
              alt="logo"
            />
            <h5>CG Wild Explore</h5>
          </Link>
        </div>
        {/* {
load? :null
        } */}
        <Suspense fallback={<h3>Loading...</h3>}>
          {" "}
          <Search />
        </Suspense>
      </div>
    </nav>
  );
}
