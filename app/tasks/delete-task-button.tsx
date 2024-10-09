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
import Image from "next/image";

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
        <Button className="py-2 px-2 bg-[#FAFCFC] dark:bg-[#05201D]  hover:bg-[rgba(241,255,253,0.86)] dark:hover:bg-[rgba(17,43,37,0.6)] hover:shadow-xl transition-all duration-300 ease-in-out rounded text-[#005A4E] dark:text-[#DBF9FF] hover: cursor-pointer" variant={'ghost'}>
          <Stack direction="row" align="center" className="">
            <p>Delete</p>
            <TrashIcon className="h-4 w-4" />
          </Stack>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Delete: {props.task.title}</DialogTitle>
          <DialogDescription className="">
            <div className="flex flex-col items-center justify-center text-center p-6">
              <Image
                src="/warning.svg"
                alt="warning"
                width={150}
                height={150}
              />
              <p className="mt-4 italic">
                This action is permanent and that item will be lost forever
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <Stack direction="row" justify="flex-end">
          <Button onClick={() => setIsOpen(false)} variant={"teal-outline"}>Cancel</Button>
          <Button onClick={() => deleteGoal()} variant={"danger"}>Delete</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
