import { useState } from "react";

import WorkLogForm from "./WorkLogForm";
import TaskList from "./TaskList";
export default function Home() {
  const [isformVisible, setFormVisible] = useState(false);

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
