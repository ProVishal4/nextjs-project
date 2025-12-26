"use client"
//import SearchCard from "@/components/search/SearchCard";
import axios from "axios";
import { X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react"; 
import { useRouter } from "next/navigation";

export const SearchMobile = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
const [increas, setIncreas] = useState(false)


 
  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/search-results?search=${encodeURIComponent(query)}`);
    setIncreas(false);
  };


    async function search(q) {
      setLoading(true);
      const res = await fetch(`/search-route?q=${q}`);
      const data = await res.json();

      setResults(data.results);
      setLoading(false);
      console.log("searchBar3 data is:- ", results);
    }

    console.log(results)

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

    const formHandle = (e) => {
      e.preventDefault();
      setIncreas(!increas);
    };
  return (
    <>
      <div
        className={`   ${
          increas ? "w-full" : "mx-auto  w-72"
        } relative rounded-full bg-zinc-200/20 transition-all decoration-2 ease-in `}
      >
        <form
          className="w-full relative "
          onClick={(e) => {
            e.preventDefault();
            formHandle(e);
          }}
        >
          <input
            type="text"
            placeholder="Search Place"
            className={`

             ${increas ? "w-[66%]" : "w-2/3"}  rounded-full px-4
             text-zinc-300
               h-11 placeholder:text-white/50
              focus:outline-none 
              transition-all decoration-2 ease-in  md:hidden
            `}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {/* {loading && <div className="mt-2 border border-purple-700  text-sm">Searching...</div>} */}
          {results.length > 0 && (
            <ul
              className={`absolute w-[100%] overflow-hidden rounded-2xl mt-2  bg-white/10  dark:bg-zinc-600/90 shadow ${
                increas ? "block" : "hidden"
              } `}
            >
              {results.map((r) => (
                   <Link key={r._id} href={`/tourist-places/${r.slug}`}>
                <li
                  onClick={() => setQuery("")}
                  className="px-4 py-2 hover:bg-gray-100 active:bg-gray-100 dark:active:bg-gray-100/20 dark:hover:bg-gray-100/20  cursor-pointer dark:text-white/60 active:text-zinc-500 hover:text-zinc-500  dark:hover:text-black/90 text-blue-100"
                >
                  {r.title}
                </li></Link>
              ))}
            </ul>
          )}

          <button
            className="
            absolute right-1 top-1/2 -translate-y-1/2
            bg-zinc-300/20 hover:bg-lime-400 active:bg-lime-400
            rounded-full h-full text-[#f8f7f6] dark:text-zinc-800 transition  w-20 md:hidden
          "
            onClick={() => handleSearch()}
          >
            ➜
          </button>
        </form>
        <div
          className={` ${increas ? "block" : "hidden"}
            absolute right-1/6 top-1/2 content-center  -translate-y-1/2
           active:bg-lime-400 
            rounded-full h-[90%] transition  ease-in md:hidden w-20 
          `}
          onClick={() => increase()}
        >
          <X className="mx-auto text-purple-600" size={20} />
        </div>
      </div>
    </>
  );
};

export default SearchMobile;
