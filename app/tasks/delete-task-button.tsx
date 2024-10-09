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
import { Id } from "@/convex/_generated/dataModel";
import { TrashIcon } from "@radix-ui/react-icons";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { TaskWithGoal } from "@/convex/tasks";
import Stack from "@/components/stack";

export function DeleteTaskButton(props: { task: TaskWithGoal }) {
  const [isOpen, setIsOpen] = useState(false);
  const deleteTaskById = useMutation(api.tasks.deleteTaskById);

  async function deleteGoal() {
    if (props.task && props.task._id) {
      const validTaskId = props.task._id as Id<"tasks">;
      await deleteTaskById({ taskId: validTaskId });
    }
    setIsOpen(false);
  }

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button className="py-2 px-2 bg-[#FAFCFC] dark:bg-[#05201D]  hover:bg-[rgba(241,255,253,0.86)] dark:hover:bg-[rgba(17,43,37,0.6)] hover:shadow-xl transition-all duration-300 ease-in-out rounded text-[#005A4E] dark:text-[#DBF9FF] hover: cursor-pointer">
          <Stack direction="row" align="center" className="">
            <p>Edit</p>
            <TrashIcon className="h-4 w-4" />
          </Stack>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Delete {props.task.title}</DialogTitle>
          <DialogDescription className="">
            Caution: this action is irreversible
          </DialogDescription>
        </DialogHeader>

        <Button onClick={() => deleteGoal()}>Delete</Button>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
      </DialogContent>
    </Dialog>
  );
}
