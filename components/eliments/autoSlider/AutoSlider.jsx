"use client";
import React, { useRef, useState } from "react";
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

export default function AutoSlider() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className={`${style.mySwiper}  rounded-2xl h-[40vh] md:h-[50vh] lg:h-[60vh] md:w-[90vw] lg:w-[50vw] w-[95vw] relative mt-[10%]`}
      >
        {data.map((text) => (
          <SwiperSlide key={text.id}>
            <img src={text.image} alt="" className="w-full h-full" />
            <div className="text-zinc-700 dark:text-zinc-300 absolute bottom-5  w-[97%]  md:h-50 h-30  rounded-2xl backdrop-blur-lg font-bold text-2xl z-10">
              <h2 className="  relative top-3  indent-3">{text.heading}</h2>
              <p className="text-zinc-700 dark:text-zinc-300  font-medium  indent-3 text-[0.6em] relative top-6 w-[90%] left-[5%]">
                {text.paragraph}
              </p>
            </div>
          </SwiperSlide>
        ))}

       
      </Swiper>
    </>
  );
}
