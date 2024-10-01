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
import { Doc, Id } from "@/convex/_generated/dataModel";
import { TrashIcon } from "@radix-ui/react-icons";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function DeleteGoalButton(props: { goal: Doc<"goals"> }) {
  const [isOpen, setIsOpen] = useState(false);
  const deleteGoalById = useMutation(api.goals.deleteGoalById);

  async function deleteGoal() {
    if (props.goal && props.goal._id) {
      const validGoalId = props.goal._id as Id<"goals">;
      await deleteGoalById({ id: validGoalId });
    }
    setIsOpen(false);
  }

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button
          className="rounded-full size-8 bg-[#FF4D4F] hover:bg-[#D42D2F] dark:hover:bg-[#FF6666] text-white font-semibold transition-colors duration-300"
          size={"icon"}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Delete {props.goal.title}</DialogTitle>
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
