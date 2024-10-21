import { useEffect, useState } from "react";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
import WorkLogForm from "./WorkLogForm";
import TaskList from "./TaskList";
export default function Home() {
  const [isformVisible, setFormVisible] = useState(false);
  const [count, setCount] = useState(0);
  const initalCount = localStorage.getItem("count");
  useEffect(() => {
    if (initalCount) {
      setCount(+initalCount);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  }, [count]);

  const toggleForm = () => {
    setFormVisible((isformVisible) => !isformVisible);
  };

  return (
    <>
      {!isformVisible ? (
        <div className="w-[350px] p-1 grid">
          <TaskList doneFn={toggleForm}/>
        </div>
      ) : (
        <div className="flex justify-center text-center">
          <WorkLogForm doneFn={toggleForm} />
        </div>
      )}
    </>
  );
}
