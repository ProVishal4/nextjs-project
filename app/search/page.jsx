"use client"
import SearchCard from "@/components/search/SearchCard";
import React from "react";
import { useState, useEffect, useRef } from "react";
//import MovieList from "./MovieList";
const page = () => {
  const [article, setAriticle] = useState([]);
  const [loading, setLoading] = useState(false);
  //const [query, setQuery] = useState("")
  const searchRef = useRef();
  const fetchArticles = async (query) => {
    // e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/search/search?article=${query}`
      );
      if (!res.ok) throw new Error("Failed to fetch data");
      //http://localhost:5000/api/search?movie=Ince
      const data = await res.json();
      //  console.log(data);
      setAriticle(data || "No Article find");

      //console.log("secound log",article)
      setLoading(false);
    } catch (error) {
      console.log("Error Searching in article", error);
    }
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
      <div className="w-1/2 mx-auto my-3">
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
      </div>
      {loading ? <p> Loading ...</p> : <SearchCard article={article} />}
    </>
  );
};

export default page;
