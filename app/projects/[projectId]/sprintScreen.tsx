"use client";

import React from "react";
import TaskStatusColumnItem from "./taskStatusColumnItem";
import Stack from "@/components/stack";
import useProjectData from "@/app/customHooks/useProjectData";

export default function SprintScreen() {
  const { project } = useProjectData()


  return (
    <div className="py-6 mx-4">
      <Stack direction="row">
        <h1 className="text-4xl font-bold py-4 text-[#005A4E] dark:text-[#DBF9FF]">
          {project?.title} - Sprints
        </h1>
      </Stack>

      <div className="py-4 grid grid-cols-12 gap-4 h-screen">
        <div className="col-span-12 grid grid-cols-4 gap-4">
          <TaskStatusColumnItem key={"todo"} name="To Do" />
          <TaskStatusColumnItem key={"in_progress"} name="In Progress" />
          <TaskStatusColumnItem key={"in_validation"} name="In Validation" />
          <TaskStatusColumnItem key={"done"} name="Done" />
        </div>
      </div>
    </div>
  );
}
