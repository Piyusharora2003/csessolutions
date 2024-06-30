import Navbar from "@/components/Navbar";
import Link from 'next/link'
import { metaData } from "./metaData.ts";

export const metadata = metaData ;

export default function Home() {

  return (
    <div className="bg-slate-100 dark:bg-zinc-900 min-h-screen">
      {/*  Navbar  */}
      <Navbar/>

      <div className="container pt-24  px-8  mx-auto flex flex-wrap flex-col md:flex-row items-center">
		  <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
			  <h1 className="  text-3xl mb-10 md:text-5xl text-purple-800 font-bold leading-tight text-center md:text-left slide-in-bottom-h1">
          Lets Learn from CSES together!
        </h1>
			  <p className=" text-gray-500 md:text-xl mb-8 text-center md:text-left slide-in-bottom-subtitle">
          This is a ongoing collection of solutions to the CSES problem set. <br/> 
          Feel free to contribute to the repository.
        </p>
			  <div className="flex w-full justify-center md:justify-start pb-24 lg:pb-0 fade-in">
				  <Link href="/problems" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md py-4 px-8 shadow-lg uppercase tracking-wider">
            Get Started!  
          </Link>
        </div>

		</div>
		
		<div className="w-full xl:w-3/5 py-6 overflow-y-hidden">
			<img 
        alt=""
        className="w-auto mx-auto h-[300px] rounded slide-in-bottom"
        src="/tes.jpg"
      />
		</div>
		
		
	    </div>

      {/* Copyright */}
		  <div className="max-w-full pt-16 pb-6 text-sm text-center md:text-left fade-in absolute bottom-0 left-8">
			<p 
        className="text-gray-500 no-underline hover:no-underline"
      >
        &copy; CSES contains all rights to the question sheet. This is for education purpose only .
        Click 
          <Link href={"https://cses.fi/problemset/"} className="text-indigo-600"> here </Link> to head to official CSES sheet Page.
      </p>
		  </div>
    </div>

  );
}
