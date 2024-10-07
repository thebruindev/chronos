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
  task?: Doc<"tasks">;
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
export function UploadTaskForm({
  onUpload,
  goal,
  action,
  task,
}: UploadGoalFormProps) {
  const { project, goals } = useProjectData();

  const createTask = useMutation(api.tasks.createTask);

  
  const form = useForm<FormSchema>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: task?.title || "",
      issueKey: task?.issueKey,
      description: task?.description || "",
      category: task?.status || "",
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
      await createTask({
        ...values,
        projectId: validProjectId,
        goalId: validGoalId,
      });
    } catch (error) {
      // Trigger the callback function after successful upload

      console.error("Error handling goal submission:", error);
    }
    onUpload();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(useSubmit)} className="space-y-8">
        {/* Goal Field */}
        <Stack direction="row">
          {/* Issuekey Field */}
          <div className="w-6/12">
            <FormField
              control={form.control}
              name="issueKey"
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Frontend Refactor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Category Field */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: top-priority" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-6/12">
            {" "}
            {/* Status Field */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
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
                      {Object.entries(taskStatusValues).map(([key, value]) => (
                        <SelectItem key={key} value={value}>
                          {value}
                        </SelectItem>
                      ))}
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
                <FormItem>
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
            {/* Complexity Field */}
            <FormField
              control={form.control}
              name="complexity"
              render={({ field }) => (
                <FormItem>
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
            {/* Days Estimation Field */}
            <FormField
              control={form.control}
              name="daysEstimation"
              render={() => (
                <FormItem>
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
                <FormItem>
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
          </div>
        </Stack>

        {/* Submit Button */}
        <Button type="submit" variant={"teal"}>
          {action === "create" ? "Create Goal" : "Update Goal"}
        </Button>
      </form>
    </Form>
  );
}
