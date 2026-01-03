// import React from 'react'
import Link from "next/link";
import Image from "next/image";
export default function Footer2() {
  return (
    <footer className="text-gray-600 dark:text-zinc-500 body-font">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link
            href={"/"}
            className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
          >
          <Image src={"/favicon.ico"} width={24} height={24} alt=" cg wild explore logo" className="rounded-full" />
            <span className="ml-3 text-gray-600 dark:text-zinc-300 text-xl">
              CG Wild Expoler
            </span>
          </Link>
          <p className="mt-2 text-sm text-gray-500">
            Welcome to <strong> CG Wild Explore </strong> explore chhattisgarh tourist places
          </p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-600 dark:text-zinc-500 tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link
                  href={"/about"}
                  className="text-gray-600 hover:text-gray-800"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href={"/privacy-policy"}
                  className="text-gray-600 hover:text-gray-800"
                >
                  {" "}
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href={"/terms&conditions"}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Terms & Conditions
                </Link>
              </li>
              {/* <li>
                <Link href={"#"} className="text-gray-600 hover:text-gray-800">
                  Fourth Link
                </Link>
              </li> */}
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 dark:bg-neutral-700 text-gray-600 dark:text-zinc-400">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            ©2026 CG Wild Explore
            <Link
              href="https://cgwildexplore.vercel.app"
              className="text-gray-600 ml-1"
            >
              CG Wild Expoler
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
