"use client";
import Container from "@/components/layout/Container";
import Image from "next/image";
import React from "react";
import authHero from "@/public/images/hero/auth-hero-pic.jpg";
import SignUpForm from "@/components/forms/auth/signup-form";
import ButtonAction from "@/components/buttons/ButtonAction";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
const SignInPage = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className='bg-background  text-white relative'>
      <Container className='min-h-screen  flex flex-col md:flex-row justify-center gap-15 '>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className='relative w-full flex justify-center md:justify-end items-center '>
          <Image
            src={authHero}
            alt='Sign In Hero'
            width={1400}
            height={1400}
            className=' rounded-lg w-[500px]'
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className='w-full md:w-full  flex items-center justify-start'>
          <SignUpForm />
        </motion.div>
        <ButtonAction
          onClick={handleGoBack}
          className=' absolute top-10  left-5 z-50'>
          <span>Go Back</span>
        </ButtonAction>
      </Container>
    </div>
  );
};

export default SignInPage;
