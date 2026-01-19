"use client";
import Container from "@/components/layout/Container";
import Image from "next/image";
import React from "react";
import authHero from "@/public/images/hero/auth-hero-pic.jpg";
import SigninForm from "@/components/forms/auth/signin-form";
const SignInPage = () => {
  return (
    <div className='bg-background  text-white'>
      <Container className='min-h-screen  flex flex-col md:flex-row justify-center gap-15 '>
        <div className='relative w-full flex justify-center md:justify-end items-center '>
          <Image
            src={authHero}
            alt='Sign In Hero'
            width={1000}
            height={1000}
            className=' rounded-lg w-[500px]'
          />
        </div>

        <div className='w-full md:w-full  flex items-center justify-start'>
          <SigninForm />
        </div>
      </Container>
    </div>
  );
};

export default SignInPage;
