"use client";
import Navbar from "@/components/Navbar";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function Page({ params }: { params: { PID: string } }) {
    return (
      <div className="min-h-screen">
          <Navbar/>
          <CodeHighlighter PID = {params.PID} source="user"/>
      </div>
    );
  }