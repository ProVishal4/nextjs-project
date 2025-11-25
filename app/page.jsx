import Slider from '@/components/eliments/swepSlider/Slider'
import React from 'react'
import {Section1, Section2} from '@/components/sections/index.js'
import AutoSlider from '@/components/eliments/autoSlider/AutoSlider'
import Sidebar from '@/components/ui/Sidebar'
const page = () => {
  return (
    <>
      <main className="flex md:w-[95vw] border-red-600 relative  md:left-[1.5vw] lg:w-[60vw] lg:left-[20vw] border   w-[95vw] left-[2.5vw]">
        <div className="right-side-content border md:w-[30%] ">
          <Sidebar />
        </div>
        <div className="left-Side-content flex flex-col overflow-y-auto border md:w-[70%] lg:w-[40vw] h-auto">
          <AutoSlider />
          <AutoSlider />
          <AutoSlider />
          <AutoSlider />
          <Section1 />
          {/* <Section2 /> */}
          {/* <div><Slider /></div> */}

        </div>
      </main>
    </>
  );
}

export default page