"use client";

import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import UserSolutionProvider  from "@/data/SolutionProvider.ts";
import getSolution from './getSolutions';
import { IoCopy } from "react-icons/io5";


export default function CodeHighlighter( { PID , source  }: { PID:string , source : "user" | "online" }) {
    
    const [code, setCode] = useState<string>("Welcome to the Code Highlighter!")

    useEffect(() => {
        async function fetchCode(){
            let codeString = "";
            if( source === "user" ) {
              codeString = await UserSolutionProvider(PID);  
            } else {
              codeString =  await getSolution(PID);
            }
            setCode(codeString); 
        }


        fetchCode();
    },[]);

      return (
        <div className='relative'>
          <div 
            className = {` absolute right-4 top-2 cursor-pointer text-gray-300 text-xl `}
            onClick={() => navigator.clipboard.writeText(code)}
          >
            <IoCopy/> 
          </div>
          <SyntaxHighlighter 
            language="cpp"
            style={atomDark}
            showLineNumbers = {true}
            wrapLines = {true}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      );
}