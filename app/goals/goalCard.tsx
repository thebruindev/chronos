import Stack from "@/components/stack";
import { Doc } from "@/convex/_generated/dataModel";
import { formatUTCDateToDateString } from "@/utils/dates";

export function GoalCard({ goal }: { goal: Doc<"goals"> }) {
  return (
    <div className="mt-4 bg-[#FAFCFC] dark:bg-[#05201D] border border-[#05201D] dark:border-[#57E1C0] backdrop-blur-md shadow-lg dark:shadow-xl hover:cursor-pointer hover:bg-[rgba(241,255,253,0.86)] dark:hover:bg-[rgba(17,43,37,0.6)] hover:shadow-xl transition-all duration-300 ease-in-out rounded text-[#005A4E] dark:text-[#DBF9FF]">
      <Stack direction="row" className="my-3 mx-4">
        <p className="w-2/6">Name</p>
        <p className="w-2/12">Priority</p>
        <p className="w-2/12">Status</p>
        <p className="w-1/5">Creation Date</p>
        <p className="w-1/5">Start Date</p>
      </Stack>
      <div className="py-4">
        <Stack direction="row" className="mx-4">
          <p className="w-2/6">{goal.title}</p>

          <p className="w-2/12">{goal.status}</p>

          <p className="w-2/12">{goal.priority}</p>
          <p className="w-1/5">
            {formatUTCDateToDateString(goal._creationTime)}
          </p>
          <p className="w-1/5">
            {goal.startDate ? formatUTCDateToDateString(goal.startDate) : "TBD"}
          </p>
        </Stack>
      </div>
    </div>
  );
}
