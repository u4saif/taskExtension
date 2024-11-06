import xlsx from "json-as-xlsx";
import { Download } from "lucide-react";
import { GetAllTasks } from "./GetAllTask";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Report() {
  let allTask = GetAllTasks() || [];
  const downloadReport = () => {
    let data = [
      {
        sheet: "Over All",
        columns: [
          {
            label: "Date",
            value: (row: any) => new Date(row.dow),
            format: "d-mmm-yyyy",
          }, // Top level data
          { label: "Time", value: "time" },
          { label: "Title", value: "jobTitle" },
          {
            label: "Time Spent",
            value: (row: any) =>
              row.timeSpent < 2
                ? row.timeSpent + " hour"
                : row.timeSpent + " hours",
          }, // Custom format
          { label: "Discription", value: "discription" },
        ],
        content: allTask,
      },
    ];

    let settings = {
      fileName: "WorkReport", // Name of the resulting spreadsheet
      extraLength: 2, // A bigger number means that columns will be wider
      writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
      writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
      RTL: false, // Display the columns from right-to-left (the default value is false)
    };

    xlsx(data, settings); // Will download the excel file
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
        <Button  size="icon" className="w-5 h-4">
       <Download
          className="h-3  cursor-pointer"
          onClick={() => {
            downloadReport();
          }}
        />
    </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Download Report</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
