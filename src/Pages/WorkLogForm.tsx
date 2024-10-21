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

import { CircleCheckBig, CircleX } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { timeRange } from "../utils/constant";
import DateFormater from "../utils/DateFormater";
const WorkLogForm = (props: any) => {
  const { doneFn } = { ...props };


  const FormSchema = z.object({
    dow: z.date({
      required_error: "Date is Required",
    }),
    time: z.string({
      required_error: "Time is required",
    }),
    timeSpent: z.string({
      required_error: "Spent time is required",
    }),
    jobTitle: z.string({
      required_error: "Job title is required",
    }),
    discription: z.string(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dow: new Date(),
      time: "10:00 AM",
      discription: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    let dateKey = DateFormater(data.dow);
    console.log(dateKey);
    let taskObj: { task: { [dateKey: string]: any }[][] } = { task: [] };

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
    taskObj.task[monthIndex].push({ [dateKey]: { ...data, dateKey } });
    const taskObjString = JSON.stringify(taskObj);
    localStorage.setItem("taskData", taskObjString);

    // Extract all tasks into a single array
    // let allTasks: any = [];
    // taskObj.task.forEach((month) => {
    //   month.forEach((task) => {
    //     // Push each task object into the array
    //     Object.keys(task).forEach((dateKey) => {
    //       allTasks.push(task[dateKey]);
    //     });
    //   });
    // });

    // console.log(allTasks);
    doneFn();
  }

  return (
    <Card className="w-[350px] p-1">
      <div className="flex flex-row-reverse">
        <a className="rounded-full cursor-pointer p-1" onClick={doneFn}>
          <CircleX />
        </a>
      </div>
      <h2 className="text-lg text-center mb-3">Log your Time ⏱️</h2>
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
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
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

          <FormField
            control={form.control}
            name="timeSpent"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Input
                  type="number"
                  min="0"
                  placeholder="Hours Spent i.e 8"
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />

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
