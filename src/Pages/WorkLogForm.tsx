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
  FormLabel,
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CircleCheckBig, CircleX } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const WorkLogForm = (props: any) => {
  const { doneFn } = { ...props };

  
  function DateFormater(value:Date){
    var mm = value.getMonth() + 1; // getMonth() is zero-based
    var dd = value.getDate();
  
    return [value.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('-');
  };
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
      dow: new Date,
      discription:""

    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    let dateKey = DateFormater(data.dow);
    console.log(dateKey);
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
                  <Select name="time" onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-[100%]">
                        <SelectValue placeholder="Select a Time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="12:00AM">12:00AM</SelectItem>
                        <SelectItem value="10:00AM">10:00AM</SelectItem>
                        <SelectItem value="01:30PM">01:30PM</SelectItem>
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
