import React from "react";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";

import logomark from "@/public/icons/to-do-white.png";

const Header = () => {
  return (
    <header className=' bg-gray-800 text-white sticky top-0 z-50'>
      <Container className='flex h-[76px] items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href='/'>
            <Image src={logomark} alt='Logo' className='h-8 w-auto' />
          </Link>
        </div>
        <div className='flex flex-grow justify-center px-8'>
          <input className='form-input w-full max-w-full flex-grow xl:max-w-[800px]' placeholder="Search..."/>
        </div>
      </Container>
      <div className='menu-icon md:hidden'>
        {/* Add an icon for mobile menu toggle */}
      </div>
    </header>
  );
};

export default Header;
