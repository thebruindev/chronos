"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  ExitIcon,
  RocketIcon,
  TargetIcon,
  ListBulletIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GoalScreen from "./goalScreen";
import SprintScreen from "./sprintScreen";

export default function Page() {
  const router = useRouter();

  const goToHomePage = () => {
    router.push("/");
  };

  return (
    <main className="p-8 space-y-8">
      <div className="">
        <Button
          variant={"teal"}
          className="font-bold"
          onClick={() => goToHomePage()}
        >
          Back to projects <ExitIcon className="ml-2 h-4 w-4" />
        </Button>
        <Tabs defaultValue="sprint" className="py-4">
          <TabsList className="grid w-full grid-cols-4 bg-[#FAFCFC] dark:bg-[#05201D] border border-[#05201D] dark:border-[#57E1C0] backdrop-blur-md shadow-lg dark:shadow-xl">
            <TabsTrigger
              value="sprint"
              className="text-[#005A4E] dark:text-[#DBF9FF]"
            >
              Sprints{" "}
              <RocketIcon className="text-[#005A4E] dark:text-[#DBF9FF] bg-inherit ml-4 h-4 w-4" />{" "}
            </TabsTrigger>
            <TabsTrigger
              value="goals"
              className="text-[#005A4E] dark:text-[#DBF9FF]"
            >
              Goals{" "}
              <TargetIcon className="text-[#005A4E] dark:text-[#DBF9FF] bg-inherit ml-4 h-4 w-4" />{" "}
            </TabsTrigger>
            <TabsTrigger
              value="tasks"
              className="text-[#005A4E] dark:text-[#DBF9FF]"
            >
              Tasks{" "}
              <ListBulletIcon className="text-[#005A4E] dark:text-[#DBF9FF] bg-inherit ml-4 h-4 w-4" />{" "}
            </TabsTrigger>
            <TabsTrigger
              value="insights"
              className="text-[#005A4E] dark:text-[#DBF9FF]"
            >
              Insights{" "}
              <InfoCircledIcon className="text-[#005A4E] dark:text-[#DBF9FF] bg-inherit ml-4 h-4 w-4" />{" "}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="sprint">
            <SprintScreen />
          </TabsContent>
          <TabsContent value="goals">
            <GoalScreen />
          </TabsContent>
          <TabsContent value="tasks">
            <h1>tasks</h1>
          </TabsContent>
          <TabsContent value="insights">
            <h1>Insights</h1>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
