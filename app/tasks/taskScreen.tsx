"use client";

import Stack from "@/components/stack";
import Image from "next/image";
import useProjectData from "@/app/customHooks/useProjectData";
import { CreateTaskButton } from "./create-task-form";
import { TaskCard } from "./taskCard";

export default function TaskScreen() {
  const { goals, project, tasks } = useProjectData();
  
  return (
    <div className="py-6 mx-4">
      {project ? (
        <>
          <Stack direction="row">
            <h1 className="text-4xl font-bold py-4 text-[#005A4E] dark:text-[#DBF9FF]">
              {project.title} - Backlog
            </h1>
          </Stack>

          <Stack className="py-2" direction="column" spacing={6}>
            {goals && tasks && tasks.length < 1 ? (
              <div className="flex flex-col items-center h-screen ">
                <Image alt="plant" src="/plant.png" width={300} height={300} />
                <p className="text-lg font-semibold text-[#005A4E] dark:text-[#DBF9FF] mb-4 text-center">
                  Looks like you don&apos;t have any
                  <span className="font-bold text-[#11C99D] dark:text-[#11C99D] dark:[text-shadow:0_0_2px_#11C99D,0_0_4px_#11C99D]">
                    {" "}
                    tasks{" "}
                  </span>
                  yet, you could
                  <span className="font-bold text-[#11C99D] dark:text-[#11C99D] dark:[text-shadow:0_0_2px_#11C99D,0_0_4px_#11C99D]">
                    {" "}
                    upload{" "}
                  </span>
                  one by
                  <span className="font-bold text-[#11C99D] dark:text-[#11C99D] dark:[text-shadow:0_0_2px_#11C99D,0_0_4px_#11C99D]">
                    {" "}
                    clicking the button{" "}
                  </span>
                  above
                </p>

                <div className="mt-4">
                  <CreateTaskButton project={project} action={"create"} />
                </div>
              </div>
            ) : (
              <div>
                <p>{project.description}</p>
                <Stack direction="row" justify="space-between" className="pt-4">
                  <p>Filter section here</p>
                  <Stack direction="row" justify="flex-start">
                    <CreateTaskButton project={project} action={"create"} />
                  </Stack>
                </Stack>

                {tasks?.map((task) => <TaskCard key={task._id} task={task} displayType={"BACKLOG"}/>)}
              </div>
            )}
          </Stack>
        </>
      ) : null}
    </div>
  );
}
