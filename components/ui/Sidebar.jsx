import React from 'react'

export default function Sidebar() {
return (
    <aside className="w-[20vw] h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-6 shadow-lg overflow-y-auto">
        <nav className="space-y-2">
            <div className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">
                MyBlog
            </div>
            
            <a href="/" className="block px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition duration-200 font-medium">
                🏠 Home
            </a>
            <a href="/blog" className="block px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition duration-200 font-medium">
                📝 Blog
            </a>
            <a href="/about" className="block px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition duration-200 font-medium">
                ℹ️ About
            </a>
            <a href="/contact" className="block px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition duration-200 font-medium">
                ✉️ Contact
            </a>
        </nav>
    </aside>
)
}
