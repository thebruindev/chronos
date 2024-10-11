import {
  UpdateIcon,
  CircleIcon,
} from "@radix-ui/react-icons";
import { CircleCheckBig } from "lucide-react";

export type progressStatusValuesMap = "In Progress" | "To Do" | "Done";

export const progressStatusIcon: Record<
  progressStatusValuesMap,
  React.ReactNode
> = {
  "In Progress": (
    <UpdateIcon className="text-[#FB923C] bg-inherit ml-4 h-4 w-4 font-bold" />
  ),
  "To Do": (
    <CircleIcon className="text-[#FB7185] bg-inherit ml-4 h-4 w-4 font-bold" />
  ),

  Done: (
    <CircleCheckBig className="text-[#11C99D] bg-inherit ml-4 h-4 w-4 font-bold" />
  ),
};
