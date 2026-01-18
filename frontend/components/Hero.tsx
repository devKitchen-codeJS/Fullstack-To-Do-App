"use client";
import React from "react";

import Image from "next/image";
import heroimage from "@/public/images/hero/hero-home.png";
import heroimage2 from "@/public/images/hero/hero-image-2.png";
import heroimage3 from "@/public/images/hero/hero-image-3.png";
import GetStartedButton from "./buttons/GetStartedButton";
import bgGradient from "@/public/images/hero/gradient.png";
import { motion, scale } from "motion/react";

const Hero = () => {
  return (
    <div className='relative w-full h-screen flex flex-col items-center overflow-hidden bg-black'>
      <Image
        src={bgGradient}
        alt='Background Gradient'
        fill
        priority
        className='object-cover opacity-60 h-screen'
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className='relative z-10 flex flex-col items-center '>
        <h1 className=' text-5xl font-bold text-white mb-4 mt-20'>
          Stay focused. Get things done.
        </h1>
        <p className='text-lg text-gray-300 max-w-2xl text-center'>
          Organize your tasks, boost your productivity, and achieve your goals
          with our intuitive ToDo app.
        </p>
        <div className='mt-20 flex justify-between items-center gap-10'>
          <Image
            src={heroimage}
            alt='Hero Image'
            width={300}
            height={150}
            className=' rounded-4xl '
          />
          <Image
            src={heroimage2}
            alt='Hero Image'
            width={300}
            height={150}
            className=' rounded-4xl'
          />
          <Image
            src={heroimage3}
            alt='Hero Image'
            width={300}
            height={150}
            className=' rounded-4xl'
          />
        </div>

        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          className=' mt-20 w-full flex flex-col items-center '>
          <GetStartedButton />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
