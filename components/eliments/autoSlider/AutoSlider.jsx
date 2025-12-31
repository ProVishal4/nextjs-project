"use client";
import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import data from "../../../lib/hero.json"

import style from  "./AutoSlider.module.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Sidebar from "@/components/sidebar-menu/NewSidebar";
import SearchBar from "@/components/search/SearchBar";
import { SearchMobile } from "@/components/search/SearchMobile";
import axios from "axios";

export default function AutoSlider() {
  const [popular, setPopular] = useState([]);
  const fetchPoplarPlace = async () => {
   try {
     const res = await axios.get("/api/cards-api");
     setPopular(res.data);
   } catch (error) {
    console.log("autoslider not working",error)
   }
  };
  useEffect(() => {
    fetchPoplarPlace();
  }, []);
  //console.log("popular place card is :- ", popular);

  const filtered = popular.filter((item) => item.popular === true);
  // let filteredItem = articles.filter((item) => {
  //   return item.category === flow;
  // });


  //   console.log(filteredItem)
  //   let resultArray = filteredItem.map(item =>{
  //     return item.category
  //   })
  //   console.log(resultArray)
  return (
    <>
      <div className="relative   w-[95%] mx-auto  top-[14vh] h-auto z-2 rounded-full  ">
        {/* <input
          type="text"
          placeholder="Search Place"
          className="
              w-2/3   rounded-full 
              text-gray-800 dark:text-zinc-200
               h-9 placeholder:text-white/50 
              focus:outline-none focus:ring-2 focus:ring-lime-400
              transition   indent-3 border border-amber-400
            "
        />
        <button
          className="
            absolute right-1 top-1/2 -translate-y-1/2
            bg-zinc-300/20 hover:bg-lime-400 active:bg-lime-400
            rounded-full h-full transition  w-20 
          "
        >
          ➜ title _id imageUrl imageAlt popular
        </button> */}
        <SearchMobile />
      </div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className={`${style.mySwiper}  rounded-2xl h-[40vh] md:h-[50vh] lg:h-[60vh] md:w-[90vw] lg:w-[50vw] w-[95vw] relative mt-[13%] md:mt-[10%]`}
      >
        {filtered.map((text) => (
          <SwiperSlide key={text._id}>
            <img
              src={text.imageUrl || "placeholder.jpg"}
              alt={text.imageAlt || " best tourist place image in cg"}
              className="w-full h-full"
            />
            <div className="text-zinc-700 dark:text-zinc-300 absolute bottom-5  w-[97%]  md:h-50 h-30 ml-[1.5%] rounded-2xl backdrop-blur-lg font-bold text-2xl z-10">
              <h2 className="  relative top-3  indent-3">
                {text.title || "Loading ..."}
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300  font-medium  indent-3 text-[0.6em] relative top-6 w-[90%] left-[5%]">
                {text.title || "Loading ..."}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
