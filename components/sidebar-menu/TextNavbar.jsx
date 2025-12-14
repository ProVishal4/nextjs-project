"use client";
import { categoryStore } from '@/store/categoryStore';
import Link from 'next/link';
import React, {useState, useEffect} from 'react'
import axios from "axios";
export default function TextNavbar() {
  const { category, fetchCategory } = categoryStore();
useEffect(() => {
  fetchCategory()
}, [])
//console.log(category)
  return (
    <div className='border border-zinc-500 w-[30vw] px-3'>
      Category
      {category.map((i) => (
       <Link href={`/`} > <div key={i._id}>{i.field}</div></Link>
      ))}{" "}
    </div>
  );
}
