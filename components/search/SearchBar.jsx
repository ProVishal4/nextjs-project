"use client"
import SearchCard from "@/components/search/SearchCard";
import axios from "axios";
import Link from "next/link";
// import { Link } from "lucide-react";
import React from "react";
import { useState, useEffect, useRef } from "react";
//import MovieList from "./MovieList";








export const SearchBar = () => {
  const [article, setAriticle] = useState([]);
  const [loading, setLoading] = useState(false);
  //const [query, setQuery] = useState("")
  const searchRef = useRef();
  const fetchArticles = async (query) => {
    // e.preventDefault();

    //setLoading(true);
    try {
      const res = await axios
        .get(`/api/search?article=${query}`)
        .then((res) => {
          setAriticle(res.data);
        })
  
     
      console.log("secound log",article)

    } catch (error) {
      console.log("Error Searching in article SearchBar", error);
    }
      console.log(query)

  };
  
  const hendleSearch = (e) => {
    e.preventDefault();
    try {
      const query = searchRef.current.value.trim();
      if (query) fetchArticles(query);
    } catch (error) {
      console.log("Error Searching in article", error);
    }
  };
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      {/* <div className="w-1/2 mx-auto my-3">
        <form className="flex justify-center" onClick={hendleSearch}>
          <input
            type="text"
            className="bg-[#333030] focus:outline-none focus:ring focus:ring-blue-300 rounded-4xl pl-5 py-3 mr-4"
            placeholder="Search for a movie..."
            // onChange={(e) => setQuery(e.target.value)}
            ref={searchRef}
          />

          <button
            type="submit"
            className="py-3 px-6 rounded-3xl bg-amber-400 text-black active:scale-90 font-medium hover:bg-amber-600"
          >
            Search
          </button>
        </form>
      </div> */}
      <div className="relative w-72 rounded-full bg-zinc-200/20 ">
        <form className="w-full relative" onClick={hendleSearch}>
          <input
            type="text"
            placeholder="Search Place"
            className="
              w-2/3   rounded-full px-4
              text-gray-800 dark:text-zinc-300
               h-11 placeholder:text-white/50
              focus:outline-none focus:ring-2 focus:ring-lime-400
              transition  hidden md:block  
            "
            ref={searchRef}
          />
          <Link href={"/search"}>
            <button
              type="submit"
              className="
            absolute right-1 top-1/2 -translate-y-1/2
            bg-zinc-300/20 hover:bg-lime-400 
            rounded-full h-full transition hidden w-20 md:block
          "
            >
              ➜
            </button>
          </Link>
        </form>
        <img
          src="/icons/Menu.png"
          className="h-9 w-10 md:hidden absolute right-3  -mt-[16px]"
          alt="menu icon"
        />
      </div>
      {/* {loading ? <p> Loading ...</p> : <SearchCard article={article} />} */}
      {/* {loading && <p>Loading...</p>} */}
    </>
  );
};

export default SearchBar;
