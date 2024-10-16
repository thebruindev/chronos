"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { TaskWithGoal } from "@/convex/tasks";
import Stack from "@/components/stack";
import { UploadTaskForm } from "./upload-task-form";

export function UpdateTaskButton(props: {
  task: TaskWithGoal;
  action: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button
          className="py-2 px-2 bg-[#FAFCFC] dark:bg-[#05201D]  hover:bg-[rgba(241,255,253,0.86)] dark:hover:bg-[rgba(17,43,37,0.6)] hover:shadow-xl transition-all duration-300 ease-in-out rounded text-[#005A4E] dark:text-[#DBF9FF] hover: cursor-pointer"
          variant={"ghost"}
        >
          <Stack direction="row" align="center">
            <p>Edit</p>
            <Pencil1Icon className="h-4 w-4" />
          </Stack>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-fit">
        <DialogHeader>
          <DialogTitle>Update {props.task.title}</DialogTitle>
          <DialogDescription>Update a task</DialogDescription>
          <UploadTaskForm
            onUpload={() => setIsOpen(false)}
            action="update"
            task={props.task}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
