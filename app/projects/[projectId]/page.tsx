"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

export default function Page() {
    const { projectId } = useParams();

    // Ensure projectId is a string (if it's an array or undefined, return null)
    const validProjectId = projectId && !Array.isArray(projectId) ? (projectId as Id<"projects">) : null;
  
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
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">{project.title}</h1>
        <p>{project.description}</p>
      </div>
    </main>
  );
}
