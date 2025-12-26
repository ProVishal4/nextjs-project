// "use client";
// import Slider from "@/components/eliments/swepSlider/Slider";
// import React from "react";
// import {
//   Section1,
//   Section2,
//   Section3,
//   Section5,
//   Section4,
// } from "@/components/sections/index.js";
// import AutoSlider from "@/components/eliments/autoSlider/AutoSlider";
// import Sidebar from "@/components/sidebar-menu/Sidebar";
// import ImageCard from "../components/ui/ImageCard";
// import NewSidebar from "@/components/sidebar-menu/NewSidebar";
// import Navbar from "@/components/header/Navbar";
// import Footer from "@/components/ui/Footer";
// import Footer2 from "@/components/ui/Footer2";

import HomePage from "@/components/home/HomePage"

// const page = () => {
//   return (
//     <>
//       <Navbar />
//       <main className="flex flex-col  mx-auto   md:w-[95vw] relative md:left-0 lg:w-[57vw] w-[95vw] items-start">
//         {/* <aside className="hidden md:block md:w-[30%] lg:w-[30%] pr-4">
//           <div className=" sticky">
//             <Sidebar />
//           </div>
//         </aside> */}
//         {/* <div className="mx-auto border left-[40vw] lg:hidden border-amber-500 w-full h-20"></div> */}
//         {/* <section className="flex-1 md:w-[90vw] border-yellow-800 lg:w-[40vw] flex flex-col border h-auto"> */}
//         {/* <Section1 /> */}
     
//         <AutoSlider />
//         {/* <AutoSlider />
//           <AutoSlider />
//           <AutoSlider /> */}
//         {/* <Section2 /> */}
//         {/* <div><Slider /></div> */}
//         <Section3 />
//         <ImageCard />
//         <Section4 />
//         <Section5 />
//       </main>
//       <footer>
//         <Footer2 />
//       </footer>
//     </>
//   );
// };

// export default page;



export async function generateMetadata() {
 
  return {
    title: "home page",
    description: "Learn Next.js SEO with App Router",
    // image: article.imageUrl,
    openGraph: {
      title: "home title og",
      description: "article.metaDescription",
      // images: [
      //   {
      //     url: article.imageUrl,
      //     width: 1200,
      //     height: 630,
      //     alt: article.imageAlt,
      //   },
      // ],
      type: "website",
    },
    // twitter: {
    //   card: "summary_large_image",
    //   title: article.title,
    //   description: article.description,
    //   images: [article.image],
    // },
  };
}

export default function page() {
  return (
    <div><HomePage /></div>
  )
}
