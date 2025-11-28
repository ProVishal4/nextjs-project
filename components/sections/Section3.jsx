"use client"
import { motion } from "framer-motion";
import React from "react";


// FAQ section
 export default function Section3() {
  const faqs = [
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy. Items must be unused and in their original packaging.",
    },
    {
      question: "Do you offer customer support?",
      answer: "Yes, we offer 24/7 customer support via email, chat, and phone.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Shipping typically takes 5-7 business days depending on your location.",
    },
    {
      question: "Can I track my order?",
      answer:
        "Yes, once your order has shipped, you will receive a tracking link via email.",
    },
  ];

  return (
    <>
      {/* <div className="relative md:hidden w-72 border h-10 z-20 rounded-full bg-zinc-200/20 ">
        <input
          type="text"
          placeholder="Search Place"
          className="
              w-2/3   rounded-full 
              text-gray-800 dark:text-zinc-300
               h-9 placeholder:text-white/50
              focus:outline-none focus:ring-2 focus:ring-lime-400
              transition   indent-3 
            "
        />
        <button
          className="
            absolute right-1 top-1/2 -translate-y-1/2
            bg-zinc-300/20 hover:bg-lime-400 
            rounded-full h-full transition  w-20 
          "
        >
          ➜
        </button>

       
      </div> */}
      <section className="w-full max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-[#3a3838]  text-center dark:text-white/80">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group border border-gray-200 dark:border-gray-700 rounded-2xl p-4 backdrop-blur bg-white/60 dark:bg-black/40 shadow-sm hover:shadow-md transition duration-200"
            >
              <summary className="cursor-pointer text-lg font-semibold text-gray-800 dark:text-gray-200 flex justify-between items-center">
                {faq.question}
                <span className="ml-2 transition-transform group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
