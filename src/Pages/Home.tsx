import { useEffect, useState } from "react";
import {CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WorkLogForm from "./WorkLogForm";

export default function Home() {
  const [isformVisible, setFormVisible] = useState(false);
  const [count, setCount] = useState(0);
  const initalCount = localStorage.getItem("count");
  useEffect(() => {
    if (initalCount) {
      setCount(+initalCount);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  }, [count]);

  const  toggleForm = ()=> {
    setFormVisible((isformVisible) => !isformVisible)
  }

  return (
    <>
      {!isformVisible ? (
        <div className="flex justify-center text-center">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Manage your Work Done</CardTitle>
              <CardDescription>Log your time With one click.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center p-6">
              <Button
                className="h-20 w-20"
                variant="outline"
                size="icon"
                onClick={toggleForm}
              >
                <CirclePlus className="h-20 w-20 p-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex justify-center">
          <WorkLogForm doneFn={toggleForm}/>
        </div>
      )}
    </>
  );
}
