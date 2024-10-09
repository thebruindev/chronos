import { CheckCircledIcon, UpdateIcon, CircleIcon} from "@radix-ui/react-icons";

export type progressStatusValuesMap = "Completed" | "In Progress" | "To Do";

export const progressStatusIcon: Record<
  progressStatusValuesMap,
  React.ReactNode
> = {
  Completed: (
    <CheckCircledIcon className="text-[#11C99D] bg-inherit ml-4 h-4 w-4 font-bold" />
  ),
  "In Progress": (
    <UpdateIcon className="text-[#FB923C] bg-inherit ml-4 h-4 w-4 font-bold" />
  ),
  "To Do": (
    <CircleIcon className="text-[#FB7185] bg-inherit ml-4 h-4 w-4 font-bold" />
  ),
};


