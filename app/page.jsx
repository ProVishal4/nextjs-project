import Slider from '@/components/eliments/swepSlider/Slider'
import React from 'react'
import {Section1, Section2} from '@/components/sections/index.js'
import AutoSlider from '@/components/eliments/autoSlider/AutoSlider'
import Sidebar from '@/components/ui/Sidebar'
const page = () => {
  return (
    <>
      <main className="flex md:w-[95vw] relative md:left-[1.5vw] lg:w-[60vw] lg:left-[20vw] w-[95vw] left-[2.5vw] items-start">
        <aside className="hidden md:block md:w-[30%] lg:w-[30%] pr-4">
          <div className=" fixed top-20 self-start h-fit">
            <Sidebar />
          </div>
        </aside>

        <section className="flex-1 md:w-[70%] lg:w-[40vw] flex flex-col border h-auto">
          <AutoSlider />
          <AutoSlider />
          <AutoSlider />
          <AutoSlider />
          <Section1 />
          {/* <Section2 /> */}
          {/* <div><Slider /></div> */}
        </section>
      </main>
    </>
  );
}

export default page