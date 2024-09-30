"use client";

import { CreateGoalButton } from "@/app/goals/create-goal-form";
import { GoalCard } from "@/app/goals/goalCard";
import Stack from "@/components/stack";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ExitIcon } from "@radix-ui/react-icons";

export default function Page() {
  const { projectId } = useParams();

  // Ensure projectId is a string (if it's an array or undefined, return null)
  const validProjectId =
    projectId && !Array.isArray(projectId)
      ? (projectId as Id<"projects">)
      : null;

  const goals = useQuery(api.goals.getGoalsByProjectId, {
    projectId: validProjectId as Id<"projects">,
  });

  const router = useRouter();

  const goToHomePage = () => {
    router.push("/");
  };

  // Use the useQuery hook with the "skip" option in the second argument if the projectId is invalid
  const project = useQuery(
    api.projects.getProjectById, // Always pass the query function
    validProjectId ? { projectId: validProjectId } : "skip" // Pass "skip" if projectId is invalid
  );

  // Handle invalid projectId case
  if (!validProjectId) {
    return <div>Invalid project ID</div>;
  }

  // Loading state: project will be `undefined` while the query is in flight
  if (project === undefined) {
    return <div>Loading project...</div>;
  }

  // Error handling: if no project is returned, it means the project was not found
  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <main className="p-24 space-y-8">
      <div className="">
        <Button variant={"teal"} className="font-bold" onClick={() => goToHomePage()}>
          Back to projects <ExitIcon className="ml-2 h-4 w-4" />
        </Button>
        <Stack direction="row">
        <h1 className="text-4xl font-bold py-4 text-[#005A4E] dark:text-[#DBF9FF]">{project.title} - Goals</h1>
        </Stack>
        
        <p>{project.description}</p>
        <Stack direction="row" justify="space-between" className="pt-4">
          <p>Filter section here</p>
          <CreateGoalButton project={project} />
        </Stack>
        <Stack className="py-2" direction="column" spacing={6}>
          {goals?.map((goal) => <GoalCard key={goal._id} goal={goal} />)}
        </Stack>
      </div>
    </main>
  );
}
