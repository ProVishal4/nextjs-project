import React from 'react'

export default function Sidebar() {
return (
  <>
    <aside
      className="hidden  md:flex justify-center 
             md:w-[20vw] lg:w-[20vw] w-[20vw] h-screen p-6 shadow-lg overflow-y-auto
            bg-gradient-to-b from-[#fcf9e8] to-[#fae8ff]
            dark:bg-gradient-to-b dark:from-[#12061b] dark:to-[#161f15]
            dark:text-[#dad9d9] text-[#222]"
    >
      <nav className="space-y-2">
        <div className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">
          MyBlog
        </div>

        <a
          href="/"
          className="block px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition duration-200 font-medium"
        >
          🏠 Home
        </a>
        <a
          href="/blog"
          className="block px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition duration-200 font-medium"
        >
          📝 Blog
        </a>
        <a
          href="/about"
          className="block px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition duration-200 font-medium"
        >
          ℹ️ About
        </a>
        <a
          href="/contact"
          className="block px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition duration-200 font-medium"
        >
          ✉️ Contact
        </a>
      </nav>
    </aside>
  </>
);
}
