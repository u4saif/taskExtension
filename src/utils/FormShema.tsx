import { z } from "zod";

export const FSchema = z.object({
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