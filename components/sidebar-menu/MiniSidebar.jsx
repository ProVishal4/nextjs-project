"use client"
import React, { useEffect } from 'react'
import { articleStore } from "@/store/articleStore";
import { categoryStore } from '@/store/categoryStore';

export default function MiniSidebar({flows}) {
  const { articles, loading, fetchArticles } = articleStore();
  const { category, fetchCategory } = categoryStore();
  //const {field} = flows
  // console.log(flows)
  // console.log(art.articles.title)
  // const data = art.articles.title
  useEffect(() => {
    fetchArticles(),
    fetchCategory()
  }, [])
  
  console.log("flow data is :- ", flows);
  //console.log(category)
const {title} = articles
  //const result = articles.filter(flows === articles.imageAlt);
  //console.log(result)
  console.log("image Alt data:- ",articles.imageAtl)
  //console.log(articles)
  if (flows == articles.imageAtl){
    console.log("Yes, it's true!")
  }else{
    console.log("somthing wrong")
  }
    return (
      <div>
        MiniSidebar
        <p className="text-red-600 mt-10"> {flows}</p>
        <br />
      </div>
    );
}
