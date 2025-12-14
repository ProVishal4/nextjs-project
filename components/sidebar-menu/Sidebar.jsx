"use client"
// import { categoryStore } from '@/store/categoryStore';
// import Link from 'next/link';
// import React, {useState, useEffect} from 'react'
// export default function SidebarSimple() {
//   const { category, fetchCategory } = categoryStore();
// useEffect(() => {
//   fetchCategory()
// }, [])

// return (
//   <>
//    <aside
//       className="hidden  md:flex justify-center 
//              md:w-[20vw] lg:w-[20vw] w-[20vw] h-screen p-6 shadow-lg 
//             bg-gradient-to-b from-[#fcf9e8] to-[#fae8ff]
//             dark:bg-gradient-to-b dark:from-[#12061b] dark:to-[#161f15]
//             dark:text-[#dad9d9] text-[#222]"
//     >
//       <div className="space-y-2">
//         <div className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">
//           MyBlog
//         </div>
// {category.map((item) => (
//   <Link
//           href={`/`}
//           className="block px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition duration-200 font-medium"
//         >
//           {item.field}
//         </Link>
// ))}
       
      
//       </div>
//     </aside>
//   </>
// );
// }
import React from 'react'

export default function Sidebar() {
  return (
    <div>SidebarSimple</div>
  )
}
