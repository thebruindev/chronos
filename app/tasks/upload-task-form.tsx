"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useProjectData from "../customHooks/useProjectData";
import Stack from "@/components/stack";
import { Textarea } from "@/components/ui/textarea";
import { TaskWithGoal } from "@/convex/tasks";
import { TaskCategoryValueUnion } from "./tasksUtils";

const taskFormSchema = z.object({
  title: z.string().min(1).max(520),
  issueKey: z.string().min(1).max(520),
  description: z.string().min(1).max(520),
  priority: z.string(),
  category: z.string(),
  complexity: z.union([
    z.literal("Simple"),
    z.literal("Medium"),
    z.literal("Complex"),
  ]),
  status: z.string(),
  daysEstimation: z.number().optional(),
  goalId: z.string(),
  completedAt: z.string().optional(),
  projectId: z.string(),
  lastUpdatedAt: z.string().optional(),
});

// Infer the TypeScript type from the Zod schema
type FormSchema = z.infer<typeof taskFormSchema>;

interface UploadGoalFormProps {
  goal?: Doc<"goals">;
  task?: TaskWithGoal;
  onUpload: () => void;
  action: "create" | "update";
}

const taskStatusValues: Record<string, string> = {
  to_do: "To Do",
  in_progress: "In Progress",
  in_validation: "In Validation",
  done: "Done",
};

const taskPriorityValues: Record<string, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

const taskComplexityValues: Record<string, string> = {
  simple: "Simple",
  medium: "Medium",
  complex: "Complex",
};

const taskCategoryValues: Record<string, TaskCategoryValueUnion> = {
  refactor: "Refactor",
  frontend: "Frontend",
  database: "Database",
  email: "Email",
  learning: "Learning",
  feature: "Feature",
  bug: "Bug",
  test: "Test",
};
export function UploadTaskForm({
  onUpload,
  goal,
  action,
  task,
}: UploadGoalFormProps) {
  const { project, goals } = useProjectData();

  const createTask = useMutation(api.tasks.createTask);
  const updateTaskById = useMutation(api.tasks.updateTaskById);
  const form = useForm<FormSchema>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: task?.title || "",
      issueKey: task?.issueKey,
      description: task?.description || "",
      category: task?.category || "",
      complexity: task?.complexity,
      status: task?.status || "",
      priority: task?.priority || "",
      daysEstimation: Number(task?.daysEstimation) || undefined,
      projectId: project?._id,
      goalId: goal?._id || "",
    },
  });

  // Handle form submission dynamically based on the action (create or update)
  async function useSubmit(values: FormSchema) {
    const validProjectId = values.projectId as Id<"projects">;
    const validGoalId = values.goalId as Id<"goals">;
    console.log("Action:", action);

    try {
      if (action === "create") {
        await createTask({
          ...values,
          projectId: validProjectId,
          goalId: validGoalId,
        });
      } else if (action === "update" && task) {
        await updateTaskById({
          taskId: task._id as Id<"tasks">,
          taskObjectToUpdate: {
            title: values.title,
            issueKey: values.issueKey,
            description: values.description,
            status: values.status,
            priority: values.priority,
            category: values.category,
            complexity: values.complexity,
            daysEstimation: values.daysEstimation,
            goalId: task.goalId as Id<"goals">,
            lastUpdatedAt: values.lastUpdatedAt,
            projectId: task.projectId as Id<"projects">,
          },
        });
      }
    } catch (error) {
      // Trigger the callback function after successful upload

      console.error("Error handling goal submission:", error);
    }
    onUpload();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(useSubmit)} className="w-max">
        {/* Goal Field */}
        <Stack direction="row" className="py-4">
          {/* Issuekey Field */}
          <div className=" w-1/2">
            <Stack direction="row">
              <FormField
                control={form.control}
                name="issueKey"
                render={({ field }) => (
                  <FormItem className="w-64">
                    <FormLabel>Issue Key</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: CRN-101" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Title Field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-64">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Frontend Refactor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Stack>
            <div className=" py-6  w-full">
              {/* Description Field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="description of the task"
                        className="resize-none h-52"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="mx-8 h-full w-px bg-[#05201D] dark:bg-[#57E1C0]"></div>
          </div>

          <div className=" w-1/2">
            <Stack direction="row">
              {" "}
              {/* Status Field */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="w-64">
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(taskStatusValues).map(
                          ([key, value]) => (
                            <SelectItem key={key} value={value}>
                              {value}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      You can update the complexity later on
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Priority Field */}
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem className="w-64">
                    <FormLabel>Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(taskPriorityValues).map(
                          ([key, value]) => (
                            <SelectItem key={key} value={value}>
                              {value}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      You can update the priority later on
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Stack>
            <Stack direction="row">
              <FormField
                control={form.control}
                name="complexity"
                render={({ field }) => (
                  <FormItem className="w-64">
                    <FormLabel>Complexity</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a complexity for this task" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(taskComplexityValues).map(
                          ([key, value]) => (
                            <SelectItem key={key} value={value}>
                              {value}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      You can update the complexity later on
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category Field */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="w-64">
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category for this task" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(taskCategoryValues).map(
                          ([key, value]) => (
                            <SelectItem key={key} value={value}>
                              {value}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      You can update the category later on
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Stack>
            <div className=" py-4">
              <Stack direction="row">
                {/* Days Estimation Field */}
                <FormField
                  control={form.control}
                  name="daysEstimation"
                  render={() => (
                    <FormItem className="w-64">
                      <FormLabel>Days Estimation</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1"
                          {...form.register("daysEstimation", {
                            setValueAs: (value) =>
                              value === "" ? undefined : parseInt(value, 10),
                          })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="goalId"
                  render={({ field }) => (
                    <FormItem className="w-64">
                      <FormLabel>Goal</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a goal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {goals &&
                            goals.map((g) => (
                              <SelectItem key={g._id} value={g._id}>
                                {g.title}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Stack>
            </div>
          </div>
        </Stack>

        {/* Submit Button */}
        <Stack direction="row" justify="flex-end">
          <Button variant={"teal-outline"} onClick={onUpload} type="button">
            Cancel
          </Button>
          <Button type="submit" variant={"teal"}>
            {action === "create" ? "Create Goal" : "Update Goal"}
          </Button>
        </Stack>
      </form>
    </Form>
  );
}
