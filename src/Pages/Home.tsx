import { useEffect, useState } from "react";
import { Check, CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
                onClick={() =>
                  setFormVisible((isformVisible) => !isformVisible)
                }
              >
                <CirclePlus className="h-20 w-20 p-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex justify-center">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Create project</CardTitle>
              <CardDescription>
                Deploy your new project in one-click.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Name of your project" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Framework</Label>
                    <Select>
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="next">Next.js</SelectItem>
                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                        <SelectItem value="astro">Astro</SelectItem>
                        <SelectItem value="nuxt">Nuxt.js</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
            <Button className="rounded-full" 
              onClick={() =>
                  setFormVisible((isformVisible) => !isformVisible)
                }> 
                <Check />
                </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
