"use client";
import React from "react";

import Image from "next/image";
import heroimage from "@/public/images/hero/hero-home.png";
import heroimage2 from "@/public/images/hero/hero-image-2.png";
import heroimage3 from "@/public/images/hero/hero-image-3.png";
import bgGradient from "@/public/images/hero/gradient.png";
import { motion, scale } from "motion/react";
import ButtonAction from "../buttons/ButtonAction";

const Hero = () => {
  const imgArray = [heroimage, heroimage2, heroimage3];
  return (
    <div className='relative w-full  flex flex-col items-center overflow-hidden  bg-primary h-full'>
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
        className='relative z-10   flex flex-col items-center h-[calc(100vh-76px)]'>
        <h1 className=' text-5xl font-bold text-muted mb-4 mt-10'>
          Stay focused. Get things done.
        </h1>
        <p className='text-lg text-gray-300 max-w-2xl text-center'>
          Organize your tasks, boost your productivity, and achieve your goals
          with our intuitive ToDo app.
        </p>

        <div className='relative h-[60%]  hidden md:flex justify-center items-start gap-5 lg:gap-10 mt-10 w-full'>
          {imgArray.map((imgSrc, index) => (
            <div key={index} className='  shrink-0 h-full'>
              <Image
                src={imgSrc}
                alt={`Hero ${index + 1}`}
                width={300}
                height={100}
                className='rounded-3xl w-full  h-full'
              />
            </div>
          ))}
        </div>

        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          className='  w-full flex flex-col items-center mt-10 mb-10 '>
          <ButtonAction>
            <p>Get Started</p>
          </ButtonAction>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
