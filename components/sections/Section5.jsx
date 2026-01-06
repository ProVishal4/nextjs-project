"use client"
import React from 'react'
import slideData from '../../lib/ImageCard.json'
import Carousel from '../ui/carousel'
import { motion } from 'framer-motion'

// slider image slid left to right (carousel)
const Section5 = () => {

  return (
    <div className="relative overflow-hidden my-10 w-full py-20">
      <motion.h1
        initial={{ x: -70, opacity: 0 }}
        whileInView={{ x: 70, opacity: 1 }}
        transition={{ duration: 0.8,
delay:0.2
         }}
        className="md:text-3xl  mb-3 font-bold text-2xl text-gray-700 dark:text-zinc-300 top-0  absolute left-[40%] -translate-x-1/2"
      >
       Know More Tourist Attractions
      </motion.h1>
      {/* <Carousel>
      {jsonData.map((item) => (
        <div className='w-full h-full'>
        <img w-full h-[10rem] md:h-[30rem]  bg-amber-600
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-48 sm:h-56 md:h-44 lg:h-56 object-cover"
        />
        <div>{item.title}</div>
        <button>next</button>
        </div>
      ))}</Carousel> */}
      <Carousel slides={slideData} />
    </div>
  );
}

export default Section5