"use client"
import React from 'react'
import data from "../../lib/hero.json"
import { BackgroundGradient } from '../ui/background-gradient'
import { motion } from 'framer-motion'
import Link from 'next/link'




//  grid card component

export default function Section4() {
  return (
    <>
      <motion.h1
        initial={{ x: -70, opacity: 0 }}
        whileInView={{ x: 70, opacity: 1 }}
        transition={{ duration: 0.8, 
          delay:0.1
        }}
        
        className="md:text-3xl ml-[25%] mb-3 font-bold text-2xl text-gray-700 dark:text-white/80   left-1/2 -translate-x-1/2"
      >
         chhattisgarh popular places
      </motion.h1>
      {/* <h1 className="ml-[5%] mb-3 font-bold text-2xl text-black dark:text-white">
        Explore more place
      </h1> */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        whileInView={{ y: 20, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 mx-auto lg:grid-cols-3 gap-7 mb-15"
      >
        {data.map((e) => (
          <BackgroundGradient key={e.id} className=" p-0">
            <div
              className="relative overflow-hidden rounded-[22px] bg-zinc-800 w-full h-full shadow-lg transition-transform transform hover:scale-105 duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-400"
              role="group"
            >
              <img
                src={e.image}
                alt={e.title}
                loading="lazy"
                className="w-full h-48 sm:h-56 md:h-44 lg:h-56 object-cover"
              />

              {/* gradient overlay for readable text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

              {/* content */}
              <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-auto">
                <h3 className="text-lg sm:text-xl font-semibold leading-tight drop-shadow-md">
                  {e.heading}
                </h3>
                <p className="mt-1 text-sm text-zinc-200/90 line-clamp-2">
                  {e.title}
                </p>

                <div className="mt-3">
                  <Link href={`/tourist-places/${e.slug}`}>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/30 bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/10"
                      aria-label={`Read more about ${e.heading}`}
                    >
                      Read more
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </BackgroundGradient>
        ))}
      </motion.div>
    </>
  );
}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </BackgroundGradient>
//         ))}
//       </motion.div>
//     </>
//   );
// }
