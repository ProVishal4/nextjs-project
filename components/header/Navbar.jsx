"use client";
import React, { lazy, Suspense, useState } from "react";
import SearchBar from "../search/SearchBar";
import Link from "next/link";
//import SearchBar2 from "../search/SearchBar2.";
//import { Link } from "next/link";
import Image from "next/image";
const Search = lazy(() => import("../search/SearchBar"));

// Navbar for all devieses ✅
export default function Navbar() {
  const [load, setLoad] = useState(false);

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
        <div className="flex justify-start items-center lg:w-1/5 md:w-2/5 w-auto gap-2 px-2 md:gap-3">
          <Link
            className="flex items-center justify-center gap-2 md:gap-3 px-2 md:px-3 "
            href="/"
          >
            <Image
              className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-white/20 backdrop-blur-md "
              src={"/favicon.ico"}
              width={50}
              height={50}
              alt="logo"
            />
            <h5
              className="  text-[11px]
    sm:text-sm
    md:text-base
    lg:text-lg
    xl:text-xl
    font-semibold
    tracking-wide
    leading-tight
    whitespace-nowrap"
            >
              CG wild Explore
            </h5>
          </Link>
        </div>
        {/* <div className="flex items-center w-full sm:w-auto lg:w-[20%] md:w-[40%] gap-3">
          <Link
            href="/"text-xs sm:text-sm md:text-base lg:text-xl font-semibold tracking-wide
            className="flex items-center  gap-3 w-50 md:w-full px-3 border border-orange-300 rounded-lg
               justify-start sm:justify-center"
          >
            <Image
              src="/favicon.ico"
              width={48}
              height={48}
              alt="logo"
              className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12
                 rounded-full bg-white/20 backdrop-blur-md
                 border border-orange-300 "
            />

            <h5 className="text-sm  sm:text-base md:text-lg font-semibold tracking-wide">
              CG Wild Explore
            </h5>
          </Link>
        </div> */}

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
