// "use client";
import React from "react";
import {
  Section1,
  Section2,
  Section3,
  Section5,
  Section4,
} from "@/components/sections/index.js";
import AutoSlider from "@/components/eliments/autoSlider/AutoSlider";
import ImageCard from "../components/ui/ImageCard";
import Navbar from "@/components/header/Navbar";
import Footer2 from "@/components/ui/Footer2";

export async function generateMetadata() {

  
  return {
    title: "CG Wild Explore",
    description: "chhattisgarh tourist loctions, places and blog website",
    openGraph: {
      title: "chhattisgarh blog and tourist places",
      description:
        "chhattisgarh tourist loctions, places blog and  informations",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "cg wild explore logo",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "chhattisgarh blog and tourist places",
      description: "know more about chhattisgarh tourist loctions, places ",
      images: ["/og-image.png"],
    },
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
