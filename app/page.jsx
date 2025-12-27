// "use client";
import Slider from "@/components/eliments/swepSlider/Slider";
import React from "react";
import {
  Section1,
  Section2,
  Section3,
  Section5,
  Section4,
} from "@/components/sections/index.js";
import AutoSlider from "@/components/eliments/autoSlider/AutoSlider";
import Sidebar from "@/components/sidebar-menu/Sidebar";
import ImageCard from "../components/ui/ImageCard";
import NewSidebar from "@/components/sidebar-menu/NewSidebar";
import Navbar from "@/components/header/Navbar";
import Footer from "@/components/ui/Footer";
import Footer2 from "@/components/ui/Footer2";

import HomePage from "@/components/home/HomePage";

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
    <>
      <Navbar />
      <main className="flex flex-col  mx-auto   md:w-[95vw] relative md:left-0 lg:w-[57vw] w-[95vw] items-start">
        <AutoSlider />
        <Section3 />
        <ImageCard />
        <Section4 />
        <Section5 />
      </main>
      <footer>
        <Footer2 />
      </footer>
    </>
  );
}
