"use client"
import { useSearchParams } from 'next/navigation'
import React from 'react'

function ProductList() {
    //products?category=laptop&page=2&page=3
    const searchParams = useSearchParams();
    //console.log("inside of :- ", searchParams)
      const pages = searchParams.getAll("page");
    const category = searchParams.get("category")
       // const entries = searchParams.entries();
  const entries = Object.fromEntries(searchParams.entries());

     console.log("Page :- ", pages);
    console.log("Category :- ",  category);
      console.log("entries :- ", entries);
  return (
    <div>ProductList Client side {pages}, {category}</div>
  )
}

export default ProductList