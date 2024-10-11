"use client";

import useProjectData from "@/app/customHooks/useProjectData";
import { CreateGoalButton } from "@/app/goals/create-goal-form";
import { GoalCard } from "@/app/goals/goalCard";
import Stack from "@/components/stack";
import Image from "next/image";

export default function GoalScreen() {
  const { goals, project } = useProjectData();

  return (
    <div className="py-6 mx-4">
      {project ? (
        <>
          <Stack direction="row">
            <h1 className="text-4xl font-bold py-4 text-[#005A4E] dark:text-[#DBF9FF]">
              {project.title} - Goals
            </h1>
          </Stack>

          <Stack className="py-2" direction="column" spacing={6}>
            {project && goals && goals.length < 1 ? (
              <div className="flex flex-col items-center h-screen ">
                <Image alt="plant" src="/plant.png" width={300} height={300} />
                <p className="text-lg font-semibold text-[#005A4E] dark:text-[#DBF9FF] mb-4 text-center">
                  Looks like you don&apos;t have any
                  <span className="font-bold text-[#11C99D] dark:text-[#11C99D] dark:[text-shadow:0_0_2px_#11C99D,0_0_4px_#11C99D]">
                    {" "}
                    goals{" "}
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
                  <CreateGoalButton project={project} action="create" />
                </div>
              </div>
            ) : (
              <div>
                <p>{project.description}</p>
                <Stack direction="row" justify="space-between" className="pt-4">
                  <p>Filter section here</p>
                  <Stack direction="row" justify="flex-start">
                    <CreateGoalButton project={project} action="create" />
                  </Stack>
                </Stack>
                <Stack direction="row" className="my-3 mx-4 mt-8">
                  <p className="w-1/3 font-bold">Name</p>
                  <p className="w-2/12 font-bold">Priority</p>
                  <p className="w-1/12 font-bold">Status</p>
                  <p className="w-2/12 ml-8 font-bold">Start Date</p>
                  <div className="w-2/12 font-bold">Start Date</div>{" "}
                  {/* Empty space for aligning buttons */}
                  <p className="w-1/12 font-bold">Actions</p>
                </Stack>
                {goals?.map((goal) => <GoalCard key={goal._id} goal={goal} />)}
              </div>
            )}
          </Stack>
        </>
      ) : null}
    </div>
  );
}
