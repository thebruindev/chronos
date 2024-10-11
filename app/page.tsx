"use client";

import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CreateProjectButton } from "./projects/create-project-form";
import { ProjectCard } from "./projects/projectCard";
import Image from "next/image";

export default function Home() {
  const projects = useQuery(api.projects.getProjects);
  return (
    <main>
      <Unauthenticated>
        <section className="flex flex-col justify-center items-center h-screen">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-[#57E1C0] mb-4">
              Chronos
            </h1>
            <p className="text-lg md:text-xl text-[#005A4E] dark:text-[#DBF9FF] mb-6">
              Manage your daily tasks
            </p>

            <p className="text-lg md:text-xl text-[#005A4E] dark:text-[#DBF9FF] mb-6">
              you are not{" "}
              <span className="font-bold text-[#11C99D] dark:text-[#11C99D] dark:[text-shadow:0_0_2px_#11C99D,0_0_4px_#11C99D]">
                authenticated
              </span>{" "}
              please sign via the the{" "}
              <span className="font-bold text-[#11C99D] dark:text-[#11C99D] dark:[text-shadow:0_0_2px_#11C99D,0_0_4px_#11C99D]">
                sign-in
              </span>{" "}
              button on the top-left corner
            </p>
          </div>
        </section>
      </Unauthenticated>
      <Authenticated>
        <div className="p-24 flex justify-between items-center">
          <h1 className="ml-2 text-4xl font-bold text-[#005A4E] dark:text-[#DBF9FF] border-b-4 border-[#57E1C0]">
            My Projects
          </h1>
          <CreateProjectButton />
        </div>

        <div className="grid grid-cols-4 gap-8">
          {projects && projects.length < 1 ? (
            <div className="flex flex-col items-center h-screen ">
              <Image alt="plant" src="/plant.png" width={300} height={300} />
              <p className="text-lg font-semibold text-[#005A4E] dark:text-[#DBF9FF] mb-4 text-center">
                Looks like you don&apos;t have any
                <span className="font-bold text-[#11C99D] dark:text-[#11C99D] dark:[text-shadow:0_0_2px_#11C99D,0_0_4px_#11C99D]">
                  {" "}
                  projects{" "}
                </span>
                yet, you could
                <span className="font-bold text-[#11C99D] dark:text-[#11C99D] dark:[text-shadow:0_0_2px_#11C99D,0_0_4px_#11C99D]">
                  {" "}
                  upload{" "}
                </span>
                one by
                <span className="font-bold text-[#11C99D] dark:text-[#11C99D] dark:[text-shadow:0_0_2px_#11C99D,0_0_4px_#11C99D]">
                  {" "}
                  clicking the button{" "}
                </span>
                above
              </p>
            </div>
          ) : (
            projects?.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))
          )}
        </div>
      </Authenticated>
    </main>
  );
}
