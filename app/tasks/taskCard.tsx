import Stack from "@/components/stack";
import { PriorityValuesMap } from "@/components/chip";

import { TaskWithGoal } from "@/convex/tasks";
import { progressStatusIcon, progressStatusValuesMap } from "@/utils/cardIcons";

import { ReactNode } from "react";
import {
  ChevronsDown,
  ChevronsUp,
  EllipsisVertical,
  Equal,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { DeleteTaskButton } from "./delete-task-button";
import { UpdateTaskButton } from "./update-task-button";

const taskPriorityIcon: Record<PriorityValuesMap, ReactNode> = {
  High: (
    <ChevronsUp className="text-[#FB7185] bg-inherit ml-4 h-4 w-4 font-bold" />
  ),

  Medium: <Equal className="ml-4 h-4 w-4 font-bold" />,

  Low: (
    <ChevronsDown className="text-[#22D3EE] bg-inherit ml-4 h-4 w-4 font-bold" />
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

              <p className="w-1/3">{task.goal?.title}</p>
              <p className="w-2/12 flex items-center">
                {task.status}{" "}
                {progressStatusIcon[task.status as progressStatusValuesMap]}{" "}
              </p>

              <Stack direction="row" className="w-2/12" justify="flex-end">
                <div>
                  {taskPriorityIcon[task.priority as PriorityValuesMap]}
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <EllipsisVertical className="ml-4 h-4 w-4 font-bold hover: cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="bg-[#FAFCFC] dark:bg-[#05201D] w-full">
                    <div>
                      <Stack
                        direction="row"
                        align="center"
                        className="py-2 px-2 hover:bg-[rgba(241,255,253,0.86)] dark:hover:bg-[rgba(17,43,37,0.6)] hover:shadow-xl transition-all duration-300 ease-in-out rounded text-[#005A4E] dark:text-[#DBF9FF] hover: cursor-pointer"
                      >
                        <p>Peek</p>
                        <EyeOpenIcon className="h-4 w-4" />
                      </Stack>
                      <div>
                        {" "}
                        <UpdateTaskButton task={task} action="update" />
                      </div>
                      <div>
                        {" "}
                        <DeleteTaskButton task={task} />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
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
