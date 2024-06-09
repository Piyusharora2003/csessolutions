"use server";
import CodeHighlighter from "@/components/CodeHighlighter";
import Navbar from "@/components/Navbar";


export default async function Page({ params }: { params: { PID: string } }) {  
    
    return (
      <div className="min-h-screen">
            <Navbar/>
            <CodeHighlighter PID = {params.PID} source="online" />
      </div>
    );
}