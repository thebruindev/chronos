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
import { useState } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import { UploadGoalForm } from "./upload-goal-form";

export function CreateGoalButton(props: { project: Doc<"projects"> }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button variant={'teal'} className="font-bold">Upload Goal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Upload a Goal</DialogTitle>
          <DialogDescription className="">
            Upload a team Goal for you to search over in the future.
          </DialogDescription>
          <UploadGoalForm
            project={props.project}
            onUpload={() => setIsOpen(false)}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
