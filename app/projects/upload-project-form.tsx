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

const projectFormSchema = z.object({
  title: z.string().min(1).max(520),
  description: z.string().min(1).max(520),
  lastUpdatedAt: z.string().optional(),
});

type FormSchema = z.infer<typeof projectFormSchema>;
interface UploadProjectFormProps {
  onUpload: () => void;
}

export function UploadProjectForm({ onUpload }: UploadProjectFormProps) {
  const createProject = useMutation(api.projects.createProject);
  const form = useForm<FormSchema>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      description: "",
      lastUpdatedAt: undefined,
    },
  });

  async function onSubmit(values: FormSchema) {
    console.log(values);
    await createProject(values);
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
        <Button type="submit">Upload</Button>
      </form>
    </Form>
  );
}
