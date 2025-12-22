// "use client";

// import axios from "axios";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";

// export default function page() {
//   const [deletes, setDeletes] = useState("");
//   const [image, setImage] = useState([])
//   const id = "#";

//   useEffect(() => {
// const res = axios.get('/api/image')
// setImage(res.data)

//     fetchArticles();
//   }, []);
// if(deletes) {
//      axios.delete(`/api/image/${deletes}`);
// }
//   const onDelete = () => {
 
//   };

//   return (
//     <div className="w-full">
//       <h1>Deshboard:-  <span className="text-red-500" > {deletes}</span></h1>
//       {/* {loading ? <div className='text-emerald-400'>Loading ...</div>: null}
  
//         <div ></div>
//   */}
//       <nav></nav>
//       <main className="w-[65%] mt-10 h-screen border mx-auto">
//         {image.map((item) => (
//           <div
//             key={item._id}
//             className="border mt-2 text-white flex justify-between items-center rounded-2xl border-zinc-600/40 h-20 py-2 px-2 w-full"
//           >
//             <img
//               className="h-full md:w-[20%] lg:w-[10%] via-gray-400 rounded-lg"
//               src="/card2.jpg"
//               alt=""
//             />

//             <div>
//               <h2>{item.title}</h2>
//             </div>
//             <div className="w-[30%] flex rounded-2xl justify-evenly items-center h-full bg-[#2b3022]">
//               <Link href={`/tourist-places`}>
//                 {/* /api/blog/${id} */}
//                 <button className="rounded-md bg-zinc-500 px-3 py-2">
//                   View
//                 </button>
//               </Link>
//               <Link href={`/api/blog/${item._id}`}>
//                 <button className="rounded-md bg-zinc-500 px-3 py-2">
//                   Edit
//                 </button>
//               </Link>

//               <button
//                 onClick={() => {
//                   setDeletes(item._id);
                 
//                 }}
//                 className="rounded-md bg-zinc-500 px-3 py-2"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </main>
//     </div>
//   );
// }
