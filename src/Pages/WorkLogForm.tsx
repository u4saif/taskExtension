"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CircleCheckBig, CircleX, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { timeRange } from "../utils/constant";
import DateFormater from "../utils/DateFormater";
import { useEffect, useState } from "react";
import { FSchema } from "../utils/FormShema";
import { GetAllTasks } from "../utils/GetAllTask";
const WorkLogForm = (props: any) => {
  const [totalLogged, setTotalLog] = useState(0);
  const { doneFn } = { ...props };

  const FormSchema = FSchema;

  useEffect(() => {
    let selectedDate = DateFormater(new Date());
    let allTask = GetAllTasks() || [];
    let filteredItems = allTask.filter(
      (item: any) => item.dateKey == selectedDate
    );
    let total = filteredItems.reduce((acc: any, itr: any) => {
      return Number(acc) + Number(itr.timeSpent);
    }, 0);
    setTotalLog(total);
  }, []);

  function updateTotalLogTime(selectedDt: Date) {
    let selectedDate = DateFormater(selectedDt);
    let filteredItems = GetAllTasks().filter(
      (item: any) => item.dateKey == selectedDate
    );
    let total = filteredItems.reduce((acc: any, itr: any) => {
      return Number(acc) + Number(itr.timeSpent);
    }, 0);
    setTotalLog(total);
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dow: new Date(),
      time: "10:00 AM",
      discription: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    let dateKey = DateFormater(data.dow);
    console.log(dateKey);
    let taskObj: { task: { dateKey: any }[][] } = { task: [] };

    let initialTasks = localStorage.getItem("taskData");

    if (initialTasks) {
      // Parse the task data from localStorage since localStorage stores strings
      taskObj = JSON.parse(initialTasks);
    } else {
      // Initialize taskObj with an array of 12 months, each containing an empty array
      taskObj = {
        task: Array.from({ length: 12 }, () => []),
      };
    }
    const monthIndex = data.dow.getMonth();
    taskObj.task[monthIndex].push({ dateKey: { ...data, dateKey } });
    const taskObjString = JSON.stringify(taskObj);
    localStorage.setItem("taskData", taskObjString);
    doneFn();
  }

  const dateChanges = (field: any) => {
    form.setValue("dow", field);
    console.log(field);
    updateTotalLogTime(field);
  };

  const filedChange = (filed: any) => {
    let previousValue = Number(form.getValues("timeSpent") || 0);
    let newValue = Number(filed.value);
    const validNewValue = isNaN(newValue) ? 0 : newValue;
    const newTotal = +totalLogged - previousValue + validNewValue;
    form.setValue("timeSpent", filed.value);
    setTotalLog(newTotal);
  };
  return (
    <Card className="w-[350px] h-[400px] p-1">
      <div className="flex justify-between align-text-top p-2">
        
      <h2 className="text-lg text-center">Log your Time ⏱️</h2>
        <div> 
        <a className="rounded-full cursor-pointer" onClick={doneFn}>
          <CircleX />
        </a>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid  space-y-1"
        >
          <div className="flex items-center">
            <FormField
              control={form.control}
              name="dow"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="flex items-center">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "min-w-[200px] pl-1 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select Date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0 text-xs w-auto m-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={dateChanges}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem className="flex flex-col w-[100%]">
                  <Select
                    name="time"
                    onValueChange={field.onChange}
                    defaultValue="10:00 AM"
                  >
                    <FormControl>
                      <SelectTrigger className="w-[100%]">
                        <SelectValue placeholder="10:00 AM" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {timeRange.map((item) => {
                          return (
                            <SelectItem value={item.value} key={item.key}>
                              {item.value}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                    <FormMessage />
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between">
            <FormField
              control={form.control}
              name="timeSpent"
              render={({}) => (
                <FormItem className="flex flex-col min-w-[200px] ">
                  <Input
                    type="number"
                    min="0"
                    placeholder="Hours Spent i.e 8"
                    onChange={(field) => filedChange(field.target)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex text-sm text-muted-foreground align-baseline pr-6 pt-2">
              {" "}
              Total: {totalLogged}
              <span className="mb-2 w-0.5 pl-6">
                {" "}
                <Lightbulb className="bg-yellow-300 p-0.5  rounded-full" />{" "}
              </span>{" "}
            </div>
          </div>

          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Input
                  type="text"
                  placeholder="Job Title"
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discription"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Textarea
                  placeholder="Type your message here."
                  onChange={field.onChange}
                  className="h-[150px]"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            <CircleCheckBig />
          </Button>
        </form>
        <FormDescription>save your work log.</FormDescription>
      </Form>
    </Card>
  );
};

export default WorkLogForm;
