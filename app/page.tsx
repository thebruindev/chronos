"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CreateProjectButton } from "./projects/create-project-form";
import { ProjectCard } from "./projects/projectCard";
import Image from "next/image";

export default function Home() {
  const projects = useQuery(api.projects.getProjects);
  return (
    <main className="p-24 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="ml-2 text-4xl font-bold text-[#005A4E] dark:text-[#DBF9FF] border-b-4 border-[#57E1C0]">
          My Projects
        </h1>
        <CreateProjectButton />
      </div>

      <div className="grid grid-cols-4 gap-8">
        {projects && projects.length < 1 ? (
          <Image alt="plant" src="/plant.svg" width={40} height={40} />
        ) : (
          projects?.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))
        )}
      </div>
    </main>
  );
}
