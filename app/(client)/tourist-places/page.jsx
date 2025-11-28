"use client";
import NewSidebar from "@/components/ui/NewSidebar";
import Sidebar2 from "@/components/ui/Sidebar2";
import Sidebar3 from "@/components/ui/Sidebar3";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function FieldPage() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios
      .get("/api/blog")
      .then((res) => {
        setCards(res.data);
      })
      .catch((err) => {
        console.log("Error in fetching articles Cards", err);
      });
  }, []);
  return (
    <>
      <div className="flex w-screen justidfy-between">
        <div className="lg:w-[20%] md:w-[30%] ">
          <Sidebar2 />
        </div>
        <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 md:w-[70%] lg:w-[80%]">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Tourist Places
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cards.map((item) => (
                <div
                  key={item._id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-all h-[50vh] md:h-auto duration-300 overflow-hidden hover:-translate-y-1"
                >
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {item.description}
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs font-medium">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
