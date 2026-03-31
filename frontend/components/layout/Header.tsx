"use client";

import React from "react";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";

import logomark from "@/public/icons/to-do-white.png";
import { useRouter } from "next/navigation";
import ButtonAction from "../buttons/ButtonAction";
import { useAuth } from "@/hooks/useAuth";
import { useWindow } from "@/hooks/useWindow";

const Header = () => {
  const { user, isAuthenticated, loading, logout } = useAuth();
  // const { toggleEdditMode } = useWindow();
  const router = useRouter();
  const redirectToSignIn = () => {
    router.push("/signin");
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // const handleClick = () => {
  //   console.log("Button clicked!");
  //   toggleEdditMode();
  // };
  // <button
  //               onClick={() => {
  //                 handleClick();
  //                 toggleEdditMode();
  //               }}
  //               className=' right-4 bg-secondary text-white px-3 py-2 rounded-md shadow'>
  //               Eddit Dashbord
  //             </button>

  if (loading) return null;

  return (
    <header className=' bg-background text-muted sticky top-0 z-50 '>
      <div className='flex h-header items-center justify-between  px-4'>
        <div className='flex items-center gap-2 cursor-pointer'>
          <Link href='/' className=' flex gap-2'>
            <Image src={logomark} alt='Logo' className='h-8 w-auto' />
            <span className=' text-2xl'>Task Holder</span>
          </Link>
        </div>
        <div className='flex  justify-center px-8'>
          <input
            className=' hidden md:flex form-input w-full max-w-full xl:max-w-[800px] '
            placeholder='Search...'
          />
          {/* {!isAuthenticated && (
            <input
              className=' hidden md:flex form-input w-full max-w-full xl:max-w-[800px] '
              placeholder='Search...'
            />
          )} 
          {isAuthenticated && (
            <Link href='/dashboard' className='text-lg font-medium'>
              Dashboard
            </Link>
          )}*/}
        </div>

        <div className=''>
          {isAuthenticated ? (
            <div className=' flex justify-between gap-5 items-center'>
              <div className=' cursor-pointer' onClick={handleLogout}>
                {user?.email}
              </div>
            </div>
          ) : (
            <div>
              <button className='submit-button' onClick={redirectToSignIn}>
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
      <div className='menu-icon md:hidden'>
        {/* Add an icon for mobile menu toggle */}
      </div>
    </header>
  );
};

export default Header;
