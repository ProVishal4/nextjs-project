"use client"
import { useSession, signIn, signOut } from 'next-auth/react'
import React from 'react'

export default function Deshboard() {
  const { data: session} = useSession()
  console.log(session)
  if (session) {
    return (
      <>
        Signed In as {session.user.email} 
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-zinc-400/30 rounded-2xl h-[90vh] md:h-[60vh] w-[90vw] mx-auto md:w-[50vw] flex items-end justify-center">
          <div className="border flex justify-evenly w-full h-20 items-center">
               <img src={session.user.image} className='w-10 h-10 rounded-full' />
            <p>{session.user.name}</p>
            <p>{session.user.email}</p>
         
          </div>
          <button
            className="py-3 px-6 rounded-lg bg-red-400 text-black active:scale-90 hover:bg-red-600"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      Not signed In <br />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-zinc-400/30 rounded-2xl h-[90vh] md:h-[60vh] w-[90vw] mx-auto md:w-[50vw] flex items-end justify-center">
      <div className='border '>
          <button
          className="py-3 px-6 rounded-lg bg-amber-400 text-black active:scale-90 hover:bg-amber-600"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      </div>
      
      </div>
    </>
  );
}
