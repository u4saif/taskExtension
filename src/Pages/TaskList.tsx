import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  CirclePlus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns";
import DateFormater from "@/utils/DateFormater";
import noTasksImage from '../assets/noTasks.png';
import Report from "../utils/Report"

export default function TaskList(props: any) {
  const { doneFn, selectedDt } = { ...props };
  const [allTasks, setAllTasks] = useState([]);
  const [curentDateTasks, setCurentDateTasks] = useState([]);
  const [date, setDate] = useState<any>(selectedDt || new Date());

  const initData = () => {
      let allTask: any = getAllTask();
      setAllTasks(allTask);
      setCurentDateTasks(allTask);
      performDateFilter(date, allTask);
  };

  const getAllTask = ()=>{
    let initialTasks = localStorage.getItem("taskData") || "";
    let allTask: any = [];
    let taskObj = JSON.parse(initialTasks);
      // Extract all tasks into a single array
      taskObj.task.forEach((month: any) => {
        month.forEach((task: any) => {
          // Push each task object into the array
          Object.keys(task).forEach((dateKey) => {
            allTask.push(task[dateKey]);
          });
        });
      });
      return allTask;
  };
  
  const performDateFilter = (selectedDate: any, tasks = allTasks) => {
    if(!selectedDate){
      return;
    }
    setDate(selectedDate);
    let formattedDate = DateFormater(selectedDate);
    let filteredTasks = tasks.filter(
      (task: any) => task.dateKey === formattedDate
    ); // Filter tasks by dateKey
    setCurentDateTasks(filteredTasks);
    console.log(filteredTasks);
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
      let allTask: any = getAllTask();
      setAllTasks(allTask);
      setCurentDateTasks((prevTasks) =>
        prevTasks.filter((t: any) => t.dow !== task.dow)
      );
    }
  };

  const changeDate = (action:string)=>{
    var d = date;
    if(action == 'dec') d.setDate(d.getDate() - 1);
    if(action == 'inc') d.setDate(d.getDate() + 1);
    performDateFilter(d);
  }

  const navigate = ()=>{
    doneFn(date);
  }
  return (
    <>
      <Card>
        <CardHeader className="mb-0 pb-1">
          <CardTitle className="inline-flex align-middle text-base">
            <BriefcaseBusiness className="mr-2" /> Tasks Completed
          </CardTitle>
          <CardDescription className="flex">
            <span className="flex">
              <span className="mr-1 cursor-pointer" onClick={()=>changeDate('dec')}><ChevronLeft/></span>
                {date ? format(date, "d, EEEE MMM, yy") : ""}
              <span className="ml-1 cursor-pointer" onClick={()=>changeDate('inc')}><ChevronRight /></span>
            </span>
            {allTasks && allTasks.length ? <Report/> : '' }
            <Popover>
              <PopoverTrigger asChild>
                <CalendarIcon className="ml-auto h-6 w-6 opacity-90 cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent className="p-0 text-xs w-auto m-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => performDateFilter(selectedDate)}
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
            {curentDateTasks.length > 0
              ? curentDateTasks.map((task: any, index: any) => (
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
              : <img src={noTasksImage} alt="no task" width="300" height="auto"></img>}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={navigate}>
            <CirclePlus className="p-0 mr-1" /> Add Work log
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
