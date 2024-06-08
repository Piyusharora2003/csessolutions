"use client";

import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import SolutionProvider  from "@/data/SolutionProvider.ts";


export default function CodeHighlighter({PID}: {PID:string}) {
    const [code, setCode] = useState<string>("Welcome to the Code Highlighter!")


    useEffect(() => {
        async function fetchCode(){
            let codeString = await SolutionProvider(PID);
            setCode(codeString); 
        }

        fetchCode();
    },[]);

      return (
        <SyntaxHighlighter 
            language="cpp"
            style={atomDark}
            showLineNumbers = {true}
            wrapLines = {true}
        >
          {code}
        </SyntaxHighlighter>
      );
}