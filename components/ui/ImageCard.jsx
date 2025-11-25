"use client"
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="w-full min-h-screen  flex flex-col md:flex-row items-center justify-center px-6 md:px-16 gap-10 py-16 relative">
      {/* Left Image Grid */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid grid-cols-1 gap-6"
      >
        <div
          className="w-60 h-72 bg-cover bg-center rounded-3xl"
          style={{ backgroundImage: "url('/card1.jpeg')" }}
        ></div>

        <div
          className="w-60 h-72 bg-cover bg-center rounded-3xl"
          style={{ backgroundImage: "url('/card2.jpg')" }}
        ></div>
        {/* <div
          className="w-60 h-72 bg-cover bg-center rounded-3xl"
          style={{ backgroundImage: "url('/card3.jpg')" }}
        ></div> */}
      </motion.div>

      {/* Center Image */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="w-60 h-80 bg-cover bg-center rounded-3xl  "
        style={{ backgroundImage: "url('/img3.jpg')" }}
      ></motion.div>

      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        className="max-w-xl absolute top-[20%] md:static"
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Welcome to the <br />
          greatest <span className="text-pink-500">designers</span> <br />
          <span className="text-pink-500">conference 2024</span>
        </h1>

        <p className="mt-4 text-gray-700 text-lg">
          Embark on a transformative journey at the{" "}
          <strong>Design Summit</strong>, an immersive convergence of creativity
          and innovation. Join industry pioneers, thought leaders, and
          visionaries as we explore the forefront of design.
        </p>
      </motion.div>
    </section>
  );
}
