"use client"
import { motion } from "framer-motion";
import React from "react";


// FAQ section
 export default function Section3() {
  const faqs = [
    { id: 1,
      question: "What are the main soil types found in Chhattisgarh?",
      answer:
        "Chhattisgarh has red soil, black soil, alluvial soil, and laterite soil, each supporting different crops and agricultural practices.",
    },
    { id: 2,
      question: "Why is Chhattisgarh called the Rice Bowl of India?",
      answer:
        "Because of its fertile plains, suitable soil, and favorable climate, Chhattisgarh produces large quantities of rice every year.",
    },
    { id: 3,
      question: "What types of forests are found in Chhattisgarh?",
      answer:
        "Chhattisgarh has tropical moist deciduous forests, tropical dry deciduous forests, semi-evergreen forests, and extensive bamboo forests.",
    },
    { id: 4,
      question: "What are the major physical features of Chhattisgarh?",
      answer:
        "The state mainly consists of the Chhattisgarh Plain, Northern Hills (Surguja Plateau), and Southern Plateau (Dandakaranya region).",
    },
  ];

  return (
    <>
      <section className="w-full max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-[#3a3838]  text-center dark:text-white/80">
         Know about Chhattisgarh FAQ
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.id}
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
