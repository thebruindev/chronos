import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
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

// Define the validation schema using Zod
const goalFormSchema = z.object({
  title: z.string().min(1).max(520),
  description: z.string().min(1).max(520),
  status: z.string(),
  priority: z.string(),
  startDate: z.string().optional(),
  dueDate: z.string().optional(),
  completedAt: z.string().optional(),
  projectId: z.string(),
});

// Infer the TypeScript type from the Zod schema
type FormSchema = z.infer<typeof goalFormSchema>;

interface UploadGoalFormProps {
  project?: Doc<"projects">;
  goal?: Doc<"goals">;
  onUpload: () => void;
  action: "create" | "update"; // Define the action prop to determine create or update
}

export function UploadGoalForm({
  onUpload,
  project,
  goal,
  action,
}: UploadGoalFormProps) {
  const createGoal = useMutation(api.goals.createGoal); // Mutation for creating a goal
  const updateGoalById = useMutation(api.goals.updateGoalById); // Mutation for updating a goal

  // Set up the form with default values based on whether it's for creating or updating a goal
  const form = useForm<FormSchema>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      title: goal?.title || "",
      description: goal?.description || "",
      status: goal?.status || "",
      priority: goal?.priority || "",
      projectId: project?._id || "",
    },
  });

  // Handle form submission dynamically based on the action (create or update)
  async function useSubmit(values: FormSchema) {
    const validProjectId = values.projectId as Id<"projects">;
    console.log("Action:", action);

    try {
      if (action === "create") {
        console.log("Creating a new goal");
        await createGoal({ ...values, projectId: validProjectId });
      } else if (action === "update" && goal) {
        console.log("Updating the goal with ID:", goal._id);
        await updateGoalById({
          goalId: goal._id, // Use the goal's ID for the update
          goalObjectToUpdate: {
            title: values.title,
            description: values.description,
            status: values.status,
            priority: values.priority,
            startDate: values.startDate,
            dueDate: values.dueDate,
            completedAt: values.completedAt,
          },
        });
        console.log("Goal updated successfully");
      }

      // Trigger the callback function after successful upload
      onUpload();
    } catch (error) {
      console.error("Error handling goal submission:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(useSubmit)} className="space-y-8">
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

        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Refactor create and update task modals"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status Field */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Input placeholder="Ex: not started" {...field} />
              </FormControl>
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
              <FormControl>
                <Input placeholder="Ex: top-priority" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" variant={"teal"}>
          {action === "create" ? "Create Goal" : "Update Goal"}
        </Button>
      </form>
    </Form>
  );
}
