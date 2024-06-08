"use client";
import Navbar from "@/components/Navbar";
import GetAvailableSolutions from "@/data/AvailableSolutions";
import QSet from "@/data/Problems.json";
import Link from "next/link";
import { useEffect , useRef, useState } from "react";

type Problem = {
  title: string;
  link: string;
  id: number
};

type ListByTopicProps = {
  heading: string;
  List: Problem[];
  SQIDs: number[];
  setSQIDs: (SQIDs: number[]) => void;
  availableSolutionsSet: number[];  
};

type ListItemsProps = {
  problem: Problem;
  SQIDs: number[];
  setSQIDs: (SQIDs: number[]) => void;
  hasSolution: boolean;
};


interface Problems {
  [key: string]: Problem[];
}

function TextWithTooltip({text , id}: {text: string, id: number}) {

  function toggleCaption ( event : "mouseenter" | "mouseleave" ) {
    const caption = document.getElementById(`caption`);
    if(caption === null) return;
    if(event === "mouseenter"){
      caption.style.display = "inline-block"
    }else{ 
      caption.style.display = "none"
    }
  }

  return (
    <div>
      
      <span 
        className="font-sans border-r-2 border-black	dark:border-white pr-3  italics text-xs cursor-pointer hidden mr-3 text-black dark:text-slate-300 font-semibold "
        id="caption"
      >
        {text}
      </span>

      <Link
        href={`problems/${id}`}
        className="text-green-700 font-bold"
        onMouseEnter={()=> toggleCaption("mouseenter")}
        onMouseLeave={()=>toggleCaption("mouseleave")}
      >
        [Solution]
      </Link> 

    </div>
  );

}

function ListItem({problem, SQIDs , setSQIDs , hasSolution}: ListItemsProps) {
  const {title, link, id} = problem;
  const [color , setcolor] = useState<string>("red");

  useEffect(() => {
    if(SQIDs.includes(id)) {
      setcolor("green");
    }     
  },[SQIDs]
  )

  // useEffect(() => {
  //   // write code to fetch available solutions from the server and set the state
  //   GetAvailableSolutions().then((data) => {
  //     console.log(data);
  //   }).catch((err) => {
  //     console.log(err);
  //   });
  // },[])

  function toggle() {
    // Not in the list
    if(color === "red") {
      // console.log("Adding to list");
      const newList = [...SQIDs, id];
      setSQIDs(newList);
      localStorage.setItem("solvedQuestions", newList.toString());
      setcolor("green");
    }else{
      // console.log("Removing from list");
      const newList = SQIDs.filter((SQID) => SQID !== id);
      setSQIDs(newList);
      localStorage.setItem("solvedQuestions",newList.toString());
      setcolor("red");
    }
    
  }

  return (
    <li 
      className="flex justify-between	 w-full"
      key={id}  
    >
      <div className="flex flex-row items-center ">
        <svg
          className={`w-3.5 h-3.5 me-2 flex-shrink-0`}
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          onClick={toggle}
          style={{
            color: color === "red" ? "red" : "green",
          }}
          >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <Link href= {link}>
          {title} 
        </Link>
      </div>
      {
        hasSolution ? 
        <TextWithTooltip text = {problem.title}  id={id} />
          :  
          <span className="font-sans italics text-xs cursor-pointer	text-slate-400"> will be updated soon </span>
      }
    </li>
    )
  }


function ListByTopic({ heading, List , SQIDs , setSQIDs , availableSolutionsSet}: ListByTopicProps) {
  return (
    <div key={heading} className="pb-5 mt-3 mx-auto">
      <h2 className="mb-5 text-3xl font-bold text-gray-900  dark:text-white">{heading}</h2>
      <ul className=" space-y-1 ms-12 text-gray-500 list-inside dark:text-gray-400">
        {
          List.map((problem : Problem , index: number) => {
            let hasSolution = false;
            if(availableSolutionsSet.includes(problem.id)){
              hasSolution = true;
            }
            return (
              <ListItem problem = {problem} key={index} SQIDs ={SQIDs} setSQIDs = {setSQIDs} hasSolution = {hasSolution}/>
            )
          })
        }
      </ul>
    </div>
  );
}

export default function ProblemsPage() {
  const [SQIDs, setSQIDs] = useState<number[]>([]);
  const [availableSolutionsSet, SetAvailSS] = useState<number[]>([]);


  useEffect(() => { 
    const solvedQuestions = localStorage.getItem("solvedQuestions");

    if (solvedQuestions) {
      const solvedQuestionsArray = (solvedQuestions).split(",").map(Number);
      setSQIDs(solvedQuestionsArray);
    }
    
    async function availableSolutions(){
      GetAvailableSolutions().then((data: string[]) => {
        // data is an array of strings in format "[PID].cpp"
        const availableSolutionSet = new Set<number>();

        data.forEach((element) => {
          availableSolutionSet.add(parseInt(element.split(".")[0]));
        });
        SetAvailSS(Array.from(availableSolutionSet));

      }).catch((err) => {
        console.error(err);
      });
    } 
    availableSolutions();
  }, []);

  const QuestionSet = JSON.parse(JSON.stringify(QSet)) as Problems;

  return (
    <div className="bg-slate-100 dark:bg-zinc-900 min-h-screen">
      <Navbar/>
      <div className="w-4/5 mx-auto">
        {
          Object.keys(QuestionSet).map(( key, index) => {  

            const list: Problem[] = QuestionSet[key]; 
            return (
              <ListByTopic 
                heading={key}
                List={list}
                key={index}
                SQIDs = {SQIDs}
                setSQIDs = {setSQIDs}
                availableSolutionsSet = {availableSolutionsSet}
              />
            )
          })
        }
      </div>
    </div>
  )
}
