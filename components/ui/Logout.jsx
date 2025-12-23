"use client";
import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
export default function Logout() {
  const { data: session } = useSession();
  return (
    <div>
      {/* bg-[#cecaca] hover:bg-[#ffffff2f] dark:bg-[#2e2c2c] */}
      <Link
        className="rounded-md  hover:bg-zinc-600/40 bg-zinc-700 mr-3 h-10  px-3 py-2 "
        href={"/"}
       
      >
        Home
      </Link>
      <button
        onClick={() => signOut()}
        className="py-2 px-6 rounded-lg hover:bg-amber-600 bg-amber-400 text-black active:scale-90 h-10"
      >
        Logout
      </button>
    </div>
  );
}
