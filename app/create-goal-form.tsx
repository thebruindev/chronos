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
import { UploadGoalForm } from "./upload-goal-form";
import { useState } from "react";

export function CreateGoalButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button>Upload Goal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload a Goal</DialogTitle>
          <DialogDescription>
            Upload a team Goal for you to search over in the future.
          </DialogDescription>
          <UploadGoalForm onUpload={() => setIsOpen(false)} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
