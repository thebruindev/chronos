"use client"

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
    router.push(`/projects/${id}`)
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
       
        <p>Content of the project</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => goToProject(project._id)}>Go to project</Button>
      </CardFooter>
    </Card>
  );
}
