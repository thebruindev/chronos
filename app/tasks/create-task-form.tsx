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
import { UploadIcon } from "@radix-ui/react-icons";
import { UploadTaskForm } from "./upload-task-form";

export function CreateTaskButton(props: {
  project: Doc<"projects">;
  action: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen} >
      <DialogTrigger asChild>
        <Button variant={"teal"} className="font-bold">
          <UploadIcon className="mr-2 h-4 w-4" />
          Upload Task
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-fit">
        <DialogHeader>
          <DialogTitle>
            {props.action === "create" ? "Upload" : "Update"} a task
          </DialogTitle>
          <DialogDescription >
            Upload a task for you to search over in the future.
          </DialogDescription>
          <UploadTaskForm
            onUpload={() => setIsOpen(false)}
            action={"create"}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
