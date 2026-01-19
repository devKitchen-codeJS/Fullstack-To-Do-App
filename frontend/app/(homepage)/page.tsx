import Hero from "@/components/pages/Hero";
import Container from "@/components/layout/Container";
import React from "react";

const Page = () => {
  return (
    <div className=' flex flex-col '>
      <Hero />
      {/* <Container className="mt-20">
        <h1 className='text-4xl font-bold mb-4'>Welcome to the ToDo App</h1>
        <p className='text-lg'>
          This is a simple ToDo application built with Next.js and React. You
          can add, edit, and delete your tasks easily.
        </p>
      </Container> */}
    </div>
  );
};

export default Page;
