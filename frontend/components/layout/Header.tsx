"use client";

import React from "react";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";

import logomark from "@/public/icons/to-do-white.png";
import { useRouter } from "next/navigation";
import ButtonAction from "../buttons/ButtonAction";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();
  const redirectToSignIn = () => {
    router.push("/signin");
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (loading) return null;

  return (
    <header className=' bg-background text-muted sticky top-0 z-50'>
      <Container className='flex h-[76px] items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href='/'>
            <Image src={logomark} alt='Logo' className='h-8 w-auto' />
          </Link>
        </div>
        <div className='flex flex-grow justify-center px-8'>
          <input
            className=' hidden md:flex form-input w-full max-w-full flex-grow xl:max-w-[800px] '
            placeholder='Search...'
          />
        </div>
        <div>
          {isAuthenticated ? (
            <div className=" cursor-pointer" onClick={handleLogout}>{user?.email}</div>
          ) : (
            <div>
              <button className='submit-button' onClick={redirectToSignIn}>
                Sign In
              </button>
            </div>
          )}
        </div>
      </Container>
      <div className='menu-icon md:hidden'>
        {/* Add an icon for mobile menu toggle */}
      </div>
    </header>
  );
};

export default Header;
