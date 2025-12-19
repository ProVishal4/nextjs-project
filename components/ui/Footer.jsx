import Link from 'next/link';
import React from 'react'

export default function Footer() {
  return (
    <>
      <div className="border border-[#474747] w-full"></div>
      <footer
        className={`border-t  border-[#474747]   w-full bg-[#090a09]  mx-auto  text-white`}
      >
        <div className="bg-[#090a09]  m-auto w-[90%] ">
          <div className="md:flex  justify-around my-[3rem] ">
            <div
              className=" text-2xl gap-2 font-semibold flex md:flex-col 
  md:mb-0 mb-[1rem] items-center h-full w-[80%] md:w-[40%] "
            >
              <Link href="/">
                <img
                  className="h-[2.2rem]  w-[2.2rem] md:h-[4rem] md:w-[4rem]"
                  src="/icons/Menu.png"
                  alt="pc part informer.com"
                />
              </Link>
              <Link href="/">
                <h4 className="text-[15px] md:text-[20px] text-[#cecece]">
                 CG x expoler
                </h4>
              </Link>
            </div>
            <div className="footerdes  w-[70%] md:text-center md:w-[30%] md:text-[1.3em] ">
              <Link href="/about">
                <p>About us</p>
              </Link>
              <Link href="/policy">
                <p>Privacy Policy</p>
              </Link>
              <Link href="/terms">
                <p>Terms & Conditions</p>
              </Link>
              <Link href="/disclaimer">
                <p>Disclaimer</p>
              </Link>
            </div>
          </div>
          <div
            className="footercopy w-[90%] h-[3rem] border-1 border-zinc-400 flex items-center
   rounded-[5px] justify-center m-auto text-[#bdbcbc] font-medium"
          >
            <h4 className="text-[0.7em] md:text-[1.2em]">
              Copyright © Recived by cg x expoler
            </h4>
          </div>
        </div>
      </footer>
    </>
  );
}
