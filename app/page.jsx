"use client"
import Slider from '@/components/eliments/swepSlider/Slider'
import React from 'react'
import {Section1, Section2, Section3, Section5, Section4} from '@/components/sections/index.js'
import AutoSlider from '@/components/eliments/autoSlider/AutoSlider'
import Sidebar from '@/components/ui/Sidebar'
import ImageCard from '../components/ui/ImageCard'


const page = () => {
  return (
    <>
      <main className="flex flex-col mx-auto  border-amber-500  md:w-[95vw] relative md:left-0 lg:w-[57vw]  w-[95vw]  items-start">

        {/* <aside className="hidden md:block md:w-[30%] lg:w-[30%] pr-4">
          <div className=" sticky">
            <Sidebar />
          </div>
        </aside> */}

        {/* <section className="flex-1 md:w-[90vw] border-yellow-800 lg:w-[40vw] flex flex-col border h-auto"> */}
          <AutoSlider />
          {/* <AutoSlider />
          <AutoSlider />
          <AutoSlider /> */}
          <Section1 />
          {/* <Section2 /> */}
          {/* <div><Slider /></div> */}
          <Section3 />
      <ImageCard />
<Section4 />
<Section5 />
      </main>
    </>
  );
}

export default page