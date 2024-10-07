import Stack from "@/components/stack";
// import { Doc } from "@/convex/_generated/dataModel";
// import { UpdateGoalButton } from "./update-goal-button";
// import { DeleteGoalButton } from "./delete-goal-button";
import Chip, { ResultValuesMap } from "@/components/chip";
import {
  CheckCircledIcon,
  UpdateIcon,
  CircleIcon,
} from "@radix-ui/react-icons";
import { TaskWithGoal } from "@/convex/tasks";

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

export function TaskCard({
  task,
  displayType,
}: {
  task: TaskWithGoal;
  displayType: string;
}) {
  console.log(displayType); // Check what this logs

  return (
    <>
      {displayType === "BACKLOG" ? (
        <div className="mt-4 bg-[#FAFCFC] dark:bg-[#05201D] border border-[#05201D] dark:border-[#57E1C0] backdrop-blur-md shadow-lg dark:shadow-xl hover:bg-[rgba(241,255,253,0.86)] dark:hover:bg-[rgba(17,43,37,0.6)] hover:shadow-xl transition-all duration-300 ease-in-out rounded text-[#005A4E] dark:text-[#DBF9FF]">
          <div className="py-4">
            <Stack direction="row" className="mx-4" align="center">
              <p className="w-1/3">{task.issueKey}</p>
              <p className="w-1/3">{task.title}</p>
              <p className="w-2/12 flex items-center">
                {task.status}{" "}
                {progressStatusIcon[task.status as progressStatusValuesMap]}{" "}
              </p>
              <Chip
                label={task.priority as ResultValuesMap}
                variant={"outlined"}
                width="w-1/12"
              />
              <p className="w-1/3">{task.goal?.title}</p>

              <Stack direction="row" className="w-2/12" justify="flex-end">
                {" "}
                {/* Set width and alignment for buttons */}
                {/* <UpdateGoalButton goal={goal} action="update" />
              <DeleteGoalButton goal={goal} /> */}
              </Stack>
            </Stack>
          </div>
        </div>
      ) : (
        <div className="mt-4 bg-[#FAFCFC] dark:bg-[#05201D] border border-[#05201D] dark:border-[#57E1C0] backdrop-blur-md shadow-lg dark:shadow-xl hover:bg-[rgba(241,255,253,0.86)] dark:hover:bg-[rgba(17,43,37,0.6)] hover:shadow-xl transition-all duration-300 ease-in-out rounded text-[#005A4E] dark:text-[#DBF9FF]">
          <Stack direction="row" justify="space-between">
            <>issue key</>
            <>category icon</>
          </Stack>
          <p>task description</p>
          <>status icon</>
        </div>
      )}
    </>
  );
}
