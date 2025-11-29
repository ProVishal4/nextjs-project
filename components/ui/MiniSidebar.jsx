import React from 'react'
import { articleStore } from "@/store/articleStore";

export default function MiniSidebar({flows}) {
  const { articles, loading, fetchArticles } = articleStore();
  //const {field} = flows
  // console.log(flows)
  // console.log(art.articles.title)
  // const data = art.articles.title
  console.log("flow data is :- ", flows);
  //console.log(articles)
const {title} = articles
  //const result = articles.filter(flows === articles.imageAlt);
  //console.log(result)
  console.log("image Alt data:- ",title)
  console.log(articles)
  if (flows === articles.imageAtl){
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
