export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex justify-center z-4 fixed bg-transparent">
      <div
        className="
         max-w-6xl flex items-center justify-between   
        backdrop-blur-xl bg-white/10  absolute top-4 z-10 h-10 w-2/3
        rounded-full px-1 py-3 shadow-lg border border-white/20
      "
      >
        {/* Left: Logo */}
        <div className="flex items-center  gap-3">
          <div
            className="
            bg-white/20 backdrop-blur-md px-5  py-2  w-15 h-8 
            rounded-full text-white font-semibold tracking-wide
          "
          >
            Logo
          </div>
        </div>

        {/* Right: Search placeholder-gray-600  */}
        <div className="relative w-72 rounded-full bg-zinc-200/20 ">
          <input
            type="text"
            placeholder="Search Place"
            className="
              w-2/3   rounded-full 
              text-gray-800 dark:text-zinc-300
               h-8 placeholder:text-white/50
              focus:outline-none focus:ring-2 focus:ring-lime-400
              transition  indent-3 
            "
          />
          <button
            className="
            absolute right-1 top-1/2 -translate-y-1/2
            bg-zinc-300/20 hover:bg-lime-400 
            rounded-full h-full transition w-20
          "
          >
            ➜
          </button>
        </div>
      </div>
    </nav>
  );
}
