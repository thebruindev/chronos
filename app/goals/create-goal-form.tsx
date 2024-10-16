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
import { UploadIcon } from "@radix-ui/react-icons";

export function CreateGoalButton(props: {
  project: Doc<"projects">;
  action: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button variant={"teal"} className="font-bold">
          <UploadIcon className="mr-2 h-4 w-4" />
          Upload Goal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>
            {props.action === "create" ? "Upload" : "Update"} a goal
          </DialogTitle>
          <DialogDescription className="">
            Upload a team Goal for you to search over in the future.
          </DialogDescription>
          <UploadGoalForm
            project={props.project}
            onUpload={() => setIsOpen(false)}
            action={"create"}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
