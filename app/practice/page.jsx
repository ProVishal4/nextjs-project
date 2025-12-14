"use client"
import TextNavbar from '@/components/sidebar-menu/TextNavbar'
import { categoryStore } from "@/store/categoryStore";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function page() {
      const { category, fetchCategory } = categoryStore();
    useEffect(() => {
      fetchCategory()
    }, [])
    console.log(category)
  return (
    <div className='border border-amber-400'>Text Navbar <TextNavbar /> </div>
  )
}
