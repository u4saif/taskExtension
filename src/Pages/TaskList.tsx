import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { BriefcaseBusiness, CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TaskList(props:any) {
  const { doneFn } = { ...props };
  const [allTasks,setAllTasks] = useState([]);

  useEffect(() => {
    let initialTasks = localStorage.getItem("taskData");
    if (initialTasks) {
      let taskObj = JSON.parse(initialTasks);
      let allTask:any = [];
      // Extract all tasks into a single array
      taskObj.task.forEach((month: any) => {
        month.forEach((task: any) => {
          // Push each task object into the array
          Object.keys(task).forEach((dateKey) => {
            allTask.push(task[dateKey]);
          });
        });
      });
      setAllTasks(allTask);
      console.log(allTasks);
    }
  }, []);


  return <>
   <Card>
      <CardHeader className="mb-0 pb-1">
        <CardTitle className="inline-flex"><BriefcaseBusiness className="mr-2"/> Tasks Completed</CardTitle>
        <CardDescription>Your Recent tasks.</CardDescription>
      </CardHeader>
      <CardContent className="w-full p-1">
        <div className="w-full ">
          {(allTasks.length>0) ? allTasks.map((task:any, index:any) => (
            <div
              key={index}
              className="border rounded-md grid grid-cols-[30px_1fr] items-center pl-3 m-1"
            >
              <span className="flex text-lg font-bold">{task.timeSpent || 0}</span>
              <div className="space-y-0">
                <p className="text-sm font-medium leading-none mb-1 mt-1 flex justify-between">
                  {task.jobTitle}
                  <span  className="inline-block text-xs text-muted-foreground mr-2" >
                  {new Date(task.dow).toDateString().split(" ").slice(0,3).join(' ')} 
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {task.discription}
                </p>
              </div>
            </div>
          )):''}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={doneFn}>
        <CirclePlus className="p-0 mr-1" /> Add Work log
        </Button>
      </CardFooter>
    </Card>
  </>;
}
