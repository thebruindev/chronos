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

const goalFormSchema = z.object({
  title: z.string().min(1).max(520),
  description: z.string().min(1).max(520),
  status: z.string(),
  priority: z.string(),
  startDate: z.string().optional(),
  dueDate: z.string().optional(),
  completedAt: z.string().optional(),
});

type FormSchema = z.infer<typeof goalFormSchema>;
interface UploadGoalFormProps {
  onUpload: () => void;
}

export function UploadGoalForm({ onUpload }: UploadGoalFormProps) {
  const createGoal = useMutation(api.goals.createGoal);
  const form = useForm<FormSchema>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "",
      priority: "",
    },
  });

  async function onSubmit(values: FormSchema) {
    console.log(values);
    await createGoal(values);
    onUpload();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <Button type="submit">Upload</Button>
      </form>
    </Form>
  );
}
