"use client"
//import SearchCard from "@/components/search/SearchCard";
import axios from "axios";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export const SearchBar = () => {
   

  const [query, setQuery] = useState("");
const router = useRouter();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
const [increas, setIncreas] = useState(false)

      
  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/search-results?search=${encodeURIComponent(query)}`);
    setIncreas(false);
    //router.push(`/search?q=${encodeURIComponent(query)}`);
  };

    async function search() {
      setLoading(true);
      const res = await fetch(`/search-route?q=${query}`);
      const data = await res.json();

      setResults(data.results);
      setLoading(false);
      console.log("searchBar3 data is:- ", results);
    }

// Debounce logic
    useEffect(() => {
      const timeout = setTimeout(() => {
        if (query.trim().length > 0) {
          search(query);
        } else {
          setResults([]);
        }
      }, 300);
      return () => clearTimeout(timeout);
    }, [query]);


    const increase = () =>{
       
        setIncreas(false)
         setQuery("")
    }
  const formHandle = (e) =>{
        e.preventDefault()
    setIncreas(!increas) 

  }
  return (
    <>
      <div
        className={`${
          increas ? "w-3/4" : " w-72"
        } relative rounded-full bg-zinc-200/20  transition-all decoration-2 ease-in `}
      >
        <form className="w-full relative" onClick={(e) => {e.preventDefault(); formHandle(e)}}>
          <input
            type="text"
            placeholder="Search Place"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className={`

             ${increas ? "md:w-[60%] lg:w-[80%]" : "w-2/3"}  rounded-full px-4
              text-gray-800 dark:text-zinc-300
               h-11 placeholder:text-white/50
              focus:outline-none 
              transition-all decoration-2 ease-in hidden md:block  
            `}
        
          />
          {/* {loading && <div className="mt-2 text-sm">Searching...</div>} */}
          {results.length > 0 && (
            <ul
              className={`border absolute md:w-[60%] lg:w-[80%] border-purple-700 rounded mt-2  bg-white/10 dark:bg-zinc-600/90 shadow ${
                increas ? "block" : "hidden"
              } `}
            >
              {results.map((r, i) => (
                <li
                  key={i}
                  className="px-4 py-2 hover:bg-gray-100 active:bg-gray-100 dark:active:bg-gray-100/20 dark:hover:bg-gray-100/20  cursor-pointer dark:text-white/60 text-black/80 hover:text-white/90"
                >
                  {r}
                </li>
              ))}
            </ul>
          )}

          <button
            className="
            absolute right-1 top-1/2 -translate-y-1/2
            bg-zinc-300/20 hover:bg-lime-400 
            rounded-full h-full transition hidden w-20 md:block
          "
            onClick={() => handleSearch()}
          >
            ➜
          </button>
        </form>
        <div
          className={` ${increas ? "md:block" : "hidden"}
            absolute right-1/6 top-1/2  -translate-y-1/2
           
            rounded-full h-[90%] transition  ease-in hidden w-20 
          `}
          onClick={() => increase()}
        >
          <X className="mx-auto mt-3" size={20} />
        </div>
        <img
          src="/icons/Menu.png"
          className="h-9 w-10 md:hidden absolute right-3  -mt-[16px]"
          alt="menu icon"
        />
      </div>
    </>
  );
};

export default SearchBar;
