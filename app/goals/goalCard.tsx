import Stack from "@/components/stack";
import { Doc } from "@/convex/_generated/dataModel";
import { formatUTCDateToDateString } from "@/utils/dates";
import { UpdateGoalButton } from "./update-goal-button";
import { DeleteGoalButton } from "./delete-goal-button";
import Chip, { PriorityValuesMap } from "@/components/chip";
import { progressStatusIcon, progressStatusValuesMap } from "@/utils/cardIcons";



export function GoalCard({ goal }: { goal: Doc<"goals"> }) {
  return (
    <div className="mt-4 bg-[#FAFCFC] dark:bg-[#05201D] border border-[#05201D] dark:border-[#57E1C0] backdrop-blur-md shadow-lg dark:shadow-xl hover:bg-[rgba(241,255,253,0.86)] dark:hover:bg-[rgba(17,43,37,0.6)] hover:shadow-xl transition-all duration-300 ease-in-out rounded text-[#005A4E] dark:text-[#DBF9FF]">
      

      <div className="py-4">
        <Stack direction="row" className="mx-4" align="center">
          <p className="w-1/3">{goal.title}</p>
          <p className="w-2/12 flex items-center">
            {goal.status}{" "}
            {progressStatusIcon[goal.status as progressStatusValuesMap]}{" "}
          </p>
          <Chip
            label={goal.priority as PriorityValuesMap}
            variant={"outlined"}
            width="w-1/12"
          />
          <p className="w-2/12 ml-8">
            {formatUTCDateToDateString(goal._creationTime)}
          </p>
          <p className="w-/12">
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
