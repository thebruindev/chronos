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
import { Doc } from "@/convex/_generated/dataModel";
import { UploadGoalForm } from "./upload-goal-form";
import { Pencil1Icon } from "@radix-ui/react-icons";

export function UpdateGoalButton(props: {
  goal: Doc<"goals">;
  action: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button
          className="rounded-full size-8 bg-[#34D399] hover:bg-[#2BB07A] dark:hover:bg-[#2BB07A] text-white font-semibold transition-colors duration-300"
          size={"icon"}
        >
          <Pencil1Icon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Update {props.goal.title}</DialogTitle>
          <DialogDescription className="">
            Upload a team Goal for you to search over in the future.
          </DialogDescription>
          <UploadGoalForm
            goal={props.goal}
            onUpload={() => setIsOpen(false)}
            action={"update"}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
