import Stack from "@/components/stack";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import {
  BookHeadphones,
  Bug,
  Database,
  LayoutDashboard,
  Mail,
  Rocket,
  Wrench,
} from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

export type TaskCategoryValueUnion =
  | "Refactor"
  | "Frontend"
  | "Database"
  | "Email"
  | "Learning"
  | "Feature"
  | "Bug"


export const taskCategoryIcon: Record<TaskCategoryValueUnion, React.ReactNode> =
  {
    Refactor: (
      <Wrench className="text-[#11C99D] bg-inherit ml-4 h-4 w-4 font-bold" />
    ),
    Frontend: (
      <LayoutDashboard className="text-[#FB923C] bg-inherit ml-4 h-4 w-4 font-bold" />
    ),
    Database: (
      <Database className="text-[#FB7185] bg-inherit ml-4 h-4 w-4 font-bold" />
    ),

    Email: (
      <Mail className="text-[#FB7185] bg-inherit ml-4 h-4 w-4 font-bold" />
    ),

    Learning: (
      <BookHeadphones className="text-[#FB7185] bg-inherit ml-4 h-4 w-4 font-bold" />
    ),

    Feature: (
      <Rocket className="text-[#FB7185] bg-inherit ml-4 h-4 w-4 font-bold" />
    ),
    Bug: (
      <Bug  className="text-[#FB7185] bg-inherit ml-4 h-4 w-4 font-bold"/>
    )
  };

export default function TaskStatusColumnItem(props: { name: string }) {
  const { projectId } = useParams();

  // Ensure projectId is a string (if it's an array or undefined, return null)
  const validProjectId =
    projectId && !Array.isArray(projectId)
      ? (projectId as Id<"projects">)
      : null;
  const tasks = useQuery(api.tasks.getTasksWithGoalsByTaskStatus, {
    projectId: validProjectId as Id<"projects">,
    status: props.name,
  });
  return (
    <div className="border border-slate-400 dark:border-[#57E1C0] backdrop-blur-md shadow-lg dark:shadow-xl rounded">
      <>
        {" "}
        <p className="py-4 font-bold text-[#005A4E] dark:text-[#DBF9FF] text-center bg-[#57E1C0]">
          {props.name}
        </p>
        {tasks && tasks.length > 0 ? (
          <>
            {tasks.map((task) => (
              <div
                key={task._id}
                className="mt-4 m-4 p-4 bg-[#FAFCFC] dark:bg-[#05201D] border border-[#05201D] dark:border-[#57E1C0] backdrop-blur-md shadow-lg dark:shadow-xl hover:bg-[rgba(241,255,253,0.86)] dark:hover:bg-[rgba(17,43,37,0.6)] hover:shadow-xl transition-all duration-300 ease-in-out rounded text-[#005A4E] dark:text-[#DBF9FF]"
              >
                <Stack direction="row" justify="space-between">
                  <p>{task.issueKey}</p>
                  <div>
                    {taskCategoryIcon[task.category as TaskCategoryValueUnion]}
                  </div>
                </Stack>
                <p>{task.description}</p>
                <p>{task.status}</p>
              </div>
            ))}
          </>
        ) : null}
      </>
    </div>
  );
}
