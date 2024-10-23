import { useState } from "react";

import WorkLogForm from "./WorkLogForm";
import TaskList from "./TaskList";
export default function Home() {
  const [isformVisible, setFormVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const toggleForm = (date:any) => {
    console.log("$$$$ Date", date);
    setSelectedDate(date);
    setFormVisible((isformVisible) => !isformVisible);
  };

  return (
    <>
      {!isformVisible ? (
        <div className="w-[350px] p-1 grid">
          <TaskList doneFn={toggleForm} selectedDt={selectedDate}/>
        </div>
      ) : (
        <div className="flex justify-center text-center">
          <WorkLogForm doneFn={toggleForm} selectedDt={selectedDate}/>
        </div>
      )}
    </>
  );
}
