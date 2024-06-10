"use client";
import Navbar from "@/components/Navbar";
import GetAvailSolSet from "@/components/getAvailableSolSet.ts";
import GetAvailableSolutions from "@/data/AvailableSolutions.ts";
import QSet from "@/data/Problems.json";
import Link from "next/link";
import { useEffect , useState } from "react";

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
  availableUserSolutionsSet: number[]; 
  availableSolutionSet: number[]; 
};

type ListItemsProps = {
  problem: Problem;
  SQIDs: number[];
  setSQIDs: (SQIDs: number[]) => void;
  hasUserSolution: boolean;
  hasUploadedSolution: boolean;
};

interface Problems {
  [key: string]: Problem[];
}

function TextWithTooltip({text , id , hasUploadedSolution , hasUserSolution }: { text: string, id: number , hasUploadedSolution: boolean , hasUserSolution: boolean}) {
  const [hovering, setHovering] = useState(false);

  return (
    <div 
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="cursor-pointer"
    >
      
      <span 
        className = {` font-sans  italics text-xs cursor-pointer ${hovering ? " ": "hidden" }  text-black dark:text-slate-300 font-semibold `}
        
      >
        {text}
      </span>
      { 
        process.env.NODE_ENV === "development"  
        &&
        hasUserSolution
        &&
        <Link
          href={`problems/userSolutions/${id}`}
          className="text-green-700 no-underline hover:underline underline-offset-4 pl-2 ml-2 font-bold"
        >
          [User Solution]
        </Link> 
      }
      {
        hasUploadedSolution
        &&
        <Link
          href={`problems/solutions/${id}`}
          className="text-blue-700 no-underline underline-offset-4 hover:underline pl-2 ml-2 font-bold"

        >
          [Uploaded Solution]
        </Link>
      }
    </div>
  );

}


function ListItem({problem, SQIDs , setSQIDs , hasUserSolution , hasUploadedSolution }: ListItemsProps) {
  const { title, link , id } = problem ;
  const [ color , setcolor ] = useState<string>("red");

  useEffect( () => {
    if ( SQIDs.includes(id) ) {
      setcolor("green");
    }     
  },[SQIDs]
  )

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
        ( hasUserSolution || hasUploadedSolution ) ? 
        <TextWithTooltip
          text = {problem.title}
          id={id} 
          hasUserSolution = {hasUserSolution} 
          hasUploadedSolution = {hasUploadedSolution}
        />
          :  
          <span className="font-sans italics text-xs cursor-pointer	text-slate-400"> No solutions yet  </span>
      }
    </li>
    )
  }


function ListByTopic({ heading, List , SQIDs , setSQIDs , availableUserSolutionsSet , availableSolutionSet }: ListByTopicProps) {
  return (
    <div key={heading} className="pb-5 mt-3 mx-auto">
      
      <h2 className="mb-5 text-3xl font-bold text-gray-900  dark:text-white">
        {heading}
      </h2>
      
      <ul className=" space-y-1 ms-12 text-gray-500 list-inside dark:text-gray-400">
      
        {
      
          List.map((problem : Problem , index: number) => {
            
            let hasUserSolution = false;
            let hasUploadedSolution = false;

            if ( availableUserSolutionsSet.includes(problem.id) ) { 
              hasUserSolution = true;
            }

            if ( availableSolutionSet.includes(problem.id) ) {
              hasUploadedSolution = true;
            }

            return (
              <ListItem 
                problem = {problem}
                key = {index}
                SQIDs = {SQIDs}
                setSQIDs = {setSQIDs}
                hasUserSolution = {hasUserSolution}
                hasUploadedSolution = {hasUploadedSolution}
              />
            )
          })
        }
      </ul>
    </div>
  );
}

export default function ProblemsPage() {
  const [SQIDs, setSQIDs] = useState<number[]>([]);
  const [availableUserSolutionsSet, SetAvailUSS] = useState<number[]>([]);
  const [availableSolutionSet, SetAvailSS] = useState<number[]>([]);  // Available Solutions Set in the database
  const runningMode = process.env.NODE_ENV;
  
  useEffect(() => { 
    const solvedQuestions = localStorage.getItem("solvedQuestions");

    if (solvedQuestions) {
      const solvedQuestionsArray = (solvedQuestions).split(",").map(Number);
      setSQIDs(solvedQuestionsArray);
    }
    

    async function availableUserSolutions(){
      GetAvailableSolutions().then((data: string[]) => {
        // data is an array of strings in format "[PID].cpp"
        const availableSolutionSet = new Set<number>();

        data.forEach((element) => {
          availableSolutionSet.add(parseInt(element.split(".")[0]));
        });
        SetAvailUSS(Array.from(availableSolutionSet));

      }).catch((err) => {
        console.error(err);
      });
    } 

    if ( runningMode === "development" ){
      availableUserSolutions();
    }

    // add code to get list to solved questions from the database
    async function availableSolutions() {
      const response: string = await GetAvailSolSet();       
      const data: number[] =  response.split(",").map(Number);
      SetAvailSS(data);
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
                availableUserSolutionsSet = {availableUserSolutionsSet}
                availableSolutionSet = {availableSolutionSet}
              />
            )
          })
        }
      </div>
    </div>
  )
}
