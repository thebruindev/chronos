import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

// Define your custom hook
const useProjectData = () => {
  const { projectId } = useParams();

  // Ensure projectId is a string (if it's an array or undefined, return null)
  const validProjectId =
    projectId && !Array.isArray(projectId)
      ? (projectId as Id<"projects">)
      : null;

  // Query for goals by project ID
  const goals = useQuery(api.goals.getGoalsByProjectId, {
    projectId: validProjectId as Id<"projects">,
  });

  // Query for project by ID
  const project = useQuery(
    api.projects.getProjectById, // Always pass the query function
    validProjectId ? { projectId: validProjectId } : "skip" // Pass "skip" if projectId is invalid
  );

  
  return {
    validProjectId,
    goals,
    project,
  };
};

export default useProjectData;
