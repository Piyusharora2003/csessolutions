"use client";
import React from 'react'
import Link from 'next/link';
import { NavLinkProps } from '@/interfaces/NavLinkProps';
import NavLinks from "../data/Navlinks.js";

function Navbar() {
  return (
    <div className="w-full container mx-auto p-6 border-solid border-b-2 border-zinc-700">
    <div className="w-full flex items-center justify-between">
      <Link 
        className="flex items-center text-black dark:text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"  
        href="/"
        id="brand"
      > 
        CSES Solutions
      </Link>
      <div className="flex w-1/2 justify-end content-center">		
        {
          NavLinks.map( (_navlink: NavLinkProps, _index: number) => (
              <Link href={_navlink.href} key={_index} className="text-3xl px-2 text-zinc-800 dark:text-sky-500">
                {_navlink.component}
              </Link>
          ))
        }
      </div>
    </div>
  </div>  )
}

export default Navbar;