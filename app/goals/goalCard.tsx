import Stack from "@/components/stack";
import { Doc } from "@/convex/_generated/dataModel";
import { formatUTCDateToDateString } from "@/utils/dates";
import { UpdateGoalButton } from "./update-goal-button";
import { DeleteGoalButton } from "./delete-goal-button";
import Chip, { ResultValuesMap } from "@/components/chip";
import { CheckCircledIcon, UpdateIcon, CircleIcon } from "@radix-ui/react-icons";

export type progressStatusValuesMap = "Completed" | "In Progress" | "To Do";

export const progressStatusIcon: Record<
  progressStatusValuesMap,
  React.ReactNode
> = {
  Completed: (
    <CheckCircledIcon className="text-[#005A4E] dark:text-[#DBF9FF] bg-inherit ml-4 h-4 w-4" />
  ),
  "In Progress": (
    <UpdateIcon className="text-[#005A4E] dark:text-[#DBF9FF] bg-inherit ml-4 h-4 w-4" />
  ),
  "To Do": (
    <CircleIcon className="text-[#005A4E] dark:text-[#DBF9FF] bg-inherit ml-4 h-4 w-4" />
  ),
};

export function GoalCard({ goal }: { goal: Doc<"goals"> }) {
  return (
    <div className="mt-4 bg-[#FAFCFC] dark:bg-[#05201D] border border-[#05201D] dark:border-[#57E1C0] backdrop-blur-md shadow-lg dark:shadow-xl hover:cursor-pointer hover:bg-[rgba(241,255,253,0.86)] dark:hover:bg-[rgba(17,43,37,0.6)] hover:shadow-xl transition-all duration-300 ease-in-out rounded text-[#005A4E] dark:text-[#DBF9FF]">
      <Stack direction="row" className="my-3 mx-4">
        <p className="w-2/5">Name</p>
        <p className="w-1/12">Priority</p>
        <p className="w-1/12">Status</p>
        <p className="w-1/12">Start Date</p>
        <div className="w-2/12">Start Date</div>{" "}
        {/* Empty space for aligning buttons */}
        <p className="w-1/12">Actions</p>
      </Stack>

      <div className="py-4">
        <Stack direction="row" className="mx-4" align="center">
          <p className="w-2/5">{goal.title}</p>
          <p className="w-1/12">
            {goal.status}{" "}
            {progressStatusIcon[goal.status as progressStatusValuesMap]}{" "}
          </p>
          <Chip
            label={goal.priority as ResultValuesMap}
            variant={"outlined"}
            width="w-1/12"
          />
          <p className="w-1/12">
            {formatUTCDateToDateString(goal._creationTime)}
          </p>
          <p className="w-1/12">
            {formatUTCDateToDateString(goal._creationTime)}
          </p>

          <Stack direction="row" className="w-2/12" justify="flex-end">
            {" "}
            {/* Set width and alignment for buttons */}
            <UpdateGoalButton goal={goal} action="update" />
            <DeleteGoalButton goal={goal} />
          </Stack>
        </Stack>
      </div>
    </div>
  );
}
