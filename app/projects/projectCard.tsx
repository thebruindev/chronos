"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Doc } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";

export function ProjectCard({ project }: { project: Doc<"projects"> }) {
  const router = useRouter();
  const goToProject = (id: string) => {
    router.push(`/projects/${id}`);
  };
  return (
    <Card className="bg-[#FAFCFC] dark:bg-[#05201D] border border-[#05201D] dark:border-[#57E1C0] backdrop-blur-md shadow-lg dark:shadow-xl hover:bg-[rgba(241,255,253,0.86)] dark:hover:bg-[rgba(17,43,37,0.6)] hover:shadow-xl transition-all duration-300 ease-in-out">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold mb-4 text-[#005A4E] dark:text-[#DBF9FF]">{project.title}</CardTitle>
        <CardDescription className="text-[#004D4F] dark:text-[#B6D1D6]">{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-[#004D4F] dark:text-[#B6D1D6]">Content of the project</p>
      </CardContent>
      <CardFooter>
        <Button variant={"teal"} onClick={() => goToProject(project._id)}>Go to project</Button>
      </CardFooter>
    </Card>
  );
}
