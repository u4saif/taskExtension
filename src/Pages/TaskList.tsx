import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { BriefcaseBusiness, CalendarIcon, CirclePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns";

export default function TaskList(props: any) {
  const { doneFn } = { ...props };
  const [allTasks, setAllTasks] = useState([]);
  const [date, setDate] = useState<any>(new Date());
  let initialTasks = localStorage.getItem("taskData");

  const initData = () => {
    if (initialTasks) {
      let taskObj = JSON.parse(initialTasks);
      let allTask: any = [];
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
    }
  };

  useEffect(() => {
    initData();
  }, []);

  const deleteItem = (task: any) => {
    let taskObj: { task: { [dateKey: string]: any }[][] } = { task: [] };
    let initialTasks = localStorage.getItem("taskData");
    if (initialTasks) {
      taskObj = JSON.parse(initialTasks);
      const monthIndex = new Date(task.dow).getMonth();

      taskObj.task[monthIndex] = taskObj.task[monthIndex].filter(
        (item) => item.dateKey.dow !== task.dow
      );
      const taskObjString = JSON.stringify(taskObj);
      localStorage.setItem("taskData", taskObjString);

      setAllTasks((prevTasks) =>
        prevTasks.filter((t: any) => t.dow !== task.dow)
      );
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="mb-0 pb-1">
          <CardTitle className="inline-flex">
            <BriefcaseBusiness className="mr-2" /> Tasks Completed
          </CardTitle>
          <CardDescription className="flex">
            {format(date, "d, EEEE MMM, yy")}
            <Popover>
              <PopoverTrigger asChild>
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </PopoverTrigger>
              <PopoverContent className="p-0 text-xs w-auto m-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full p-1  h-[300px] overflow-y-auto">
          <div className="w-full">
            {allTasks.length > 0
              ? allTasks.map((task: any, index: any) => (
                  <div
                    key={index}
                    className="border rounded-md grid grid-cols-[25px_1fr] items-center pl-3 m-1"
                  >
                    <div className="flex text-lg font-bold">
                      {task.timeSpent || 0}
                    </div>
                    <div className="space-y-0 pl-2">
                      <p className="text-sm font-medium leading-none mb-1 mt-1 flex justify-between">
                        {task.jobTitle}
                        <span className="flex text-xs text-muted-foreground align-middle">
                          {new Date(task.dow).toLocaleDateString("en-US")}
                          <span
                            className="inline-block"
                            onClick={() => deleteItem(task)}
                          >
                            <Trash2
                              color="#fd3030"
                              className="mr-1 h-3 cursor-pointer"
                            />
                          </span>
                        </span>
                      </p>
                      <p className="text-sm text-muted-foreground pb-2">
                        {task.discription}
                      </p>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={doneFn}>
            <CirclePlus className="p-0 mr-1" /> Add Work log
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
